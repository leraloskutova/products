/**
 * Класс, описывающий продукт.
 */

// Should be not class but interface since we are using it as a type 
// when fetching Products
export class Product{
  // Why all fields marked as optional when it's clearly not the case?
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  quantity?: number;
  totalPrice?: number;
}
