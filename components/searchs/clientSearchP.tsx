import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Crosshair, Search, X } from "lucide-react";
import { Button } from "../ui/button";

const ClientSearchP = () => {
    return (
        <>
            <div className="bg-black/5 flex items-center gap-1 rounded-md px-3">
                <input
                    className="focus:outline-none min-w-60 bg-transparent text-black"
                    placeholder="Search..."
                />
                <X className="p-1 size-7 text-red-600 cursor-pointer" />
            </div>
        </>
    );
};

export default ClientSearchP;
