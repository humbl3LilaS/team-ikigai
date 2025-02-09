import React from "react";

interface UserInfoProps {
    avatarUrl?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
    avatarUrl,
    name,
    email,
    phone,
    address,
}) => {
    return (
        <>
            {" "}
            <div className=" p-4">
                {/* User Avatar */}
                <img
                    src="https://avatar.iran.liara.run/public"
                    alt="User avatar"
                    className="w-24 h-24 border rounded-full mx-auto"
                />

                {/* User Information */}
                <div className="text-center mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody>
                            {/* Username */}
                            <tr>
                                <td className="px-6  text-center text-gray-500 font-bold">
                                    {name}
                                </td>
                            </tr>

                            {/* email */}

                            <tr>
                                <td className="px-6 text-center  font-medium text-gray-500">
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
