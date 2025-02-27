import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUpProvider } from "../services/providers/UPProvider";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useEffect, useState } from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface QuestionsAccordionProps {
  alreadyAsked: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any[];
}

const QuestionsAccordion: React.FC<QuestionsAccordionProps> = ({
  alreadyAsked,
  questions,
}) => {
  const { contextAccounts } = useUpProvider();
  const answeredQuestions = questions.filter((q) => q.answered);

  useEffect(() => {}, []);

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full h-full">
      <div className=" max-h-[90%] overflow-auto flex flex-col gap-[12px] items-center w-full h-full flex-[0.8]">
        <span className="text-[#4F5882] font-bold text-[14px]">
          My answered questions ❤️
        </span>
        {answeredQuestions.length > 0 &&
          answeredQuestions.map((question, index) => (
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
                <span className="text-[#4F5882] text-[12px]">
                  {question.answerText}
                </span>
              </AccordionDetails>
            </Accordion>
          ))}

        {answeredQuestions.length < 1 && (
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-[#4F5882] font-bold text-[12px]">
              User hasn't anwsered any questions yet.
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center w-full h-full flex-col gap-[12px] flex-[0.2]">
        {!alreadyAsked && (
          <Button
            endIcon={<QuestionMarkIcon />}
            variant="contained"
            color="secondary"
            sx={{
              "&:hover": {
                backgroundColor: "#CB6CE6", // Set hover background color
              },
            }}
          >
            Ask me a question
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionsAccordion;
