import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useUpProvider } from "./services/providers/UPProvider";
import { fetchPublicQuestions } from "./services/web3/Interactions";
import QuestionsAccordion from "./components/QuestionsAccordion";
import OwnerDashboard from "./components/OwnerDashboard";

function App() {
  const { accounts, contextAccounts, provider } = useUpProvider();
  const [allQuestions, setAllQuestions] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await fetchPublicQuestions(provider);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setAllQuestions(questions as any);
      setReady(true);
      setIsVisible(true);
    };

    fetchQuestions();
  }, [provider]);

  const isUserOwner = () => {
    if (
      contextAccounts &&
      contextAccounts.length > 0 &&
      accounts &&
      accounts.length > 0 &&
      contextAccounts[0].toLowerCase() === accounts[0].toLowerCase()
    )
      return true;
    return false;
  };

  if (!ready) {
    return (
      <div className="flex flex-col h-full w-full gap-[14px] justify-center items-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (isUserOwner()) {
    return (
      <div className="bg-white bg-opacity-95 shadow-lg p-5 rounded-lg h-[600px] w-[400px] relative">
        <OwnerDashboard questions={allQuestions}/>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-95 shadow-lg p-5 rounded-lg h-[600px] w-[400px] relative">
      <QuestionsAccordion questions={allQuestions}></QuestionsAccordion>
    </div>
  );
}

export default App;
