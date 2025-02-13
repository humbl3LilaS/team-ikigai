import { notFound } from "next/navigation";
import React from "react";

import { getUserData } from "@/features/client/user/actions/get-user-data";
import LatestOrderStatus from "@/features/client/user/profile/components/latest-order-status";
import { ProfileCard } from "@/features/client/user/profile/components/profile_nav";
import TotalSpend from "@/features/client/user/profile/components/totalspend";
import UserInfo from "@/features/client/user/profile/components/user_info";

import Logout from "./logout";
interface ProfileLayoutProps {
    userId: string;
}

const ProfileLayout = async ({ userId }: ProfileLayoutProps) => {
    const userinfo = await getUserData(userId);
    if (!userinfo) {
        return notFound();
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
                <hr className="my-2" />
                <LatestOrderStatus userId={userinfo.id} />
                <hr className="my-2" />
                <TotalSpend userId={userinfo.id} />
                <hr className="my-2" />
                <ProfileCard />
                <hr className="my-2" />
                <Logout />
            </div>
        </div>
    );
};

export default ProfileLayout;
