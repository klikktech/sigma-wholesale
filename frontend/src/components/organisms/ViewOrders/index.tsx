import React from 'react';
import { Card, Spacer, Button, Badge, CardBody, CardHeader, CardFooter } from '@nextui-org/react';

type Order = {
    orderId: string;
    location: string;
    destination: string;
    estimatedArrival: string;
    status: string;
    items: { name: string; price: number; size: number }[];
    totalPrice: number;
    itemCount: number;
};

const orders: Order[] = [
    {
        orderId: "#7812657",
        location: "Malang, Indonesia",
        destination: "Emir's House, Indonesia",
        estimatedArrival: "28 May 2024",
        status: "On Deliver",
        items: [
            { name: "Nike Air Max SYSTM", price: 1459000, size: 24 },
            { name: "Nike Air Rift", price: 1909000, size: 24 },
            { name: "Nike Gamma Force", price: 1399000, size: 24 },
            { name: "Nike Air Max SYSTM", price: 1459000, size: 24 },
            { name: "Nike Air Rift", price: 1909000, size: 24 },
            { name: "Nike Gamma Force", price: 1399000, size: 24 },
        ],
        totalPrice: 7890000,
        itemCount: 6,
    },
    {
        orderId: "#7890981",
        location: "Berlin, UK",
        destination: "Emir's House, Indonesia",
        estimatedArrival: "",
        status: "On Deliver",
        items: [
            { name: "Nike Gamma Force", price: 1399000, size: 24 },
            { name: "Nike Air Rift", price: 1909000, size: 24 },
        ],
        totalPrice: 2900000,
        itemCount: 2,
    },
    {
        orderId: "#8981786",
        location: "Chicago, US",
        destination: "Emir's House, Indonesia",
        estimatedArrival: "10 Aug 2024",
        status: "On Process",
        items: [
            { name: "Nike Calm", price: 1069000, size: 24 },
        ],
        totalPrice: 1400000,
        itemCount: 1,
    },
    {
        orderId: "#4560918",
        location: "Chicago, US",
        destination: "Emir's House, Indonesia",
        estimatedArrival: "",
        status: "On Deliver",
        items: [
            { name: "Nike Air Max Pulse", price: 2379000, size: 24 },
            { name: "Nike Air Rift", price: 1909000, size: 24 },
            { name: "Nike Gamma Force", price: 1399000, size: 24 },
            { name: "Nike Air Max SYSTM", price: 1459000, size: 24 },
        ],
        totalPrice: 6758000,
        itemCount: 4,
    },
];

const OrderCards = () => {
    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6" >
                {orders.map((order) => (
                    <div key={order.orderId} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-[48vh]" >

                        <div className="flex justify-between">
                            <h4 className="text-xl font-bold">Order ID: {order.orderId}</h4>
                            <div className="flex gap-2">
                                <p className="text-gray-500 border rounded-full px-2">Estimated Arrival: {order.estimatedArrival || 'N/A'}</p>
                                <span className={`px-2 rounded-full ${order.status === 'On Deliver' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        <div className='mt-4 flex justify-between'>
                            <p className="text-gray-500 border rounded-full px-2">From: {order.location}</p>
                            <p className="text-gray-500 border rounded-full px-2">To: {order.destination}</p>
                        </div>

                        <div className="mt-4 max-h-[20vh] overflow-auto">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200">
                                    <div>
                                        <p>{item.name}</p>
                                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                                    </div>
                                    <p className="font-semibold">Rp {item.price.toLocaleString('id-ID')}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <p className="font-bold">{order.itemCount} Items</p>
                            <p className="font-bold">Total: Rp {order.totalPrice.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderCards;
