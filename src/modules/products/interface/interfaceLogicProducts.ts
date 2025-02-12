export interface IFunctionCreateProduct {
  image: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  colors: string[];
  sizes: string[];
  skin: string[];
  type: string;
}
