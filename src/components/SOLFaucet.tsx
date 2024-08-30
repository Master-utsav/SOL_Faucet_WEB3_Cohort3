import React, { useState, useEffect } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

// import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import "@solana/wallet-adapter-react-ui/styles.css";

const SOLFaucet: React.FC = () => {
  const [airdropAmount, setAirdropAmount] = useState<number>(1);
  const [accountAddress, setAccountAddress] = useState<string>("");
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.publicKey) {
      setAccountAddress(wallet.publicKey.toString());
    }
  }, [wallet.publicKey]);

  const handleAirdropAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAirdropAmount(Number(event.target.value));
  };

  const handleAirdrop = async (network: "Testnet" | "Devnet") => {
    if (!wallet.publicKey) throw new WalletNotConnectedError();

    try {
      const networkUrl =
        network === "Testnet"
          ? clusterApiUrl("testnet")
          : clusterApiUrl("devnet");
      const connection = new Connection(networkUrl, "confirmed");
      const publicKey = new PublicKey(accountAddress);

      console.log(
        `Requesting airdrop of ${airdropAmount} SOL to ${accountAddress} on ${network}...`
      );

      const signature = await connection.requestAirdrop(
        publicKey,
        airdropAmount * 10 ** 9
      ); // 1 SOL = 10**9 lamports
      await connection.confirmTransaction(signature, "confirmed");

      console.log(`Airdrop successful! Transaction signature: ${signature}`);
    } catch (error) {
      console.error("Airdrop failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">🪙 Sol Faucet 🪙</h1>
      <p className="text-lg mb-2">
        The premium faucet for Solana Devnet and Testnet.
      </p>
      <p className="text-red-500 font-bold mb-6">
        This tool does <strong>*NOT*</strong> give real $SOL or Solana tokens.
      </p>
      <div className="flex justify-center items-center gap-3 sm:flex-row flex-col mb-2">
        <WalletMultiButton className="mb-4" />
        <WalletDisconnectButton className="mb-4" />
      </div>
     

      <input
        type="text"
        placeholder="Enter Solana account address..."
        value={accountAddress}
        onChange={(e) => setAccountAddress(e.target.value)}
        className="w-2/3 md:w-1/2 p-3 rounded-md text-black mb-4"
        readOnly
      />

      <div className="flex items-center space-x-4 mb-6">
        <input
          type="number"
          value={airdropAmount}
          onChange={handleAirdropAmountChange}
          className="w-20 p-3 rounded-md text-black"
        />
        <span>SOL to</span>
        <button
          onClick={() => handleAirdrop("Testnet")}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
          TESTNET
        </button>
        <button
          onClick={() => handleAirdrop("Devnet")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          DEVNET
        </button>
      </div>

      <p className="text-center max-w-xl">
        Why does this exist? Because it's{" "}
        <span className="text-yellow-500 font-bold">
          WEB3-Chorot-Assignment!!
        </span>
        <br />I kept wanting to try out all the <em>awesome new projects</em>{" "}
        coming out on the Solana blockchain web3 course, but I had no way to
        easily fund my testnet wallet. Enter{" "}
        <span className="font-bold">SolFaucet</span>! With the click of a
        button, fund your testnet or devnet wallet and join the fun in the{" "}
        <span className="font-bold text-yellow-500">SOL</span>!
      </p>
    </div>
  );
};

export default SOLFaucet;
