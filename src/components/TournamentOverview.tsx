/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { createTournament, getTournament } from "../services/web3/Interactions";
import { useUpProvider } from "../services/providers/UPProvider";
import CountdownTimer from "./CountdownTimer";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface TournamentOverviewProps {
  setPageState: (state: "overview" | "create") => void;
}

interface Tournament {
  active: boolean;
  creator: any;
  endTime: any;
  entryFee: any;
  prizePool: any;
  winner: any;
}

const TournamentOverview: React.FC<TournamentOverviewProps> = ({
  setPageState,
}) => {
  const { chainId, client, contextAccounts } = useUpProvider();
  const [tournamentLoading, setTournamentLoading] = useState<boolean>(true);
  const [activeTournament, setActiveTournament] = useState<Tournament | null>(
    null
  );

  useEffect(() => {
    const loadTournament = async () => {
      const data = (await getTournament(contextAccounts[0], chainId)) as any;

      if (!data || data === 0) {
        setTournamentLoading(false);
        setActiveTournament(null);
        return;
      }

      setActiveTournament({
        creator: data[0],
        entryFee: Number(data[1]),
        prizePool: Number(data[2]),
        endTime: new Date(Number(data[3]) * 1000).toLocaleString(),
        active: data[4],
        winner: data[5],
      });
      setTournamentLoading(false);
    };
    loadTournament();
  }, []);

  useEffect(() => {
    console.log(activeTournament, "lol");
  }, [activeTournament]);

  if (tournamentLoading)
    return (
      <div
        className="bg-white bg-opacity-95 shadow-lg p-4 rounded-lg max-h-[540px] min-h-[250px] 
    w-[500px] relative animate-fadeInSlideUp justify-center items-center flex flex-col justify-center gap-[20px]"
      >
        <span>Loading tournament...</span>
        <CircularProgress color="secondary" />
      </div>
    );

  return (
    <div
      className="bg-white bg-opacity-95 shadow-lg p-4 rounded-lg max-h-[840px] min-h-[250px] 
w-[500px] relative animate-fadeInSlideUp justify-center items-center flex flex-col justify-between"
    >
      <span>Active Tournament</span>

      {activeTournament ? (
        <div className="flex flex-col w-full gap-[40px] justify-center items-center h-full w-full my-[40px]">
          <div className="flex flex-col gap-[8px] w-full justify-center items-center">
            <span className="text-[14px] font-normal underline">
              Tournament ending at
            </span>
            <span className="text-[#D0A033]">{activeTournament.endTime}</span>
            <CountdownTimer endTime={activeTournament.endTime} />
          </div>
          <div className="flex flex-col gap-[8px] w-full justify-center items-center">
            <span className="text-[14px] font-normal underline">
              Tournament prize pool
            </span>
            <span className="text-[#47CD68]">
              {activeTournament.prizePool} LYX
            </span>
          </div>
          <Button type="submit" variant="contained" color="secondary">
            Finalize tournament! ⚔️
          </Button>
        </div>
      ) : (
        <span className="font-normal text-[16px]">You don't have any.</span>
      )}

      {!activeTournament && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setPageState("create")}
        >
          Create one! ⚔️
        </Button>
      )}
    </div>
  );
};

export default TournamentOverview;
