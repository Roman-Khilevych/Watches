interface SortingProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="text-watch-white uppercase relative">
      <label htmlFor="sort" className="sm:mr-2">
        Sort
        <span className="hidden sm:inline">:</span>
      </label>
      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        id="sort"
        className={`
          bg-watch-primary uppercase
          absolute sm:static
          inset-0
          opacity-0 sm:opacity-100
          `}
      >
        <option value="price-asc">Price Ascending</option>
        <option value="price-desc">Price Descending</option>
        <option value="name-asc">Name Ascending</option>
        <option value="name-desc">Name Descending</option>
      </select>
    </div>
  );
};

export default Sorting;
