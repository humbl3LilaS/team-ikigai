import React from "react";
import UserInfo from "@/features/profile/components/user_info";
import ProfileLayout from "./profileLayout";
import ProfileCard from "@/features/profile/components/profile_nav";
import UpgradeAccount from "@/features/profile/components/upgradeAccount";
import Logout from "@/features/profile/components/logout";
import { SideLayout, RightTop, RightBottom } from "./profileLayout";
import UserOrder from "@/features/profile/components/user_order";
import UserOrderHistory from "@/features/profile/components/user_order_history";
import { orders } from "./userdata";

interface ProfileLayoutProps {
    children: React.ReactNode;
}

const ProfilePage: React.FC<ProfileLayoutProps> = ({ children }) => {
    return (
        <>
            <ProfileLayout>
                <SideLayout>
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
                </SideLayout>
                <RightTop>
                    <UserOrder orders={orders} />
                </RightTop>
                <RightBottom>
                    <UserOrderHistory orders={orders} />
                </RightBottom>
            </ProfileLayout>
        </>
    );
};

export default ProfilePage;
