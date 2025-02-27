import { createPublicClient, custom, decodeFunctionResult, encodeFunctionData } from "viem";
import { luksoTestnet } from "viem/chains";
import abi from "../../../artifacts/contracts/ama.sol/SimpleAMA.json";


const contractAddress = import.meta.env.VITE_LUKSO_CONTRACT_ADDRESS;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasSubmittedQuestion = async (provider: any, account: any) => {
  try {
    const client = createPublicClient({
      chain: luksoTestnet, 
      transport: custom(provider),
    });

    const data = encodeFunctionData({
      abi: abi.abi,
      functionName: 'hasSubmittedQuestion',
      args: [account],
    });
    
    const result = await client.call({
      to: contractAddress as `0x${string}`,
      data: data,
    });

    const decodedResult = decodeFunctionResult({
      abi: abi.abi,
      functionName: 'hasSubmittedQuestion',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: (result.data as any).result as `0x${string}`
    });

    return decodedResult
  } catch (error) {
    console.error("Error fetching public questions:", error);
    return true
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchPublicQuestions = async (provider: any) => {
  try {
    const client = createPublicClient({
      chain: luksoTestnet,
      transport: custom(provider),
    });

    const data = encodeFunctionData({
      abi: abi.abi,
      functionName: 'getAllQuestions',
      args: [],
    });
    
    const result = await client.call({
      to: contractAddress as `0x${string}`,
      data: data,
    });

    const decodedResult = decodeFunctionResult({
      abi: abi.abi,
      functionName: 'getAllQuestions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: (result.data as any).result as `0x${string}`
    });

    return decodedResult
  } catch (error) {
    console.error("Error fetching public questions:", error);
    return -1
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const claimToken = async (walletClient: any, account: any) => {

  try {
    const txHash = await walletClient.writeContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "claimFreeToken",
      account: account,
    });

    console.log("Transaction Hash:", txHash);
    return 1
  } catch (error) {
    console.error("Error claiming free token:", error);
    return -1
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const submitQuestion = async (walletClient: any, account: any, question: string) => {
  try {
    const txHash = await walletClient.writeContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "submitQuestion",
      args: [question],
      account: account,
    });

    console.log("Transaction Hash:", txHash);
    return 1
  } catch (error) {
    console.error("Error claiming free token:", error);
    return -1
  }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const answerQuestion = async (account: any, answer: string, questionId: number, walletClient: any) => {
  try {
    const txHash = await walletClient.writeContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "answerQuestion",
      args: [questionId, answer],
      account: account,
    });
    console.log("Transaction Hash:", txHash);

    return 1;
  } catch (error) {
    console.error("Error answering", error);
    return -1;
  }
};
