import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "you have to enter your password",
  }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
