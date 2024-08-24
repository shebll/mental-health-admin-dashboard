import { formatDateTimeRange } from "@/lib/timeAgoFunction";
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
        <div className="w-full flex flex-col lg:flex-row justify-start gap-y-8 gap-x-10 items-start">
          <div className="flex flex-col gap-2">
            <h1>Patient:</h1>
            <div className="flex items-start gap-6">
              <Image
                src={
                  appointment.clientPhotoUrl
                    ? appointment.clientPhotoUrl.startsWith("http://")
                      ? appointment.clientPhotoUrl
                      : "/user.png"
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
            <h1>Doctor: </h1>
            <div className="flex items-start gap-6">
              <Image
                src={
                  appointment.doctorPhotoUrl
                    ? appointment.doctorPhotoUrl.startsWith("http://")
                      ? appointment.doctorPhotoUrl
                      : "/doctor.png"
                    : "/doctor.png"
                }
                alt="doctorPhotoUrl"
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
          <h2 className="text-lg font-bold">details</h2>

          <p>
            Duration:{" "}
            <strong>
              {formatDateTimeRange(appointment.startTime, appointment.endTime)}{" "}
            </strong>
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
