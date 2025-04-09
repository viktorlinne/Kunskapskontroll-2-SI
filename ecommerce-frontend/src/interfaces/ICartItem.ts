export interface ICartItem {
    id: number | null;
    name: string;
    price: number;
    image: string;
    quantity?: number;
    category: string;
}