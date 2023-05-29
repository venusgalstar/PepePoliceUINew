import { EthereumClient, modalConnectors } from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  useAccount
} from "wagmi";
// import of modules and CSS
import { ReadContract, WriteContract } from "./ContractInteraction";
import "./styles.css";

// initialize potential selectable chains and RPC provider (Alchemy)
const { chains, provider } = configureChains(
  [chain.goerli], //chain.polygon, chain.optimism, chain.arbitrum
  [
    alchemyProvider({ apiKey: "e99EO3onEoE6GYew6laAoBV2edUVrUGC" }),
    publicProvider()
  ]
);

// initialize Wagmi client
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// module for walletconnect button
function HomePage() {
  return (
    <div className="centerDiv">
      aadfadsfe
      <div></div>

      <Web3Button />
    </div>
  );
}

/* 


/* module to display if connection to wallett is sucessfull */
function Profile() {
  const { address, isConnected } = useAccount();

  if (isConnected) {
    return (
      <div>
        <br />
        <div className="centerDiv"> {`Your address in Web3: ${address}`}</div>
        <br />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div>
        <br />
        <div className="centerDiv">
          <h5> Not connected yet. </h5>
        </div>
      </div>
    );
  }
}

/*  module is exported and can be called in index.js;
    Web3Modal has an ID for connection;
    Web3 modules need to be embedded in </WagmiConfig>;
*/
export function WalletButton() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <HomePage />
        <Profile />
        <WriteContract />
        <br />
        <ReadContract />
      </WagmiConfig>

      <Web3Modal
        projectId="b78bcf0d0203ccd5ed695d04220985e4"
        theme="dark"
        accentColor="purple"
        ethereumClient={ethereumClient}
      />
    </>
  );
}
