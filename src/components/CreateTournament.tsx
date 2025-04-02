import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { createTournament } from "../services/web3/Interactions";
import { useUpProvider } from "../services/providers/UPProvider";
import toast from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface CreateTournamentProps {
  goBack: () => void;
}

const CreateTournament: React.FC<CreateTournamentProps> = ({ goBack }) => {
  const { contextAccounts, chainId, client } = useUpProvider();
  const [tournamentCreating, setTournamentCreating] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    entryFee: 0,
    duration: 0,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.entryFee < 1) {
      toast.error("Fee must be at least 1 LYX");
      return;
    }

    if (formData.duration > 36 || formData.duration < 1) {
      toast.error("Max 36 hours");
      return;
    }

    setTournamentCreating(true);

    const data = await createTournament(
      contextAccounts[0],
      chainId,
      client,
      formData.entryFee.toString(),
      formData.duration * 3600
    );

    if (!data || data === false) {
      toast.error("Failed");
      setTournamentCreating(false);
    } else {
      goBack();
      toast.success("Success");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className="bg-white bg-opacity-95 shadow-lg p-4 rounded-lg max-h-[540px] gap-10
    w-[500px] relative animate-fadeInSlideUp justify-center items-center flex flex-col justify-between"
    >
      {tournamentCreating ? (
        <div className="relative animate-fadeInSlideUp justify-center items-center flex flex-col justify-center gap-[20px]">
          <span>Creating tournament...</span>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <TextField
              label="Entry Fee (LYX)"
              variant="outlined"
              type="number"
              fullWidth
              color="secondary"
              name="entryFee"
              value={formData.entryFee}
              onChange={handleChange}
            />

            <TextField
              label="End Time Duration (hours)"
              variant="outlined"
              color="secondary"
              type="number"
              fullWidth
              name="duration"
              value={formData.duration}
              inputProps={{ step: 1, max: 36, min: 0 }}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained" color="secondary">
              Create Tournament! ⚔️
            </Button>
          </form>
          <Button variant="contained" color="secondary" onClick={goBack}>
            Or go back
          </Button>
        </>
      )}
    </div>
  );
};

export default CreateTournament;
