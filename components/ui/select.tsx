"use client";

import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

export const Select = RadixSelect.Root;

export const SelectTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, children, ...props }, ref) => {
    return (
        <RadixSelect.Trigger
            ref={ref}
            className={cn(
                "flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
                className,
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 text-gray-500" />
        </RadixSelect.Trigger>
    );
});
SelectTrigger.displayName = RadixSelect.Trigger.displayName;

export const SelectContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, ...props }, ref) => (
    <RadixSelect.Portal>
        <RadixSelect.Content
            ref={ref}
            className={cn(
                "absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md",
                className,
            )}
            {...props}
        >
            <RadixSelect.Viewport className="p-1">
                {children}
            </RadixSelect.Viewport>
        </RadixSelect.Content>
    </RadixSelect.Portal>
));
SelectContent.displayName = RadixSelect.Content.displayName;

export const SelectItem = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className, children, ...props }, ref) => (
    <RadixSelect.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm text-gray-700 outline-none transition hover:bg-gray-100 focus:bg-gray-100",
            className,
        )}
        {...props}
    >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute right-2">
            <Check className="h-4 w-4 text-blue-500" />
        </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
));
SelectItem.displayName = RadixSelect.Item.displayName;

export const SelectValue = RadixSelect.Value;
