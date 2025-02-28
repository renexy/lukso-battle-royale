import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Input,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Question } from "../../models/Question.model";
import useOwnerDashboard from "./OwnerDashboard.hooks";

interface OwnerDashboardProps {
  questions: Question[];
  disableInteractions: boolean;
  loadQuestions: () => void;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  questions,
  disableInteractions,
  loadQuestions,
}) => {
  const {
    showUnanwsered,
    myQuestions,
    answer,
    setAnswer,
    toggleQuestionType,
    submitAnswer,
    isSubmitting,
  } = useOwnerDashboard({
    questions: questions,
    loadQuestions: loadQuestions,
  });

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full h-full">
      <div className=" max-h-[90%] overflow-auto flex flex-col gap-[12px] items-center w-full h-full flex-[0.8] animate-fadeInSlideUp">
        <span className="text-[#4F5882] font-bold text-[12px] animate-fadeInSlideUp">
          {showUnanwsered
            ? "Your answered questions"
            : "Your unanwsered questions"}
        </span>
        {myQuestions.length > 0 &&
          myQuestions.map((question, index) => (
            <Accordion key={index} className="w-full animate-fadeInSlideUp">
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
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        sx={{ color: "#4F5882" }}
                      ></Input>
                      <Button
                        startIcon={<QuestionAnswerIcon />}
                        variant="contained"
                        color="secondary"
                        disabled={isSubmitting}
                        loading={isSubmitting}
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
          disabled={disableInteractions}
          loading={disableInteractions}
          onClick={toggleQuestionType}
          sx={{
            "&:hover": {
              backgroundColor: "#CB6CE6",
            },
          }}
        >
          Browse {showUnanwsered ? "unanwsered" : "anwsered"}
        </Button>
      </div>
    </div>
  );
};

export default OwnerDashboard;
