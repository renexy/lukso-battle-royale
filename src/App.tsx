import { useEffect, useState } from "react";
import { useUpProvider } from "./services/providers/UPProvider";
import {
  fetchPublicQuestions,
  hasSubmittedQuestion,
} from "./services/web3/Interactions";
import { Question } from "./models/Question.model";
import { CircularProgress } from "@mui/material";
import UserDashboard from "./components/UserDashboard/Dashboard";
import OwnerDashboard from "./components/OwnerDashboard/OwnerDashboard";

function App() {
  const { accounts, contextAccounts, provider } = useUpProvider();
  const [isUserOwner, setIsUserOwner] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      let questions = (await fetchPublicQuestions(provider)) as Question[];
      questions = questions.map((item: Question, index: number) => ({
        ...item,
        id: index + 1,
      }));
      setAllQuestions(questions);
      setReady(true);
    };

    fetchQuestions();
  }, [provider]);

  useEffect(() => {
      checkIsUserOwner(accounts, contextAccounts);
  }, [accounts, contextAccounts]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkIsUserOwner = (accounts: any, contextAccounts: any) => {
    if (
      contextAccounts &&
      contextAccounts.length > 0 &&
      accounts &&
      accounts.length > 0 &&
      contextAccounts[0].toLowerCase() === accounts[0].toLowerCase()
    )
      setIsUserOwner(true);
    else {
      setIsUserOwner(false);
    }
  };

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
        <OwnerDashboard questions={allQuestions} />
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
