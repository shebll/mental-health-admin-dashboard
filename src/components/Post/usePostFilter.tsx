import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useSearchParams } from "next/navigation";

type PostFiltersContextType = {
  filters: PostFilterType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  updateFilters: (newFilters: PostFilterType) => void;
};

const PostFiltersContext = createContext<PostFiltersContextType | undefined>(
  undefined
);

export const PostFiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();

  const getFiltersFromURL = (): PostFilterType => ({
    Title: searchParams.get("Title") || undefined,
    Content: searchParams.get("Content") || undefined,
    Username: searchParams.get("Username") || undefined,
    StartTime: searchParams.get("StartTime") || undefined,
    EndTime: searchParams.get("EndTime") || undefined,
    ConfessionsOnly: searchParams.get("ConfessionsOnly") === "true",
  });

  const [filters, setFilters] = useState<PostFilterType>(getFiltersFromURL);

  const resetFilters = useCallback(() => {
    setFilters({
      Title: "",
      Content: "",
      Username: "",
      StartTime: "",
      EndTime: "",
      ConfessionsOnly: false,
    });
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFilters((prev) => ({ ...prev, [name]: checked }));
    },
    []
  );

  const updateFilters = useCallback((newFilters: PostFilterType) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value)
        params.set(key, typeof value === "boolean" ? value.toString() : value);
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [filters]);

  return (
    <PostFiltersContext.Provider
      value={{
        filters,
        handleChange,
        handleCheckboxChange,
        resetFilters,
        updateFilters,
      }}
    >
      {children}
    </PostFiltersContext.Provider>
  );
};

export const usePostFilters = () => {
  const context = useContext(PostFiltersContext);
  if (context === undefined) {
    throw new Error("usePostFilters must be used within a PostFiltersProvider");
  }
  return context;
};
