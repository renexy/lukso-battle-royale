// DashboardWrapper.tsx
import React from "react";

interface TournamentEnderProps {
  children: React.ReactNode;
}

const TournamentEnder: React.FC<TournamentEnderProps> = ({ children }) => {
  return <>{children}</>;
};

export default TournamentEnder;
