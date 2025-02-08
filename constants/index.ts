import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

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
        icon: Home,
    },
    {
        title: "Orders",
        url: "/admin/order",
        icon: Inbox,
    },
    {
        title: "Customers",
        url: "/admin/customers",
        icon: Calendar,
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: Search,
    },
    {
        title: "Daily Reports",
        url: "/admin/reports",
        icon: Settings,
    },
    {
        title: "Transactions",
        url: "/admin/transactions",
        icon: Settings,
    },
];
