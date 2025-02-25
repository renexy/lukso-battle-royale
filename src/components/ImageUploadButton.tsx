import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material";
import { useState } from "react";

interface ImageUploadButtonProps {
  onFileChange: (file: File) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onFileChange,
}) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.type)) {
      onFileChange(file);
      setError("");
    } else {
      setError("Invalid file type. Only .jpg, .png, or .gif are allowed.");
    }
  };

  return (
    <div className="flex flex-col gap-[2px] self-start">
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      color="secondary"
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
    </Button>
    {error && <span className="text-[#ff1744]">{error}</span>}
    </div>
  );
};

export default ImageUploadButton;

