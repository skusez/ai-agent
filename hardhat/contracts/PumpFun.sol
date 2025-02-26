// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

interface IUniswapV2Factory {
    function createPair(address tokenA, address tokenB) external returns (address pair);
}

interface IUniswapV2Router02 {
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external payable returns (uint256 amountToken, uint256 amountETH, uint256 liquidity);
}

contract PumpFun is ReentrancyGuard {
    receive() external payable {}

    address private owner;
    address private feeRecipient;
    uint256 private initialVirtualTokenReserves;
    uint256 private initialVirtualEthReserves;

    uint256 private tokenTotalSupply;
    uint256 private mcapLimit;
    uint256 private feeBasisPoint;
    uint256 private createFee;

    IUniswapV2Router02 private uniswapV2Router;

    address public tokenFactory;

    struct Token {
        address tokenMint;
        uint256 virtualTokenReserves;
        uint256 virtualEthReserves;
        uint256 realTokenReserves;
        uint256 realEthReserves;
        uint256 tokenTotalSupply;
        uint256 mcapLimit;
        address tokenOwner;
        bool complete;
        address uniswapV2Pair;
    }

    mapping(address => Token) public bondingCurve;

    event CreatePool(
        address indexed mint, address indexed user, uint256 virtualEthReserves, uint256 virtualTokenReserves
    );
    event Complete(address indexed user, address indexed mint, uint256 timestamp);
    event Trade(
        address indexed mint,
        uint256 ethAmount,
        uint256 tokenAmount,
        bool isBuy,
        address indexed user,
        uint256 timestamp,
        uint256 virtualEthReserves,
        uint256 virtualTokenReserves
    );
    event OpenTradingOnUniswap(
        address indexed token,
        address indexed uniswapV2Pair,
        uint256 ethReserves,
        uint256 tokenReserves,
        uint256 timestamp
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    constructor(
        address feeRecipientAddress,
        uint256 feeAmt,
        uint256 basisFee,
        address router,
        address tokenFactoryAddress
    ) {
        owner = msg.sender;
        feeRecipient = feeRecipientAddress;
        createFee = feeAmt;
        feeBasisPoint = basisFee;
        initialVirtualTokenReserves = 10 ** 27;
        initialVirtualEthReserves = 3 * 10 ** 21;
        tokenTotalSupply = 10 ** 27;
        mcapLimit = 10 ** 23;
        uniswapV2Router = IUniswapV2Router02(router);
        tokenFactory = tokenFactoryAddress;
    }

    function setTokenFactory(address _tokenFactory) external onlyOwner {
        require(_tokenFactory != address(0), "Non zero Address");
        tokenFactory = _tokenFactory;
    }

    function createPool(address token, uint256 amount, address tokenOwnerAddress) public payable {
        require(msg.sender == tokenFactory, "Only TokenFactory can call");
        require(amount > 0, "CreatePool: Larger than Zero");
        require(feeRecipient != address(0), "CreatePool: Non Zero Address");
        require(msg.value >= createFee, "CreatePool: Value Amount");

        ERC20Burnable(token).transferFrom(msg.sender, address(this), amount);

        payable(feeRecipient).transfer(createFee);

        bondingCurve[token] = Token({
            tokenMint: token,
            virtualTokenReserves: initialVirtualTokenReserves,
            virtualEthReserves: initialVirtualEthReserves,
            realTokenReserves: amount,
            realEthReserves: 0,
            tokenTotalSupply: tokenTotalSupply,
            mcapLimit: mcapLimit,
            tokenOwner: tokenOwnerAddress,
            complete: false,
            uniswapV2Pair: address(0)
        });

        emit CreatePool(token, tokenOwnerAddress, initialVirtualTokenReserves, initialVirtualEthReserves);
    }

    function buy(address token, uint256 amount, uint256 maxEthCost) public payable nonReentrant {
        Token storage tokenCurve = bondingCurve[token];
        require(amount > 0, "Should Larger than zero");
        require(tokenCurve.complete == false, "Should Not Completed");

        uint256 featureAmount = tokenCurve.realTokenReserves - amount;
        uint256 featurePercentage = featureAmount * 100 / tokenCurve.tokenTotalSupply;
        require(featurePercentage >= 19, "Buy Amount Over");

        uint256 ethCost = calculateEthCost(tokenCurve, amount);

        require(ethCost <= maxEthCost, "Max Eth Cost");

        uint256 feeAmount = feeBasisPoint * ethCost / 10000;
        uint256 ethAmount = ethCost - feeAmount;

        require(msg.value >= ethCost, "Exceed ETH Cost");

        payable(feeRecipient).transfer(feeAmount);

        ERC20Burnable(token).transfer(msg.sender, amount);

        tokenCurve.realTokenReserves -= amount;
        tokenCurve.virtualTokenReserves -= amount;
        tokenCurve.virtualEthReserves += ethAmount;
        tokenCurve.realEthReserves += ethAmount;

        uint256 mcap = tokenCurve.virtualEthReserves * tokenCurve.tokenTotalSupply / tokenCurve.realTokenReserves;
        uint256 percentage = tokenCurve.realTokenReserves * 100 / tokenCurve.tokenTotalSupply;

        if (mcap > tokenCurve.mcapLimit || percentage < 20) {
            tokenCurve.complete = true;
            emit Complete(tokenCurve.tokenOwner, token, block.timestamp);
        }

        emit Trade(
            token,
            ethCost,
            amount,
            true,
            msg.sender,
            block.timestamp,
            tokenCurve.virtualEthReserves,
            tokenCurve.virtualTokenReserves
        );
    }

    function sell(address token, uint256 amount, uint256 minEthOutput) public nonReentrant {
        Token storage tokenCurve = bondingCurve[token];
        require(tokenCurve.complete == false, "Should Not Completed");
        require(amount > 0, "Should Larger than zero");

        uint256 ethCost = calculateEthCost(tokenCurve, amount);
        if (tokenCurve.realEthReserves < ethCost) {
            ethCost = tokenCurve.realEthReserves;
        }

        require(ethCost >= minEthOutput, "Should Be Larger than Min");

        uint256 feeAmount = feeBasisPoint * ethCost / 10000;

        payable(feeRecipient).transfer(feeAmount);
        payable(msg.sender).transfer(ethCost - feeAmount);

        ERC20Burnable(token).transferFrom(msg.sender, address(this), amount);

        tokenCurve.realTokenReserves += amount;
        tokenCurve.virtualTokenReserves += amount;
        tokenCurve.virtualEthReserves -= ethCost;
        tokenCurve.realEthReserves -= ethCost;

        emit Trade(
            token,
            ethCost,
            amount,
            false,
            msg.sender,
            block.timestamp,
            tokenCurve.virtualEthReserves,
            tokenCurve.virtualTokenReserves
        );
    }

    function _approval(address _user, address _token, uint256 amount) private returns (bool) {
        require(_user != address(0), "Zero addresses are not allowed.");
        require(_token != address(0), "Zero addresses are not allowed.");

        ERC20Burnable token_ = ERC20Burnable(_token);

        token_.approve(_user, amount);

        return true;
    }

    function openTradingOnUniswap(address token) public nonReentrant {
        Token storage tokenCurve = bondingCurve[token];
        require(tokenCurve.complete == true, "Token not completed");
        require(tokenCurve.uniswapV2Pair == address(0), "Pair already created");

        bool approved = _approval(address(uniswapV2Router), address(token), tokenCurve.realTokenReserves);
        require(approved);

        address uniswapV2Pair = IUniswapV2Factory(uniswapV2Router.factory()).createPair(token, uniswapV2Router.WETH());

        uint256 burnAmount = tokenCurve.realTokenReserves * 19 / 100;

        ERC20Burnable(token).burn(burnAmount);

        tokenCurve.realTokenReserves -= burnAmount;
        tokenCurve.virtualTokenReserves -= burnAmount;

        uniswapV2Router.addLiquidityETH{value: tokenCurve.realEthReserves}(
            token, tokenCurve.realTokenReserves, 0, 0, address(this), block.timestamp
        );

        ERC20Burnable lpToken = ERC20Burnable(uniswapV2Pair);
        uint256 totalLP = lpToken.balanceOf(address(this));
        lpToken.transfer(tokenCurve.tokenOwner, totalLP * 80 / 100); // 80% to creator
        lpToken.transfer(feeRecipient, totalLP * 20 / 100); // 20% to protocol

        ERC20Burnable(uniswapV2Pair).approve(address(uniswapV2Router), type(uint256).max);
        emit OpenTradingOnUniswap(
            token, uniswapV2Pair, tokenCurve.realEthReserves, tokenCurve.realTokenReserves, block.timestamp
        );

        tokenCurve.realEthReserves = 0;
        tokenCurve.realTokenReserves = 0;
        tokenCurve.virtualEthReserves = 0;
        tokenCurve.virtualTokenReserves = 0;
        tokenCurve.uniswapV2Pair = uniswapV2Pair;
        tokenCurve.tokenOwner = address(0);
    }

    function calculateEthCost(Token memory token, uint256 tokenAmount) public pure returns (uint256) {
        uint256 virtualTokenReserves = token.virtualTokenReserves;
        require(tokenAmount < virtualTokenReserves, "Token amount too large");
        uint256 pricePerToken = virtualTokenReserves - tokenAmount;
        require(pricePerToken > 0, "Price would be zero");
        uint256 totalLiquidity = token.virtualEthReserves * token.virtualTokenReserves;
        uint256 newEthReserves = totalLiquidity / pricePerToken;
        uint256 ethCost = newEthReserves - token.virtualEthReserves;

        return ethCost;
    }

    function setFeeRecipient(address newAddr) external onlyOwner {
        require(newAddr != address(0), "Non zero Address");

        feeRecipient = newAddr;
    }

    function setOwner(address newAddr) external onlyOwner {
        require(newAddr != address(0), "Non zero Address");

        owner = newAddr;
    }

    function setInitialVirtualReserves(uint256 initToken, uint256 initEth) external onlyOwner {
        require(initEth > 0 && initToken > 0, "Should Larger than zero");

        initialVirtualTokenReserves = initToken;
        initialVirtualEthReserves = initEth;
    }

    function setTotalSupply(uint256 newSupply) external onlyOwner {
        require(newSupply > 0, "Should Larger than zero");

        tokenTotalSupply = newSupply;
    }

    function setMcapLimit(uint256 newLimit) external onlyOwner {
        require(newLimit > 0, "Should Larger than zero");

        mcapLimit = newLimit;
    }

    function setFeeAmount(uint256 newBasisPoint, uint256 newCreateFee) external onlyOwner {
        require(newBasisPoint > 0 && newCreateFee > 0, "Should Larger than zero");

        feeBasisPoint = newBasisPoint;
        createFee = newCreateFee;
    }

    function getCreateFee() external view returns (uint256) {
        return createFee;
    }

    function getBondingCurve(address mint) external view returns (Token memory) {
        return bondingCurve[mint];
    }
}
