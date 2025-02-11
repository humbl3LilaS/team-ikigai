"use client";
import { Check } from "lucide-react";
import { useState } from "react";

type ColorVarientProps = {
    variants: {
        productId: string;
        colorHex: string;
        stock: number;
    }[];
};
const ColorVariants = ({ variants }: ColorVarientProps) => {
    const [currentColor, setCurrentColor] = useState(variants[0].colorHex);

    return (
        <div className={"mt-3"}>
            <h1>Available Colors</h1>
            <div className={"mt-3 flex gap-x-2"}>
                {variants.map((variant) => (
                    <p key={variant.colorHex} className={"relative"}>
                        <span className={"sr-only"}>{variant.colorHex}</span>
                        <span
                            className={"size-10 rounded-full block"}
                            style={{ backgroundColor: variant.colorHex }}
                            onClick={() => setCurrentColor(variant.colorHex)}
                        />
                        {variant.colorHex === currentColor && (
                            <Check
                                color="#ffffff"
                                strokeWidth={2.5}
                                className={
                                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                }
                            />
                        )}
                    </p>
                ))}
            </div>
            <p className={"mt-3"}>
                <span className={"font-bold"}>
                    {
                        variants.find((item) => item.colorHex === currentColor)!
                            .stock
                    }
                    items
                </span>
                &nbsp;in stock.
            </p>
        </div>
    );
};

export default ColorVariants;
