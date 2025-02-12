import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { IOrderStatus } from "@/database/schema";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getDirtyField = <T extends Record<string, unknown>>(
    defaultValue: T,
    dirtyValue: Partial<Readonly<Record<keyof T, boolean | boolean[]>>>,
) => {
    const dirtyField = Object.keys(dirtyValue);
    const valueChanges = dirtyField.reduce((obj, key) => {
        return {
            ...obj,
            [key]: defaultValue[key],
        };
    }, {} as Partial<T>);
    return valueChanges;
};

export const arrayToSlug = <T>(items: T[]) => {
    return items.join("_");
};

export const slugToArray = (slug?: string) => {
    if (!slug) return [];
    return slug.split("_").filter((item) => !!item);
};

export const calculatePageCounts = (items: number) => {
    const div = items / 10;
    const floor = Math.floor(items / 10);
    const abs = Math.abs(floor);
    return abs < div ? floor + 1 : floor;
};

export function fieldArrayOnChange<T>(
    value: T,
    array: T[],
    callback: (value: T[]) => void,
) {
    if (array.includes(value)) {
        const newArray = array.filter((item) => item !== value);
        callback([...newArray]);
    } else {
        callback([...array, value]);
    }
}

export const parseOrderStatus = <T extends string>(status: T) => {
    return status.split("_").join(" ").toLowerCase();
};
