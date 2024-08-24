import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAppointments } from "@/lib/api";
import { useAppointmentFilters } from "./useAppointmentFilter";
import AppointmentCard from "./AppointmentCard";
import InfinityScrolling from "../layout/InfinityScrolling";
import AppointmentDetails from "./AppointmentDetails";

function AppointmentsFeed() {
  const { filters } = useAppointmentFilters();
  const { token } = useAuth();
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const {
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
    isError,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchAppointments(pageParam, 10, filters, token as string),
    getNextPageParam: (data) => (data.hasNext ? data.page + 1 : undefined),
    queryKey: ["appointments", filters, token],
    enabled: !!token,
  });

  return (
    <div className="flex-1">
      <div className="flex flex-row-reverse gap-6">
        <div className="flex-1 flex flex-col gap-4">
          {data?.pages
            .flatMap((page) => page.data)
            .map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onClick={() => setSelectedAppointment(appointment)}
              />
            ))}
          {data?.pages[0].data.length === 0 && !isLoading && (
            <p>No Appointments Found</p>
          )}
          {(isLoading || isFetchingNextPage) && (
            <div className="flex flex-col gap-4">
              <AppointmentLoading />
              <AppointmentLoading />
              <AppointmentLoading />
            </div>
          )}
        </div>
      </div>
      <InfinityScrolling
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
}

export default AppointmentsFeed;

const AppointmentLoading = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-14 bg-secondary/50 p-4 rounded-md ">
      <div className="flex flex-col md:flex-row  justify-start gap-20 items-start w-full">
        <div className="flex flex-col gap-4 w-full">
          <span className="w-[40%] h-4 bg-secondary/50 rounded-lg animate-pulse"></span>
          <div className="flex items-start gap-6">
            <span className="w-[100px] h-[100px] rounded-full bg-secondary/50 animate-pulse"></span>

            <div className="flex flex-col gap-2 w-[50%]">
              <h2 className="w-[84%] h-6 bg-secondary/50 rounded-lg animate-pulse"></h2>
              <p className="w-[67%] h-4 bg-secondary/50 rounded-lg animate-pulse"></p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <span className="w-[40%] h-4 bg-secondary/50 rounded-lg  animate-pulse"></span>
          <div className="flex items-start gap-6 w-full">
            <span className="w-[100px] h-[100px] rounded-full bg-secondary/50 animate-pulse"></span>
            <div className="flex flex-col gap-2 w-[50%]">
              <h2 className="w-[74%] h-6 bg-secondary/50 rounded-lg animate-pulse"></h2>
              <p className="w-[87%] h-4 bg-secondary/50 rounded-lg animate-pulse"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        <span className="w-[26%] h-4 bg-secondary/50 rounded-md animate-pulse"></span>
        <p className="w-[24%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
        <p className="w-[67%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
        <p className="w-[47%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
        <p className="w-[68%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
        <p className="w-[37%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
      </div>
    </div>
  );
};
