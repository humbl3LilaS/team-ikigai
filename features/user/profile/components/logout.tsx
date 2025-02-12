import React from "react";
import { LogOut } from "lucide-react";

const UpgradeAccount = () => {
    return (
        <div className="w-full bg-red-50 p-4 rounded-lg border-2 border-red-100 mx-auto cursor-pointer hover:bg-red-100">
            <h5 className="w-full flex p-1 rounded text-gray-700 text-start   ">
                <LogOut size={25} className="mr-3 text-red-400"></LogOut>{" "}
                <h5 className="text-red-500">LogOut</h5>
            </h5>
        </div>
    );
};

export default UpgradeAccount;
