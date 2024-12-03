import React from 'react';
import { orderDetails } from '@/utils/types';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(date);
};

const OrderCards = ({ orders }: { orders: orderDetails[] }) => {
    return (
        <div className="container">
            <h1 className="my-2 mx-5 text-xl">Orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6" >
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-[48vh]" >

                        <div className="flex justify-between">
                            <h4 className="text-xl font-bold">Order ID: {order.id}</h4>
                            <div className="flex gap-2">
                                <p className="text-gray-500 border rounded-full px-2">Ordered Date: {formatDate(order.orderCreatedAt) || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="mt-2 max-h-[20vh] overflow-auto">
                            {order.itemsList.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200">
                                    <div>
                                        <p>{item.variation ? item.variation?.variationName : item.product?.name}</p>
                                        <p className="text-sm text-gray-500">quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">$ {item.variation ? item.variation?.price.toLocaleString('en-US') : item.product?.price.toLocaleString('en-US')}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-2 flex justify-between items-center">
                            <p className="font-bold">{order.totalCount} Items</p>
                            <p className="font-bold">Total: $ {order.orderTotal.toLocaleString('en-US')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderCards;
