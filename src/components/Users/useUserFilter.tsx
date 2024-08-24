import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useSearchParams } from "next/navigation";

type UserFiltersContextType = {
  filters: UserFilterType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  updateFilters: (newFilters: UserFilterType) => void;
};

const UserFiltersContext = createContext<UserFiltersContextType | undefined>(
  undefined
);

export const UserFiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();

  const getFiltersFromURL = (): UserFilterType => ({
    Name: searchParams.get("Name") || "",
    Gender: searchParams.get("Gender") || "",
  });

  const [filters, setFilters] = useState<UserFilterType>(getFiltersFromURL);

  const resetFilters = useCallback(() => {
    setFilters({ Name: "", Gender: "" });
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const updateFilters = useCallback((newFilters: UserFilterType) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.Gender) params.set("Gender", filters.Gender);
    if (filters.Name) params.set("Name", filters.Name);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [filters]);

  return (
    <UserFiltersContext.Provider
      value={{ filters, handleChange, resetFilters, updateFilters }}
    >
      {children}
    </UserFiltersContext.Provider>
  );
};

export const useUserFilters = () => {
  const context = useContext(UserFiltersContext);
  if (context === undefined) {
    throw new Error("useUserFilters must be used within a UserFiltersProvider");
  }
  return context;
};
