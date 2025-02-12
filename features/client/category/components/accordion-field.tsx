import { ReactNode } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionFieldProps = {
    title: string;
    children: ReactNode;
};
const AccordionField = ({ title, children }: AccordionFieldProps) => {
    return (
        <Accordion type={"single"} collapsible={true}>
            <AccordionItem value={title}>
                <AccordionTrigger className={"text-xl font-bold"}>
                    {title}
                </AccordionTrigger>
                <AccordionContent className={"mb-4"}>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionField;
