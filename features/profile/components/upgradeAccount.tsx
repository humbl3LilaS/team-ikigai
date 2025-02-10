import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UpgradeAccount = () => {
    return (
        <div className="flex justify-center items-center bg-blue-50 p-4 rounded-lg shadow-md mx-auto">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-700">
                    Upgrade to Business Account
                </h3>
                <p className="text-sm text-blue-600 mt-2 px-4 max-w-[450px]">
                    Unlock premium features, increased limits, and more. Upgrade
                    today and take your business to the next level!
                </p>
                <Button
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    variant={"secondary"}
                >
                    <Link href={"/profile/upgrade"}>Upgrade Now</Link>
                </Button>
            </div>
        </div>
    );
};

export default UpgradeAccount;
