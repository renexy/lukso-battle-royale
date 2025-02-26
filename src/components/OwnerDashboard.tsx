import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface OwnerDashboardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any[];
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ questions }) => {
  const answeredQuestions = questions.filter((q) => q.answered);

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full h-full">
      {answeredQuestions.length > 0 &&
        answeredQuestions.map((question, index) => (
          <div className=" max-h-[80%] overflow-auto flex flex-col justify-center items-center w-full h-full">
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{question.questionText}</Typography>{" "}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{question.answerText}</Typography>{" "}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}

      {answeredQuestions.length < 1 && (
        <div className="flex justify-center items-center w-full h-full flex-col gap-[12px]">
          <span className="text-[#4F5882] font-bold text-[12px]">
            You didn't anwser any questions yet.
          </span>
          <Button
            startIcon={<QuestionAnswerIcon />}
            variant="contained"
            color="secondary"
            sx={{ maxWidth: "140px" }}
          >
            Add Trait
          </Button>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
