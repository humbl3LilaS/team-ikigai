import { en, Faker } from "@faker-js/faker";
import { hash } from "bcryptjs";

import { TOWNSHIPS } from "@/constants";
import { db } from "@/database/dirzzle";
import { drivers, UserRole, users, warehouses } from "@/database/schema";

async function main() {
    const faker = new Faker({ locale: [en] });
    const hashedPassword = await hash("P@ssword123", 10);
    console.log("seeding start");
    const generatedUsers = Array.from(
        {
            length: 8,
        },
        () => {
            const city = faker.helpers.arrayElement(TOWNSHIPS["Yangon"]);
            return {
                email: faker.internet.email(),
                password: hashedPassword,
                name: faker.internet.username(),
                address: faker.location.streetAddress(),
                region: "Yangon",
                city,
                phoneNumber: `09${faker.string.numeric(9)}`,
                role: "DRIVER" as UserRole,
            };
        },
    );
    const createdUsers = await db
        .insert(users)
        .values(generatedUsers)
        .returning({ id: users.id, region: users.region });
    console.log(createdUsers);

    const wareHouses = await db.select({ id: warehouses.id }).from(warehouses);
    const wareHousesId = wareHouses.map((item) => item.id);
    const generatedDrivers = createdUsers.map((item) => ({
        userId: item.id,
        vehiclePlateNumber: faker.string.numeric(9),
        deliveryRoute: item.region!,
        warehouseId: faker.helpers.arrayElement(wareHousesId),
    }));
    await db.delete(drivers);
    await db.insert(drivers).values(generatedDrivers);
    console.log("seeing end");
}

try {
    await main();
} catch (e) {
    console.log(e);
}

export {};
