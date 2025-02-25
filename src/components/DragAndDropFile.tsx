interface TraitListProps {
  handleImageUpload: (file: File) => void;
}

const DragAndDrop: React.FC<TraitListProps> = ({ handleImageUpload }) => {
  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file) return;
      handleImageUpload(file);
    }
  };

  return (
    <div
      className="hidden md:flex flex-col justify-center items-center relative aspect-1 rounded-3xl border-dotted border-4 border-[#de2f74] p-2 w-full h-[400px]"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-upload"
        className="relative aspect-1 overflow-hidden rounded-3xl border-dotted border-4 border-[#de2f74] flex items-center justify-center p-2"
      >
        <input
          id="file-upload"
          className="hidden"
          accept="image/jpeg, image/png, image/webp, image/avif, image/gif"
          type="file"
          name="imageFile"
          onClick={(e) => e.preventDefault()}
        />
        <div className="relative flex flex-col w-full items-center px-4 lg:px-0">
          <p className="font-semibold tracking-tight mb-2 text-center leading-5 text-[1.1rem] lg:text-[1.25rem] lg:text-left">
            Choose a file or drag &amp; drop it here.
          </p>
          <span className="text-sm text-neutral-400 font-semibold tracking-tight text-center lg:text-left">
            Supported formats: jpeg, png, webp, avif, gif
          </span>
        </div>
      </label>
    </div>
  );
};

export default DragAndDrop;
