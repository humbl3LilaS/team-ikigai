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
export const REGION = [
    "Ayeyarwady",
    "Bago",
    "Chin",
    "Kachin",
    "Kayah",
    "Kayin",
    "Magway",
    "Mandalay",
    "Mon",
    "Naypyidaw",
    "Rakhine",
    "Sagaing",
    "Shan",
    "Tanintharyi",
    "Yangon",
];

export const TOWNSHIPS: Record<string, string[]> = {
    Ayeyarwady: [
        "Pathein",
        "Hinthada",
        "Bogale",
        "Myaungmya",
        "Maubin",
        "Labutta",
        "Pyapon",
    ],
    Bago: ["Bago", "Taungoo", "Pyay", "Thayarwady"],
    Chin: [
        "Hakha",
        "Falam",
        "Tedim",
        "Mindat",
        "Kanpetlet",
        "Tonzang",
        "Paletwa",
    ],
    Kachin: ["Myitkyina", "Bhamo", "Mohnyin", "Putao", "Shwegu", "Waingmaw"],
    Kayah: ["Loikaw", "Demawso", "Hpruso", "Bawlakhe", "Mese"],
    Kayin: ["Hpa-An", "Myawaddy", "Hpapun", "Kawkareik"],
    Magway: ["Magway", "Minbu", "Pakokku", "Thayet"],
    Mandalay: [
        "Amarapura",
        "Chanayethazan",
        "Chanmyathazi",
        "Mahaaungmyay",
        "Pyigyidagun",
        "Aungmyethazan",
        "Mandalay",
        "Kyaukse",
        "Myingyan",
        "Meiktila",
        "Yamethin",
    ],
    Mon: [
        "Mawlamyine",
        "Thaton",
        "Kyaikto",
        "Paung",
        "Chaungzon",
        "Mudon",
        "Thanbyuzayat",
    ],
    Naypyidaw: [
        "Zeyarthiri",
        "Pobbathiri",
        "Ottarathiri",
        "Dekkhina Thiri",
        "Pyinmana",
        "Tatkone",
        "Lewe",
        "Zabuthiri",
    ],
    Rakhine: [
        "Sittwe",
        "Kyaukphyu",
        "Maungdaw",
        "Thandwe",
        "Mrauk-U",
        "Buthidaung",
    ],
    Sagaing: ["Sagaing", "Monywa", "Shwebo", "Katha", "Kale", "Tamu"],
    Shan: ["Taunggyi", "Lashio", "Kengtung", "Muse", "Hsipaw", "Nyaungshwe"],
    Tanintharyi: ["Dawei", "Myeik", "Kawthaung"],
    Yangon: [
        "Ahlone",
        "Bahan",
        "Botataung",
        "Dagon",
        "Dagon Myothit (East)",
        "Dagon Myothit (North)",
        "Dagon Myothit (South)",
        "Dala",
        "Hlaing",
        "Hlaingthaya",
        "Insein",
        "Kamayut",
        "Kyauktada",
        "Kyimyindaing",
        "Lanmadaw",
        "Latha",
        "Mayangone",
        "Mingaladon",
        "Mingalartaungnyunt",
        "North Okkalapa",
        "Pabedan",
        "Sanchaung",
        "Seikkan",
        "South Okkalapa",
        "Tamwe",
        "Thaketa",
        "Thingangyun",
        "Yankin",
    ],
};

export const PRODUCT_CATEGORY = [
    "Laptop",
    "Processor",
    "Monitor",
    "Storage Device",
    "Printer",
    "Accessories",
    "Power Supply",
    "Desktop",
    "Networking Device",
    "Memory",
    "Desktop PC",
] as const;

