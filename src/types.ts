export type PriceData<T extends InfoType> = T extends 'electricity'
  ? ElecticityPrice
  : GasPrice;

export type ElecticityPrice = {
  date: string;
  type: 'electricity';
  prices: Array<PricePerHour>;
};

export type GasPrice = {
  date: string;
  type: 'gas';
  prices: Array<PricePerHour>;
};

export type PricePerHour = {
  hour: number;
  price: number;
  isNegative: boolean;
};

export type InfoType = 'electricity' | 'gas';
export type ViewType = 'daily' | 'weekly' | 'monthly';
export type NavDirection = 'prev' | 'next';


