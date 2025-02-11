"use client";

import { Slider } from "@/components/ui/slider";

type PriceRangeSelectorProps = {
    value: [number, number];
    onChange: (value: number[]) => void;
    step: number;
    min: number;
    max: number;
};

const PriceRangeSelector = ({
    value,
    onChange,
    step,
    min,
    max,
}: PriceRangeSelectorProps) => {
    const handleSliderChange = (value: number[]) => {
        if (value.length === 2) {
            onChange([value[0], value[1]]);
        }
    };

    return (
        <div className={"relative w-full max-w-md"}>
            <Slider
                key={value.join("-")}
                min={min}
                max={max}
                step={step}
                defaultValue={value}
                onValueChange={handleSliderChange}
            />
            <span
                className={
                    "block text-sm absolute top-4/5 -translate-x-1/2 font-bold z-20"
                }
                style={{
                    left: `${(value[0] / max) * 100}%`,
                }}
            >
                ${value[0]}
            </span>
            <span
                className={
                    "block text-sm absolute top-4/5 -translate-x-1/2 font-bold z-20"
                }
                style={{
                    left: `${(value[1] / max) * 100}%`,
                }}
            >
                ${value[1]}
            </span>
        </div>
    );
};

export default PriceRangeSelector;
