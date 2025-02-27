import { useEffect, useState } from "react";
import { useUpProvider } from "./services/providers/UPProvider";
import {
  fetchPublicQuestions,
  hasSubmittedQuestion,
} from "./services/web3/Interactions";
import { Question } from "./models/Question.model";
import { CircularProgress } from "@mui/material";
import OwnerDashboard from "./components/OwnerDashboard";
import QuestionsAccordion from "./components/QuestionsAccordion";

function App() {
  const { accounts, contextAccounts, provider } = useUpProvider();
  const [isUserOwner, setIsUserOwner] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [alreadyAsked, setAlreadyAsked] = useState<boolean>(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      let questions = (await fetchPublicQuestions(provider)) as Question[];
      questions = questions.map((item: Question, index: number) => ({
        ...item,
        id: index + 1,
      }));
      setReady(true);
      setAllQuestions(questions);
    };

    fetchQuestions();
  }, [provider]);

  useEffect(() => {
    const checkUserStatus = async () => {
      checkIsUserOwner(accounts, contextAccounts);
      await checkUserAlreadyAsked(accounts);
      setReady(true);
    };

    setReady(false);
    checkUserStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkUserAlreadyAsked = async (accounts: any) => {
    const hasAsked = await hasSubmittedQuestion(provider, accounts[0]) as boolean;
    setAlreadyAsked(hasAsked)
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
      <QuestionsAccordion questions={allQuestions} alreadyAsked={alreadyAsked}></QuestionsAccordion>
    </div>
  );
}

export default App;
