import { useState } from 'react';
import { ProductModel } from '@/models/product';
import { AttributeFilterModel, FiltersModel } from '@/models/filters';
import { getAvailableAttributeOptions } from '@/helpers/filterHelpers';

interface AttributeFilterProps {
  attributeCode: AttributeFilterModel;
  attributeLabel: string;
  products: ProductModel[];
  appliedFilters: FiltersModel;
  collapseAfter: number | undefined;
  setAppliedFilters: (filters: FiltersModel) => void;
}

const AttributeFilter: React.FC<AttributeFilterProps> = ({
  attributeCode,
  attributeLabel,
  products,
  appliedFilters,
  collapseAfter,
  setAppliedFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const availableAttributes = getAvailableAttributeOptions(products, attributeCode, appliedFilters);

  const handleAttributeChange = (attributeOption: string) => {
    const exists = appliedFilters[attributeCode]?.includes(attributeOption);
    const updatedAttributeOptions = exists
      ? appliedFilters[attributeCode]?.filter((attributeItem) => attributeItem !== attributeOption)
      : [...(appliedFilters[attributeCode] || []), attributeOption];
    setAppliedFilters({ ...appliedFilters, [attributeCode]: updatedAttributeOptions });
  };

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }

  if (!availableAttributes?.length) return null;

  return (
    <div className="mb-8">
      <label className="block uppercase font-watch-secondary font-bold mb-3">{attributeLabel}:</label>
      <div>
        {availableAttributes.map((availableAttribute, index) => (
          <div
            key={availableAttribute.value}
            className={`${
              collapseAfter && index >= collapseAfter && !isExpanded ? 'hidden' : ''
            } flex items-center mb-2 hover:text-watch-gray2 transition-colors transition-watch cursor-pointer`}
          >
            <input
              type="checkbox"
              id={`${attributeCode}-${availableAttribute.value}`}
              onChange={() => handleAttributeChange(availableAttribute.value)}
              checked={appliedFilters[attributeCode]?.includes(availableAttribute.value) || false}
              className="flex-shrink-0 mr-2 appearance-none border border-watch-primary bg-watch-white checked:bg-watch-primary w-6 h-6 rounded transition-colors transition-watch cursor-pointer"
            />
            <label htmlFor={`${attributeCode}-${availableAttribute.value}`} className="cursor-pointer">
              {availableAttribute.label} ({availableAttribute.count})
            </label>
          </div>
        ))}

        {collapseAfter && availableAttributes.length > collapseAfter && (
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

export default AttributeFilter;
