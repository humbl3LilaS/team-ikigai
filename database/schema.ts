import {
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { PRODUCT_CATEGORY } from "@/constants";

export const ROLE_ENUM = pgEnum("role", [
    "USER",
    "SALES",
    "WAREHOUSE_MANAGER",
    "DRIVER",
    "FINANCE",
]);
export const CATEGORY = pgEnum("product_category", PRODUCT_CATEGORY);
export const PAYMENT_METHOD = pgEnum("payment_method", ["KBZ_PAY", "WAVE_PAY"]);
export const TYPE = pgEnum("type", ["REPAIR", "EXCHANGE"]);
export const ORDER_STATUS = pgEnum("order_status", [
    "PENDING",
    "CANCEL",
    "APPROVE",
    "ON_THE_WAY",
    "FINISH",
]);
export const INVOICE_STATUS = pgEnum("invoice_status", ["SUCCESS", "COMPLAIN"]);
export const COMPLAIN_STATUS = pgEnum("compliance_status", [
    "EXCHANGE",
    "REPAIR",
]);

export const DELIVERY_STATUS = pgEnum("delivery_status", [
    "PENDING",
    "IN-TRANSIT",
    "DELIVERED",
    "FAILED",
]);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("name", { length: 200 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: ROLE_ENUM("role").default("USER").notNull(),
    phoneNumber: text("phone_number").notNull(),
    address: text("address"),
    city: text("city"),
    region: text("region"),
});

export const productDetails = pgTable("product_details", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    category: CATEGORY("category").notNull(),
    brand: varchar("brand", { length: 255 }).notNull(),
    price: integer("price").notNull(),
    description: text("description").notNull(),
    discount: integer("discount").default(0).notNull(),
});

export const productColors = pgTable("product_colors", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    colorHex: varchar("color_hex", { length: 7 }).notNull(),
});

export const products = pgTable("products", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    detailId: uuid("detail_id")
        .references(() => productDetails.id)
        .notNull(),
    colorId: uuid("color_id")
        .references(() => productColors.id)
        .notNull(),
    warehouseId: uuid("warehouse_id")
        .references(() => warehouses.id)
        .notNull(),
    stock: integer("stock").notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
    }),
});

export const orders = pgTable("orders", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
    })
        .defaultNow()
        .notNull(),
    status: ORDER_STATUS("order_status").notNull(),
    totalAmount: integer("total_amount").default(0).notNull(),
});

export const orderItems = pgTable("order_items", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    orderId: uuid("order_id")
        .references(() => orders.id)
        .notNull(),
    productId: uuid("product_id")
        .references(() => products.id)
        .notNull(),
    quantity: integer("quantity").notNull(),
});

export const invoices = pgTable("invoices", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    orderId: uuid("order_id")
        .references(() => orders.id)
        .notNull(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    status: INVOICE_STATUS("invoice_status").notNull(),
    paymentMethod: PAYMENT_METHOD("payment_method").notNull(),
});

export const complains = pgTable("complains", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    invoiceId: uuid("invoice_id")
        .references(() => invoices.id)
        .notNull(),
    type: TYPE("type"),
    issues: text("issues").notNull(),
    status: COMPLAIN_STATUS("complain_status").notNull(),
});

export const warehouses = pgTable("warehouses", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    phoneNumber: text("phone_number").notNull(),
    address: text("address"),
    city: text("city"),
    region: text("region"),
});

export const drivers = pgTable("drivers", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id").references(() => users.id),
    vehiclePlateNumber: varchar("vehicle_plate_number", { length: 20 })
        .notNull()
        .unique(),
    deliveryRoute: varchar("delivery_route", { length: 100 }).notNull(),
    warehouseId: uuid("warehouse_id")
        .references(() => warehouses.id)
        .notNull(),
    orderLimit: integer("order_limit").default(5),
});

