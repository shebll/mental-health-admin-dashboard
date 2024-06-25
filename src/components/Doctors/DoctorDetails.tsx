import { Appointment } from "@/types/appointment";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
interface DoctorDetailsProps {
  doctor: DoctorType | null;
  onClose: () => void;
}

const DoctorDetails: FC<DoctorDetailsProps> = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex justify-center items-center z-[20] p-2">
      <span
        onClick={onClose}
        className=" absolute inset-0 w-full h-screen z-[1]"
      />
      <div className="flex flex-col justify-start items-start gap-14 bg-secondary p-4 md:px-8 py-4 rounded-md z-[2]">
        <div className="flex flex-col md:flex-row justify-start gap-y-8 gap-x-20 items-start">
          <div className="flex flex-col gap-2">
            <h1>Doctor:</h1>
            <div className="flex items-start gap-6">
              <Image
                src={doctor.photoUrl ? doctor.photoUrl : "/user.png"}
                alt="clientPhotoUrl"
                width={100}
                height={100}
                className=" rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold">
                  <strong>{doctor.firstName + doctor.lastName}</strong>{" "}
                </h2>
                <p>
                  Email: <strong>{doctor.email} </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h2 className="text-lg font-bold">details</h2>
          <p>
            sessionFees:<strong> ${doctor.sessionFees} </strong>
          </p>
          <p>
            Location:
            <strong> {doctor.location ? doctor.location : "not found"} </strong>
          </p>
          <p>
            city:<strong> {doctor.city} </strong>
          </p>
          <p>
            gender:<strong> {doctor.gender} </strong>
          </p>
          <p>
            biography:<strong> {doctor.biography} </strong>
          </p>
          <p>
            specialization:<strong> {doctor.specialization} </strong>
          </p>
        </div>
        <Button className="w-full mt-6" onClick={onClose}>
          close
        </Button>
      </div>
    </div>
  );
};

export default DoctorDetails;
