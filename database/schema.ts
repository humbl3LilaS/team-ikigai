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

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const CATEGORY = pgEnum("product_category", ["LAPTOP", "TABLET"]);
export const PAYMENT_METHOD = pgEnum("payment_method", ["KBZ_PAY", "WAVE_PAY"]);
export const TYPE = pgEnum("type", ["REPAIR", "EXCHANGE"]);
export const ORDER_STATUS = pgEnum("order_status", [
    "PENDING",
    "CANCLE",
    "APPROVE",
    "ON_THE_WAY",
    "FINISH",
]);
export const INVOICE_STATUS = pgEnum("invoice_status", ["SUCCESS", "COMPLAIN"]);

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
    discount: integer("discount").notNull(),
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
});

export const orders = pgTable("orders", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    orderDate: timestamp("order_date", {
        withTimezone: true,
    })
        .defaultNow()
        .notNull(),
    status: ORDER_STATUS("order_status").notNull(),
    totalAmount: integer("total_amount").notNull(),
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
    status: varchar("status", { length: 255 }).notNull(),
});

export const warehouses = pgTable("warehouses", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    driverId: uuid("driver_id")
        .references(() => drivers.id)
        .notNull(),
});

export const drivers = pgTable("drivers", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    vehiclePlateNumber: varchar("verhicle_plate_number", { length: 20 })
        .notNull()
        .unique(),
    deliveryRoute: varchar("delivery_route", { length: 100 }).notNull(),
});

export const serviceCenters = pgTable("service_centers", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    centerName: varchar("center_name", { length: 255 }).notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    region: text("region").notNull(),
    contact: text("contact").notNull(),
});

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
