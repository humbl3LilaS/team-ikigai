import { InferSelectModel, relations } from "drizzle-orm";
import {
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { PRODUCT_CATEGORY, REGION } from "@/constants";

export const ROLE_ENUM = pgEnum("role", [
    "USER",
    "SALES",
    "WAREHOUSE_MANAGER",
    "DRIVER",
    "FINANCE",
    "ADMIN",
]);
export const CATEGORY = pgEnum("product_category", PRODUCT_CATEGORY);
export const PAYMENT_METHOD = pgEnum("payment_method", [
    "KBZ_PAY",
    "WAVE_PAY",
    "CASH_ON_DELIVERY",
]);
export const ORDER_STATUS = pgEnum("order_status", [
    "PENDING",
    "CANCEL",
    "APPROVE",
    "ON_THE_WAY",
    "FINISH",
]);
export const COMPLAIN_STATUS = pgEnum("complain_status", [
    "PENDING",
    "APPROVE",
    "SOLVED",
]);
export const COMPLAIN_TYPE = pgEnum("complain_type", ["EXCHANGE", "REPAIR"]);
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
    detail: text("detail").notNull(),
    discount: integer("discount").default(0).notNull(),
    imageUrl: text("image_url").notNull(),
});

export const productColors = pgTable("product_colors", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    colorHex: varchar("color_hex", { length: 7 }).notNull(),
});

export const products = pgTable("products", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    detailId: uuid("detail_id")
        .references(() => productDetails.id, { onDelete: "cascade" })
        .notNull(),
    colorId: uuid("color_id")
        .references(() => productColors.id, { onDelete: "set null" })
        .notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
    })
        .defaultNow()
        .notNull(),
});

export const stocks = pgTable("stocks", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    warehouseId: uuid("warehouse_id")
        .references(() => warehouses.id)
        .notNull(),
    productId: uuid("product_id")
        .references(() => products.id, { onDelete: "cascade" })
        .notNull(),
    stock: integer("stock").notNull(),
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
    status: ORDER_STATUS("order_status").default("PENDING").notNull(),
    totalAmount: integer("total_amount").default(0).notNull(),
    contactNumber: text("contact_number").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    region: text("region").notNull(),
});

export const orderItems = pgTable("order_items", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    orderId: uuid("order_id")
        .references(() => orders.id, { onDelete: "cascade" })
        .notNull(),
    productId: uuid("product_id")
        .references(() => products.id, { onDelete: "cascade" })
        .notNull(),
    quantity: integer("quantity").notNull(),
});

export const invoices = pgTable("invoices", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    orderId: uuid("order_id")
        .references(() => orders.id, { onDelete: "cascade" })
        .notNull(),
    paymentMethod: PAYMENT_METHOD("payment_method")
        .default("CASH_ON_DELIVERY")
        .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const complains = pgTable("complains", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    orderItemId: uuid("order_item_id")
        .references(() => orderItems.id, { onDelete: "cascade" })
        .notNull(),
    type: COMPLAIN_TYPE("type").notNull(),
    issues: text("issues").notNull(),
    status: COMPLAIN_STATUS("complain_status").default("PENDING").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
});
export const warehouseManagers = pgTable("warehouse_managers", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
});

export const warehouses = pgTable("warehouses", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    managerId: uuid("manager_id").references(() => warehouseManagers.id, {
        onDelete: "set null",
    }),
    phoneNumber: text("phone_number").notNull(),
    name: text("name"),
    address: text("address"),
    city: text("city"),
    region: text("region"),
});

export const drivers = pgTable("drivers", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    vehiclePlateNumber: varchar("vehicle_plate_number", { length: 20 })
        .notNull()
        .unique(),
    deliveryRoute: varchar("delivery_route", { length: 100 }).notNull(),
    warehouseId: uuid("warehouse_id")
        .references(() => warehouses.id, { onDelete: "set null" })
        .notNull(),
    orderLimit: integer("order_limit").default(5),
});