export const PRODUCT_PLACEHOLDER = [
    {
        name: "Apple MacBook Pro 14-inch",
        brand: "Apple",
        category: "Laptop",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074694/MacBook-Pro-Retina-14-Inch_tyxjsc.png"
    },
    {
        name: "Microsoft Surface Studio",
        brand: "Microsoft",
        category: "Laptop",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074694/Microsoft_Surface_Studio_r7jk5p.png"
    },
    {
        name: "G.Skill Trident Z RAM 32 GB",
        brand: "G Skill",
        category: "Processor",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074684/G.Skill_Trident_Z_RAM_32_GB_ycn9jy.png"
    },
    {
        name: "Intel Core i7-13700 K CPU",
        brand: "Intel",
        category: "Processor",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074683/Intel_Core_i7-13700_K_CPU_bckqat.png"
    },
    {
        name: "HP EliteBook 840",
        brand: "HP",
        category: "Laptop",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074693/HP_EliteBook_840_khoycc.png"
    },
    {
        name: "LG UltraGear 27-inch",
        brand: "LG",
        category: "Monitor",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074691/LG_UltraGear_27-inch_whtbgx.png"
    },
    {
        name: "WD Black SN850X 1TB SSD",
        brand: "WD",
        category: "Storage Device",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074695/WD_Black_SN850X_1TB_SSD_eo72xs.png"
    },
    {
        name: "Epson EcoTank ET-3850",
        brand: "Epson",
        category: "Printer",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074686/Epson_EcoTank_ET-3850_gn4kva.png"
    },
    {
        name: "Logitech MX Keys Keyboard",
        brand: "Logitech",
        category: "Accessories",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074686/Logitech_MX_Keys_Keyboard_cnzdls.png"
    },
    {
        name: "Samsung T7 Protabel SSD",
        brand: "Samsung",
        category: "Storage Device",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074942/Samsung_T7_Protabel_SSD_bffphd.png"
    },
    {
        name: "Canon Image CLASS MF644 CDW",
        brand: "Canon",
        category: "Printer",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074683/HyperX_Cloud_Alpha_Headset_qfgttb.png"
    },
    {
        name: "APC Smart-UPS 1500VA",
        brand: "APC",
        category: "Power Supply",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074682/APC_Smart-UPS_1500VA_zsb9ec.png"
    },
    {
        name: "Dell Ultrasharp Webcam",
        brand: "Dell",
        category: "Accessories",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074681/Dell_Ultrasharp_Webcam_ilykkx.png"
    },
    {
        name: "HP Omen 25L",
        brand: "HP",
        category: "Desktop",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074681/HP_Omen_25L_rvrkpn.png"
    },
    {
        name: "Asus TUF Gaming F15",
        brand: "Asus",
        category: "Laptop",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074694/Asus_TUF_Gaming_F15_b3abiq.png"
    },
    {
        name: "Seagate IronWolf 4TB HDD",
        brand: "Seagate",
        category: "Storage Device",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074681/Seagate_IronWolf_4TB_HDD_ei9erx.png"
    },
    {
        name: "Cisco Catalyst 9200 Switch",
        brand: "Cisco",
        category: "Networking Device",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074681/Cisco_Catalyst_9200_Switch_jjoo94.png"
    },
    {
        name: "G.Skill Trident Z RAM 32 GB",
        brand: "G Skill",
        category: "Memory",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074684/G.Skill_Trident_Z_RAM_32_GB_ycn9jy.png"
    },
    {
        name: "TP-link Deco XE75 Router",
        brand: "TP-link",
        category: "Networking Device",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074681/TP-link_Deco_XE75_Router_qlytjo.png"
    },
    {
        name: "Microsoft Surface Studio",
        brand: "Microsoft",
        category: "Desktop PC",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074694/Microsoft_Surface_Studio_r7jk5p.png"
    },
    {
        name: "Acer Aspire 5",
        brand: "Acer",
        category: "Laptop",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074515/Acer_Aspire_5_itwk2i.png"
    },
    {
        name: "HyperX Cloud Alpha Headset",
        brand: "HyperX",
        category: "Accessories",
        imageUrl: "https://res.cloudinary.com/dpvszi2rs/image/upload/v1739074683/HyperX_Cloud_Alpha_Headset_qfgttb.png"
    },
];
