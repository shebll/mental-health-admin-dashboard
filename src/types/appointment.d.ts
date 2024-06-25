export interface Appointment {
  id: number;
  userId: string;
  doctorId: string;
  startTime: string;
  duration: string;
  fees: number;
  clientName: string;
  clientEmail: string;
  clientPhotoUrl: string;
  doctorName: string;
  doctorEmail: string;
  doctorPhotoUrl: string;
  endTime: string;
  status: string;
  location: string;
  cancellationReason?: string;
  rejectionReason?: string | null;
}
