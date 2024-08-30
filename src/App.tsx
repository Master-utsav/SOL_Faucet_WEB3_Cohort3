import { useMemo } from "react";
import SOLFaucet from "./components/SOLFaucet";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider} from "@solana/wallet-adapter-react-ui";
// import { WalletDisconnectButton, WalletMultiButton }from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";


function App () {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <section className="w-full bg-gray-800">
            <SOLFaucet />
          </section>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
