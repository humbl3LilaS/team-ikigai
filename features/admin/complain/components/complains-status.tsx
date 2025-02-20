import { IComplainStatus } from "@/database/schema";

const ComplainsStatus = ({ status }: { status: IComplainStatus }) => {
    switch (status) {
        case "PENDING":
            return (
                <span className=" block py-0.5 rounded-xl text-center bg-yellow-300/50 text-yellow-600">
                    Pending
                </span>
            );
        case "APPROVE":
            return (
                <span className=" block py-0.5 rounded-xl text-center bg-yellow-300/50 text-yellow-600">
                    Approved
                </span>
            );
        case "SOLVED":
            return (
                <span className=" block  py-0.5 rounded-xl text-center bg-green-300/50 text-green-600">
                    Solved
                </span>
            );
        case "SOLVING":
            return (
                <span className=" block  py-0.5 rounded-xl text-center bg-blue-300/50 text-blue-600">
                    Solving
                </span>
            );
        default:
            return (
                <span className=" block py-0.5 rounded-xl text-center bg-red-300/50 text-red-600">
                    Declined
                </span>
            );
    }
};

export default ComplainsStatus;
