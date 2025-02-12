import React from "react";
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

const UserInfo: React.FC<IUser> = ({ name, email, phoneNumber }) => {
    return (
        <>
            {" "}
            <div className=" px-6 w-full flex flex-col sm:justify-center sm:items-start justify-center items-center bg-transparent overflow-hidden">
                {/* User Avatar */}
                <div className="sm:mr-6">
                    <img
                        src="https://avatar.iran.liara.run/public"
                        alt="User avatar"
                        className="w-24 h-24 border rounded-full mx-auto"
                    />
                </div>

                {/* User Information */}
                <div className="">
                    <table className="min-w-full divide-y divide-gray-200 text-center sm:text-left">
                        <tbody>
                            {/* Username */}
                            <tr>
                                <td className="text-gray-500 font-bold">
                                    {name}
                                </td>
                            </tr>

                            {/* email */}

                            <tr>
                                <td className="font-medium text-gray-500">
                                    {email}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
