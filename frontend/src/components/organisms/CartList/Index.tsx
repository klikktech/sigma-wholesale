'use client'
import Button from '@/components/atoms/Button';
import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

const CartList = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Vape 19', quantity: 2, price: 44.0, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe2y1UonY2mXYTnG1VMmbS75SKA6qCzyMZ7Q&s' },
    { id: 2, name: 'Glacier CBD 500GB', quantity: 1, price: 249.99, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxexGmpe5YkqC_Z2by4eTDjGQkkdR1iMQ39Q&s' },
    { id: 3, name: 'kratom Gmc 500', quantity: 1, price: 119.99, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR01WYtN2Zs1-v8cXLEbxTa8_tzpCGVfDu5mA&s' },
  ]);

  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-6">Shopping Cart</h2>
            <div className="grid grid-cols-6 gap-4 text-center font-semibold text-gray-600 pb-4 border-b">
              <div className="col-span-3 text-left">Product Details</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 gap-4 items-center text-center py-4 border-b"
              >
                <div className="col-span-3 flex items-center space-x-4 text-left">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">PS4</p>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    className="border px-2 py-1"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button className="border px-2 py-1" onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
                <p>${item.price.toFixed(2)}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <a href="#" className="text-blue-500 mt-4 inline-block">
              Continue Shopping
            </a>
          </div>

          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <p>Items {totalItems}</p>
              <p>${totalCost.toFixed(2)}</p>
            </div>
            <div className="mb-4">
                <p>Promo Code</p>
              <div className="flex space-x-2 w-full justify-between">
                <input
                  type="text"
                  className="border px-4 py-2 w-full"
                  placeholder="Enter your code"
                />
                <Button className="bg-red-500 text-white px-4 py-2">Apply</Button>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <p>Total Cost</p>
              <p>${(totalCost + 5).toFixed(2)}</p>
            </div>
            < Button className="w-full py-3 mt-4" color='primary'>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