export const deliveries = pgTable("deliveries", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    orderId: uuid("order_id")
        .references(() => orders.id)
        .notNull(),
    driverId: uuid("driver_id").references(() => drivers.id),
    deliveryStatus: DELIVERY_STATUS("delivery_status")
        .default("PENDING")
        .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    deliveredDate: timestamp("delivered_date", { withTimezone: true }),
});

export const serviceCenters = pgTable("service_centers", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    centerName: varchar("center_name", { length: 255 }).notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    region: text("region").notNull(),
    phoneNumber: text("phone_number").notNull(),
});

/**
 *
 * Relationships
 *
 */

export const ordersToUsers = relations(orders, ({ one }) => ({
    userId: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
}));

export const usersToOrders = relations(users, ({ many }) => ({
    orders: many(orders),
}));

export const productDetailsToProducts = relations(
    productDetails,
    ({ many }) => ({
        products: many(products),
    }),
);

export const productColorsToProduct = relations(productColors, ({ many }) => ({
    products: many(products),
}));

export const productToProductDetails = relations(products, ({ one }) => ({
    detailId: one(productDetails, {
        fields: [products.detailId],
        references: [productDetails.id],
    }),
}));

export const productToProductColor = relations(products, ({ one }) => ({
    colorId: one(productColors, {
        fields: [products.colorId],
        references: [productColors.id],
    }),
}));

export const ordersToOrderItems = relations(orders, ({ many }) => ({
    orderItems: many(orderItems),
}));

export const orderItemsToOrders = relations(orderItems, ({ one }) => ({
    orderId: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
}));

export const usersToInvoices = relations(users, ({ many }) => ({
    invoices: many(invoices),
}));

export const invoicesToUsers = relations(invoices, ({ one }) => ({
    user: one(users, {
        fields: [invoices.userId],
        references: [users.id],
    }),
}));

export const warehousesToProducts = relations(warehouses, ({ many }) => ({
    products: many(products),
}));

export const productsToWarehouses = relations(products, ({ one }) => ({
    warehouses: one(warehouses, {
        fields: [products.warehouseId],
        references: [warehouses.id],
    }),
}));

export const ordersToInvoices = relations(orders, ({ one }) => ({
    invoice: one(invoices),
}));

export const invoicesToOrders = relations(invoices, ({ one }) => ({
    orders: one(orders, {
        fields: [invoices.orderId],
        references: [orders.id],
    }),
}));

export const invoicesToComplains = relations(invoices, ({ one }) => ({
    complain: one(complains),
}));

export const complainsToInvoices = relations(complains, ({ one }) => ({
    invoice: one(invoices, {
        fields: [complains.invoiceId],
        references: [invoices.id],
    }),
}));

export const productsToOrderItem = relations(products, ({ one }) => ({
    orderItem: one(orderItems),
}));

export const orderItemToProducts = relations(orderItems, ({ one }) => ({
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id],
    }),
}));

export const warehousesToDrives = relations(warehouses, ({ many }) => ({
    drives: many(drivers),
}));

export const driversToWarehouses = relations(drivers, ({ one }) => ({
    warehouse: one(warehouses, {
        fields: [drivers.warehouseId],
        references: [warehouses.id],
    }),
}));

/**
 *
 * Zod Schema and Types
 *
 */

export type UserRole = (typeof ROLE_ENUM.enumValues)[number];

export const UserInsertSchema = createInsertSchema(users, {
    name: (schema) => schema.min(8),
    email: (schema) => schema.email(),
    password: (schema) =>
        schema
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter",
            )
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter",
            )
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least one special character",
            ),
    phoneNumber: (schema) =>
        schema.regex(
            /^09\d{9}$/,
            "Phone number must start with 09 and have a total length of 11 digits",
        ),
}).omit({
    id: true,
    address: true,
    city: true,
    region: true,
});

export type IUserInsert = Zod.infer<typeof UserInsertSchema>;

export type IProductCategory = (typeof CATEGORY.enumValues)[number];
export type IOrderStatus = (typeof ORDER_STATUS.enumValues)[number];
