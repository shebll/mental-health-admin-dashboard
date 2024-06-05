"use client";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/providers/AuthContext";
import { login } from "@/utlis/auth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "you have to enter your password",
  }),
});

export default function InputForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { login: loginUser } = useAuth();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const token = await login(data.email, data.password);
      toast.success("login successfully");
      form.reset();
      loginUser(token);
      router.push((params.get("callback") as string) || "/");
    } catch (error) {
      toast.error("Invalid email or password");
      form.reset();
      console.error("Failed to login:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {form.formState.isSubmitting ? "Loading" : "Login"}
        </Button>
      </form>
    </Form>
  );
}
