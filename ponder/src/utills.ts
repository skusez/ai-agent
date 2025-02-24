import { SupportedChainIds } from "../ponder.config";

/**
 * @dev assert the chain id from the network name or id
 */
export const getChainId = (network: string | number): SupportedChainIds => {
  return Number(network) as SupportedChainIds;
};
