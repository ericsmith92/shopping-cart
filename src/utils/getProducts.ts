import {Product} from "../types"

export const getProducts = async (): Promise<Product[]> => {
  return await (await fetch(`https://fakestoreapi.com/products`)).json();
};