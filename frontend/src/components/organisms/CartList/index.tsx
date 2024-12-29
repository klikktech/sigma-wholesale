'use client';
import Link from 'next/link';
import React, { useEffect, useState, useMemo } from 'react';
import { useFormState } from 'react-dom';
import { handleRemoveItemAction, updateCartAction } from '../../../app/(protected)/cart-list/action';
import { Message } from '@/utils/types';
import { useCartStore } from '@/store/cartStore';
import { Button, Card, Input } from '@nextui-org/react';
import { CART_LIST_PAGE_ROUTE, CHECKOUT_PAGE_ROUTE, HOME_PAGE_ROUTE } from '@/utils/urls';
import { toast } from 'react-toastify';
import FormSubmitButton from '@/components/molecules/FormSubmitButton';

interface CartItem {
  product:any
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

  // Memoize calculations
  const { totalItems, totalCost } = useMemo(() => {
    const items = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cost = cartItems.reduce((acc, item) => 
      acc + (item.variation 
        ? (item.variation.price * item.quantity)
        : (parseInt(item.product.price) * item.quantity)
      ), 0
    );
    
    return { totalItems: items, totalCost: cost };
  }, [cartItems]);

  // Update cart count when totals change
  useEffect(() => {
    setCartCount(totalItems, totalCost);
  }, [totalItems, totalCost, setCartCount]);

  const [state, formAction] = useFormState(async (state: undefined | Message, formData: FormData) => {
    const result = await updateCartAction(state, formData, cartItems);
    if (result?.success) {
      setCartCount(result.totalQuantity,result.totalPrice);
    }
    return result;
  }, undefined);

  const updateVariationQuantity = (name: string, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item.variation && item.variation.variationName === name) ? { ...item, quantity: item.quantity + amount } : item
      )
    );
  };

  const updateProductQuantity = (name: string, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item.product && item.product.name === name) ? { ...item, quantity: item.quantity + amount } : item
      )
    );
  };

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      window.location.href = CART_LIST_PAGE_ROUTE;
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
    <div className="w-full py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="col-span-1 sm:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <form action={formAction}>
            <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
            <div className="grid grid-cols-6 gap-4 text-center font-semibold text-gray-600 pb-4 border-b">
              <div className="col-span-3 text-left">Product Details</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
            </div>
            
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                item.variation ? (
                  <div key={item.variation.variationName} className="grid grid-cols-6 gap-4 items-center text-center py-4">
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
                        onClick={() => updateVariationQuantity(item.variation.variationName, -1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button className="border px-2 py-1" type='button' onClick={() => updateVariationQuantity(item.variation.variationName, 1)}>
                        +
                      </button>
                    </div>
                    <p>${item.variation.price.toFixed(2)}</p>
                    <p>${(item.variation.price * item.quantity).toFixed(2)}</p>
                  </div>
                ) : (
                  <div key={item.product.name} className="grid grid-cols-6 gap-4 items-center text-center py-4">
                    <div className="col-span-3 flex items-center space-x-4 text-left">
                      <div>
                        <p className="font-semibold">{item.product.name}</p>
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
                        onClick={() => updateProductQuantity(item.product.name, -1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button className="border px-2 py-1" type='button' onClick={() => updateProductQuantity(item.product.name, 1)}>
                        +
                      </button>
                    </div>
                    <p>${parseInt(item.product.price).toFixed(2)}</p>
                    <p>${(parseInt(item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                )
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <Link href={HOME_PAGE_ROUTE} className="text-blue-500 hover:text-blue-600">
                Continue Shopping
              </Link>
              <FormSubmitButton className="bg-primary hover:bg-primary-600 text-black" color="primary" type="submit" pendingText="Updating the cart...">
                <span>Update cart</span>
                <span className="material-symbols-rounded">shopping_cart</span>
              </FormSubmitButton>
            </div>
          </form>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg p-6 h-fit">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p>Items {totalItems}</p>
              <p>${totalCost}</p>
            </div>

            <div className="space-y-2">
              <p>Promo Code</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  name="coupon"
                  labelPlacement="outside"
                  className="flex-1"
                />
                <Button type="button" className="bg-red-500 text-white px-4">
                  Apply
                </Button>
              </div>
            </div>

            <div className="flex justify-between font-semibold">
              <p>Total Cost</p>
              <p>${totalCost}</p>
            </div>

            <FormSubmitButton 
              type="button" 
              className="w-full bg-primary hover:bg-primary-600 text-black mt-4" 
              color="primary" 
              pendingText="Checking out.."
            >
              <Link href={CHECKOUT_PAGE_ROUTE} className="w-full">
                Checkout
              </Link>
            </FormSubmitButton>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CartList;
