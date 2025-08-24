import axios from "axios";
import { PROTECTED_BASE_URL, PUBLIC_BASE_URL  } from "@/constants/api.config";

interface Args {
    prefix : "PUBLIC_BASE_URL" | "PROTECTED_BASE_URL"
    suffix : string;
    token? : string;
}

export async function fetcher({ prefix, suffix, token }: Args) {

    let base = "";
    if (prefix === "PUBLIC_BASE_URL") {
        base = PUBLIC_BASE_URL;
    } else {
        base = PROTECTED_BASE_URL;
    }

    const response = await axios.get(`${base}/${suffix}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = response.data;
    return data;
}