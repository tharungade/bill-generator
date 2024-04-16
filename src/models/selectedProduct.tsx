import { Product } from "./product";

export interface SelectedProduct extends Product
{
    quantity: number;
}