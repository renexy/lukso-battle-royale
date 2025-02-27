import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Input,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useUpProvider } from "../../services/providers/UPProvider";
import { Question } from "../../models/Question.model";
import { answerQuestion, claimToken } from "../../services/web3/Interactions";

interface OwnerDashboardProps {
  questions: Question[];
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ questions }) => {
  const { accounts, client } = useUpProvider();
  const [showUnanwsered, setShowUnanwsered] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string>("");
  const [myQuestions, setMyQuestions] = useState(
    questions.filter((q) => q.answered)
  );

  const toggleQuestionType = () => {
    setShowUnanwsered(!showUnanwsered);
    setMyQuestions(
      questions.filter((q) => (showUnanwsered ? !q.answered : q.answered))
    );
  };

  const submitAnswer = async (question: Question) => {
    const res = await answerQuestion(accounts[0], answer, question.id, client);
    if (res === 1) {
      console.log("YAY!?);");
    } else {
      console.log("NAY");
    }
  };

  const claimFreeToken = async () => {
    const res = await claimToken(client, accounts[0]);
    console.log(res, "lol");
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full h-full">
      <div className=" max-h-[90%] overflow-auto flex flex-col gap-[12px] items-center w-full h-full flex-[0.8]">
        <span className="text-[#4F5882] font-bold text-[12px]">
          {showUnanwsered
            ? "Your answered questions"
            : "Your unanwsered questions"}
        </span>
        {myQuestions.length > 0 &&
          myQuestions.map((question, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <span className="text-[#4F5882] font-bold text-[12px]">
                  {question.questionText}
                </span>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col w-full h-full gap-[6px]">
                  {question.answerText ? (
                    <span className="text-[#4F5882] text-[12px]">
                      {question.answerText}
                    </span>
                  ) : (
                    <>
                      <Input
                        placeholder="Anwser here"
                        color="secondary"
                        className="w-full"
                        onChange={(e) => setAnswer(e.target.value)}
                        sx={{ color: "#4F5882" }}
                      ></Input>
                      <Button
                        startIcon={<QuestionAnswerIcon />}
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => submitAnswer(question)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#CB6CE6",
                          },
                        }}
                      >
                        Submit anwser
                      </Button>
                    </>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>

      <div className="flex justify-center items-center w-full h-full flex-col gap-[12px] flex-[0.2]">
        <Button
          startIcon={<QuestionAnswerIcon />}
          variant="contained"
          color="secondary"
          onClick={toggleQuestionType}
          sx={{
            "&:hover": {
              backgroundColor: "#CB6CE6",
            },
          }}
        >
          Browse {showUnanwsered ? "unanwsered" : "anwsered"}
        </Button>
        
        <span onClick={claimFreeToken}>test</span>
      </div>
    </div>
  );
};

export default OwnerDashboard;
