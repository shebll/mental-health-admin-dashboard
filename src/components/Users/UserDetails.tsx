import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash } from "lucide-react";

interface UserDetailsProps {
  user: UserType | null;
  onClose: () => void;
  setConfirmDelete: (value: boolean) => void;
}

const UserDetails = ({ user, onClose, setConfirmDelete }: UserDetailsProps) => {
  if (!user) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <span
          onClick={onClose}
          className="absolute inset-0 w-full h-full z-40"
        />
        <div className="relative bg-secondary text-primary p-6 md:p-8 rounded-lg shadow-lg z-50 max-w-md w-full">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <Image
                src={user.photoUrl ? user.photoUrl : "/user.png"}
                alt="User Photo"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(true);
              }}
              className="p-2 rounded-md hover:bg-accent transition"
            >
              <Trash className="w-5 h-5 text-destructive" />
            </button>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Details</h3>
            <p className="text-sm">
              <strong>Birth Date:</strong> {user.birthDate}
            </p>
            <p className="text-sm">
              <strong>Gender:</strong> {user.gender}
            </p>
          </div>
          <Button className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
