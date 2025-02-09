import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type QuantitySelectorProps = {
    onQuantityChange: (quantity: number) => void;
    value: number;
};
const QuantitySelector = ({
    onQuantityChange,
    value,
}: QuantitySelectorProps) => {
    return (
        <div
            className={
                "w-fit px-2 py-1 flex items-center gap-x-2 rounded-3xl bg-[#f0f0f0]"
            }
        >
            <Button
                variant={"link"}
                type={"button"}
                disabled={!(value > 1)}
                onClick={() => onQuantityChange(value - 1)}
            >
                <Minus />
            </Button>
            <span>{value}</span>
            <Button
                variant={"link"}
                type={"button"}
                onClick={() => onQuantityChange(value + 1)}
            >
                <Plus />
            </Button>
        </div>
    );
};

export default QuantitySelector;
