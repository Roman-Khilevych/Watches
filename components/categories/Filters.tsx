'use client';

import { useEffect } from 'react';
import { ProductModel } from '@/models/product';
import { AttributeFilterModel, FiltersModel } from '@/models/filters';
import { useConfigStore } from '@/stores/configStore';
import PriceFilter from './PriceFilter';
import AttributeFilter from './AttributeFilter';

interface FiltersProps {
  products: ProductModel[];
  appliedFilters: FiltersModel;
  setAppliedFilters: (filters: FiltersModel) => void;
  onFilterChange: (filters: FiltersModel) => void;
}

const Filters: React.FC<FiltersProps> = ({ products, appliedFilters, setAppliedFilters, onFilterChange }) => {
  const { config } = useConfigStore();
  const priceFilterConfig = config?.category.filters.price;
  const attributeFiltersConfig = config?.category.filters.attributes;

  useEffect(() => {
    onFilterChange(appliedFilters);
  }, [appliedFilters, onFilterChange]);

  return (
    <div>
      {attributeFiltersConfig &&
        attributeFiltersConfig.length &&
        attributeFiltersConfig.map(({ code, label }) => {
          return (
            <AttributeFilter
              key={code}
              attributeCode={code as AttributeFilterModel}
              attributeLabel={label}
              products={products}
              appliedFilters={appliedFilters}
              collapseAfter={config?.category.filters.collapseAfter}
              setAppliedFilters={setAppliedFilters}
            />
          );
        })}

      {priceFilterConfig?.enablePriceFilter && (
        <PriceFilter
          attributeCode="price"
          attributeLabel={priceFilterConfig.label}
          products={products}
          appliedFilters={appliedFilters}
          collapseAfter={config?.category.filters.collapseAfter}
          priceInterval={config?.category.filters.price.priceInterval}
          setAppliedFilters={setAppliedFilters}
        />
      )}
    </div>
  );
};

export default Filters;
