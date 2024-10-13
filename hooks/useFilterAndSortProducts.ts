'use client';

import { useCallback, useState, useEffect } from 'react';
import { FilterModel, FiltersModel, AttributeFilterModel } from '@/models/filters';
import { ProductModel } from '@/models/product';
import { FilterAttribute } from '@/models/filters';
import { sortProducts } from '@/helpers/sortingHelpers';
import { getEffectivePrice } from '@/helpers/priceHelper';

interface UseFilterAndSortProductsProps {
  products: ProductModel[];
  availableAttributesFilter: FilterAttribute[];
  usePriceFilter: boolean;
  defaultFilters: FiltersModel;
  defaultSorting: string;
}

export const useFilterAndSortProducts = ({
  products,
  availableAttributesFilter,
  usePriceFilter,
  defaultFilters,
  defaultSorting,
}: UseFilterAndSortProductsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>(sortProducts(products, defaultSorting));
  const [sortBy, setSortBy] = useState<string>(defaultSorting);
  const [filters, setFilters] = useState<FiltersModel>(defaultFilters);

  const applyFilterAndSort = useCallback(
    (newFilters: FiltersModel, sortOption: string) => {
      function filterByAttribute(
        products: ProductModel[],
        attribute: AttributeFilterModel,
        filterValues: string[] | undefined
      ) {
        if (filterValues && filterValues.length > 0) {
          return products.filter((product) => product[attribute] && filterValues.includes(product[attribute]));
        }
        return products;
      }

      let filtered = [...products];
      availableAttributesFilter.forEach((attribute) => {
        filtered = filterByAttribute(filtered, attribute.code, newFilters[attribute.code]);
      });

      if (usePriceFilter && newFilters.price && newFilters.price.length) {
        filtered = filtered.filter((product) => {
          const productPrice = getEffectivePrice(product);
          return newFilters.price!.some(
            (filterPrice) => productPrice >= filterPrice.range.min && productPrice <= filterPrice.range.max
          );
        });
      }

      filtered = sortProducts(filtered, sortOption);
      setFilteredProducts(filtered);
    },
    [products, availableAttributesFilter, usePriceFilter]
  );

  const handleFilterChange = useCallback(
    (newFilters: FiltersModel) => {
      setFilters(newFilters);
      applyFilterAndSort(newFilters, sortBy);
    },
    [applyFilterAndSort, sortBy]
  );

  const handleSortChange = useCallback(
    (sortOption: string) => {
      setSortBy(sortOption);
      applyFilterAndSort(filters, sortOption);
    },
    [filters, applyFilterAndSort]
  );

  const handleRemoveFilter = useCallback(
    (filterKey: FilterModel, value: string) => {
      const updatedFilters: FiltersModel = { ...filters };
      if (updatedFilters[filterKey]) {
        if (filterKey === 'price') {
          updatedFilters[filterKey] = updatedFilters[filterKey].filter((filterValue) => {
            if (typeof filterValue === 'object' && 'label' in filterValue) {
              return filterValue.label !== value;
            }
            return true;
          });
        } else {
          updatedFilters[filterKey] = updatedFilters[filterKey].filter((filterValue) => filterValue !== value);
        }
      }
      setFilters(updatedFilters);
      applyFilterAndSort(updatedFilters, sortBy);
    },
    [filters, sortBy, applyFilterAndSort]
  );

  const handleClearAllFilters = useCallback(() => {
    setFilters(defaultFilters);
    applyFilterAndSort(defaultFilters, sortBy);
  }, [applyFilterAndSort, sortBy, defaultFilters]);

  useEffect(() => {
    applyFilterAndSort(filters, sortBy);
  }, [products, filters, sortBy, applyFilterAndSort]);

  return {
    filteredProducts,
    filters,
    sortBy,
    setFilters,
    handleFilterChange,
    handleSortChange,
    handleRemoveFilter,
    handleClearAllFilters,
  };
};
