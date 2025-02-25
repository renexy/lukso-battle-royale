import Storefront from "./components/Storefront/Storefront";
import { useSelector } from "react-redux";
import { RootState } from "./services/store";
import Header from "./components/Header";
import { useUpProvider } from "./services/providers/UPProvider";
import { CircularProgress } from "@mui/material";

function App() {
  const { nftMinted, nftMintedImage } = useSelector(
    (state: RootState) => state.nftMinted
  );
  const { contextAccounts, ready, accounts } = useUpProvider();

  if (!ready) {
    return (
      <div className="flex flex-col h-full w-full gap-[14px] bg-white p-[0.2rem] overflow-y-auto h-screen col-content justify-center items-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (
    contextAccounts &&
    contextAccounts.length > 0 &&
    accounts &&
    accounts.length > 0 &&
    contextAccounts[0].toLowerCase() === accounts[0].toLowerCase().toLowerCase()
  ) {
    return (
      <div className="flex flex-col h-full w-full gap-[14px] bg-white p-[0.2rem] overflow-y-auto h-screen col-content justify-center items-center">
        <span className="font-bold text-[24px] block mb-4">
          Welcome to your page!
        </span>
        <p className="text-gray-600">
          You can't buy yourself a coffee, but you can share this page with
          others 😊
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full gap-[14px] bg-white p-[0.2rem] overflow-y-auto h-screen">
      {nftMinted && (
        <div className="global-main-grid-layout relative flex flex-col gap-[24px] justify-center items-center">
          <span className="col-content font-bold text-[24px] text-center">
            Thanks for the coffee!
          </span>
          <div className="flex flex-col w-full justify-center items-center h-auto md:h-[400px]">
            <img
              src={nftMintedImage!}
              alt="Uploaded Preview"
              style={{ maxWidth: "140px", width: "100%" }}
            />
          </div>
        </div>
      )}
      {!nftMinted && (
        <>
          <Header></Header>

          <div className="global-main-grid-layout relative">
            <span className="col-content font-bold text-[24px] text-center">
              Buy me a coffee
            </span>
          </div>
          <div className="global-main-grid-layout relative mb-[24px]">
            <Storefront></Storefront>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
