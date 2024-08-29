import { useAuth } from "@/context/AuthContext";
import { deleteDoctorById, updateDoctor } from "@/lib/api";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { doctorSchema } from "@/formSchema/updateDoctorSchema";
import ConfirmationPopup from "../layout/ConfirmationPopup";
import EditFormDoctor from "./EditFormDoctor";

interface DoctorCardProps {
  doctors: DoctorType[];
}

export type DoctorFormData = z.infer<typeof doctorSchema>;

const DoctorTable: FC<DoctorCardProps> = ({ doctors }) => {
  const { token } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (doctorId: string) =>
      deleteDoctorById(token as string, doctorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors", "analytics"] });
      toast.success("Doctor deleted successfully");
      setSelectedDoctor(null);
    },
    onError: () => toast.error("Failed to delete doctor"),
  });

  const form = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: selectedDoctor || {},
  });

  useEffect(() => {
    if (selectedDoctor) form.reset(selectedDoctor);
  }, [selectedDoctor, form]);

  return (
    <>
      <ConfirmationPopup
        isOpen={confirmDelete}
        message="All the information for this doctor will be deleted."
        confirmText={`Delete/${selectedDoctor?.firstName}-${selectedDoctor?.lastName}`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => deleteMutation.mutate(selectedDoctor?.id as string)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Session Fees</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{`${doctor.firstName} ${doctor.lastName}`}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>${doctor.sessionFees}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    {selectedDoctor && (
                      <DialogContent
                        className="max-h-[70vh] overflow-y-auto"
                        key={selectedDoctor.id}
                      >
                        <DialogHeader>
                          <DialogTitle>Edit Doctor</DialogTitle>
                        </DialogHeader>
                        <EditFormDoctor
                          token={token as string}
                          selectedDoctor={selectedDoctor}
                          setSelectedDoctor={setSelectedDoctor}
                          form={form}
                        />
                      </DialogContent>
                    )}
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setConfirmDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DoctorTable;
