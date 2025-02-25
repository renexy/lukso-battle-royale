import React, { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CategoryIcon from "@mui/icons-material/Category";

export interface Trait {
    type: string;
    value: string;
}

interface TraitListProps {
  onTraitsChange: (traits: Trait[]) => void;
}

const TraitList: React.FC<TraitListProps> = ({ onTraitsChange }) => {
  const [traits, setTraits] = useState<{ type: string; value: string }[]>([]);

  useEffect(() => {
    const validTraits = traits.filter(trait => trait.type && trait.value);
    onTraitsChange(validTraits);
  }, [traits, onTraitsChange]);

  const handleAddTrait = () => {
    setTraits([...traits, { type: "", value: "" }]);
  };

  const handleRemoveTrait = (index: number) => {
    const newTraits = traits.filter((_, i) => i !== index);
    setTraits(newTraits);
  };

  const handleTraitChange = (
    index: number,
    key: "type" | "value",
    value: string
  ) => {
    const newTraits = [...traits];
    newTraits[index][key] = value;
    setTraits(newTraits);
  };

  return (
    <div className="flex flex-col gap-[6px] self-start">
      {traits.map((trait, index) => (
        <Box
          key={index}
          sx={{ marginBottom: "10px", display: "flex", alignItems: "center" }}
        >
          <TextField
            label="Type"
            variant="standard"
            value={trait.type}
            onChange={(e) => handleTraitChange(index, "type", e.target.value)}
            sx={{ marginRight: 2 }}
            fullWidth
            color="secondary"
          />
          <TextField
            label="Value"
            variant="standard"
            value={trait.value}
            onChange={(e) => handleTraitChange(index, "value", e.target.value)}
            sx={{ marginRight: 2 }}
            fullWidth
            color="secondary"
          />
          <CancelIcon
            onClick={() => handleRemoveTrait(index)}
            color="secondary"
            className="cursor-pointer"
          ></CancelIcon>
        </Box>
      ))}
      <Button
        startIcon={<CategoryIcon />}
        variant="contained"
        onClick={handleAddTrait}
        color="secondary"
        sx={{ maxWidth: "140px" }}
      >
        Add Trait
      </Button>
    </div>
  );
};

export default TraitList;
