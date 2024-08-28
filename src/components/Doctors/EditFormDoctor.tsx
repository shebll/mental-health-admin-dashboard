import React, { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import SelectField from "./SelectField";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { egyptianCities } from "@/data/egyptianCities";
import { specializations } from "@/data/specializations";
import { DoctorFormData } from "./DoctorTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctor } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "../ui/button";

function EditFormDoctor({
  form,
  token,
  selectedDoctor,
  setSelectedDoctor,
}: {
  token: string;
  selectedDoctor: DoctorType;
  setSelectedDoctor: Dispatch<SetStateAction<DoctorType | null>>;
  form: UseFormReturn<
    {
      firstName: string;
      lastName: string;
      email: string;
      birthDate: string;
      gender: "male" | "female";
      biography: string;
      city: string;
      location: string;
      sessionFees: number;
      specialization: string;
      id: string;
    },
    any,
    undefined
  >;
}) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: DoctorFormData) =>
      updateDoctor(token as string, selectedDoctor!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Doctor updated successfully");
      setSelectedDoctor(null);
    },
    onError: () => toast.error("Failed to update doctor"),
  });

  const onSubmit = (data: DoctorFormData) => {
    updateMutation.mutate(data);
  };

  const filteredCities = egyptianCities.filter(
    (city) => city.value.trim() !== ""
  );
  const filteredSpecializations = specializations.filter(
    (spec) => spec.value.trim() !== ""
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SelectField
          control={form.control}
          name="gender"
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SelectField
          control={form.control}
          name="city"
          label="City"
          options={filteredCities}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sessionFees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Fees</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SelectField
          control={form.control}
          name="specialization"
          label="Specialization"
          options={filteredSpecializations}
        />
        <Button type="submit">Update Doctor</Button>
      </form>
    </Form>
  );
}

export default EditFormDoctor;
