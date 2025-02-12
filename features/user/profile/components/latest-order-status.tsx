import React from "react";
import { Package } from "lucide-react";
import { ORDER_STATUS } from "@/database/schema";
import Link from "next/link";

interface LatestOrderStatusProps {
    status: (typeof ORDER_STATUS.enumValues)[number] | null;
}

const LatestOrderStatus: React.FC<LatestOrderStatusProps> = ({ status }) => {
    const getStatusColor = (status: string | null) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-200 text-yellow-800";
            case "ON_THE_WAY":
                return "bg-green-200 text-green-800";
            case "FINISH":
                return "bg-green-200 text-green-800";
            case "CANCEL":
                return "bg-red-200 text-red-800";
            case "APPROVE":
                return "bg-purple-200 text-purple-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    const getStatusBorderColor = (status: string | null) => {
        switch (status) {
            case "PENDING":
                return "border-yellow-200";
            case "ON_THE_WAY":
                return "border-green-200";
            case "FINISH":
                return "border-green-200";
            case "CANCEL":
                return "border-red-100";
            case "APPROVE":
                return "border-purple-100";
            default:
                return "border-gray-100";
        }
    };

    return (
        <Link href={"/profile/orders"} className="w-full">
            <div
                className={`w-full hover:shadow-md p-4 flex justify-between items-center rounded-full  border-2 border-solid ${getStatusBorderColor(status)}`}
            >
                <h2 className=" text-lg font-semibold py-2 text-gray-800">
                    Your Latest Order is
                </h2>
                <div className="flex items-center justify-between">
                    <div
                        className={`px-4 py-2 rounded-full ${getStatusColor(status)}`}
                    >
                        <span className="font-medium">
                            {status || "No orders yet"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LatestOrderStatus;
