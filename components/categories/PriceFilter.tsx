import { useState } from 'react';
import { ProductModel } from '@/models/product';
import { PriceFilterModel, FiltersModel } from '@/models/filters';
import { getAvailablePriceOptions } from '@/helpers/filterHelpers';

interface PriceFilterProps {
  attributeCode: PriceFilterModel;
  attributeLabel: string;
  products: ProductModel[];
  appliedFilters: FiltersModel;
  collapseAfter: number | undefined;
  priceInterval: number | undefined;
  setAppliedFilters: (filters: FiltersModel) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  attributeCode,
  attributeLabel,
  products,
  appliedFilters,
  collapseAfter,
  priceInterval,
  setAppliedFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const availablePriceRanges = getAvailablePriceOptions(products, 'price', appliedFilters, priceInterval);

  const handlePriceChange = (attributeOption: { label: string; range: { min: number; max: number } }) => {
    const exists = appliedFilters[attributeCode]?.some((filter) => filter.label === attributeOption.label);
    const updatedAttributeOptions = exists
      ? appliedFilters[attributeCode]?.filter((attributeItem) => attributeItem.label !== attributeOption.label)
      : [...(appliedFilters[attributeCode] || []), attributeOption];
    setAppliedFilters({ ...appliedFilters, [attributeCode]: updatedAttributeOptions });
  };

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }

  if (!availablePriceRanges?.length) return null;

  return (
    <div className="mb-8">
      <label className="block uppercase font-watch-secondary font-bold mb-3">{attributeLabel}:</label>
      <div>
        {availablePriceRanges.map((availableAttribute, index) => (
          <div
            key={availableAttribute.label}
            className={`${
              collapseAfter && index >= collapseAfter && !isExpanded ? 'hidden' : ''
            } flex items-center mb-2 hover:text-watch-gray2 transition-colors transition-watch cursor-pointer`}
          >
            <input
              type="checkbox"
              id={`${attributeCode}-${availableAttribute.label}`}
              onChange={() =>
                handlePriceChange({
                  label: availableAttribute.label,
                  range: { min: availableAttribute.value.min, max: availableAttribute.value.max },
                })
              }
              checked={
                appliedFilters[attributeCode]?.some((filter) => filter.label === availableAttribute.label) || false
              }
              className="flex-shrink-0 mr-2 appearance-none border border-watch-primary bg-watch-white checked:bg-watch-primary w-6 h-6 rounded transition-colors transition-watch cursor-pointer"
            />
            <label htmlFor={`${attributeCode}-${availableAttribute.label}`} className="cursor-pointer">
              {availableAttribute.label} ({availableAttribute.count})
            </label>
          </div>
        ))}

        {collapseAfter && availablePriceRanges.length > collapseAfter && (
          <button
            type="button"
            onClick={toggleExpanded}
            className="text-watch-primary hover:text-watch-gray2 transition-colors transition-watch"
          >
            {isExpanded ? '- Show Less' : '+ Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PriceFilter;
