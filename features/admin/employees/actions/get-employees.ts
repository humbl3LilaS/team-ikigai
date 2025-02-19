"use server";

import { and, eq, not } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { users } from "@/database/schema";

export const getEmployees = async () => {
    const res = await db.select().from(users).where(and(not(eq(users.role, "ADMIN")), not(eq(users.role, "USER"))));
    // console.log(res);
    return res;
};

export type TEmployees = NonNullable<
    Awaited<ReturnType<typeof getEmployees>>
>[number];
