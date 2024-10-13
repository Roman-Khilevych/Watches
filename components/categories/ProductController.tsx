'use client';

import { useState, useMemo } from 'react';
import { ProductModel } from '@/models/product';
import { CategoryModel, GridModeModel } from '@/models/category';
import { FilterAttribute } from '@/models/filters';
import { useFilterAndSortProducts } from '@/hooks/useFilterAndSortProducts';
import { createFilterObject } from '@/helpers/filterHelpers';
import { useConfigStore } from '@/stores/configStore';
import ModalSide from '@/components/widgets/ModalSide';
import ProductGrid from './ProductGrid';
import Sorting from './Sorting';
import Filters from './Filters';
import ActiveFilters from './ActiveFilters';
import GridMode from './GridMode';
import Subcategories from './Subcategories';

interface ProductControllerProps {
  slug: string[];
  products: ProductModel[];
  subcategories: CategoryModel[] | undefined;
}

const ProductController: React.FC<ProductControllerProps> = ({ slug, products, subcategories }) => {
  const { config } = useConfigStore();
  const defaultSorting = useMemo(() => {
    return config?.category.sorting.default || '';
  }, [config]);
  const availableAttributesFilter = useMemo(() => {
    return (config?.category.filters.attributes || []) as FilterAttribute[];
  }, [config]);
  const usePriceFilter = useMemo(() => {
    return config?.category.filters.price.enablePriceFilter || false;
  }, [config]);
  const DefaultFilters = useMemo(
    () => createFilterObject(availableAttributesFilter, usePriceFilter),
    [availableAttributesFilter, usePriceFilter]
  );

  const {
    filteredProducts,
    filters,
    sortBy,
    setFilters,
    handleFilterChange,
    handleSortChange,
    handleRemoveFilter,
    handleClearAllFilters,
  } = useFilterAndSortProducts({
    products,
    availableAttributesFilter,
    usePriceFilter,
    defaultFilters: DefaultFilters,
    defaultSorting,
  });

  const [gridMode, setGridMode] = useState<GridModeModel>('small');

  return (
    <>
      <div className="bg-watch-primary">
        <div className="container flex justify-between p-4">
          <GridMode gridMode={gridMode} setGridMode={setGridMode} />
          <ModalSide title="Filters" buttonClasses="ml-auto mr-4">
            <div className="flex justify-between bg-watch-primary -mx-4 px-4 -mt-8 pt-2 mb-8">
              <ActiveFilters
                appliedFilters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAllFilters={handleClearAllFilters}
              />
            </div>
            <Filters
              products={products}
              appliedFilters={filters}
              setAppliedFilters={setFilters}
              onFilterChange={handleFilterChange}
            />
          </ModalSide>
          <Sorting sortBy={sortBy} onSortChange={handleSortChange} />
        </div>
      </div>
      <div className="bg-watch-primary hidden lg:block">
        <div className="container flex w-full justify-between">
          <ActiveFilters
            appliedFilters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAllFilters={handleClearAllFilters}
          />
        </div>
      </div>
      <div className="container flex flex-wrap mt-8">
        <div className="hidden lg:block lg:w-1/4 xl:w-1/5 pr-4">
          <Subcategories subcategories={subcategories} />
          <Filters
            products={products}
            appliedFilters={filters}
            setAppliedFilters={setFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="w-full lg:w-3/4 xl:w-4/5">
          <ProductGrid slug={slug} products={filteredProducts} gridMode={gridMode} />
        </div>
      </div>
    </>
  );
};

export default ProductController;
