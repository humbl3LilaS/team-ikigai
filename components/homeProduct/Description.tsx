import { Check, Settings, Truck } from "lucide-react";
import React from "react";

const Description = () => {
    return (
        <>
            <div className="mt-12">
                <h1 className="text-xl font-bold text-center">
                    Benefit of Using Our Services
                </h1>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                    <div className="sm:p-6 p-3">
                        <Settings className="mx-auto" />
                        <div className="text-center mt-5">
                            <h1>Best Quality</h1>
                            <p>
                                It involves various testing methods, including
                                functional, performance, security, and usability
                                testing idwo eioi soiow oiwie{" "}
                            </p>
                        </div>
                    </div>
                    <div className="sm:p-6 p-3">
                        <Truck className="mx-auto" />
                        <div className="text-center mt-5">
                            <h1>Free Shipping</h1>
                            <p>
                                It involves various testing methods, including
                                functional, performance, security, and usability
                                testing
                            </p>
                        </div>
                    </div>
                    <div className="sm:p-6 p-3">
                        <Check className="mx-auto" />
                        <div className="text-center mt-5">
                            <h1>Wrranty</h1>
                            <p>
                                t involves various testing methods, including
                                functional, performance, security, and usability
                                testing
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Description;
