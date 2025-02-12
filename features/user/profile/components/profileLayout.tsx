import React from "react";
import UserInfo from "@/features/user/profile/components/user_info";
import LatestOrderStatus from "@/features/user/profile/components/latest-order-status";
import { ProfileCard } from "@/features/user/profile/components/profile_nav";
import TotalSpend from "@/features/user/profile/components/totalspend";
import { getUserData } from "@/features/user/actions/get-user-data";
import Logout from "./logout";
interface ProfileLayoutProps {
    userId: string;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = async ({ userId }) => {
    const userinfo = await getUserData(userId);
    if (!userinfo) {
        throw new Error("User information could not be retrieved");
    }
    return (
        <div className="p-5 flex justify-center items-center">
            <div className="min-w-full sm:min-w-[500px] flex flex-col justify-center items-center p-5 bg-white shadow rounded-lg md:p-6">
                <UserInfo
                    id={userinfo.id}
                    name={userinfo.name}
                    email={userinfo.email}
                    phoneNumber={userinfo.phoneNumber}
                    role={userinfo.role}
                    address={userinfo.address}
                    city={userinfo.city}
                    region={userinfo.region}
                />
                <div className="w-full my-2"></div>
                <LatestOrderStatus status={userinfo.latestOrderStatus} />
                <div className="w-full my-2"></div>
                <TotalSpend totalSpend={userinfo.totalSpend} />
                <div className="w-full my-2"></div>
                <ProfileCard userRole={userinfo.role} />
                <div className="w-full my-2"></div>
                <Logout />
            </div>
        </div>
    );
};

export default ProfileLayout;
