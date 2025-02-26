import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface QuestionsAccordionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any[];
}

const QuestionsAccordion: React.FC<QuestionsAccordionProps> = ({
  questions,
}) => {
  const answeredQuestions = questions.filter((q) => q.answered);

  return (
    <div className="p-4 max-h-[80%] overflow-auto flex flex-col justify-center items-center w-full h-full">
      {answeredQuestions.length > 0 &&
        answeredQuestions.map((question, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>{question.questionText}</Typography>{" "}
              {/* Replace 'title' with your actual property */}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{question.answerText}</Typography>{" "}
              {/* Replace 'details' with your actual property */}
            </AccordionDetails>
          </Accordion>
        ))}

      {answeredQuestions.length < 1 && <div className="flex justify-center items-center w-full h-full">
        <span className="text-[#4F5882] font-bold text-[12px]">User has no questions yet.</span></div>}
    </div>
  );
};

export default QuestionsAccordion;
