import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDateTimeRange } from "@/lib/timeAgoFunction";

interface AppointmentTableProps {
  appointments: Appointment[];
  onRowClick?: (appointment: Appointment) => void;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  onRowClick,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Fees</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow
            key={appointment.id}
            onClick={() => onRowClick?.(appointment)}
            className="cursor-pointer hover:bg-secondary/50"
          >
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={appointment.clientPhotoUrl || "/user.png"}
                    alt={appointment.clientName}
                  />
                  <AvatarFallback>
                    {appointment.clientName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold">{appointment.clientName}</div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.clientEmail}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={appointment.doctorPhotoUrl || "/doctor.png"}
                    alt={appointment.doctorName}
                  />
                  <AvatarFallback>
                    {appointment.doctorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold">{appointment.doctorName}</div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.doctorEmail}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              {formatDateTimeRange(appointment.startTime, appointment.endTime)}
            </TableCell>
            <TableCell>{appointment.location || "N/A"}</TableCell>
            <TableCell>${appointment.fees}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(appointment.status)}>
                {appointment.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const getStatusVariant = (
  status: string
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "default";
    case "pending":
      return "secondary";
    case "cancelled":
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

export default AppointmentTable;
