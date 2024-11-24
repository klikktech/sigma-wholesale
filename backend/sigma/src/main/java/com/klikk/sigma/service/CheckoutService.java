package com.klikk.sigma.service;

import com.klikk.sigma.entity.Checkout;
import jakarta.servlet.http.HttpServletRequest;

public interface CheckoutService {

    public void addCheckoutDetails(Checkout checkout, HttpServletRequest request);
}
