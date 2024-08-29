import { useAuth } from "@/context/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDoctors, deleteDoctorById, updateDoctor } from "@/lib/api";
import { useDoctorFilters } from "./useDoctorFilters";
import { toast } from "sonner";
import InfinityScrolling from "../layout/InfinityScrolling";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import DoctorTable from "./DoctorTable";

const DoctorsFeed = () => {
  const { filters } = useDoctorFilters();
  const { token } = useAuth();

  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["doctors", filters, token],
    queryFn: ({ pageParam = 1 }) =>
      fetchDoctors(pageParam, 20, filters, token as string),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    enabled: !!token,
  });

  const allDoctors = data?.pages.flatMap((page) => page.data) || [];

  if (isError) {
    toast.error("Failed to fetch doctors");
  }

  return (
    <div className="container mx-auto p-4">
      <DoctorTable doctors={allDoctors} />
      {(isLoading || isFetchingNextPage) && <DoctorLoading />}
      <InfinityScrolling
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default DoctorsFeed;

const DoctorLoading = () => {
  return (
    <Table>
      <TableBody>
        {[...Array(15)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="w-24 h-6 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-32 h-6 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-24 h-6 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-16 h-6 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-1">
                <div className="w-16 h-8 bg-secondary/50 rounded-md animate-pulse"></div>
                <div className="w-16 h-8 bg-secondary/50 rounded-md animate-pulse"></div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
