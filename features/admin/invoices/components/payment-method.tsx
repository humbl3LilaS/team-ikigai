import { IPaymentMethod } from "@/database/schema";

const PaymentMethod = ({ method }: { method: IPaymentMethod }) => {
    switch (method) {
        case "CASH_ON_DELIVERY":
            return (
                <span
                    className={
                        "max-w-[155px] block px-5 py-2 rounded-xl bg-green-300/50 text-center"
                    }
                >
                    Cash On Delivery
                </span>
            );
        case "KBZ_PAY":
            return (
                <span
                    className={
                        "max-w-[155px] block px-4 py-2 rounded-xl bg-blue-300/50 text-center"
                    }
                >
                    K pay
                </span>
            );
        case "WAVE_PAY":
            return (
                <span
                    className={
                        "max-w-[155px] block px-4 py-2 rounded-xl bg-cyan-300 text-center"
                    }
                >
                    Wave pay
                </span>
            );
        default:
            return (
                <span className={"block px-4 py-2 rounded-xl"}>
                    On Delivery
                </span>
            );
    }
};

export default PaymentMethod;
