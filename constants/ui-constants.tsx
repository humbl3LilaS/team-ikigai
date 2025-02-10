import {
    ArrowRightLeft,
    ChartLine,
    Home,
    Laptop,
    ShoppingCart,
    Users,
} from "lucide-react";

export const CLIENT_NAV_ITEMS = [
    {
        title: "Home",
        href: "/",
    },
    { title: "About", href: "/about" },
    {
        title: "Contact Us",
        href: "/contact",
    },
];

export const adminSideBarItems = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: <Home />,
    },
    {
        title: "Orders",
        url: "/admin/order",
        icon: <ShoppingCart />,
    },
    {
        title: "Customers",
        url: "/admin/customers",
        icon: <Users />,
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: <Laptop />,
    },
    {
        title: "Reports",
        url: "/admin/reports",
        icon: <ChartLine />,
    },
    {
        title: "Transactions",
        url: "/admin/transactions",
        icon: <ArrowRightLeft />,
    },
];
