import { useAuth } from "@/context/AuthContext";
import { deleteUserById } from "@/lib/api";
import { UserType } from "@/types/UserType";
import { Trash } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import ConfirmationPopup from "../layout/ConfirmationPopup";
import { toast } from "sonner";
import axios from "axios";

interface UserCardProps {
  User: UserType;
  onDelete: (userId: string) => void;
  onClick?: () => void;
}

const UserCard: FC<UserCardProps> = ({ User, onClick, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const { token } = useAuth();

  const handleDelete = async () => {
    if (token) {
      try {
        const response = await deleteUserById(token, User.id);
        toast.success("User Deleted Successfully");
        onDelete(User.id);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // if api provider given error
          if (error.response) {
            toast.error(`Error : ${error.response.data.message}`);
          } else {
            toast.error(`Error : ${error.message}`);
          }
        } else if (error instanceof Error) {
          toast.error(`${error.message}`);
        } else {
          toast.error("Something went wrong try again");
        }
      } finally {
      }
    }
  };

  return (
    <>
      <ConfirmationPopup
        isOpen={confirmDelete}
        message={`All the information for this user will be deleted.`}
        confirmText={`Delete/${User.firstName}-${User.lastName}`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
      <div
        className="p-4 border rounded shadow-md cursor-pointer"
        onClick={onClick}
      >
        <div className="flex flex-col justify-start items-start gap-14">
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-6">
                <Image
                  src={User.photoUrl ? User.photoUrl : "/user.png"}
                  alt="clientPhotoUrl"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold">
                    <strong>{User.firstName + User.lastName}</strong>{" "}
                  </h2>
                  <p>
                    Email: <strong>{User.email} </strong>
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(true);
              }}
              className="cursor-pointer"
            >
              <Trash />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <h2 className="text-lg font-bold">details</h2>
            <p>
              birthDate:<strong> {User.birthDate} </strong>
            </p>
            <p>
              gender:<strong> {User.gender} </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
