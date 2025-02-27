import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import {
  getFQTAmount,
  hasSubmittedQuestion,
} from "../../../services/web3/Interactions";
import { useUpProvider } from "../../../services/providers/UPProvider";

const useFQTInfo = () => {
  const { accounts, provider } = useUpProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const [fqtAmount, setFQTAmount] = useState<string>("");
  const [alreadyAskedQuestion, setAlreadyAskedQuestion] =
    useState<boolean>(false);

  useEffect(() => {
    if (!accounts || accounts.length < 1) return;

    const checkAlreadyAsked = async () => {
      try {
        const alreadyAsked = (await hasSubmittedQuestion(
          provider,
          accounts[0]
        )) as boolean;
        setAlreadyAskedQuestion(alreadyAsked);
        await getFQT();
      } catch (error) {
        console.error("Error checking question submission:", error);
      }
    };

    checkAlreadyAsked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, provider]);

  const getFQT = async () => {
    setLoading(true);

    try {
      const amount = (await getFQTAmount(provider, accounts[0])) as bigint;
      const parsedNumber = formatUnits(amount, 18);
      setFQTAmount(parsedNumber);
    } catch (error) {
      console.error("Error fetching FQT balance:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fqtAmount, alreadyAskedQuestion, accounts };
};

export default useFQTInfo;
