import { specializations } from "@/data/specializations";
import { egyptianCities } from "@/data/egyptianCities";
import { z } from "zod";

const cityValues = egyptianCities.map((city) => city.value) as [
  string,
  ...string[]
];
const specializationValues = specializations.map((spec) => spec.value) as [
  string,
  ...string[]
];

export const doctorSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(64, "First name cannot exceed 64 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(64, "Last name cannot exceed 64 characters"),
  email: z.string().email("Invalid email address"),
  birthDate: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), "Invalid birth date format"), // Validate if it's a valid date
  gender: z.enum(["male", "female"], {
    message: "Gender must be either male or female",
  }),
  biography: z.string().min(2, "Biography must be at least 2 characters"),
  city: z.enum(cityValues, { message: "Invalid city selected" }),
  location: z.string().min(2, "Location must be at least 2 characters"),
  sessionFees: z.preprocess(
    (value) => parseFloat(value as string),
    z.number().positive("Session fees must be a positive number")
  ),
  specialization: z.enum(specializationValues, {
    message: "Invalid specialization selected",
  }),
  id: z.string().uuid("Invalid doctor ID format"), // Assuming ID is UUID, adjust if different
});
