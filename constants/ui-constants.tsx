import {
    ArrowRightLeft,
    Car,
    ChartLine,
    Home,
    Laptop,
    ShoppingCart,
    Truck,
    Users,
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
        role: ["SALES", "FINANCE"],
        url: "/admin",
        icon: <Home />,
    },
    {
        title: "Orders",
        role: ["SALES", "FINANCE"],
        url: "/admin/order",
        icon: <ShoppingCart />,
    },
    {
        title: "Customers",
        role: ["SALES", "FINANCE"],
        url: "/admin/customers",
        icon: <Users />,
    },
    {
        title: "Products",
        role: ["SALES", "FINANCE"],
        url: "/admin/products",
        icon: <Laptop />,
    },
    {
        title: "Reports",
        role: ["SALES", "FINANCE"],
        url: "/admin/reports",
        icon: <ChartLine />,
    },
    {
        title: "Invoice",
        role: ["SALES", "FINANCE"],
        url: "/admin/invoices",
        icon: <ArrowRightLeft />,
    },
    {
        title: "Drivers",
        role: ["FINANCE", "DRIVER", "WAREHOUSE_MANAGER"],
        url: "/admin/drivers",
        icon: <Car />,
    },
    {
        title: "Deliveries",
        role: ["DRIVER", "WAREHOUSE_MANAGER"],
        url: "/admin/deliveries",
        icon: <Truck />,
    },
];
