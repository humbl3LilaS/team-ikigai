import { en, Faker } from "@faker-js/faker";
import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orders } from "@/database/schema";

async function main() {
    const faker = new Faker({ locale: [en] });
    const finishedOrders = await db
        .select()
        .from(orders)
        .where(eq(orders.status, "FINISH"));
    console.log(finishedOrders);
}

try {
    await main();
} catch {}

export {};
