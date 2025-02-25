import TextField from "@mui/material/TextField";
import { useStorefront } from "./Storefront.hooks";
import ImageUploadButton from "../ImageUploadButton";
import TraitList from "../Traits";
import { Button, CircularProgress, Slider } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import DragAndDrop from "../DragAndDropFile";

function Storefront() {
  const {
    updateInput,
    handleFileChange,
    imageSrc,
    handleTraitsChange,
    handleMintNft,
    donationAmount,
    handleDonationChange,
    error,
    isLoading,
  } = useStorefront();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateInput(name, value);
  };

  return (
    <div className="col-content flex flex-col md:flex-row w-full h-full justify-between items-start gap-[38px]">
      {imageSrc ? (
        <div className="flex flex-col w-full justify-center items-center h-auto md:h-[400px]">
          <img
            src={imageSrc}
            alt="Uploaded Preview"
            className="w-full md:max-w-[400px] max-w-[120px] rounded-[8px]"
          />
        </div>
      ) : (
        <DragAndDrop handleImageUpload={handleFileChange} />
      )}

      <div className="flex flex-col w-full gap-[12px] justify-center items-center">
        <TextField
          id="standard-basic"
          name="name"
          className="w-full"
          label="NFT Name *"
          variant="standard"
          onChange={handleInputChange}
          color="secondary"
        />

        <TextField
          id="standard-basic"
          name="description"
          className="w-full"
          label="Message to user *"
          variant="standard"
          color="secondary"
          onChange={handleInputChange}
        />

        <ImageUploadButton onFileChange={handleFileChange}></ImageUploadButton>

        <div className="flex flex-col w-full items-start justify-start text-left gap-[4px] mt-[12px] mb-[12px]">
          <span className="font-bold text-[20px]">Properties</span>
          <span>Optionally add traits to your NFT</span>
        </div>

        <TraitList onTraitsChange={handleTraitsChange}></TraitList>

        <div className="flex flex-col w-full items-start justify-start text-left gap-[4px] mt-[12px] mb-[12px]">
          <span className="font-bold text-[18px]">
            Donation amount: {donationAmount} LYX
          </span>
          <Slider
            aria-label="Small steps"
            defaultValue={1}
            step={1}
            min={1}
            max={100}
            valueLabelDisplay="auto"
            color="secondary"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => handleDonationChange(e?.target?.value)}
          />
        </div>
        <p className="text-[#f44336] text-[20px] font-semibold">{error}</p>
        <div className="self-center mt-[14px]">
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Button
              startIcon={<PublishIcon />}
              variant="contained"
              onClick={handleMintNft}
              color="secondary"
              sx={{ maxWidth: "140px" }}
            >
              Mint NFT
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Storefront;
