import { FilterModel, AttributeFilterModel, FiltersModel } from '@/models/filters';
import Icon from '@/components/UI/Icon';

interface ActiveFiltersProps {
  appliedFilters: FiltersModel;
  onRemoveFilter: (key: AttributeFilterModel, value: string) => void;
  onClearAllFilters: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ appliedFilters, onRemoveFilter, onClearAllFilters }) => {
  const hasActiveFilters = Object.values(appliedFilters).some((filter) => filter && filter.length > 0);

  return (
    <>
      {hasActiveFilters && (
        <div className="w-full mb-4 flex flex-wrap items-start gap-x-4 gap-y-2">
          <span className="hidden lg:block text-watch-white uppercase">Active Filters:</span>

          {Object.keys(appliedFilters).map((filterKey) => {
            const filterValues = appliedFilters[filterKey as FilterModel];
            return filterValues?.map((value) => {
              const filterLabel = typeof value === 'object' && 'label' in value ? value.label : value;
              return (
                <button
                  key={`${filterKey}-${filterLabel}`}
                  className="text-watch-white hover:text-watch-gray2 flex items-center group transition-colors transition-watch"
                  onClick={() => onRemoveFilter(filterKey as AttributeFilterModel, filterLabel)}
                >
                  {filterLabel}
                  <span className="text-watch-red1 group-hover:text-watch-red2 transition-colors transition-watch ml-2">
                    <Icon name="close" className="w-4" />
                  </span>
                </button>
              );
            });
          })}

          <button
            type="button"
            onClick={onClearAllFilters}
            className="text-watch-red1 hover:text-watch-red2 transition-colors transition-watch uppercase"
          >
            Clear All
          </button>
        </div>
      )}
    </>
  );
};

export default ActiveFilters;
