"use client";

import AppointmentsFeed from "@/components/Appointment/AppointmentsFeed";
import AppointmentsFilter from "@/components/Appointment/AppointmentsFilter";
import { AppointmentFiltersProvider } from "@/components/Appointment/useAppointmentFilter";

const AppointmentsPage = () => {
  return (
    <AppointmentFiltersProvider>
      <div className="container mx-auto p-4 max-w-[1200px]">
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        <div className="flex gap-4">
          <AppointmentsFeed />
          <AppointmentsFilter />
        </div>
      </div>
    </AppointmentFiltersProvider>
  );
};

export default AppointmentsPage;
