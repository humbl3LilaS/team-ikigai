import React from "react";

interface Order {
    id: string;
    date: string;
    total: string;
    status: string;
}

interface UserOrderProps {
    orders: Order[];
}

const UserOrderHistory: React.FC<UserOrderProps> = ({ orders }) => {
    return (
        <>
            <div className=" bg-white shadow rounded-lg md:p-6 ">
                <div className="     mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4 flex justify-between relative">
                        Orders History
                    </h1>

                    {orders.length === 0 ? (
                        <div className="min-h-[200px] flex items-center justify-center border rounded-lg">
                            <p className="font-semibold text-gray-500 text-lg">
                                No Orders to display!
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-y-auto max-h-[300px] border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {order.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {order.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {/* ${order.total.toFixed(2)} */}
                                                15
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer">
                                                <h4
                                                    className={`py-1.5 text-center rounded-full 
            ${order.status === "Shipped" ? "bg-green-300" : ""} 
            ${order.status === "Processing" ? "bg-yellow-300" : ""} 
            ${order.status === "Pending" ? "bg-blue-300" : ""}`}
                                                >
                                                    {order.status}
                                                </h4>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserOrderHistory;
