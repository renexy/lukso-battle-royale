import { CircularProgress } from "@mui/material";
import useFQTInfo from "./SubmitQuestion.hooks";

interface UserDashboardProps {
    toggleView: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ toggleView }) => {
  const { accounts, loading, fqtAmount, alreadyAskedQuestion } = useFQTInfo();

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

          {/* 3.) If all conditions are met, display token balance - explain to user how FQT works */}
          {/* make these descriptions better, if he has 0 tokens and has yet asked, instruct to mint a token */}
          {accounts && accounts.length > 0 && !loading && (
            <div className="flex flex-col h-full w-full gap-[14px] justify-center items-center">
              {!alreadyAskedQuestion && (
                <span className="text-[#4F5882] text-[12px]">
                  You can only ask this user <b>one</b> question. Make it count!
                </span>
              )}
              <span className="text-[#4F5882] text-[12px]">
                Your number of tokens: {fqtAmount}
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className="flex justify-center items-center w-full h-full flex-col gap-[12px] flex-[0.2]"
        onClick={toggleView}
      >
        claim
      </div>
    </div>
  );
};

export default UserDashboard;
