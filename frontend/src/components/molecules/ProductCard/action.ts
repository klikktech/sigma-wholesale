'use server'

import { getUser } from "@/lib/axios/session";

export async function getUserDetails() {
    try {
        const user = await getUser();
        return {
            isAuthenticated: !!user,
            error: null
        };
    } catch (error) {
        return {
            isAuthenticated: false,
            error: 'Failed to fetch user details'
        };
    }
}
