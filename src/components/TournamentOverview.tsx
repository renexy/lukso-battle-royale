/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  finishTournament,
  getTournament,
  joinTournament,
  watchParticipantJoinedEvents,
} from "../services/web3/Interactions";
import { useUpProvider } from "../services/providers/UPProvider";
import CountdownTimer from "./CountdownTimer";
import { formatUnits } from "viem";
import Leaderboard from "./Leaderboard";
/* eslint-disable @typescript-eslint/no-empty-object-type */
interface TournamentOverviewProps {
  setPageState: (state: "overview" | "create") => void;
  isOwner: boolean;
}

interface Tournament {
  id: number;
  active: boolean;
  creator: any;
  endTime: any;
  entryFee: any;
  prizePool: any;
  winner: any;
}

const TournamentOverview: React.FC<TournamentOverviewProps> = ({
  setPageState,
  isOwner,
}) => {
  const { chainId, client, contextAccounts, accounts } = useUpProvider();
  const [tournamentLoading, setTournamentLoading] = useState<boolean>(true);
  const [activeTournament, setActiveTournament] = useState<Tournament | null>(
    null
  );
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Loading tournament...");

  useEffect(() => {
    // Callback to handle new ParticipantJoined events
    const onEvent = ({
      tournamentId,
      tournamentPrizePool,
      newEndTime,
    }: any) => {
      if (Number(tournamentId) === activeTournament?.id) {
        setActiveTournament({
          ...activeTournament,
          endTime: new Date(Number(newEndTime) * 1000).toLocaleString(),
          prizePool: Number(tournamentPrizePool),
        });
      }
    };

    if (!activeTournament) return;

    // Start watching for events
    const unwatch = watchParticipantJoinedEvents(chainId, onEvent);

    // Clean up the listener when the component unmounts or chainId changes
    return () => unwatch();
  }, [chainId, activeTournament]);

  useEffect(() => {
    loadTournament();
  }, []);

  const loadTournament = async () => {
    const data = (await getTournament(contextAccounts[0], chainId)) as any;

    if (!data || data === 0) {
      setTournamentLoading(false);
      setActiveTournament(null);
      return;
    }

    setActiveTournament({
      id: Number(data[0]),
      creator: data[1],
      entryFee: BigInt(data[2]),
      prizePool: Number(data[3]),
      endTime: new Date(Number(data[4]) * 1000).toLocaleString(),
      active: data[5],
      winner: data[6],
    });
    setTournamentLoading(false);
  };

  const finalizeTournament = async () => {
    setTournamentLoading(true);
    setMessage("Finalizing tournament...");
    await finishTournament(contextAccounts[0], accounts[0], chainId, client);
    await loadTournament();
    setTournamentLoading(false);
    setMessage("Loading tournament...");
  };

  const participateTournament = async () => {
    setTournamentLoading(true);
    setMessage("Joining tournament...");

    const entryFeeInWei = BigInt(activeTournament?.entryFee);

    await joinTournament(
      contextAccounts[0],
      accounts[0],
      chainId,
      client,
      entryFeeInWei
    );

    setTournamentLoading(false);
    setMessage("Loading tournament...");
  };

  if (tournamentLoading)
    return (
      <div
        className="bg-white bg-opacity-95 shadow-lg p-4 rounded-lg max-h-[540px] min-h-[250px] 
    w-[500px] relative animate-fadeInSlideUp justify-center items-center flex flex-col justify-center gap-[20px]"
      >
        <span>{message}</span>
        <CircularProgress color="secondary" />
      </div>
    );

  return (
    <>
      {!showLeaderboard && (
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
                <span className="text-[#D0A033]">
                  {activeTournament.endTime}
                </span>
                <CountdownTimer endTime={activeTournament.endTime} />
              </div>
              <div className="flex flex-col gap-[8px] w-full justify-center items-center">
                <span className="text-[14px] font-normal underline">
                  Tournament prize pool
                </span>
                <span className="text-[#47CD68]">
                  {formatUnits(BigInt(activeTournament.prizePool), 18)} LYX
                </span>
              </div>
              {isOwner ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={finalizeTournament}
                >
                  Finalize tournament! ⚔️
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={participateTournament}
                >
                  Join tournament! ⚔️
                </Button>
              )}
            </div>
          ) : (
            <span className="font-normal text-[16px]">No tournaments.</span>
          )}

          <div className="flex w-full justify-center items-center gap-[8px]">
            {!activeTournament && isOwner && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setPageState("create")}
              >
                Create one! ⚔️
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowLeaderboard(true)}
            >
              Leaderboard ⚔️
            </Button>
          </div>
        </div>
      )}
      {showLeaderboard && (
        <Leaderboard
          goBack={() => {
            setShowLeaderboard(false);
          }}
        ></Leaderboard>
      )}
    </>
  );
};

export default TournamentOverview;
