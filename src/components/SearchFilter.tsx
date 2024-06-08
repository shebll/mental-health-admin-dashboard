interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (isConfusion: boolean) => void;
}

const SearchFilter = ({ onSearch, onFilter }: SearchFilterProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilter(e.target.checked);
  };

  return (
    <div className="flex  mb-4">
      <input
        type="text"
        placeholder="Search by title..."
        className="p-2 border rounded mr-2 w-full"
        onChange={handleSearch}
      />
      <label className="flex items-center">
        <input type="checkbox" className="mr-2" onChange={handleFilter} />
        Confusion only
      </label>
    </div>
  );
};

export default SearchFilter;
