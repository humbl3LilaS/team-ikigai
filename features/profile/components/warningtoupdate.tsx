import React from "react";
import Link from "next/link";
import { AlertCircleIcon } from "lucide-react";

const warningBox = () => {
    return (
        <Link href="/profile/details" className="w-full">
            <div
                className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative flex justify-between"
                role="alert"
            >
                <h1 className="pr-2">
                    Please fill some additional information first!
                </h1>
                <AlertCircleIcon></AlertCircleIcon>
            </div>
        </Link>
    );
};

export default warningBox;
