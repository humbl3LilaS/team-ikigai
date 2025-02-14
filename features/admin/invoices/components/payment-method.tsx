import { IPaymentMethod } from "@/database/schema";

const PaymentMethod = ({ method }: { method: IPaymentMethod }) => {
    switch (method) {
        case "CASH_ON_DELIVERY":
            return (
                <span
                    title="Cash on Delivery"
                    className={
                        "max-w-[155px] w-max mx-auto block text-xs px-2 py-1 rounded-xl bg-green-300/50 text-center"
                    }
                >
                    Cash On Delivery
                </span>
            );
        case "KBZ_PAY":
            return (
                <span
                    className={
                        "max-w-[155px] w-max mx-auto block text-xs px-2 py-1 rounded-xl bg-blue-300/50 text-center"
                    }
                >
                    K pay
                </span>
            );
        case "WAVE_PAY":
            return (
                <span
                    className={
                        "max-w-[155px] w-max mx-auto block text-xs px-2 py-1 rounded-xl bg-cyan-300 text-center"
                    }
                >
                    Wave pay
                </span>
            );
        default:
            return (
                <span className={"block text-xs px-2 py-1 rounded-xl"}>
                    On Delivery
                </span>
            );
    }
};

export default PaymentMethod;
