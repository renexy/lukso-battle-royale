import { useState } from "react";
import { Trait } from "../Traits";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/store";
import {
  setNftMinted,
  setNftMintedImage,
} from "../../services/state/nftMintedSlice";
import { useUpProvider } from "../../services/providers/UPProvider";
import { sendTransaction } from "../../services/web3/SendTransaction";

interface MintData {
  name: string;
  description: string;
}

export const useStorefront = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { contextAccounts, walletConnected } = useUpProvider();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [inputs, setInputs] = useState<MintData>({
    name: "",
    description: "",
  });

  const [traits, setTraits] = useState<Trait[]>([]);
  const [donationAmount, setDonationAmount] = useState<number>(1);

  const [_, setFile] = useState<File | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const updateInput = (propertyName: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [propertyName]: value,
    }));
  };

  const handleFileChange = (file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImageSrc(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTraitsChange = (newTraits: Trait[]) => {
    if (JSON.stringify(newTraits) !== JSON.stringify(traits)) {
      setTraits(newTraits);
    }
  };

  const handleDonationChange = (newDonation: number) => {
    setDonationAmount(newDonation);
  };

  const handleMintNft = async () => {
    setError("");
    if (!inputs.description || !inputs.name || !imageSrc) {
      setError("Please fill out all fields!");
      return;
    }

    if (!walletConnected) {
      setError("Please connect your wallet!");
      return;
    }

    setIsLoading(true);

    try {
      // send the money
      await sendTransaction(contextAccounts[0], donationAmount);

      // mint the NFT to the contextWallet
      // await mintNft(contextAccounts[0], imageSrc, inputs.name, inputs.description, traits);

      dispatch(setNftMinted(true));

      // you don't need to set the image source from IPFS here, because you already have it in the imageSrc state
      // leave this as is
      dispatch(setNftMintedImage(imageSrc));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError("Transaction failed!");
      setIsLoading(false);
    }
  };

  return {
    inputs,
    updateInput,
    imageSrc,
    handleFileChange,
    handleTraitsChange,
    handleMintNft,
    handleDonationChange,
    donationAmount,
    error,
    isLoading,
  };
};
