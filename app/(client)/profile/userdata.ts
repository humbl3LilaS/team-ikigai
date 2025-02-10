// import { Order } from "@/features/profile/components/orderList";

// placeholderUsers.js
export type IUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    address: string;
    city: string;
    region: string;
  };

export const placeholderUsers:IUser[] = [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "Password1!", // In a real app, passwords should be hashed!
      role: "USER",
      phoneNumber: "09123456789",
      address: "123 Main St",
      city: "Sample City",
      region: "Sample Region",
    },
    {
      id: "223e4567-e89b-12d3-a456-426614174001",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "Password1!",
      role: "ADMIN",
      phoneNumber: "09987654321",
      address: "456 Market Ave",
      city: "Another City",
      region: "Another Region",
    },
    {
      id: "323e4567-e89b-12d3-a456-426614174002",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "Password1!",
      role: "USER",
      phoneNumber: "09234567890",
      address: "789 Broadway",
      city: "Metropolis",
      region: "Central",
    },
  ];
  

  export const regionCityMap = {
    "Yangon": ["Hlaing", "Insein", "Tamwe", "Kamayut"],
    "Mandalay": ["Chanayethazan", "Aungmyaythazan", "Amarapura"],
    "Ayeyarwady": ["Pathein", "Hinthada", "Myaungmya"],
};


// export const orders : Order[]= [
//     {
//         id: "ORD011",
//         orderDate: "2025-02-24",
//         totalAmount: 5222,
//         status: "Processing",
//             orderItems: [
//       {
//         id: "1a",
//         quantity: 2,
//         product: { name: "Product A", price: 20 },
//       },
//       {
//         id: "1b",
//         quantity: 1,
//         product: { name: "Product B", price: 60 },
//       },
//     ],
//     },
// ];

export const order = [
  {
    id: "1",
    orderDate: new Date().toISOString(),
    status: "Shipped",
    totalAmount: 100,
    orderItems: [
      {
        id: "1a",
        quantity: 2,
        product: { name: "Product A", price: 20 },
      },
      {
        id: "1b",
        quantity: 1,
        product: { name: "Product B", price: 60 },
      },
    ],
  },
  {
    id: "2",
    orderDate: new Date().toISOString(),
    status: "Processing",
    totalAmount: 200,
    orderItems: [
      {
        id: "2a",
        quantity: 3,
        product: { name: "Product C", price: 50 },
      },
      {
        id: "2b",
        quantity: 2,
        product: { name: "Product D", price: 40 },
      },
    ],
  },
  {
    id: "3",
    orderDate: new Date().toISOString(),
    status: "Processing",
    totalAmount: 150,
    orderItems: [
      {
        id: "3a",
        quantity: 1,
        product: { name: "Product E", price: 75 },
      },
      {
        id: "3b",
        quantity: 2,
        product: { name: "Product F", price: 37.5 },
      },
    ],
  },
  {
    id: "4",
    orderDate: new Date().toISOString(),
    status: "Processing",
    totalAmount: 50,
    orderItems: [
      {
        id: "4a",
        quantity: 1,
        product: { name: "Product G", price: 25 },
      },
      {
        id: "4b",
        quantity: 1,
        product: { name: "Product H", price: 25 },
      },
    ],
  },
  {
    id: "5",
    orderDate: new Date().toISOString(),
    status: "Pending",
    totalAmount: 180,
    orderItems: [
      {
        id: "5a",
        quantity: 3,
        product: { name: "Product I", price: 30 },
      },
      {
        id: "5b",
        quantity: 2,
        product: { name: "Product J", price: 45 },
      },
    ],
  },
];
