import { HistoryItem } from "@/types/response.types";
import { type ClassValue, clsx } from "clsx";
import { differenceInCalendarDays, format, isSameDay, isYesterday } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function albumDuration (len: number) {
    const min = Math.floor(len/60);
    const sec = len%60;
    return `${min}:${sec<10 ? "0" : ""}${sec}`;
}

export const differenceBetweenHistory = (date1: Date|string, date2: Date|string) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
  
    if (isSameDay(d1, d2)) {
        return null;
    }
  
    const diff = differenceInCalendarDays(d1, d2);
    const currentDiff = differenceInCalendarDays(new Date(), d2);
  
    if (diff === 1 && isYesterday(d2) && currentDiff === 1) {
        return "Yesterday";
    }
    if (diff >= 1 && currentDiff <= 6) {
        return format(d2, "eeee");
    }
    if (d1.getFullYear() === d2.getFullYear()) {
        return format(d2, "dd MMMM");
    }
    return format(d2, "dd MMMM yyyy");
};


export type HistoryPage = {
    items: HistoryItem[];
    nextCursor?: string;
};


export const historyPartition = ( 
    pages : HistoryPage[], 
    pageIndex : number, 
    group : HistoryItem[],
    idx : number
) => {

    try {
        if (pageIndex === 0 && idx < group.length - 1) {
            const h1 = new Date(group[idx].createdAt);
            const h2 = new Date(group[idx + 1].createdAt);
            const diff = differenceBetweenHistory(h1, h2);
            return diff;
        }
      
        if (pages.length > 1 && idx === group.length - 1 && pageIndex < pages.length - 1) {
            const h1 = new Date(group[idx].createdAt);
            const h2 = new Date(pages[pageIndex + 1].items[0].createdAt);
            const diff = differenceBetweenHistory(h1, h2);
            return diff;
        }
      
        if (idx < group.length - 1) {
            const h1 = new Date(group[idx].createdAt);
            const h2 = new Date(group[idx + 1].createdAt);
            const diff = differenceBetweenHistory(h1, h2);
            return diff;
        }
      
        return null;
    } catch (error) {
        return null;
    }
}
