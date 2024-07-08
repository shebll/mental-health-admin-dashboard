import React, { FC, useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface ConfirmationPopupProps {
  isOpen: boolean;
  message: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({
  isOpen,
  message,
  confirmText,
  onCancel,
  onConfirm,
}) => {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setIsLoading(false);
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 w-full h-screen z-[30] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-[460px]">
        <div
          onClick={onCancel}
          className="fixed inset-0 cursor-pointer z-[-1]"
        />
        <div className="flex flex-col justify-start items-start gap-4 p-4 lg:px-12 lg:py-8 bg-secondary/95 rounded-[10px]">
          <label htmlFor="deleteConfirm" className="select-none">
            {message} <br />
            Type <span className="font-bold">{confirmText}</span> to confirm.
          </label>
          <Input
            type="text"
            name="deleteConfirm"
            id="deleteConfirm"
            value={deleteMessage}
            onChange={(e) => setDeleteMessage(e.target.value)}
            placeholder={confirmText}
            className="bg-[#1d1d1d] "
          />
          <div className="flex flex-col lg:flex-row gap-2 justify-between items-center w-full">
            <button
              disabled={deleteMessage !== confirmText}
              onClick={handleConfirm}
              className={`${
                deleteMessage !== confirmText && "opacity-40 cursor-not-allowed"
              } bg-[#fa5555] rounded-[10px] py-2 px-4 lg:py-3 lg:px-10 w-full`}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </button>
            <button
              className="bg-[#232323] rounded-[10px] py-2 px-4 lg:py-3 lg:px-10 w-full lg:w-fit"
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
