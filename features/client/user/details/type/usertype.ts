import { UserRole } from "@/database/schema";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phoneNumber: string;
    address: string | null;
    city: string | null;
    region: string | null;
}
