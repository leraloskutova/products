export interface ProductListItem {
    id: number;
    title: string;
    category: string;
    description: string;

    price: number;
    image: string;
}

export interface ProductDetailedItem extends ProductListItem {
    // Usually items for list and detailed view are different
    // Seems like it's not the case here, but let's pretend like it is
    quantity: number;
}
