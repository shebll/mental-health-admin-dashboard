import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAppointments } from "@/lib/api";
import { useAppointmentFilters } from "./useAppointmentFilter";
import InfinityScrolling from "../layout/InfinityScrolling";
import AppointmentDetails from "./AppointmentDetails";
import AppointmentTable from "./AppointmentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      fetchAppointments(pageParam, 20, filters, token as string),
    getNextPageParam: (data) => (data.hasNext ? data.page + 1 : undefined),
    queryKey: ["appointments", filters, token],
    enabled: !!token,
  });

  const allAppointments = data?.pages.flatMap((page) => page.data) || [];
  return (
    <div className="flex-1">
      <div className="flex flex-row-reverse gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <AppointmentTable
            appointments={allAppointments}
            onRowClick={(appointment) => setSelectedAppointment(appointment)}
          />
          {data?.pages[0].data.length === 0 && !isLoading && (
            <p>No Appointments Found</p>
          )}
          {(isLoading || isFetchingNextPage) && <AppointmentLoading />}
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
    <Table>
      {/* <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Fees</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {[...Array(12)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary/50 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-secondary/50 rounded animate-pulse"></div>
                  <div className="w-32 h-3 bg-secondary/50 rounded animate-pulse"></div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary/50 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-secondary/50 rounded animate-pulse"></div>
                  <div className="w-32 h-3 bg-secondary/50 rounded animate-pulse"></div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="w-32 h-4 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-24 h-4 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-16 h-4 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-20 h-6 bg-secondary/50 rounded-full animate-pulse"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
