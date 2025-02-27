import { Button, CircularProgress, Input, Tooltip } from "@mui/material";
import useFQTInfo from "./SubmitQuestion.hooks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CasinoIcon from "@mui/icons-material/Casino";

interface UserDashboardProps {
  toggleView: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ toggleView }) => {
  const {
    accounts,
    loading,
    fqtAmount,
    alreadyAskedQuestion,
    receiveToken,
    disableInteractions,
    question,
    setQuestion,
    canAsk,
    askQuestion
  } = useFQTInfo();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full animate-fadeInSlideUp">
      <div className=" max-h-[90%] overflow-auto flex flex-col gap-[12px] items-center w-full h-full flex-[0.8]">
        <span className="text-[#4F5882] font-bold text-[14px]">
          When asking questions, please be respectful. ❤️
        </span>
        <div className="flex flex-col justify-center items-center w-full h-full">
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

          {/* 3.) If user already asked his question, end the process */}
          {accounts &&
            accounts.length > 0 &&
            !loading &&
            alreadyAskedQuestion && (
              <div className="flex flex-col h-full w-full gap-[14px] justify-center items-center">
                <span className="text-[#4F5882] text-[12px]">
                  You already asked this user one question.
                </span>
              </div>
            )}

          {accounts &&
            accounts.length > 0 &&
            !loading &&
            !alreadyAskedQuestion && (
              <div className="flex flex-col h-full w-full gap-[14px] justify-center items-center">
                <span className="text-[#4F5882] text-[12px] mb-[24px]">
                  You can only ask this user <b>one</b> question. Make it count!
                </span>
                <Input
                  placeholder="Ask away"
                  color="secondary"
                  value={question}
                  className="w-full"
                  onChange={(e) => setQuestion(e.target.value)}
                  sx={{ color: "#4F5882" }}
                ></Input>
                <span className="text-[#4F5882] text-[12px] mt-[24px]">
                  Your number of tokens: {fqtAmount}
                </span>
                <Button
                  startIcon={<CasinoIcon />}
                  variant="contained"
                  color="secondary"
                  disabled={!canAsk}
                  onClick={askQuestion}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#CB6CE6",
                    },
                  }}
                >
                  Ask me a question!
                </Button>
                <Tooltip
                  color="secondary"
                  arrow
                  title={
                    disableInteractions
                      ? "You already minted a token"
                      : "Click to receive a question token!"
                  }
                >
                  <span>
                    <Button
                      startIcon={<CasinoIcon />}
                      variant="contained"
                      color="secondary"
                      disabled={disableInteractions}
                      onClick={receiveToken}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#CB6CE6",
                        },
                      }}
                    >
                      Get a free question token! ❤️
                    </Button>
                  </span>
                </Tooltip>
              </div>
            )}
        </div>
      </div>

      <div
        className="flex justify-center items-center w-full h-full flex-col gap-[12px] flex-[0.2]"
        onClick={toggleView}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          color="secondary"
          onClick={toggleView}
          sx={{
            "&:hover": {
              backgroundColor: "#CB6CE6",
            },
          }}
        >
          Back to questions
        </Button>
      </div>
    </div>
  );
};

export default UserDashboard;
