"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const Logout = () => {
    const handleLogout = () => {
        console.log("logging out");
    };

    return (
        <div className="w-full m-5 flex items-end justify-end">
            <Button
                onClick={handleLogout}
                variant={"outline"}
                className="w-full"
            >
                Log Out
            </Button>
        </div>
    );
};

export default Logout;
