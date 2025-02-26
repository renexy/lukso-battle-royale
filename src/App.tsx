import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { ethers, JsonRpcProvider } from "ethers";
import abi from "../artifacts/contracts/ama.sol/SimpleAMA.json";
import { createClientUPProvider } from "@lukso/up-provider";
import { createWalletClient, custom } from "viem";
import { lukso } from "viem/chains";
import Web3 from "web3";
import { useUpProvider } from "./services/providers/UPProvider";

const LUKSO_RPC_URL = "https://rpc.testnet.lukso.network";

function App() {
  const { accounts, contextAccounts, ready, provider } = useUpProvider();
  const [deployedAddress, setDeployedAddress] = useState<string>(
    "0x8dAE7E31048b29bE7f6e08384A4B8326c5b4520B"
  );
  // const [provider, setProvider] = useState<JsonRpcProvider | null>(null);

  const claimToken = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const web3 = new Web3(provider)

      const contract = new web3.eth.Contract(abi.abi, "0x8dAE7E31048b29bE7f6e08384A4B8326c5b4520B")

    const tx = await contract.methods.claimFreeToken().send({ from: accounts[0] });
      console.log(tx ,'lol')
    } catch (error) {
      console.error("Error claiming free token:", error);
    }
  };

  // useEffect(() => {
  //   const provider = new ethers.JsonRpcProvider(LUKSO_RPC_URL);
  //   setProvider(provider);
  // }, []);

  // useEffect(() => {
  //   const initializeContract = async () => {
  //     if (!provider || !deployedAddress || !ready) return;
  //     try {
  //       console.log("Initializing contract with address:", deployedAddress, provider);
  //       const amaContract = new ethers.Contract(
  //         deployedAddress,
  //         abi.abi,
  //         provider.getSigner()
  //       );

  //       const x = await amaContract.claimFreeToken();

  //       console.log(x, 'lol!');

  //       // abi.submitQuestion()...
  //     } catch (error) {
  //       console.error("Error initializing contract:", error);
  //     }
  //   };

  //   initializeContract();
  // }, [ready, accounts, provider, deployedAddress]);



  // const claimFreeToken = async () => {
  //   try {
  //     setLoading(true);
  //     if (contract && upProvider) {
  //       // Encode function call (e.g., claimFreeToken with no parameters)
  //       const data = contract.interface.encodeFunctionData(
  //         "claimFreeToken",
  //         []
  //       );

  //       // Send transaction using `eth_sendTransaction` method
  //       const tx = await upProvider.request({
  //         method: "eth_sendTransaction",
  //         params: [
  //           {
  //             from: accounts![0], // Make sure the account is connected
  //             to: deployedAddress, // The deployed contract address
  //             data: data, // Encoded function call
  //           },
  //         ],
  //       });

  //       const receipt = await upProvider.request({
  //         method: "eth_getTransactionReceipt",
  //         params: [tx],
  //       });
  //       console.log(receipt);

  //       // Wait for the transaction to be mined

  //       setHasToken(true); // Assuming you update state to show the token is claimed
  //     }
  //   } catch (error) {
  //     console.error("Error claiming token:", error);
  //   } finally {
  //     setLoading(false); // Stop the loading indicator
  //   }
  // };

  if (!ready) {
    return (
      <div className="flex flex-col h-full w-full gap-[14px] bg-white p-[0.2rem] overflow-y-auto h-screen col-content justify-center items-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  // if (
  //   contextAccounts &&
  //   contextAccounts.length > 0 &&
  //   accounts &&
  //   accounts.length > 0 &&
  //   contextAccounts[0].toLowerCase() === accounts[0].toLowerCase()
  // ) {
  //   return (
  //     <div className="flex flex-col h-full w-full gap-[14px] bg-white p-[0.2rem] overflow-y-auto h-screen col-content justify-center items-center">
  //       yo
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col h-full w-full gap-[14px] bg-white p-[0.2rem] overflow-y-auto h-screen">
      <button onClick={claimToken}>test</button>
    </div>
  );
}

export default App;
