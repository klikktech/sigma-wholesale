"use server";

// import { useCart } from "@/context/CartContext";
import { axios } from "@/lib/axios";
import { CartItem, Message } from "@/utils/types";


export const updateCartAction = async (
    state: undefined | Message,
    formData: FormData,
    cartItems: CartItem[],
) => {
    const transformedArray = cartItems.map((item: any) => ({
        variation: item.variation.details,
        quantity: item.quantity,
        price: item.variation.price,
    }));

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.variation.price, 0);

    const payload = {
        quantity: totalQuantity,
        price: totalPrice,
        cartItemsList: transformedArray,
    };

    console.log(payload);

    const { data, status, error } = await axios.products.addToCart(payload);
    if (error) {
        console.log("error", error)
        return { error: error.message };
    }
    if (data && status === 200) {
        console.log("success", status, data)
        return { error:'',success: true, totalQuantity, totalPrice };
    }
};
