"use client";
import { useState } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useCartSummary } from "@/features/client/cart/hooks/use-cart-summary";
import CheckoutSummary from "@/features/client/checkout/components/checkout-summary";

const CheckoutSummaryDropDown = () => {
    const [active, setActive] = useState<string | undefined>(undefined);
    const summary = useCartSummary();
    return (
        <section className={"md:hidden"}>
            <div>
                <Accordion
                    type={"single"}
                    onValueChange={(value) => setActive(value)}
                    collapsible={true}
                >
                    <AccordionItem value={"order-summary"}>
                        <div className={"flex items-center justify-between"}>
                            <AccordionTrigger className={"shadow-none"}>
                                {active
                                    ? "Hide Order Summary"
                                    : "Show order Summary"}
                            </AccordionTrigger>
                            <div>
                                {summary ? `$${summary.totalPrice}` : "..."}
                            </div>
                        </div>
                        <AccordionContent className={"mb-4"}>
                            <CheckoutSummary />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
};

export default CheckoutSummaryDropDown;
