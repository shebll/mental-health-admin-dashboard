import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useSearchParams } from "next/navigation";

type AppointmentFilterType = {
  DoctorId: string | undefined;
  UserId: string | undefined;
  StartDate: string | undefined;
  EndDate: string | undefined;
  Status: string | undefined;
};

type AppointmentFiltersContextType = {
  filters: AppointmentFilterType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (status: string) => void;
  resetFilters: () => void;
  updateFilters: (newFilters: AppointmentFilterType) => void;
};

const AppointmentFiltersContext = createContext<
  AppointmentFiltersContextType | undefined
>(undefined);

export const AppointmentFiltersProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const searchParams = useSearchParams();

  const getFiltersFromURL = (): AppointmentFilterType => ({
    DoctorId: searchParams.get("DoctorId") || undefined,
    UserId: searchParams.get("UserId") || undefined,
    StartDate: searchParams.get("StartDate") || undefined,
    EndDate: searchParams.get("EndDate") || undefined,
    Status: searchParams.get("Status") || undefined,
  });

  const [filters, setFilters] =
    useState<AppointmentFilterType>(getFiltersFromURL);

  const resetFilters = useCallback(() => {
    setFilters({
      DoctorId: "",
      UserId: "",
      StartDate: "",
      EndDate: "",
      Status: "",
    });
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, Status: status }));
  }, []);

  const updateFilters = useCallback((newFilters: AppointmentFilterType) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [filters]);

  return (
    <AppointmentFiltersContext.Provider
      value={{
        filters,
        handleChange,
        handleStatusChange,
        resetFilters,
        updateFilters,
      }}
    >
      {children}
    </AppointmentFiltersContext.Provider>
  );
};

export const useAppointmentFilters = () => {
  const context = useContext(AppointmentFiltersContext);
  if (context === undefined) {
    throw new Error(
      "useAppointmentFilters must be used within a AppointmentFiltersProvider"
    );
  }
  return context;
};
