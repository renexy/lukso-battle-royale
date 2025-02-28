import { useState } from "react";
import { useUpProvider } from "../../services/providers/UPProvider";
import { Question } from "../../models/Question.model";
import { answerQuestionForProfile } from "../../services/web3/Interactions";

interface OwnerDashboardHookProps {
  questions: Question[];
  loadQuestions: () => void;
}

const useOwnerDashboard = ({
  questions,
  loadQuestions,
}: OwnerDashboardHookProps) => {
  const { accounts, client, chainId } = useUpProvider();
  const [showUnanwsered, setShowUnanwsered] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [myQuestions, setMyQuestions] = useState(
    questions.filter((q) => q.answered)
  );

  const toggleQuestionType = () => {
    setShowUnanwsered(!showUnanwsered);
    setMyQuestions(
      questions.filter((q: Question) =>
        showUnanwsered ? !q.answered : q.answered
      )
    );
  };

  const submitAnswer = async (question: Question) => {
    try {
      setIsSubmitting(true);
      await answerQuestionForProfile(
        accounts[0],
        answer,
        question.id,
        client,
        chainId
      );
      loadQuestions();
      setIsSubmitting(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return {
    showUnanwsered,
    myQuestions,
    answer,
    setAnswer,
    toggleQuestionType,
    submitAnswer,
    isSubmitting,
  };
};

export default useOwnerDashboard;
