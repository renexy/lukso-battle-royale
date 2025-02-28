/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Question } from "../models/Question.model";
import { useUpProvider } from "../services/providers/UPProvider";
import { createProfileForUser, fetchQuestionsForProfile, hasProfile } from "../services/web3/Interactions";

export const useApp = () => {
const { accounts, contextAccounts, provider, client, chainId } =
    useUpProvider();
  const [isUserOwner, setIsUserOwner] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [ready, setReady] = useState(false);
  const [disableInteractions, setDisableInteractions] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      let questions = (await fetchQuestionsForProfile(
        provider,
        contextAccounts[0],
        chainId
      )) as Question[];
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
  }, [accounts, contextAccounts]);

  const checkOwnerHasProfile = async () => {
    const userHasProfile = await hasProfile(provider, accounts[0], chainId);
    if (userHasProfile) {
      setDisableInteractions(false);
      return;
    }

    await createProfileForUser(accounts[0], client, chainId);
    setDisableInteractions(false);
  };

  const loadQuestions = async () => {
    setReady(false);
    let questions = (await fetchQuestionsForProfile(
      provider,
      contextAccounts[0],
      chainId
    )) as Question[];
    questions = questions.map((item: Question, index: number) => ({
      ...item,
      id: index + 1,
    }));
    setAllQuestions(questions);
    setReady(true);
  };
  
  return {
    isUserOwner,
    allQuestions,
    ready,
    disableInteractions,
    loadQuestions,
  };
};
