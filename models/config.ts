export interface ConfigModel {
  store: StoreInfo;
  homePage: HomePage;
  category: CategorySettings;
}

export interface StoreInfo {
  name: string;
  description: string;
  info: string;
  copyright: string;
}

export interface HomePage {
  banner: Banner;
  sliders: Sliders;
}

export interface Banner {
  title: string;
  subtitle: string;
  text: string;
  imageUrl: string;
}

export interface Sliders {
  newProducts: SliderSettings;
  onSaleProducts: SliderSettings;
  recentlyViewed: SliderSettings;
}

export interface SliderSettings {
  enabled: boolean;
  title: string;
}

export interface CategorySettings {
  filters: Filters;
  sorting: Sorting;
}

export interface Filters {
  collapseAfter: number;
  price: PriceFilter;
  attributes: AttributeFilter[];
}

export interface PriceFilter {
  enablePriceFilter: boolean;
  priceInterval: number;
  label: string;
}

export interface AttributeFilter {
  code: string;
  label: string;
}

export interface Sorting {
  default: string;
}
