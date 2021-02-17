/**
 * Класс, описывающий продукт.
 */
export class Product{
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public description: string,
    public category: string,
    public image: string,
    public quantity: number,
    public totalPrice: number) {
  }
}
