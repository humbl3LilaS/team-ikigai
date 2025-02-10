import React from "react";

import { auth } from "@/auth";
import ProfileCard from "@/features/profile/components/profile_nav";
import UpgradeAccount from "@/features/profile/components/upgradeAccount";
import UserInfo from "@/features/profile/components/user_info";
import WarningBox from "@/features/profile/components/warningtoupdate";

import { getUserData } from "./actions/get-user-data";
const ProfilePage = async () => {
    const session = await auth();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const userinfo = await getUserData(session.user.id);
    if (!userinfo) {
        throw new Error("User information could not be retrieved");
    }

    return (
        <>
            <div className="">
                <div className=" flex justify-center items-center">
                    <div className="min-w-full sm:min-w-[500px] flex flex-col justify-center items-center  p-5 bg-white shadow rounded-lg md:p-6">
                        <UserInfo
                            avatarUrl="https://randomuser.me/api/port"
                            name={userinfo.name}
                            email={userinfo.email}
                            phone={userinfo.phoneNumber}
                            address={userinfo.address || ""}
                        />
                        <h1>{userinfo.totalSpend}</h1>
                        <div>{userinfo.address ? "" : <WarningBox />}</div>

                        <div className="border-b-2 border-gray-200 w-full mb-4 mt-2"></div>

                        <ProfileCard />
                        <div className=" w-full mb-2 mt-2"></div>
                        <h1>
                            {userinfo.role == "USER" ? <UpgradeAccount /> : ""}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
