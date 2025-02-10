import React from "react";

interface TotalSpendProps {
    totalSpend: number;
}

const TotalSpend: React.FC<TotalSpendProps> = ({ totalSpend }) => {
    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </div>
            <p className="text-gray-600 mt-2">
                Lifetime total spending on all orders
            </p>
        </div>
    );
};

export default TotalSpend;
