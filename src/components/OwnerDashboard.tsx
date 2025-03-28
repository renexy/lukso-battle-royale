import { Button } from "@mui/material";
import { useState } from "react";
import CreateTournament from "./CreateTournament";
import TournamentOverview from "./TournamentOverview";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface OwnerDashboardProps {}

const OwnerDashboard: React.FC<OwnerDashboardProps> = () => {
  const [pageState, setPageState] = useState<"overview" | "create">("overview");
  return (
    <>
      {pageState === "overview" && (
        <TournamentOverview
          setPageState={(state: "overview" | "create") => setPageState(state)}
        />
      )}

      {pageState === "create" && (
        <CreateTournament goBack={() => setPageState("overview")} />
      )}
    </>
  );
};

export default OwnerDashboard;
