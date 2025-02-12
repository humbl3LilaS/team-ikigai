"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PriceRangeSelectorProps = {
    value: [number, number];
    onChange: (value: number[]) => void;
};

const PriceRangeSelector = ({ value, onChange }: PriceRangeSelectorProps) => {
    return (
        <div className={"w-full grid grid-cols-2 gap-x-4"}>
            <div>
                <Label htmlFor={"min"}>Min</Label>
                <Input
                    defaultValue={value[0]}
                    id={"min"}
                    onChange={(evt) => {
                        onChange([Number(evt.target.value), value[1]]);
                    }}
                />
            </div>
            <div>
                <Label htmlFor={"max"}>Max</Label>
                <Input
                    id={"max"}
                    defaultValue={value[1]}
                    onChange={(evt) => {
                        onChange([value[0], Number(evt.target.value)]);
                    }}
                />
            </div>
        </div>
    );
};

export default PriceRangeSelector;
