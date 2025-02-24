import { SupportedChainIds } from "../ponder.config";

export const getChainId = (network: string | number): SupportedChainIds => {
  return Number(network) as SupportedChainIds;
};
