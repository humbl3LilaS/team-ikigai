"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

import { Button } from "@/components/ui/button";

const UpgradeAccount = () => {
    const onLogout = async () => {
        await signOut({ redirectTo: "/" });
    };
    return (
        <Button
            className="w-full bg-red-50 p-8 rounded-lg border-2 border-red-100 mx-auto cursor-pointer hover:bg-red-100"
            onClick={onLogout}
        >
            <span className="w-full flex p-1 rounded text-gray-700 text-start   ">
                <LogOut size={25} className="mr-3 text-red-400" />
                &nbsp;
                <span className="text-red-500">LogOut</span>
            </span>
        </Button>
    );
};

export default UpgradeAccount;
