/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createPublicClient, http } from "viem";
import { lukso, luksoTestnet } from "viem/chains";
import abi from "../../../artifacts/contracts/battleroyale.sol/LYXRoyale.json";

const contractAddress = import.meta.env.VITE_LUKSO_CONTRACT_ADDRESS;

export const getTournament = async (ownerAddress: any, chainId: any) => {
  try {
    const publicClient = createPublicClient({
      chain: chainId === 42 ? lukso : luksoTestnet,
      transport: http(),
    });

    const data = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "activeTournaments",
      args: [ownerAddress],
    });

    const tournamentId = Number(data);
    
    if(!tournamentId || tournamentId === 0) return null;
    
    const tournament = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "tournaments",
      args: [tournamentId],
    });

    return tournament;
  } catch (err: any) {
    return null;
  }
};

export const createTournament = async (account: any, chainId: any, client: any, entryFee: number, duration: number) => {
  try {
    const txHash = await client.writeContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "createTournament",
      args: [entryFee, duration],
      account: account,
    });

    const publicClient = createPublicClient({
      chain: chainId === 42 ? lukso : luksoTestnet,
      transport: http(),
    });

    console.log(txHash, "hash");

    await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    return txHash;
  } catch (error) {
    console.error("Error creating profile:", error);
    return false; // Handle error appropriately
  }
};

