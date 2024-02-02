//@ts-nocheck
import { createConfig, http } from "wagmi";
import { goerli } from "wagmi/chains";

export const SMART_CONTRACT_ADDRESS =
  "0x65a5ba240CBd7fD75700836b683ba95EBb2F32bd";
export const config = createConfig({
  chains: [goerli],
  transports: {
    [goerli.id]: http(),
  },
});
