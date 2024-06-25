import { Appointment } from "@/types/appointment";
import Image from "next/image";
import { FC } from "react";

interface AppointmentCardProps {
  appointment: Appointment;
  onClick?: () => void;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  appointment,
  onClick,
}) => {
  return (
    <div
      className="p-4 border rounded shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col justify-start items-start gap-14">
        <div className="flex flex-col md:flex-row justify-start gap-y-8 gap-x-20 items-start">
          <div className="flex flex-col gap-2">
            <h1>Patient:</h1>
            <div className="flex items-start gap-6">
              <Image
                src={
                  appointment.clientPhotoUrl
                    ? appointment.clientPhotoUrl
                    : "/user.png"
                }
                alt="clientPhotoUrl"
                width={100}
                height={100}
                className=" rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold">
                  <strong>{appointment.clientName}</strong>{" "}
                </h2>
                <p>
                  Email: <strong>{appointment.clientEmail} </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Doctor:</h1>
            <div className="flex items-start gap-6">
              <Image
                src={
                  appointment.doctorPhotoUrl
                    ? appointment.doctorPhotoUrl
                    : "/doctor.png"
                }
                alt="clientPhotoUrl"
                width={100}
                height={100}
                className=" rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold">
                  <strong>{appointment.doctorName}</strong>{" "}
                </h2>
                <p>
                  Email: <strong>{appointment.doctorEmail} </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h2 className="text-lg font-bold">derails</h2>

          <p>
            Start Time:{" "}
            <strong>{new Date(appointment.startTime).toLocaleString()} </strong>
          </p>
          <p>
            End Time:{" "}
            <strong>{new Date(appointment.endTime).toLocaleString()} </strong>
          </p>
          <p>
            Fees:<strong> ${appointment.fees} </strong>
          </p>
          {appointment.cancellationReason && (
            <p>
              Cancel Reason:
              <strong> {appointment.cancellationReason}</strong>
            </p>
          )}
          {appointment.rejectionReason && (
            <p>
              Rejection Reason:
              <strong> {appointment.rejectionReason}</strong>
            </p>
          )}
          <p>
            Location:
            <strong>
              {" "}
              {appointment.location ? appointment.location : "not found"}{" "}
            </strong>
          </p>
          <p>
            Status:<strong> {appointment.status} </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
