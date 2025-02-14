import { IComplainStatus } from "@/database/schema";

const ComplainsStatus = ({ status }: { status: IComplainStatus }) => {
    switch (status) {
        case "PENDING":
            return (
                <span className="max-w-[200px] block px-4 py-2 rounded-xl text-center bg-yellow-300/50 text-yellow-600">
                    PENDING
                </span>
            );
        case "APPROVE":
            return (
                <span className="max-w-[200px] block px-4 py-2 rounded-xl text-center bg-green-300/50 text-green-600">
                    APPROVED
                </span>
            );
        case "SOLVED":
            return (
                <span className="max-w-[200px] block px-4 py-2 rounded-xl text-center bg-green-300/50 text-green-600">
                    SOLVED
                </span>
            );
        default:
            return (
                <span className="max-w-[200px] block px-4 py-2 rounded-xl text-center bg-red-300/50 text-red-600">
                    CANCELLED
                </span>
            );
    }
};

export default ComplainsStatus;