export const deliveries = pgTable("deliveries", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    orderId: uuid("order_id")
        .references(() => orders.id, { onDelete: "cascade" })
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

export const ordersToInvoices = relations(orders, ({ one }) => ({
    invoice: one(invoices),
}));

export const invoicesToOrders = relations(invoices, ({ one }) => ({
    orders: one(orders, {
        fields: [invoices.orderId],
        references: [orders.id],
    }),
}));

export const orderItemToComplains = relations(orderItems, ({ one }) => ({
    complain: one(complains),
}));

export const complainsToOrderItem = relations(complains, ({ one }) => ({
    invoice: one(orderItems, {
        fields: [complains.orderItemId],
        references: [orderItems.id],
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

// Users
export type UserRole = (typeof ROLE_ENUM.enumValues)[number];

export const UserInsertSchema = createInsertSchema(users, {
    name: (schema) =>
        schema.min(8, { message: "Name must be at least 8 characters long" }),
    email: (schema) => schema.email({ message: "Invalid email address" }),
    password: (schema) =>
        schema
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number",
            })
            .regex(/[^A-Za-z0-9]/, {
                message: "Password must contain at least one special character",
            }),
    phoneNumber: (schema) =>
        schema.regex(/^09\d{9}$/, {
            message:
                "Phone number must start with 09 and have a total length of 11 digits",
        }),
}).omit({
    id: true,
    address: true,
    city: true,
    region: true,
});

export type IUserInsert = Zod.infer<typeof UserInsertSchema>;
export type IUserInfo = InferSelectModel<typeof users>;

// Orders
export type IOrderStatus = (typeof ORDER_STATUS.enumValues)[number];
export type IOrder = InferSelectModel<typeof orders>;

export const orderInsertSchema = createInsertSchema(orders, {
    contactNumber: (schema) =>
        schema.regex(/^09\d{9}$/, {
            message:
                "Phone number must start with 09 and have a total length of 11 digits",
        }),
    region: (schema) => schema.refine((value) => REGION.includes(value)),
    city: (schema) => schema.min(1),
}).omit({
    id: true,
    status: true,
    createdAt: true,
});

export type TOrder = InferSelectModel<typeof orders>;
export type IOrderInsert = Zod.infer<typeof orderInsertSchema>;

// Products
export type IProductCategory = (typeof CATEGORY.enumValues)[number];
export type IProductDetails = InferSelectModel<typeof productDetails>;
export const ProductInsertSchema = createInsertSchema(productDetails, {
    name: (schema) =>
        schema.min(5, { message: "Name must be at least 8 characters long" }),

    price: z.coerce.number().min(1, { message: "Price cannot be zero" }),
    discount: z.coerce.number().optional(),
})
    .omit({
        id: true,
        imageUrl: true,
    })
    .extend({
        colorHex: z.string().min(7),
        image: z.custom<File | null>(),
        warehouseId: z
            .string()
            .min(1, { message: "Warehouse Id Cannot be null" }),
        stock: z.coerce.number().min(1, { message: "Stock cannot be null" }),
    });
export type TProductInsertSchema = Zod.infer<typeof ProductInsertSchema>;

export const ProductUpdateSchema = createUpdateSchema(productDetails, {
    name: (schema) =>
        schema.min(5, { message: "Name must be at least 8 characters long" }),
    price: z.coerce.number().min(1, { message: "Price cannot be zero" }),
    discount: z.coerce.number().optional(),
    detail: z.string().optional(),
}).omit({
    imageUrl: true,
});

export type TProductUpdateSchema = Zod.infer<typeof ProductUpdateSchema>;
// Invoices
export type IInvoice = InferSelectModel<typeof invoices>;
export type IPaymentMethod = (typeof PAYMENT_METHOD.enumValues)[number];

// Deliveries

export type IDeliveryStatus = (typeof DELIVERY_STATUS.enumValues)[number];
export type IDelivery = InferSelectModel<typeof deliveries>;
export type IWarehouses = InferSelectModel<typeof warehouses>;

// Complains
export type IComplainType = (typeof COMPLAIN_TYPE.enumValues)[number];
export type IComplainStatus = (typeof COMPLAIN_STATUS.enumValues)[number];
export type IComplain = InferSelectModel<typeof complains>;
