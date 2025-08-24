import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function albumDuration (len: number) {
    const min = Math.floor(len/60);
    const sec = len%60;
    return `${min}:${sec<10 ? "0" : ""}${sec}`;
}