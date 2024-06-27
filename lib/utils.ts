import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/components/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
        return "Just now";
    }
};

export const formatAndDivideNumber = (number: number): string => {
    if (number === undefined || number === null) {
        number = 0;
    }
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    } else {
        return number.toString();
    }
};

export const getJoinedDate = (date: Date): string => {
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const joinedDate = `${month} ${year}`;
    return joinedDate;
};

interface UrlQueryParams {
    params: string;
    key: string;
    value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
    const currentUrl = qs.parse(params);
    currentUrl[key] = value;

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        { skipNull: true }
    );
};

interface RemoveUrlQueryParams {
    params: string;
    keysToRemove: string[];
}

export const removeKeysFromQuery = ({
    params,
    keysToRemove,
}: RemoveUrlQueryParams) => {
    const currentUrl = qs.parse(params);

    keysToRemove.forEach((key) => {
        delete currentUrl[key];
    });

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        { skipNull: true }
    );
};

interface BadgeParam {
    criteria: {
        type: keyof typeof BADGE_CRITERIA;
        count: number;
    }[];
}

export const assignBadges = (params: BadgeParam) => {
    const badgeCounts: BadgeCounts = {
        GOLD: 0,
        SILVER: 0,
        BRONZE: 0,
    };

    const { criteria } = params;

    criteria.forEach((item) => {
        const { type, count } = item;
        const badgeLevels: any = BADGE_CRITERIA[type];

        Object.keys(badgeLevels).forEach((level: any) => {
            if (count >= badgeLevels[level]) {
                badgeCounts[level as keyof BadgeCounts] += 1;
            }
        });
    });
    return badgeCounts;
};
