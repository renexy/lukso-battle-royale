/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useUpProvider } from "./services/providers/UPProvider";
import { createProfileForUser, fetchPublicQuestions, fetchQuestionsForProfile, hasProfile } from "./services/web3/Interactions";
import { Question } from "./models/Question.model";
import { CircularProgress } from "@mui/material";
import UserDashboard from "./components/UserDashboard/Dashboard";
import OwnerDashboard from "./components/OwnerDashboard/OwnerDashboard";

function App() {
  const { accounts, contextAccounts, provider, client, chainId } = useUpProvider();
  const [isUserOwner, setIsUserOwner] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [ready, setReady] = useState(false);
  const [disableInteractions, setDisableInteractions] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      let questions = await fetchQuestionsForProfile(provider, contextAccounts[0], chainId) as Question[];
      questions = questions.map((item: Question, index: number) => ({
        ...item,
        id: index + 1,
      }));
      setAllQuestions(questions);
      setReady(true);
    };
    setReady(false);
    fetchQuestions();
  }, [provider, contextAccounts]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ownerShipCheck = async (accounts: any, contextAccounts: any) => {
      if (
        contextAccounts &&
        contextAccounts.length > 0 &&
        accounts &&
        accounts.length > 0 &&
        contextAccounts[0].toLowerCase() === accounts[0].toLowerCase()
      ) {
        setIsUserOwner(true);
        await checkOwnerHasProfile();
      } else {
        setIsUserOwner(false);
      }
    };

    const runCheck = async () => {
      await ownerShipCheck(accounts, contextAccounts);
    };

    runCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, contextAccounts]);

  const checkOwnerHasProfile = async () => {
    const userHasProfile = await hasProfile(provider, accounts[0], chainId);
    if (userHasProfile) {
      setDisableInteractions(false)
      return;
    }

    await createProfileForUser(provider, accounts[0], client, chainId);
    setDisableInteractions(false)

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
        <OwnerDashboard questions={allQuestions ?? []} disableInteractions={disableInteractions} />
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
