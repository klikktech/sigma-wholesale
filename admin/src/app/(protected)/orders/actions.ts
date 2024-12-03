'use server'

import { axios } from "@/lib/axios";
import { ORDERS_PAGE_ROUTE } from "@/utils/routes";
import { redirect } from "next/navigation";

export async function updateOrderStatus(orderId: string, orderStatus: string) {
    const payload={orderId:orderId,orderStatus:orderStatus}
    const { data, status: responseStatus, error } = await axios.orders.editOrderStatus(payload);

    if (error) {
        return { error: error.message };
    }
    if (data && responseStatus === 200) {
        redirect(ORDERS_PAGE_ROUTE);
    }
}

export async function deleteOrder(orderId: string) {
    const { data, status, error } = await axios.orders.deleteOrder(orderId);

    if (error) {
        return { error: error.message };
    }
    if (data && status === 200) {
        redirect(ORDERS_PAGE_ROUTE);
    }
}

export async function getOrderDetails(orderId: string) {
    const { data, status, error } = await axios.orders.getOrderDetails(orderId);

    if (error) {
        return { error: error.message };
    }
    return { data, status };
} 