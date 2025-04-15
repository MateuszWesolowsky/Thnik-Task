import ERROR_ICON from "../../assets/error-icon.svg";
import { useState, DragEvent } from "react";

type Props = {
  label: string;
  name: string;
  error?: string;
  onFileSelect: (file: File | null) => void;
};

export const InputPhoto = ({ label, name, error, onFileSelect }: Props) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFileName(null);
    onFileSelect(null);
  };

  return (
    <label
      htmlFor="photo-upload"
      className="block text-left w-full max-w-md mt-16"
    >
      <p className="block mb-2 text-textMain font-normal">{label}</p>
      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        className={`w-full cursor-pointer bg-white border-1 p-6 rounded-[8px] transition 
          ${dragActive ? "border-active border-2" : "border-default"}`}
      >
        {fileName ? (
          <div className="flex items-center justify-center gap-2">
            <p className="text-active font-medium">{fileName}</p>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-textMain hover:text-error cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM9.879 8.464C9.69946 8.28275 9.45743 8.17697 9.20245 8.16832C8.94748 8.15967 8.69883 8.2488 8.50742 8.41747C8.31601 8.58613 8.1963 8.82159 8.1728 9.07562C8.14929 9.32966 8.22378 9.58308 8.381 9.784L8.465 9.879L10.585 11.999L8.465 14.121C8.28375 14.3005 8.17797 14.5426 8.16932 14.7975C8.16067 15.0525 8.2498 15.3012 8.41847 15.4926C8.58713 15.684 8.82258 15.8037 9.07662 15.8272C9.33066 15.8507 9.58408 15.7762 9.785 15.619L9.879 15.536L12 13.414L14.121 15.536C14.3005 15.7173 14.5426 15.823 14.7975 15.8317C15.0525 15.8403 15.3012 15.7512 15.4926 15.5825C15.684 15.4139 15.8037 15.1784 15.8272 14.9244C15.8507 14.6703 15.7762 14.4169 15.619 14.216L15.536 14.121L13.414 12L15.536 9.879C15.7173 9.69946 15.823 9.45743 15.8317 9.20245C15.8403 8.94748 15.7512 8.69883 15.5825 8.50742C15.4139 8.31601 15.1784 8.1963 14.9244 8.1728C14.6703 8.14929 14.4169 8.22378 14.216 8.381L14.121 8.464L12 10.586L9.879 8.464Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-2 text-sm">
            <p className="text-active font-medium underline">Upload a file</p>
            <p className="text-[#898DA9]">or drag and drop here</p>
          </div>
        )}

        <input
          id="photo-upload"
          name={name}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {error && (
        <p className="text-error text-sm mt-2 flex gap-2">
          <img src={ERROR_ICON} alt="Error icon" />
          {error}
        </p>
      )}
    </label>
  );
};
