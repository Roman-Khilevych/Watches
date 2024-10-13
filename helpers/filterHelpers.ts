import { ProductModel } from '@/models/product';
import {
  FiltersModel,
  FilterModel,
  AttributeFilterModel,
  PriceFilterModel,
  FilterOption,
  PriceFilterOption,
} from '@/models/filters';
import { formatPrice, getEffectivePrice } from '@/helpers/priceHelper';

export function createFilterObject(
  keys: {
    code: AttributeFilterModel;
    label: string;
  }[],
  includePrice: boolean
) {
  const filterObject = keys.reduce((acc, key) => {
    acc[key.code] = [];
    return acc;
  }, {} as { [key: string]: FilterOption[] });

  if (includePrice) {
    filterObject.price = [];
  }

  return filterObject;
}

export function applyFilters(
  products: ProductModel[],
  appliedFilters: FiltersModel,
  excludeFilterKey?: FilterModel
): ProductModel[] {
  return products.filter((product) => {
    for (const filterKey in appliedFilters) {
      if (excludeFilterKey === filterKey) continue;

      if (filterKey === 'price') {
        const filterValues = appliedFilters[filterKey as PriceFilterModel];
        if (!filterValues || !Array.isArray(filterValues) || !filterValues.length) continue;

        const productPrice = getEffectivePrice(product);

        if (
          !filterValues.some(
            (rangeValue) => productPrice >= rangeValue.range.min && productPrice <= rangeValue.range.max
          )
        ) {
          return false;
        }
      } else {
        const filterValues = appliedFilters[filterKey as AttributeFilterModel];
        const productValue = product[filterKey as AttributeFilterModel];

        if (!filterValues || !Array.isArray(filterValues) || !filterValues.length) continue;

        if (!productValue || (productValue && !filterValues.includes(productValue))) {
          return false;
        }
      }
    }

    return true;
  });
}

export function getAvailableAttributeOptions(
  products: ProductModel[],
  filterKey: AttributeFilterModel,
  appliedFilters: FiltersModel
): FilterOption[] {
  const filteredProducts = applyFilters(products, appliedFilters, filterKey);
  const optionCounts: { [value: string]: number } = {};
  const selectedOptions = appliedFilters[filterKey] ?? [];

  filteredProducts.forEach((product) => {
    const optionValue = product[filterKey];

    if (optionValue) {
      if (!optionCounts[optionValue]) {
        optionCounts[optionValue] = 0;
      }
      optionCounts[optionValue]++;
    }
  });

  selectedOptions.forEach((selectedOption) => {
    if (!(selectedOption in optionCounts)) {
      optionCounts[selectedOption] = 0;
    }
  });

  const options = Object.entries(optionCounts).map(([value, count]) => ({
    value,
    label: value,
    count,
  }));
  options.sort((a, b) => a.label.localeCompare(b.label));

  return options;
}

export function getAvailablePriceOptions(
  products: ProductModel[],
  filterKey: PriceFilterModel,
  appliedFilters: FiltersModel,
  priceInterval: number = 1
): PriceFilterOption[] {
  const filteredProducts = applyFilters(products, appliedFilters, filterKey);
  const priceRangesMap: { [value: string]: PriceFilterOption } = {};
  const selectedOptions = appliedFilters[filterKey] ?? [];

  filteredProducts.forEach((product) => {
    const price = getEffectivePrice(product);
    const minRange = Math.floor(price / priceInterval) * priceInterval;
    const maxRange = Math.ceil(price / priceInterval) * priceInterval;
    const rangeKey = `${formatPrice(String(minRange))} - ${formatPrice(String(maxRange))}`;
    const range = { min: minRange, max: maxRange };

    if (priceRangesMap[rangeKey]) {
      priceRangesMap[rangeKey].count += 1;
    } else {
      priceRangesMap[rangeKey] = {
        value: range,
        label: `${formatPrice(String(range.min))} - ${formatPrice(String(range.max))}`,
        count: 1,
      };
    }
  });

  selectedOptions.forEach((selectedOption) => {
    const label = selectedOption.label;
    if (!(label in priceRangesMap)) {
      priceRangesMap[label] = {
        value: selectedOption.range,
        label: label,
        count: 0,
      };
    }
  });

  const options = Object.values(priceRangesMap);
  options.sort((a, b) => a.value.min - b.value.min);

  return options;
}
