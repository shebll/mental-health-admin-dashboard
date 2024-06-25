import { useAuth } from "@/context/AuthContext";
import { deleteUserById } from "@/lib/api";
import { UserType } from "@/types/UserType";
import { Trash } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface UserCardProps {
  User: UserType;
  onClick?: () => void;
}

const UserCard: FC<UserCardProps> = ({ User, onClick }) => {
  const { token } = useAuth();

  return (
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
                className=" rounded-full"
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
            onClick={() => token && deleteUserById(token, User.id)}
            className=""
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
  );
};

export default UserCard;
