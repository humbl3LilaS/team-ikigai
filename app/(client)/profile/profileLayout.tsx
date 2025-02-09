import React from "react";
import UserOrder from "@/features/profile/components/user_order";
import { orders } from "./userdata";

// Custom Layout Components for Better Structure
export const SideLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className=" flex justify-center items-center">{children}</div>;
};

export const RightTop = ({ children }: { children: React.ReactNode }) => {
    return <div className="">{children}</div>;
};

export const RightBottom = ({ children }: { children: React.ReactNode }) => {
    return <div className="">{children}</div>;
};

interface ProfileLayoutProps {
    children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
    const childrenArray = React.Children.toArray(children);

    return (
        <div className="max-w-[100vw] overflow-x-hidden">
            {/* Left Side Layout (Profile Info) */}
            <div className="mt-[10vh] flex flex-col md:flex-row gap-5 md:justify-start px-5">
                <div className="basis-1/4 ">{childrenArray[0]}</div>

                {/* Right Layout - Top and Bottom */}
                <div className="basis-3/4 md:flex-col ">
                    <div className="h-full  flex flex-col gap-4 justify-between">
                        {/* Right Top */}
                        <div className="hidden md:block mb-4">
                            {childrenArray[1]}{" "}
                            {/* RightTop: Pass second child here */}
                        </div>

                        {/* Right Bottom */}
                        <div className="hidden md:block">
                            {childrenArray[2]}{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
