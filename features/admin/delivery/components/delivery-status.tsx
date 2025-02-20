import { IDeliveryStatus } from "@/database/schema";

const DeliveryStatus = ({ status }: { status: IDeliveryStatus }) => {
    switch (status) {
        case "PENDING":
            return (
                <span className="max-w-[200px] block px-2 text-xs py-0.5 rounded-md text-center bg-yellow-300/50 text-yellow-600">
                    PENDING
                </span>
            );
        case "IN-TRANSIT":
            return (
                <span className="max-w-[200px] block px-2 text-xs py-0.5 rounded-md text-center bg-blue-300/50 text-blue-600">
                    IN-TRANSIT
                </span>
            );
        case "DELIVERED":
            return (
                <span className="max-w-[200px] block px-2 text-xs py-0.5 rounded-md text-center bg-green-300/50 text-green-600">
                    DELIVERED
                </span>
            );
        case "FAILED":
            return (
                <span className="max-w-[200px] block px-2 text-xs py-0.5 rounded-md text-center bg-red-300/50 text-red-600">
                    FAILED
                </span>
            );
        default:
            return (
                <span className="max-w-[200px] block px-2 text-xs py-0.5 rounded-md text-center bg-red-300/50 text-red-600">
                    CANCELLED
                </span>
            );
    }
};

export default DeliveryStatus;
