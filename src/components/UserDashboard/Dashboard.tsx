import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Question } from "../../models/Question.model";
import SubmitQuestion from "./SubmitQuestion/SubmitQuestion";
import { useState } from "react";

interface UserdashboardProps {
  questions: Question[];
}

const UserDashboard: React.FC<UserdashboardProps> = ({ questions }) => {
  const [toggleSubmitQuestion, setToggleSubmitQuestion] =
    useState<boolean>(false);

  const answeredQuestions = questions.filter((q) => q.answered);

  const toggleViews = () => {
    setToggleSubmitQuestion(!toggleSubmitQuestion);
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full h-full animate-fadeInSlideUp">
      {toggleSubmitQuestion && (
        <SubmitQuestion
          toggleView={toggleViews}
        />
      )}

      {!toggleSubmitQuestion && (
        <div className="flex flex-col justify-center items-center w-full h-full animate-fadeInSlideUp">
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
            <Button
              endIcon={<FavoriteIcon />}
              variant="contained"
              color="secondary"
              onClick={toggleViews}
              sx={{
                "&:hover": {
                  backgroundColor: "#CB6CE6",
                },
              }}
            >
              Ask me a question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
