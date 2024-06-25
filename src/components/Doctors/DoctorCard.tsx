import Image from "next/image";
import { FC } from "react";

interface DoctorCardProps {
  doctor: DoctorType;
  onClick?: () => void;
}

const DoctorCard: FC<DoctorCardProps> = ({ doctor, onClick }) => {
  return (
    <div
      className="p-4 border rounded shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col justify-start items-start gap-14">
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
      </div>
    </div>
  );
};

export default DoctorCard;
