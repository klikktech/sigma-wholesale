import { axios } from "@/lib/axios";
import React from "react";

const OrderDetailsPage = async ({ params }: { params: { orderId: string } }) => {
    const { data, error } = await axios.orders.getOrderDetails(params.orderId);
    if (error) {
        throw new Error(error.message);
    }

    return (
        <div className="container py-4">
            <h1 className="text-2xl font-bold mb-4">Order #{params.orderId}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data && (
                    <>
                        {/* Order Details Section */}
                        <div className="bg-content1 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3">Order Information</h2>
                            {/* Add order details display here */}
                        </div>

                        {/* Customer Details Section */}
                        <div className="bg-content1 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3">Customer Information</h2>
                            {/* Add customer details display here */}
                        </div>

                        {/* Order Items Section */}
                        <div className="bg-content1 p-4 rounded-lg md:col-span-2">
                            <h2 className="text-xl font-semibold mb-3">Order Items</h2>
                            {/* Add order items table here */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderDetailsPage; 