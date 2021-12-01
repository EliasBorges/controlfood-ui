export interface Product {
  content: Content[];
}
export interface Content {
  id?: string;
  costValue: number;
  describe: string;
  name: string;
  saleValue: number;
  type: string;
  value: string;
  stocks: Stocks[];
  amountStocks: number;
}

export interface Stocks {
  id?: string;
  name: string;
  value: number;
}

export interface Discount {
  value: string;
  isPositive: boolean;
}
