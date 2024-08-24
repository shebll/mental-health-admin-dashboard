import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useSearchParams } from "next/navigation";

type FilterType = {
  Name: string;
  Specialization: string;
  Gender: string;
  City: string;
  MinFees: number;
  MaxFees: number;
};

type DoctorFiltersContextType = {
  filters: FilterType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  handleCityChange: (city: string) => void;
  handleSpecializationChange: (specialization: string) => void;
  handleFeesChange: (event: Event, newValue: number | number[]) => void;
};

const DoctorFiltersContext = createContext<
  DoctorFiltersContextType | undefined
>(undefined);

export const DoctorFiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();

  const getFiltersFromURL = (): FilterType => ({
    Name: searchParams.get("Name") || "",
    Specialization: searchParams.get("Specialization") || "",
    Gender: searchParams.get("Gender") || "",
    City: searchParams.get("City") || "",
    MinFees: parseInt(searchParams.get("MinFees") || "0", 10),
    MaxFees: parseInt(searchParams.get("MaxFees") || "1000", 10),
  });

  const [filters, setFilters] = useState<FilterType>(getFiltersFromURL);

  const resetFilters = useCallback(() => {
    setFilters({
      Name: "",
      Specialization: "",
      Gender: "",
      City: "",
      MinFees: 0,
      MaxFees: 1000,
    });
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCityChange = useCallback((city: string) => {
    setFilters((prev) => ({ ...prev, City: city }));
  }, []);

  const handleSpecializationChange = useCallback((specialization: string) => {
    setFilters((prev) => ({ ...prev, Specialization: specialization }));
  }, []);

  const handleFeesChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setFilters((prev) => ({
        ...prev,
        MinFees: (newValue as number[])[0],
        MaxFees: (newValue as number[])[1],
      }));
    },
    []
  );

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [filters]);

  return (
    <DoctorFiltersContext.Provider
      value={{
        filters,
        handleChange,
        resetFilters,
        handleCityChange,
        handleSpecializationChange,
        handleFeesChange,
      }}
    >
      {children}
    </DoctorFiltersContext.Provider>
  );
};

export const useDoctorFilters = () => {
  const context = useContext(DoctorFiltersContext);
  if (context === undefined) {
    throw new Error(
      "useDoctorFilters must be used within a DoctorFiltersProvider"
    );
  }
  return context;
};
