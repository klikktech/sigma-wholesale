'use server'

import { setAgeVerification } from "@/lib/axios/session";

export async function handleVerification() {
    console.log("handle verification")
    await setAgeVerification()
}
