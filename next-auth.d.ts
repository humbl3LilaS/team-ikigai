import NextAuth from "next-auth";
import { UserRole } from "@/database/schema";

declare module "next-auth" {
    interface User {
        role: UserRole;
    }
    interface Session {
        user: {
            id: string;
            name: string;
            role: UserRole;
            email: string;
        };
    }
    interface JWT {
        id: string;
        name: string;
        role: UserRole;
        email: string;
    }
}
