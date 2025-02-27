import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { Question } from "../../models/Question.model";
import { useUpProvider } from "../../services/providers/UPProvider";
import { hasSubmittedQuestion } from "../../services/web3/Interactions";

interface UserdashboardProps {
  questions: Question[];
}

const UserDashboard: React.FC<UserdashboardProps> = ({ questions }) => {
  const { accounts, contextAccounts, provider } = useUpProvider();
  const [loading, setLoading] = useState<boolean>(false);

  const [alreadyAskedQuestion, setAlreadyAskedQuestion] =
    useState<boolean>(false);

  const [toggleSubmitQuestion, setToggleSubmitQuestion] =
    useState<boolean>(false);

  const answeredQuestions = questions.filter((q) => q.answered);

  useEffect(() => {
    if (!accounts || accounts.length < 1) return;

    const checkAlreadyAsked = async () => {
      const alreadyAsked = (await hasSubmittedQuestion(
        provider,
        accounts[0]
      )) as boolean;
      setAlreadyAskedQuestion(alreadyAsked);

      await getFQT();
    };

    checkAlreadyAsked();
  }, [accounts]);

  const getFQT = async () => {
    setLoading(true);

    await setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full h-full animate-fadeInSlideUp">
      {toggleSubmitQuestion && (
        <div className="flex flex-col justify-center items-center w-full h-full animate-fadeInSlideUp">
          <div className=" max-h-[90%] overflow-auto flex flex-col gap-[12px] items-center w-full h-full flex-[0.8] justify-evenly">
            <span className="text-[#4F5882] font-bold text-[14px]">
              When asking questions, please be respectful. ❤️
            </span>
            <div>
              {/* 1.) Check if accounts[0] is connected - if not display a message */}
              {!accounts ||
                (accounts.length < 1 && (
                  <span className="text-[#4F5882] font-bold text-[10px]">
                    Please connect your account in the top left corner of this
                    window.
                  </span>
                ))}

              {/* 2.) Once connected, load a spinner - check if user already submitted a question - display a message  */}
              {accounts && accounts.length > 0 && loading && (
                <div className="flex flex-col h-full w-full gap-[14px] justify-center items-center">
                  <CircularProgress color="secondary" />
                </div>
              )}

              {/* 3.) If all conditions are met, display token balance - explain to user how FQT works */}
              {accounts && accounts.length > 0 && !loading && (
                <div className="flex flex-col h-full w-full gap-[14px] justify-center items-center">
                  Display amount of FQT Display if user already anwsered or not
                  Turn this section into a component
                </div>
              )}
            </div>
          </div>

          <div
            className="flex justify-center items-center w-full h-full flex-col gap-[12px] flex-[0.2]"
            onClick={() => setToggleSubmitQuestion(!toggleSubmitQuestion)}
          >
            claim
          </div>
        </div>
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
              onClick={() => setToggleSubmitQuestion(!toggleSubmitQuestion)}
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
