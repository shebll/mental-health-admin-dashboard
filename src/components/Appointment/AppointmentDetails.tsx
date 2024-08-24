import { FC } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatDateTimeRange } from "@/lib/timeAgoFunction";
interface AppointmentDetailsProps {
  appointment: Appointment | null;
  onClose: () => void;
}

const AppointmentDetails: FC<AppointmentDetailsProps> = ({
  appointment,
  onClose,
}) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex justify-center items-center z-[20] p-2">
      <span
        onClick={onClose}
        className=" absolute inset-0 w-full h-screen z-[1]"
      />
      <div className="flex flex-col justify-start items-start gap-14 bg-secondary p-4 md:px-8 py-4 rounded-md z-[2]">
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
        <Button className="w-full mt-6" onClick={onClose}>
          close
        </Button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
