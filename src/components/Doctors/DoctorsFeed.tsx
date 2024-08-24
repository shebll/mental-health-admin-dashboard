"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDoctors } from "@/lib/api";
import DoctorCard from "@/components/Doctors/DoctorCard";
import DoctorDetails from "@/components/Doctors/DoctorDetails";
import { useDoctorFilters } from "./useDoctorFilters";
import { toast } from "sonner";
import InfinityScrolling from "../layout/InfinityScrolling";

const DoctorsFeed = () => {
  const { filters } = useDoctorFilters();
  const { token } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);

  const {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["doctors", filters, token],
    queryFn: ({ pageParam = 1 }) =>
      fetchDoctors(pageParam, 10, filters, token as string),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    enabled: !!token,
  });

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const handleDelete = (doctorId: string) => {
    // Implement doctor deletion logic
  };

  if (isError) {
    toast.error("Failed to fetch doctors");
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {data?.pages
        .flatMap((page) => page.data)
        .map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onDelete={handleDelete}
            onClick={() => setSelectedDoctor(doctor)}
          />
        ))}
      {data?.pages[0].data.length === 0 && !isLoading && (
        <p>No Doctors Found</p>
      )}
      {(isLoading || isFetchingNextPage) && (
        <div className="flex flex-col gap-4">
          <DoctorLoading />
          <DoctorLoading />
          <DoctorLoading />
          <DoctorLoading />
          <DoctorLoading />
        </div>
      )}
      <InfinityScrolling
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      {selectedDoctor && (
        <DoctorDetails
          doctor={selectedDoctor}
          onDelete={handleDelete}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
};

export default DoctorsFeed;

const DoctorLoading = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-14 bg-secondary/50  p-4 rounded-md ">
      <div className="flex flex-col md:flex-row  justify-start gap-20 items-start w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-start gap-6">
            <span className="w-[100px] h-[100px] rounded-full bg-secondary/50 animate-pulse"></span>

            <div className="flex flex-col gap-2 w-[50%]">
              <h2 className="w-[84%] h-6 bg-secondary/50 rounded-lg animate-pulse"></h2>
              <p className="w-[67%] h-4 bg-secondary/50 rounded-lg animate-pulse"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        <span className="w-[26%] h-4 bg-secondary/50 rounded-md animate-pulse"></span>
        <p className="w-[24%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
        <p className="w-[67%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
      </div>
    </div>
  );
};
