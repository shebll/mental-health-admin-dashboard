import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserType } from "@/types/UserType";
import { useAuth } from "@/context/AuthContext";
import { deleteUserById } from "@/lib/api";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import ConfirmationPopup from "../layout/ConfirmationPopup";
interface UserDetailsProps {
  user: UserType | null;
  onDelete: (userId: string) => void;
  onClose: () => void;
}

const UserDetails: FC<UserDetailsProps> = ({ user, onClose, onDelete }) => {
  const { token } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  if (!user) return null;

  const handleDelete = async () => {
    if (token) {
      const response = await deleteUserById(token, user.id);
      if (response) {
        toast.success("User Deleted Successfully");
        onDelete(user.id);
      } else {
        toast.error("Failed to delete User");
      }
    }
  };
  return (
    <>
      <ConfirmationPopup
        isOpen={confirmDelete}
        message={`All the information for this user will be deleted.`}
        confirmText={`Delete/${user.firstName}-${user.lastName}`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
      <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex justify-center items-center z-[20] p-2">
        <span
          onClick={onClose}
          className="absolute inset-0 w-full h-screen z-[1]"
        />
        <div className="flex flex-col justify-start items-start gap-14 bg-secondary p-4 md:px-8 py-4 rounded-md z-[2]">
          <div className="flex flex-col md:flex-row justify-start gap-y-8 gap-x-20 items-start">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-6">
                <Image
                  src={user.photoUrl ? user.photoUrl : "/user.png"}
                  alt="clientPhotoUrl"
                  width={100}
                  height={100}
                  className=" rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold">
                    <strong>{user.firstName + user.lastName}</strong>{" "}
                  </h2>
                  <p>
                    Email: <strong>{user.email} </strong>
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
              birthDate: <strong> ${user.birthDate} </strong>
            </p>
            <p>
              gender: <strong> {user.gender} </strong>
            </p>
          </div>
          <Button className="w-full mt-6" onClick={onClose}>
            close
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
