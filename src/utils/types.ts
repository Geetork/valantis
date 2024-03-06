export type TItem = {
    brand: null | string;
    id: string;
    price: number;
    product: string;
};

export type TFilter = Partial<Omit<TItem, 'id'>>;