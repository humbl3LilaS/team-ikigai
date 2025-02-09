import React from "react";

import Logout from "@/features/profile/components/logout";
import ProfileCard from "@/features/profile/components/profile_nav";
import UpgradeAccount from "@/features/profile/components/upgradeAccount";
import UserInfo from "@/features/profile/components/user_info";

const ProfilePage = () => {
    return (
        <>
            <div>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center  p-5 bg-white shadow rounded-lg md:p-6">
                        <UserInfo
                            avatarUrl="https://randomuser.me/api/port"
                            name="John Doe"
                            email="johndoebuying.gmail.com"
                            phone="123-456-7890"
                            address="1234 Elm St, Springfield, IL 62701"
                        />
                        <ProfileCard />
                        <UpgradeAccount />
                        <div className="w-[100%] m-5 flex items-end justify-end">
                            <Logout />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
