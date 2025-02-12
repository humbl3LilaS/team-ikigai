export interface Product {
    name: string;
    price: number;
}

export interface OrderItem {
    id: string;
    quantity: number;
    product: Product;
}

export interface Order {
    id: string;
    orderDate: string;
    status: string;
    totalAmount: number;
    orderItems: OrderItem[];
}

//dummy orders
export const dummyOrders: Order[] = [
    {
        id: "ORD-001",
        orderDate: "2025-02-01T12:00:00Z",
        status: "PENDING",
        totalAmount: 150,
        orderItems: [
            {
                id: "item-1",
                quantity: 2,
                product: { name: "Laptop", price: 100 },
            },
            {
                id: "item-2",
                quantity: 1,
                product: { name: "Mouse", price: 50 },
            },
        ],
    },
    {
        id: "ORD-002",
        orderDate: "2025-02-02T14:30:00Z",
        status: "ON_THE_WAY",
        totalAmount: 300,
        orderItems: [
            {
                id: "item-3",
                quantity: 1,
                product: { name: "Monitor", price: 300 },
            },
        ],
    },
];
