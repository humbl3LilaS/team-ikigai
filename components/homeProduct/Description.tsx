import { Check, Settings, Truck } from "lucide-react";
import React from "react";

const Description = () => {
    return (
        <>
            <div className="mt-12 max-w-screen-2xl mx-auto">
                <h1 className="text-xl font-bold text-center">
                    Benefit of Using Our Services
                </h1>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                    <div className="sm:p-4 p-2">
                        <Settings className="mx-auto" />
                        <div className="text-[14px] text-center mt-5">
                            <h1>Best Quality</h1>
                            <p className="line-clamp-2 overflow-hidden">
                            Best Quality – Rigorously tested for function, performance, security, and usability.
                            </p>
                        </div>
                    </div>
                    <div className="sm:p-4 p-2">
                        <Truck className="mx-auto" />
                        <div className="text-[14px] text-center mt-5">
                            <h1>Free Shipping</h1>
                            <p className="line-clamp-2 overflow-hidden">
                            Tested for functionality, performance, security, and usability.
                            </p>
                        </div>
                    </div>
                    <div className="sm:p-4 p-2">
                        <Check className="mx-auto" />
                        <div className="text-[14px] text-center mt-5">
                            <h1>Wrranty</h1>
                            <p className="line-clamp2 overflow-hidden">
                            Includes functional, performance, security, and usability testing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Description;
