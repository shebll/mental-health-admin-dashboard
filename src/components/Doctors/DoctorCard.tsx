import { useAuth } from "@/context/AuthContext";
import { deleteDoctorById } from "@/lib/api";
import { Trash } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { toast } from "sonner";
import ConfirmationPopup from "../layout/ConfirmationPopup";

interface DoctorCardProps {
  onDelete: (userId: string) => void;
  doctor: DoctorType;
  onClick?: () => void;
}

const DoctorCard: FC<DoctorCardProps> = ({ doctor, onClick, onDelete }) => {
  const { token } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const handleDelete = async () => {
    if (token) {
      const response = await deleteDoctorById(token, doctor.id);
      if (response) {
        toast.success("Doctor Deleted Successfully");
        onDelete(doctor.id);
      } else {
        toast.error("Failed to delete doctor");
      }
    }
  };
  return (
    <>
      <ConfirmationPopup
        isOpen={confirmDelete}
        message={`All the information for this doctor will be deleted.`}
        confirmText={`Delete/${doctor.firstName}-${doctor.lastName}`}
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
              <h1>Doctor:</h1>
              <div className="flex items-start gap-6">
                <Image
                  src={"/doctor.png"}
                  alt="doctor PhotoUrl"
                  width={100}
                  height={100}
                  className=" rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold">
                    <strong>{doctor.firstName + " " + doctor.lastName}</strong>{" "}
                  </h2>
                  <p>
                    Email: <strong>{doctor.email} </strong>
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
              sessionFees:<strong> ${doctor.sessionFees} </strong>
            </p>
            <p>
              Location:
              <strong>
                {" "}
                {doctor.location ? doctor.location : "not found"}{" "}
              </strong>
            </p>
            <p>
              city: <strong>{doctor.city} </strong>
            </p>
            <p>
              gender: <strong>{doctor.gender} </strong>
            </p>
            <p>
              biography: <strong>{doctor.biography} </strong>
            </p>
            <p>
              specialization: <strong>{doctor.specialization} </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
