/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/web3/Interactions";
import { useUpProvider } from "../services/providers/UPProvider";
import { formatUnits } from "viem";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface LeaderboardProps {
  goBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ goBack }) => {
  const { chainId } = useUpProvider();
  const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(true);
  const [winners, setWinners] = useState<any>([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const data = (await getLeaderboard(chainId)) as any;

    if (!data || data === 0) {
      setLeaderboardLoading(false);
      return;
    }

    const winners = data[0]
      .map((winnerAddress: any, index: number) => ({
        winnerAddress,
        prize: formatUnits(data[1][index], 18),
      }))
      .filter((entry: any) => !entry.winnerAddress.includes("000"))
      .reduce((acc: any, entry: any) => {
        acc.set(entry.winnerAddress, entry); // Store unique winners by address
        return acc;
      }, new Map())
      .values();

    setWinners(Array.from(winners));
    setLeaderboardLoading(false);
  };
  return (
    <div
      className="bg-white bg-opacity-95 shadow-lg p-4 rounded-lg max-h-[540px] gap-10
    w-[500px] relative animate-fadeInSlideUp justify-center items-center flex flex-col justify-between"
    >
      {leaderboardLoading ? (
        <div className="relative animate-fadeInSlideUp justify-center items-center flex flex-col justify-center gap-[20px]">
          <span>Loading leaderboard...</span>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full gap-[30px] justify-center items-center">
            <span>Leaderboard</span>
            <div className="flex w-full gap-[8px] justify-between items-center">
              <span>Player</span>
              <span>Winnings</span>
            </div>
            <div className="flex w-full flex-col gap-[8px] justify-between items-center">
              {winners.map((winner: any, index: number) => {
                return (
                  <div
                    className="flex w-full justify-between items-center"
                    key={index}
                  >
                    <span>{winner.winnerAddress.substring(0, 7)}...</span>
                    <span>{winner.prize} LYX</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Button variant="contained" color="secondary" onClick={goBack}>
            Or go back
          </Button>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
