export type AttributeFilterModel = 'brand' | 'caseSize' | 'glassMaterial' | 'movement';
export type PriceFilterModel = 'price';
export type FilterModel = AttributeFilterModel | PriceFilterModel;

export type AttributeFiltersModel = {
  [attribute in AttributeFilterModel]?: string[];
};
export type PriceFiltersModel = {
  [price in PriceFilterModel]?: { label: string; range: { min: number; max: number } }[];
};
export type FiltersModel = AttributeFiltersModel & PriceFiltersModel;

export interface FilterAttribute {
  code: AttributeFilterModel;
  label: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface PriceFilterOption {
  value: { min: number; max: number };
  label: string;
  count: number;
}
