import { useAuth } from "@/context/AuthContext";
import { deleteDoctorById } from "@/lib/api";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import ConfirmationPopup from "../layout/ConfirmationPopup";
import { Input } from "../ui/input";

interface DoctorType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
  biography: string;
  city: string;
  location: string;
  sessionFees: number;
  specialization: string;
  photoUrl: string;
}

interface DoctorCardProps {
  onDelete: (userId: string) => void;
  doctor: DoctorType;
  onClick?: () => void;
}

const schema = z.object({
  firstName: z.string().min(2).max(64),
  lastName: z.string().min(2).max(64),
  email: z.string().email(),
  birthDate: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18 && age <= 60;
  }, "Age must be between 18 and 60"),
  gender: z.enum(["male", "female"]),
  biography: z.string(),
  city: z.string(),
  location: z.string(),
  sessionFees: z.number(),
  specialization: z.string(),
  photo: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

const DoctorCard = ({ doctor, onClick, onDelete }: DoctorCardProps) => {
  const { token } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      birthDate: doctor.birthDate,
      gender: doctor.gender as "male" | "female",
      biography: doctor.biography,
      city: doctor.city,
      location: doctor.location,
      sessionFees: doctor.sessionFees,
      specialization: doctor.specialization,
    },
  });

  const handleDelete = async () => {
    if (token) {
      try {
        const response = await deleteDoctorById(token, doctor.id);
        toast.success("Doctor Deleted Successfully");
        onDelete(doctor.id);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // if api provider given error
          if (error.response) {
            toast.error(`Error :${error.response.data.message}`);
          } else {
            toast.error(`Error :${error.message}`);
          }
        } else if (error instanceof Error) {
          toast.error(`${error.message}`);
        } else {
          toast.error("Something went wrong try again");
        }
      } finally {
      }
    }
  };
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "photo" && data.photo instanceof File) {
          formData.append(key, data.photo);
        } else {
          formData.append(key, String(data[key as keyof FormData]));
        }
      });

      const response = await axios.put(`/api/doctors/${doctor.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Doctor Updated Successfully");
        setIsEditing(false);
      } else {
        toast.error("Failed to update doctor");
      }
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((key) => {
          toast.error(`${key}: ${serverErrors[key][0]}`);
        });
      } else {
        toast.error("An error occurred while updating the doctor");
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
      <div className="p-4 border rounded shadow-md cursor-pointer">
        {!isEditing ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) {
                onClick();
              }
            }}
          >
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">Doctor:</h1>
                  <div className="flex items-start gap-6">
                    <Image
                      src={
                        doctor.photoUrl
                          ? doctor.photoUrl.startsWith("http://")
                            ? doctor.photoUrl
                            : "/doctor.png"
                          : "/doctor.png"
                      }
                      alt="Doctor Photo"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-bold">
                        {doctor.firstName} {doctor.lastName}
                      </h2>
                      <p>
                        Email: <strong>{doctor.email}</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                  >
                    <Edit />
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
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="text-lg font-bold">Details</h2>
                <p>
                  Session Fees: <strong>${doctor.sessionFees}</strong>
                </p>
                <p>
                  Location: <strong>{doctor.location || "Not found"}</strong>
                </p>
                <p>
                  City: <strong>{doctor.city}</strong>
                </p>
                <p>
                  Gender: <strong>{doctor.gender}</strong>
                </p>
                <p>
                  Biography: <strong>{doctor.biography}</strong>
                </p>
                <p>
                  Specialization: <strong>{doctor.specialization}</strong>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}

            <Input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}

            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <Input type="date" {...register("birthDate")} />
            {errors.birthDate && (
              <p className="text-red-500">{errors.birthDate.message}</p>
            )}

            <div className="mb-2">
              <label>
                <input
                  type="radio"
                  value="male"
                  {...register("gender")}
                  className="mr-1"
                />
                Male
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  value="female"
                  {...register("gender")}
                  className="mr-1"
                />
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}

            <Input
              type="text"
              placeholder="Biography"
              {...register("biography")}
            />
            {errors.biography && (
              <p className="text-red-500">{errors.biography.message}</p>
            )}

            <Input type="text" placeholder="City" {...register("city")} />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}

            <Input
              type="text"
              placeholder="Location"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}

            <Input
              type="number"
              placeholder="Session Fees"
              {...register("sessionFees", { valueAsNumber: true })}
            />
            {errors.sessionFees && (
              <p className="text-red-500">{errors.sessionFees.message}</p>
            )}

            <Input
              type="text"
              placeholder="Specialization"
              {...register("specialization")}
            />
            {errors.specialization && (
              <p className="text-red-500">{errors.specialization.message}</p>
            )}

            <Input type="file" {...register("photo")} />

            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded"
              disabled={!isValid}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="p-2 bg-gray-500 text-white rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export default DoctorCard;
