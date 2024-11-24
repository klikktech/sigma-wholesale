'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { handleRemoveItemAction, updateCartAction } from '../../../app/(protected)/cart-list/action';
import { Message } from '@/utils/types';
import { useCartStore } from '@/store/cartStore';
import { Button, Card, Input } from '@nextui-org/react';
import { CART_LIST_PAGE_ROUTE, CHECKOUT_PAGE_ROUTE, HOME_PAGE_ROUTE } from '@/utils/urls';
import { toast } from 'react-toastify';
import FormSubmitButton from '@/components/molecules/FormSubmitButton';

interface CartItem {
  variation: variation
  quantity: number;
}

interface variation {
  variationName: string;
  price: number;
  details:string;
}

interface CartListProps {
  cartItemsList: CartItem[];
}

const CartList = ({ cartItemsList }: CartListProps) => {
  const setCartCount = useCartStore((state) => state.setCartCount);
  const [cartItems, setCartItems] = useState<CartItem[]>(cartItemsList || []);

  const [state, formAction] = useFormState(async (state: undefined | Message, formData: FormData) => {
    const result = await updateCartAction(state, formData, cartItems);
    if (result?.success) {
      setCartCount(result.totalQuantity,result.totalPrice);
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

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cartItems.reduce((acc, item) => acc + item.variation.price * item.quantity, 0);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success("Cart updated successfully!");
    }
  }, [state?.error, state?.success]);

  const handleRemoveItem = async (e: React.MouseEvent<HTMLButtonElement>, variation: any) => {
    e.preventDefault();
    const result = await handleRemoveItemAction(variation, totalItems, totalCost);
    if (result?.success) {
      setCartCount(result.updatedQuantity as number,result.updatedPrice as number);
      toast.success("Deleted product successfully!");
      window.location.href = CART_LIST_PAGE_ROUTE;
    }
    return result;
  }
  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1 md:col-span-2 bg-white shadow-md rounded-lg p-8">
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
                    <div>
                      <p className="font-semibold">{item.variation.variationName}</p>
                      <button
                        type='button'
                        className="text-red-500 text-sm"
                        onClick={(e) => handleRemoveItem(e, item)}
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
                <Link href={HOME_PAGE_ROUTE} className="text-blue-500 mt-4 inline-block">
                  Continue Shopping
                </Link>
                <FormSubmitButton className="mt-3" color="primary" type='submit' pendingText='Updating the cart...'>
                  <span>Update cart</span>
                  <span className="material-symbols-rounded">shopping_cart</span>
                </FormSubmitButton>
              </div>
            </form>
          </Card>

          <Card className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <p>Items {totalItems}</p>
              <p>${totalCost.toFixed(2)}</p>
            </div>
            <div className="mb-4">
              <p>Promo Code</p>
              <div className="flex space-x-2 w-full justify-between">
                <Input
                  placeholder="Enter coupon code"
                  name="coupon"
                  labelPlacement="outside"
                />
                <Button type='button' className='bg-red-500 text-white px-4 py-2'>Apply</Button>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <p>Total Cost</p>
              <p>${(totalCost).toFixed(2)}</p>
            </div>
            <FormSubmitButton type='submit' className="w-full py-3 mt-4" color="primary" pendingText='Checking out..'>
              <Link href={CHECKOUT_PAGE_ROUTE}>Checkout</Link>
            </FormSubmitButton>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartList;
