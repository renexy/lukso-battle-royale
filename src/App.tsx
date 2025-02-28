import { CircularProgress } from "@mui/material";
import UserDashboard from "./components/UserDashboard/Dashboard";
import OwnerDashboard from "./components/OwnerDashboard/OwnerDashboard";
import { useApp } from "./hooks/app.hooks";

function App() {

  const {
    isUserOwner,
    allQuestions,
    ready,
    disableInteractions,
    loadQuestions,
  } = useApp();

  if (!ready) {
    return (
      <div className="flex flex-col h-full w-full gap-[14px] justify-center items-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (isUserOwner) {
    return (
      <div className="bg-white bg-opacity-95 shadow-lg p-5 rounded-lg h-[600px] w-[400px] relative">
        <OwnerDashboard
          questions={allQuestions ?? []}
          disableInteractions={disableInteractions}
          loadQuestions={loadQuestions}
        />
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-95 shadow-lg p-5 rounded-lg h-[600px] w-[400px] relative">
      <UserDashboard questions={allQuestions}></UserDashboard>
    </div>
  );
}

export default App;
