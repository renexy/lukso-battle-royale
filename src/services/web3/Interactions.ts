/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createPublicClient, http, parseUnits } from "viem";
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

    if (!tournamentId || tournamentId === 0) return null;

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


export const getLeaderboard = async (chainId: any) => {
  try {
    const publicClient = createPublicClient({
      chain: chainId === 42 ? lukso : luksoTestnet,
      transport: http(),
    });

    const data = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "getLeaderboard",
      args: [7],
    });
    return data;
  } catch (err: any) {
    return null;
  }
};

export const createTournament = async (
  account: any,
  chainId: any,
  client: any,
  entryFee: string,
  duration: number
) => {
  try {
    const entryFeeInWei = parseUnits(entryFee, 18);
    const txHash = await client.writeContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "createTournament",
      args: [entryFeeInWei, duration],
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

export const finishTournament = async (
  ownerAddress: any,
  account: any,
  chainId: any,
  client: any
) => {
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

    const txHash = await client.writeContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "finalizeTournament",
      args: [tournamentId],
      account: account,
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

export const joinTournament = async (
  ownerAddress: any,
  account: any,
  chainId: any,
  client: any,
  entryFee: any
) => {
  try {
    const bigIntValue = entryFee; // BigInt (10^36)
    const etherValue = bigIntValue / 10n ** 18n; // Converting to Ether (divide by 10^18)
    console.log(etherValue.toString()); // Output will be '1000000000000000000', which is 1 Ether

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
    const txHash = await client.writeContract({
      address: contractAddress as `0x${string}`,
      abi: abi.abi,
      functionName: "joinTournament",
      args: [tournamentId],
      account: account,
      value: entryFee,
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

export const watchParticipantJoinedEvents = (chainId: any, onEvent: any) => {
  const publicClient = createPublicClient({
    chain: chainId === 42 ? lukso : luksoTestnet,
    transport: http(),
  });

  const unwatch = publicClient.watchContractEvent({
    address: contractAddress as `0x${string}`,
    abi: abi.abi,
    eventName: "ParticipantJoined",
    onLogs: (logs) => {
      logs.forEach((log: any) => {
        const { tournamentId, tournamentPrizePool, newEndTime } = log.args;
        console.log("New participant joined:", { tournamentId, tournamentPrizePool, newEndTime });
        onEvent({ tournamentId, tournamentPrizePool, newEndTime });
      });
    },
    onError: (error) => {
      console.error("Error watching ParticipantJoined events:", error);
    },
  });

  return unwatch; // Return the unwatch function to stop listening
};