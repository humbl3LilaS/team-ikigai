import React from "react";

import { DollarSign } from "lucide-react";

interface TotalSpendProps {
    totalSpend: number;
}

const TotalSpend: React.FC<TotalSpendProps> = ({ totalSpend }) => {
    return (
        <div className="w-full bg-gray-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Total Spending
            </h2>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                        $
                        {totalSpend.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                    <DollarSign size={20}></DollarSign>
                </div>
            </div>
            <p className="text-gray-600 mt-2">
                Lifetime total spending on all orders
            </p>
        </div>
    );
};

export default TotalSpend;
