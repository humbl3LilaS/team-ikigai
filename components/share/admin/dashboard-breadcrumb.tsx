"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardBreadcrumb = () => {
    const path = usePathname();
    const segments = path.substring(1).split("/");
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <BreadcrumbItem key={`${item}-${idx}`}>
                            <BreadcrumbLink
                                className={"capitalize"}
                                href={
                                    idx > 0
                                        ? "/" +
                                          segments.slice(0, idx + 1).join("/")
                                        : `/${item}`
                                }
                            >
                                {item}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {idx !== segments.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DashboardBreadcrumb;
