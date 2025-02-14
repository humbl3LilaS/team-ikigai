import { Check } from "lucide-react";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ColorSelectorProps = {
    options: Array<{
        colorId: string;
        colorHex: string;
        stock: number;
        productId: string;
    }>;
    onChange: (value: string) => void;
    value: string | undefined;
};
const ColorSelector = ({ options, onChange, value }: ColorSelectorProps) => {
    return (
        <RadioGroup onValueChange={onChange} defaultValue={value}>
            <div className={"flex gap-x-2"}>
                {options.map((item, idx) => (
                    <FormItem key={item.colorId + idx}>
                        <FormControl className={"hidden"}>
                            <RadioGroupItem value={item.colorId} />
                        </FormControl>
                        <FormLabel
                            className={"block size-10 rounded-full relative cursor-pointer border border-slate-500"}
                            style={{
                                backgroundColor: `${item.colorHex}`,
                            }}
                        >
                            <span className={"sr-only"}>#{item.colorHex}</span>
                            {value === item.colorId && (
                                <Check
                                    color="#ffffff"
                                    strokeWidth={2.5}
                                    className={
                                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    }
                                />
                            )}
                        </FormLabel>
                    </FormItem>
                ))}
            </div>
            {value && (
                <p>
                    <span className={"font-bold"}>
                        {options.find((item) => item.colorId === value)!.stock}
                        items
                    </span>
                    &nbsp;in stock.
                </p>
            )}
        </RadioGroup>
    );
};

export default ColorSelector;
