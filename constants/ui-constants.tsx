import {
    ArrowRightLeft,
    Car,
    ChartLine,
    Home,
    Laptop,
    ScrollText,
    ShoppingCart,
    Truck,
    Users,
    Warehouse,
} from "lucide-react";

export const CLIENT_NAV_ITEMS = [
    {
        title: "Home",
        href: "/",
    },
    { title: "Products", href: "/category" },
    { title: "About", href: "/about" },
    {
        title: "Contact Us",
        href: "/contact",
    },
];

export const adminSideBarItems = [
    {
        title: "Dashboard",
        role: ["ADMIN", "SALES", "FINANCE"],
        url: "/admin/dashboard",
        icon: <Home />,
    },
    {
        title: "Orders",
        role: ["ADMIN", "SALES", "FINANCE", "WAREHOUSE_MANAGER"],
        url: "/admin/orders",
        icon: <ShoppingCart />,
    },
    {
        title: "Customers",
        role: ["ADMIN", "SALES", "FINANCE"],
        url: "/admin/customers",
        icon: <Users />,
    },
    {
        title: "Products",
        role: ["ADMIN", "SALES", "FINANCE", "WAREHOUSE_MANAGER"],
        url: "/admin/products",
        icon: <Laptop />,
    },
    {
        title: "Reports",
        role: ["ADMIN", "SALES", "FINANCE"],
        url: "/admin/reports",
        icon: <ChartLine />,
    },
    {
        title: "Invoice",
        role: ["ADMIN", "SALES", "FINANCE"],
        url: "/admin/invoices",
        icon: <ArrowRightLeft />,
    },
    {
        title: "Drivers",
        role: ["ADMIN", "WAREHOUSE_MANAGER"],
        url: "/admin/drivers",
        icon: <Car />,
    },
    {
        title: "Deliveries",
        role: ["ADMIN", "DRIVER", "WAREHOUSE_MANAGER"],
        url: "/admin/deliveries",
        icon: <Truck />,
    },
    {
        title: "Warehouses",
        role: ["ADMIN", "WAREHOUSE_MANAGER"],
        url: "/admin/warehouses",
        icon: <Warehouse />,
    },
    {
        title: "Complains",
        role: ["ADMIN", "SALES"],
        url: "/admin/complains",
        icon: <ScrollText />,
    },
];
export type TAdminRoutes =
    | "Dashboard"
    | "Orders"
    | "Customers"
    | "Products"
    | "Reports"
    | "Invoice"
    | "Drivers"
    | "Deliveries"
    | "Warehouses"
    | "Complains";
