'use client';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { updateCartAction } from '../../../app/(public)/cart-list/action';
import { Message } from '@/utils/types';
import { useCartStore } from '@/store/cartStore';

interface CartItem {
  variation: variation
  quantity: number;
  // imageUrl: string;
}
interface variation {
  variationName: string;
  price: number;
}

interface CartListProps {
  cartItemsList: CartItem[];
}

const CartList = ({ cartItemsList }:CartListProps) => {
  const setCartCount = useCartStore((state) => state.setCartCount);

  const [cartItems, setCartItems] = useState<CartItem[]>(cartItemsList || []);

  const [state, formAction] = useFormState(async (state: undefined | Message, formData: FormData) => {
    const result = await updateCartAction(state, formData, cartItems);
    if (result?.success) {
      setCartCount(result.totalQuantity);
    }
    return result;
  }, undefined);

  const updateQuantity = (name: string, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.variation.variationName === name ? { ...item, quantity: item.quantity + amount } : item
      )
    );
  };

  const removeItem = (name: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.variation.variationName !== name));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cartItems.reduce((acc, item) => acc + item.variation.price * item.quantity, 0);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white shadow-md rounded-lg p-8">
            <form action={formAction}>
              <h2 className="text-xl font-bold mb-6">Shopping Cart</h2>
              <div className="grid grid-cols-6 gap-4 text-center font-semibold text-gray-600 pb-4 border-b">
                <div className="col-span-3 text-left">Product Details</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Total</div>
              </div>
              {cartItems.map((item) => (
                <div
                  key={item.variation.variationName}
                  className="grid grid-cols-6 gap-4 items-center text-center py-4 border-b"
                >
                  <div className="col-span-3 flex items-center space-x-4 text-left">
                    {/* <img src={''} alt={item.variation.name} className="w-16 h-16 object-cover" /> */}
                    <div>
                      <p className="font-semibold">{item.variation.variationName}</p>
                      <button
                        type='submit'
                        className="text-red-500 text-sm"
                        onClick={() => removeItem(item.variation.variationName)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      type='button'
                      className="border px-2 py-1"
                      onClick={() => updateQuantity(item.variation.variationName, -1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="border px-2 py-1" type='button' onClick={() => updateQuantity(item.variation.variationName, 1)}>
                      +
                    </button>
                  </div>
                  <p>${item.variation.price.toFixed(2)}</p>
                  <p>${(item.variation.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <a href="#" className="text-blue-500 mt-4 inline-block">
                  Continue Shopping
                </a>
                <Button className="mt-3" color="primary" type='submit'>
                  <span>Update cart</span>
                  <span className="material-symbols-rounded">shopping_cart</span>
                </Button>
              </div>
            </form>
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
                <Button type='button' className="bg-red-500 text-white px-4 py-2">Apply</Button>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <p>Total Cost</p>
              <p>${(totalCost).toFixed(2)}</p>
            </div>
            <Button type='button' className="w-full py-3 mt-4" color="primary">
              <Link href="/check-out">Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
