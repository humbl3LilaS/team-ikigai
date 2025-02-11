import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
