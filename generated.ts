import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from "@wagmi/core/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC1155InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC1155InvalidApprover",
  },
  {
    type: "error",
    inputs: [
      { name: "idsLength", internalType: "uint256", type: "uint256" },
      { name: "valuesLength", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC1155InvalidArrayLength",
  },
  {
    type: "error",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "ERC1155InvalidOperator",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC1155InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC1155InvalidSender",
  },
  {
    type: "error",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC1155MissingApprovalForAll",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20Abi = [
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC721IncorrectOwner",
  },
  {
    type: "error",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC721InsufficientApproval",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC721InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "ERC721InvalidOperator",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "ERC721InvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC721InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC721InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "ERC721NonexistentToken",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPumpFun
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPumpFunAbi = [
  {
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "createPool",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [],
    name: "getCreateFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IUniswapV2Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iUniswapV2FactoryAbi = [
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
    ],
    name: "createPair",
    outputs: [{ name: "pair", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IUniswapV2Router02
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iUniswapV2Router02Abi = [
  {
    type: "function",
    inputs: [],
    name: "WETH",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "amountTokenDesired", internalType: "uint256", type: "uint256" },
      { name: "amountTokenMin", internalType: "uint256", type: "uint256" },
      { name: "amountETHMin", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "addLiquidityETH",
    outputs: [
      { name: "amountToken", internalType: "uint256", type: "uint256" },
      { name: "amountETH", internalType: "uint256", type: "uint256" },
      { name: "liquidity", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [],
    name: "factory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "amountOutMin", internalType: "uint256", type: "uint256" },
      { name: "path", internalType: "address[]", type: "address[]" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lockAbi = [
  {
    type: "constructor",
    inputs: [{ name: "_unlockTime", internalType: "uint256", type: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "when",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Withdrawal",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address payable", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "unlockTime",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PumpFun
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const pumpFunAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "newAddr", internalType: "address", type: "address" },
      { name: "feeAmt", internalType: "uint256", type: "uint256" },
      { name: "basisFee", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      { name: "mint", internalType: "address", type: "address", indexed: true },
      {
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Complete",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "mint", internalType: "address", type: "address", indexed: true },
      { name: "user", internalType: "address", type: "address", indexed: true },
    ],
    name: "CreatePool",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "mint", internalType: "address", type: "address", indexed: true },
      {
        name: "ethAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "tokenAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "isBuy", internalType: "bool", type: "bool", indexed: false },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "virtualEthReserves",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "virtualTokenReserves",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Trade",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "bondingCurve",
    outputs: [
      { name: "tokenMint", internalType: "address", type: "address" },
      {
        name: "virtualTokenReserves",
        internalType: "uint256",
        type: "uint256",
      },
      { name: "virtualEthReserves", internalType: "uint256", type: "uint256" },
      { name: "realTokenReserves", internalType: "uint256", type: "uint256" },
      { name: "realEthReserves", internalType: "uint256", type: "uint256" },
      { name: "tokenTotalSupply", internalType: "uint256", type: "uint256" },
      { name: "mcapLimit", internalType: "uint256", type: "uint256" },
      { name: "complete", internalType: "bool", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "maxEthCost", internalType: "uint256", type: "uint256" },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "struct PumpFun.Token",
        type: "tuple",
        components: [
          { name: "tokenMint", internalType: "address", type: "address" },
          {
            name: "virtualTokenReserves",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "virtualEthReserves",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "realTokenReserves",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "realEthReserves", internalType: "uint256", type: "uint256" },
          {
            name: "tokenTotalSupply",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "mcapLimit", internalType: "uint256", type: "uint256" },
          { name: "complete", internalType: "bool", type: "bool" },
        ],
      },
      { name: "tokenAmount", internalType: "uint256", type: "uint256" },
    ],
    name: "calculateEthCost",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "createPool",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "mint", internalType: "address", type: "address" }],
    name: "getBondingCurve",
    outputs: [
      {
        name: "",
        internalType: "struct PumpFun.Token",
        type: "tuple",
        components: [
          { name: "tokenMint", internalType: "address", type: "address" },
          {
            name: "virtualTokenReserves",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "virtualEthReserves",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "realTokenReserves",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "realEthReserves", internalType: "uint256", type: "uint256" },
          {
            name: "tokenTotalSupply",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "mcapLimit", internalType: "uint256", type: "uint256" },
          { name: "complete", internalType: "bool", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCreateFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "minEthOutput", internalType: "uint256", type: "uint256" },
    ],
    name: "sell",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "newBasisPoint", internalType: "uint256", type: "uint256" },
      { name: "newCreateFee", internalType: "uint256", type: "uint256" },
    ],
    name: "setFeeAmount",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newAddr", internalType: "address", type: "address" }],
    name: "setFeeRecipient",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "initToken", internalType: "uint256", type: "uint256" },
      { name: "initEth", internalType: "uint256", type: "uint256" },
    ],
    name: "setInitialVirtualReserves",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newLimit", internalType: "uint256", type: "uint256" }],
    name: "setMcapLimit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newAddr", internalType: "address", type: "address" }],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newSupply", internalType: "uint256", type: "uint256" }],
    name: "setTotalSupply",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
] as const;

/**
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const pumpFunAddress = {
  10143: "0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c",
} as const;

/**
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const pumpFunConfig = {
  address: pumpFunAddress,
  abi: pumpFunAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReentrancyGuard
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reentrancyGuardAbi = [
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "tokenName_", internalType: "string", type: "string" },
      { name: "tokenSymbol_", internalType: "string", type: "string" },
      { name: "initialSupply", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenFactoryAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    inputs: [],
    name: "INITIAL_AMOUNT",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "contractAddress",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "currentTokenIndex",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "name", internalType: "string", type: "string" },
      { name: "ticker", internalType: "string", type: "string" },
    ],
    name: "deployERC20Token",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "newAddr", internalType: "address", type: "address" }],
    name: "setPoolAddress",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "taxAddress",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "tokens",
    outputs: [
      { name: "tokenAddress", internalType: "address", type: "address" },
      { name: "tokenName", internalType: "string", type: "string" },
      { name: "tokenSymbol", internalType: "string", type: "string" },
      { name: "totalSupply", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const readErc20Allowance = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const readErc20Decimals = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "decimals",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const readErc20Name = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const readErc20Symbol = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readErc20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const writeErc20Approve = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeErc20Transfer = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeErc20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const simulateErc20 = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateErc20Approve = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateErc20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: "transfer",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateErc20TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchErc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: "Approval",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchErc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: "Transfer",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const readIerc20 = /*#__PURE__*/ createReadContract({ abi: ierc20Abi });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"allowance"`
 */
export const readIerc20Allowance = /*#__PURE__*/ createReadContract({
  abi: ierc20Abi,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: ierc20Abi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readIerc20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: ierc20Abi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const writeIerc20 = /*#__PURE__*/ createWriteContract({
  abi: ierc20Abi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const writeIerc20Approve = /*#__PURE__*/ createWriteContract({
  abi: ierc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeIerc20Transfer = /*#__PURE__*/ createWriteContract({
  abi: ierc20Abi,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeIerc20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc20Abi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const simulateIerc20 = /*#__PURE__*/ createSimulateContract({
  abi: ierc20Abi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateIerc20Approve = /*#__PURE__*/ createSimulateContract({
  abi: ierc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateIerc20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: ierc20Abi,
  functionName: "transfer",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateIerc20TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc20Abi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20Abi}__
 */
export const watchIerc20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc20Abi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchIerc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc20Abi,
  eventName: "Approval",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchIerc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc20Abi,
  eventName: "Transfer",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const readIerc20Metadata = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const readIerc20MetadataAllowance = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc20MetadataBalanceOf = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const readIerc20MetadataDecimals = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: "decimals",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const readIerc20MetadataName = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const readIerc20MetadataSymbol = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readIerc20MetadataTotalSupply = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const writeIerc20Metadata = /*#__PURE__*/ createWriteContract({
  abi: ierc20MetadataAbi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const writeIerc20MetadataApprove = /*#__PURE__*/ createWriteContract({
  abi: ierc20MetadataAbi,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const writeIerc20MetadataTransfer = /*#__PURE__*/ createWriteContract({
  abi: ierc20MetadataAbi,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeIerc20MetadataTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: ierc20MetadataAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const simulateIerc20Metadata = /*#__PURE__*/ createSimulateContract({
  abi: ierc20MetadataAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const simulateIerc20MetadataApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: "approve",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateIerc20MetadataTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: "transfer",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const watchIerc20MetadataEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc20MetadataAbi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const watchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: "Approval",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iPumpFunAbi}__
 */
export const readIPumpFun = /*#__PURE__*/ createReadContract({
  abi: iPumpFunAbi,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iPumpFunAbi}__ and `functionName` set to `"getCreateFee"`
 */
export const readIPumpFunGetCreateFee = /*#__PURE__*/ createReadContract({
  abi: iPumpFunAbi,
  functionName: "getCreateFee",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iPumpFunAbi}__
 */
export const writeIPumpFun = /*#__PURE__*/ createWriteContract({
  abi: iPumpFunAbi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iPumpFunAbi}__ and `functionName` set to `"createPool"`
 */
export const writeIPumpFunCreatePool = /*#__PURE__*/ createWriteContract({
  abi: iPumpFunAbi,
  functionName: "createPool",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iPumpFunAbi}__
 */
export const simulateIPumpFun = /*#__PURE__*/ createSimulateContract({
  abi: iPumpFunAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iPumpFunAbi}__ and `functionName` set to `"createPool"`
 */
export const simulateIPumpFunCreatePool = /*#__PURE__*/ createSimulateContract({
  abi: iPumpFunAbi,
  functionName: "createPool",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iUniswapV2FactoryAbi}__
 */
export const writeIUniswapV2Factory = /*#__PURE__*/ createWriteContract({
  abi: iUniswapV2FactoryAbi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iUniswapV2FactoryAbi}__ and `functionName` set to `"createPair"`
 */
export const writeIUniswapV2FactoryCreatePair =
  /*#__PURE__*/ createWriteContract({
    abi: iUniswapV2FactoryAbi,
    functionName: "createPair",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iUniswapV2FactoryAbi}__
 */
export const simulateIUniswapV2Factory = /*#__PURE__*/ createSimulateContract({
  abi: iUniswapV2FactoryAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iUniswapV2FactoryAbi}__ and `functionName` set to `"createPair"`
 */
export const simulateIUniswapV2FactoryCreatePair =
  /*#__PURE__*/ createSimulateContract({
    abi: iUniswapV2FactoryAbi,
    functionName: "createPair",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iUniswapV2Router02Abi}__
 */
export const readIUniswapV2Router02 = /*#__PURE__*/ createReadContract({
  abi: iUniswapV2Router02Abi,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iUniswapV2Router02Abi}__ and `functionName` set to `"WETH"`
 */
export const readIUniswapV2Router02Weth = /*#__PURE__*/ createReadContract({
  abi: iUniswapV2Router02Abi,
  functionName: "WETH",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iUniswapV2Router02Abi}__ and `functionName` set to `"factory"`
 */
export const readIUniswapV2Router02Factory = /*#__PURE__*/ createReadContract({
  abi: iUniswapV2Router02Abi,
  functionName: "factory",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iUniswapV2Router02Abi}__
 */
export const writeIUniswapV2Router02 = /*#__PURE__*/ createWriteContract({
  abi: iUniswapV2Router02Abi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iUniswapV2Router02Abi}__ and `functionName` set to `"addLiquidityETH"`
 */
export const writeIUniswapV2Router02AddLiquidityEth =
  /*#__PURE__*/ createWriteContract({
    abi: iUniswapV2Router02Abi,
    functionName: "addLiquidityETH",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iUniswapV2Router02Abi}__ and `functionName` set to `"swapExactTokensForETHSupportingFeeOnTransferTokens"`
 */
export const writeIUniswapV2Router02SwapExactTokensForEthSupportingFeeOnTransferTokens =
  /*#__PURE__*/ createWriteContract({
    abi: iUniswapV2Router02Abi,
    functionName: "swapExactTokensForETHSupportingFeeOnTransferTokens",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iUniswapV2Router02Abi}__
 */
export const simulateIUniswapV2Router02 = /*#__PURE__*/ createSimulateContract({
  abi: iUniswapV2Router02Abi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iUniswapV2Router02Abi}__ and `functionName` set to `"addLiquidityETH"`
 */
export const simulateIUniswapV2Router02AddLiquidityEth =
  /*#__PURE__*/ createSimulateContract({
    abi: iUniswapV2Router02Abi,
    functionName: "addLiquidityETH",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iUniswapV2Router02Abi}__ and `functionName` set to `"swapExactTokensForETHSupportingFeeOnTransferTokens"`
 */
export const simulateIUniswapV2Router02SwapExactTokensForEthSupportingFeeOnTransferTokens =
  /*#__PURE__*/ createSimulateContract({
    abi: iUniswapV2Router02Abi,
    functionName: "swapExactTokensForETHSupportingFeeOnTransferTokens",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link lockAbi}__
 */
export const readLock = /*#__PURE__*/ createReadContract({ abi: lockAbi });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"owner"`
 */
export const readLockOwner = /*#__PURE__*/ createReadContract({
  abi: lockAbi,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"unlockTime"`
 */
export const readLockUnlockTime = /*#__PURE__*/ createReadContract({
  abi: lockAbi,
  functionName: "unlockTime",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link lockAbi}__
 */
export const writeLock = /*#__PURE__*/ createWriteContract({ abi: lockAbi });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeLockWithdraw = /*#__PURE__*/ createWriteContract({
  abi: lockAbi,
  functionName: "withdraw",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link lockAbi}__
 */
export const simulateLock = /*#__PURE__*/ createSimulateContract({
  abi: lockAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateLockWithdraw = /*#__PURE__*/ createSimulateContract({
  abi: lockAbi,
  functionName: "withdraw",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link lockAbi}__
 */
export const watchLockEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: lockAbi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link lockAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const watchLockWithdrawalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: lockAbi,
  eventName: "Withdrawal",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pumpFunAbi}__
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const readPumpFun = /*#__PURE__*/ createReadContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"bondingCurve"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const readPumpFunBondingCurve = /*#__PURE__*/ createReadContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "bondingCurve",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"calculateEthCost"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const readPumpFunCalculateEthCost = /*#__PURE__*/ createReadContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "calculateEthCost",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"getBondingCurve"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const readPumpFunGetBondingCurve = /*#__PURE__*/ createReadContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "getBondingCurve",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"getCreateFee"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const readPumpFunGetCreateFee = /*#__PURE__*/ createReadContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "getCreateFee",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFun = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunBuy = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "buy",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"createPool"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunCreatePool = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "createPool",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"sell"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunSell = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "sell",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setFeeAmount"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunSetFeeAmount = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "setFeeAmount",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setFeeRecipient"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunSetFeeRecipient = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "setFeeRecipient",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setInitialVirtualReserves"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunSetInitialVirtualReserves =
  /*#__PURE__*/ createWriteContract({
    abi: pumpFunAbi,
    address: pumpFunAddress,
    functionName: "setInitialVirtualReserves",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setMcapLimit"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunSetMcapLimit = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "setMcapLimit",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setOwner"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunSetOwner = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "setOwner",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setTotalSupply"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunSetTotalSupply = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "setTotalSupply",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const writePumpFunWithdraw = /*#__PURE__*/ createWriteContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "withdraw",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFun = /*#__PURE__*/ createSimulateContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunBuy = /*#__PURE__*/ createSimulateContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "buy",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"createPool"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunCreatePool = /*#__PURE__*/ createSimulateContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "createPool",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"sell"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunSell = /*#__PURE__*/ createSimulateContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "sell",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setFeeAmount"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunSetFeeAmount = /*#__PURE__*/ createSimulateContract(
  { abi: pumpFunAbi, address: pumpFunAddress, functionName: "setFeeAmount" }
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setFeeRecipient"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunSetFeeRecipient =
  /*#__PURE__*/ createSimulateContract({
    abi: pumpFunAbi,
    address: pumpFunAddress,
    functionName: "setFeeRecipient",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setInitialVirtualReserves"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunSetInitialVirtualReserves =
  /*#__PURE__*/ createSimulateContract({
    abi: pumpFunAbi,
    address: pumpFunAddress,
    functionName: "setInitialVirtualReserves",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setMcapLimit"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunSetMcapLimit = /*#__PURE__*/ createSimulateContract(
  { abi: pumpFunAbi, address: pumpFunAddress, functionName: "setMcapLimit" }
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setOwner"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunSetOwner = /*#__PURE__*/ createSimulateContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "setOwner",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"setTotalSupply"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunSetTotalSupply =
  /*#__PURE__*/ createSimulateContract({
    abi: pumpFunAbi,
    address: pumpFunAddress,
    functionName: "setTotalSupply",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pumpFunAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const simulatePumpFunWithdraw = /*#__PURE__*/ createSimulateContract({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  functionName: "withdraw",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pumpFunAbi}__
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const watchPumpFunEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pumpFunAbi,
  address: pumpFunAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pumpFunAbi}__ and `eventName` set to `"Complete"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const watchPumpFunCompleteEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: pumpFunAbi, address: pumpFunAddress, eventName: "Complete" }
);

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pumpFunAbi}__ and `eventName` set to `"CreatePool"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const watchPumpFunCreatePoolEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pumpFunAbi,
    address: pumpFunAddress,
    eventName: "CreatePool",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pumpFunAbi}__ and `eventName` set to `"Trade"`
 *
 * [__View Contract on Monad Testnet Monad Testnet Explorer__](https://testnet.monadexplorer.com/address/0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c)
 */
export const watchPumpFunTradeEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pumpFunAbi,
  address: pumpFunAddress,
  eventName: "Trade",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__
 */
export const readToken = /*#__PURE__*/ createReadContract({ abi: tokenAbi });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"allowance"`
 */
export const readTokenAllowance = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readTokenBalanceOf = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"decimals"`
 */
export const readTokenDecimals = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  functionName: "decimals",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"name"`
 */
export const readTokenName = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"symbol"`
 */
export const readTokenSymbol = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readTokenTotalSupply = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__
 */
export const writeToken = /*#__PURE__*/ createWriteContract({ abi: tokenAbi });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 */
export const writeTokenApprove = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 */
export const writeTokenTransfer = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeTokenTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__
 */
export const simulateToken = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 */
export const simulateTokenApprove = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateTokenTransfer = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  functionName: "transfer",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateTokenTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__
 */
export const watchTokenEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Approval"`
 */
export const watchTokenApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  eventName: "Approval",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchTokenTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  eventName: "Transfer",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenFactoryAbi}__
 */
export const readTokenFactory = /*#__PURE__*/ createReadContract({
  abi: tokenFactoryAbi,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"INITIAL_AMOUNT"`
 */
export const readTokenFactoryInitialAmount = /*#__PURE__*/ createReadContract({
  abi: tokenFactoryAbi,
  functionName: "INITIAL_AMOUNT",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"contractAddress"`
 */
export const readTokenFactoryContractAddress = /*#__PURE__*/ createReadContract(
  { abi: tokenFactoryAbi, functionName: "contractAddress" }
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"currentTokenIndex"`
 */
export const readTokenFactoryCurrentTokenIndex =
  /*#__PURE__*/ createReadContract({
    abi: tokenFactoryAbi,
    functionName: "currentTokenIndex",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"taxAddress"`
 */
export const readTokenFactoryTaxAddress = /*#__PURE__*/ createReadContract({
  abi: tokenFactoryAbi,
  functionName: "taxAddress",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"tokens"`
 */
export const readTokenFactoryTokens = /*#__PURE__*/ createReadContract({
  abi: tokenFactoryAbi,
  functionName: "tokens",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenFactoryAbi}__
 */
export const writeTokenFactory = /*#__PURE__*/ createWriteContract({
  abi: tokenFactoryAbi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"deployERC20Token"`
 */
export const writeTokenFactoryDeployErc20Token =
  /*#__PURE__*/ createWriteContract({
    abi: tokenFactoryAbi,
    functionName: "deployERC20Token",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"setPoolAddress"`
 */
export const writeTokenFactorySetPoolAddress =
  /*#__PURE__*/ createWriteContract({
    abi: tokenFactoryAbi,
    functionName: "setPoolAddress",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__
 */
export const simulateTokenFactory = /*#__PURE__*/ createSimulateContract({
  abi: tokenFactoryAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"deployERC20Token"`
 */
export const simulateTokenFactoryDeployErc20Token =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenFactoryAbi,
    functionName: "deployERC20Token",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"setPoolAddress"`
 */
export const simulateTokenFactorySetPoolAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenFactoryAbi,
    functionName: "setPoolAddress",
  });
