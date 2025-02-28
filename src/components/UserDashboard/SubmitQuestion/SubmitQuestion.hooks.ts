import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import {
  claimTokenForProfile,
  createQuestionForProfile,
  getFQTAmount,
  hasRecievedTokenForProfile,
  hasSubmittedQuestionForProfile
} from "../../../services/web3/Interactions";
import { useUpProvider } from "../../../services/providers/UPProvider";

const useFQTInfo = () => {
  const { accounts, provider, chainId, contextAccounts, client } =
    useUpProvider();
  const [disableInteractions, setDisableInteractions] =
    useState<boolean>(false);
  const [canAsk, setCanAsk] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [fqtAmount, setFQTAmount] = useState<string>("");
  const [alreadyAskedQuestion, setAlreadyAskedQuestion] =
    useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    if (!accounts || accounts.length < 1) return;

    const checkAlreadyAsked = async () => {
      try {
        const alreadyAsked = (await hasSubmittedQuestionForProfile(
          provider,
          contextAccounts[0],
          accounts[0],
          chainId
        )) as boolean;
        setAlreadyAskedQuestion(alreadyAsked);
        if (alreadyAsked) {
          setLoading(false);
          setDisableInteractions(true);
          return;
        }
        await alreadyMinted();

        await getFQT();
      } catch (error) {
        console.error("Error checking question submission:", error);
      }
    };

    checkAlreadyAsked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, provider]);

  const getFQT = async () => {
    try {
      const amount = (await getFQTAmount(provider, accounts[0])) as bigint;
      const parsedNumber = formatUnits(amount, 18);
      if (parseFloat(parsedNumber) > 0) {
        setCanAsk(true);
        setDisableInteractions(true);
      }
      setFQTAmount(parsedNumber);
    } catch (error) {
      console.error("Error fetching FQT balance:", error);
    } finally {
      setLoading(false);
    }
  };

  const receiveToken = async () => {
    setDisableInteractions(true);
    setLoading(true);
    await claimTokenForProfile(
      client,
      accounts[0],
      contextAccounts[0],
      chainId
    );
    await getFQT();
    await alreadyMinted();
    setLoading(false);
  };

  const askQuestion = async () => {
    if (question.length < 1) alert("Enter question!");
    try {
      setLoading(true);
      await createQuestionForProfile(
        accounts[0],
        client,
        contextAccounts[0],
        question,
        chainId
      );
      setAlreadyAskedQuestion(true);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setAlreadyAskedQuestion(false);
    }
  };

  const alreadyMinted = async () => {
    const claimed = await hasRecievedTokenForProfile(
      provider,
      accounts[0],
      contextAccounts[0],
      chainId
    );
    if (claimed) {
      setDisableInteractions(true);
    } else {
      setDisableInteractions(false);
    }
  };

  return {
    loading,
    fqtAmount,
    alreadyAskedQuestion,
    accounts,
    receiveToken,
    disableInteractions,
    question,
    setQuestion,
    canAsk,
    askQuestion,
  };
};

export default useFQTInfo;
