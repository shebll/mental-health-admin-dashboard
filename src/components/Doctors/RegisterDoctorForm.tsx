"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api";

const schema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be between 2 and 64 characters")
    .max(64),
  lastName: z
    .string()
    .min(2, "Last name must be between 2 and 64 characters")
    .max(64),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  birthDate: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18 && age <= 60;
  }, "Age must be between 18 and 60"),
  gender: z.enum(["male", "female"]),
  role: z.literal("Doctor"),
});

type FormData = z.infer<typeof schema>;

const RegisterDoctorForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      toast.success("User registered successfully");
    },
    onError: (error: any) => {
      if (error?.errors) {
        error.errors.forEach((err: any) => {
          if (err.code === "Users.EmailNotUnique") {
            setError("email", {
              type: "manual",
              message: err.description,
            });
          }
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    },
    retry: 1,
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded shadow"
    >
      <h2 className="text-2xl mb-4">Register New Doctor</h2>

      <Input
        type="text"
        placeholder="First Name"
        {...register("firstName")}
        className="mb-2"
      />
      {errors.firstName && (
        <p className="text-red-500">{errors.firstName.message}</p>
      )}

      <Input
        type="text"
        placeholder="Last Name"
        {...register("lastName")}
        className="mb-2"
      />
      {errors.lastName && (
        <p className="text-red-500">{errors.lastName.message}</p>
      )}

      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="mb-2"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="mb-2"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Input
        type="date"
        placeholder="Birth Date"
        {...register("birthDate")}
        className="mb-2"
      />
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
      {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

      <input
        type="text"
        value="Doctor"
        {...register("role")}
        className="hidden"
      />
      {errors.role && <p className="text-red-500">{errors.role.message}</p>}

      <button
        type="submit"
        className={`p-2 ${
          isValid ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"
        } text-white rounded w-full`}
        disabled={!isValid || mutation.isPending}
      >
        {mutation.isPending ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterDoctorForm;
