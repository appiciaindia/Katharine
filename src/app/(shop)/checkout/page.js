"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FiMapPin,
    FiTruck,
    FiCreditCard,
    FiMinus,
    FiPlus,
    FiTrash2,
    FiTag,
    FiLock,
    FiChevronRight,
    FiCheck,
} from "react-icons/fi";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";

export default function CheckoutPage() {
    const { user, loading: authLoading } = useAuth();

    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        cartTotal,
        clearCart,
    } = useCart();

    const [deliveryType, setDeliveryType] = useState("home");

    const [deliveryMethod, setDeliveryMethod] =
        useState("standard");

    const [paymentMethod, setPaymentMethod] =
        useState("online");

    const [coupon, setCoupon] = useState("");

    const [discount, setDiscount] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [busy, setBusy] = useState(false);
    const [placedOrder, setPlacedOrder] = useState(null);
    const [saveAddress, setSaveAddress] = useState(true);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        pincode: "",
        address: "",
        city: "",
        state: "",
        landmark: "",
    });

    async function syncServerCart() {
        const currentCart = await apiRequest("/cart");
        const serverItems = currentCart.data?.items || [];
        const localIds = new Set(cartItems.map((item) => Number(item.id)));

        for (const item of serverItems) {
            if (!localIds.has(Number(item.product_id))) {
                await apiRequest(`/cart/items/${item.id}`, { method: "DELETE" });
            }
        }

        for (const item of cartItems) {
            const productId = Number(item.id);
            if (!Number.isInteger(productId) || productId < 1) {
                throw new Error(`${item.name} is not available in the online catalog. Please remove it and add it again.`);
            }

            const existing = serverItems.find((entry) => Number(entry.product_id) === productId);
            if (existing) {
                if (Number(existing.quantity) !== Number(item.quantity)) {
                    await apiRequest(`/cart/items/${existing.id}`, {
                        method: "PUT",
                        body: { quantity: item.quantity },
                    });
                }
            } else {
                await apiRequest("/cart/items", {
                    method: "POST",
                    body: { product_id: productId, quantity: item.quantity },
                });
            }
        }
    }


    // -----------------------------
    // Form Change
    // -----------------------------

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // -----------------------------
    // Coupon
    // -----------------------------

    const applyCoupon = async () => {
        if (!coupon.trim()) {
            return;
        }
        if (!user) {
            setFeedback("Please log in before applying a coupon.");
            return;
        }
        setBusy(true);
        try {
            await syncServerCart();
            const response = await apiRequest("/coupons/validate", {
                method: "POST",
                body: { code: coupon.trim() },
            });
            setDiscount(Number(response.data.discount));
            setCoupon(response.data.code);
            setFeedback("Coupon applied. The discount is reflected in your total.");
        } catch (error) {
            setDiscount(0);
            setFeedback(error.message);
        } finally {
            setBusy(false);
        }
    };


    // -----------------------------
    // Shipping
    // -----------------------------

    const shippingCharge =
        deliveryMethod === "express" ? 100 : 0;


    // -----------------------------
    // Final Total
    // -----------------------------

    const finalTotal =
        cartTotal +
        shippingCharge -
        discount;


    // -----------------------------
    // Place Order
    // -----------------------------

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            setFeedback("Your cart is empty. Add a product before placing an order.");
            return;
        }

        if (!(formData.fullName || user?.name) ||
            !(formData.phone || user?.phone) ||
            !formData.pincode ||
            !formData.address ||
            !formData.city ||
            !formData.state
        ) {

            setFeedback("Please fill all required shipping details.");

            return;
        }
        if (!user) {
            setFeedback("Please log in or create an account before placing your order.");
            return;
        }
        if (paymentMethod !== "cod") {
            setFeedback("Online and bank payments are not configured yet. Choose Cash on Delivery to place this order.");
            return;
        }
        if (deliveryType !== "home" || deliveryMethod !== "standard") {
            setFeedback("Only standard home delivery is available right now. Select Home Delivery and Standard Delivery to continue.");
            return;
        }

        setBusy(true);
        setFeedback("");
        try {
            await syncServerCart();

            const addressPayload = {
                label: "home",
                name: (formData.fullName || user.name).trim(),
                phone: (formData.phone || user.phone).trim(),
                line1: formData.address.trim(),
                landmark: formData.landmark.trim() || null,
                city: formData.city.trim(),
                state: formData.state.trim(),
                postal_code: formData.pincode.trim(),
                country: "IN",
                is_default: saveAddress,
            };
            const addressResponse = await apiRequest("/addresses");
            const savedAddress = (addressResponse.data || []).find((address) =>
                address.name === addressPayload.name &&
                address.phone === addressPayload.phone &&
                address.line1 === addressPayload.line1 &&
                address.city === addressPayload.city &&
                address.state === addressPayload.state &&
                address.postal_code === addressPayload.postal_code
            );
            const address = savedAddress
                ? { data: savedAddress }
                : await apiRequest("/addresses", { method: "POST", body: addressPayload });

            const orderResponse = await apiRequest("/orders", {
                method: "POST",
                body: {
                    address_id: address.data.id,
                    payment_method: "cod",
                    coupon_code: coupon.trim() || null,
                },
            });
            setPlacedOrder(orderResponse.data);
            clearCart();
            setDiscount(0);
        } catch (error) {
            setFeedback(error.message);
        } finally {
            setBusy(false);
        }
    };


    // -----------------------------
    // Empty Cart
    // -----------------------------

    if (placedOrder) {
        return (
            <main className="min-h-screen bg-[#f7faff] px-4 py-20">
                <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-sm">
                    <div className="mb-4 text-5xl text-green-600">✓</div>
                    <h1 className="text-2xl font-bold text-[#113173]">Order placed successfully</h1>
                    <p className="mt-3 text-gray-600">Your order number is <strong>{placedOrder.order_number}</strong>.</p>
                    <p className="mt-2 text-sm text-gray-500">Payment method: Cash on Delivery</p>
                    <Link href="/shop" className="mt-7 inline-flex rounded-xl bg-[#113173] px-7 py-3 font-semibold text-white">Continue Shopping</Link>
                </div>
            </main>
        );
    }

    if (cartItems.length === 0) {

        return (
            <main className="min-h-screen bg-[#f7faff]">

                <div className="container mx-auto px-4 py-20">

                    <div className="max-w-lg mx-auto bg-white rounded-2xl p-10 text-center shadow-sm">

                        <div className="text-6xl mb-5">
                            🛒
                        </div>

                        <h1 className="text-2xl font-bold text-[#113173]">
                            Your Cart is Empty
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Please add products before proceeding
                            to checkout.
                        </p>

                        <Link
                            href="/shop"
                            className="inline-flex mt-6 px-7 py-3 bg-[#113173] text-white rounded-xl font-semibold"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>

            </main>
        );
    }


    return (

        <main className="min-h-screen bg-[#f7faff]">

            {/* ======================================
                CHECKOUT STEPS
            ====================================== */}

            <section className="border-b bg-white">

                <div className="container mx-auto px-4 py-7">

                    <div className="flex items-center justify-center max-w-4xl mx-auto">

                        {/* Step 1 */}

                        <div className="flex items-center">

                            <div className="w-10 h-10 rounded-full bg-[#0c213c] text-white flex items-center justify-center font-bold">
                                1
                            </div>

                            <span className="ml-3 text-sm md:text-base font-semibold text-[#0c213c]">
                                Shipping Address
                            </span>

                        </div>


                        <div className="hidden md:block w-28 lg:w-48 h-px bg-gray-300 mx-5" />


                        {/* Step 2 */}

                        <div className="flex items-center">

                            <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">
                                2
                            </div>

                            <span className="ml-3 text-sm md:text-base text-gray-500">
                                Payment Method
                            </span>

                        </div>


                        <div className="hidden md:block w-28 lg:w-48 h-px bg-gray-300 mx-5" />


                        {/* Step 3 */}

                        <div className="flex items-center">

                            <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">
                                3
                            </div>

                            <span className="ml-3 text-sm md:text-base text-gray-500">
                                Place Order
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* ======================================
                MAIN CHECKOUT
            ====================================== */}

            <section className="py-8 md:py-12">

                <div className="container mx-auto px-4">

                    <div className="grid lg:grid-cols-[1fr_430px] gap-6">


                        {/* ==================================
                            LEFT SIDE
                        ================================== */}

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">


                            {/* -------------------------------
                                SHIPPING ADDRESS
                            -------------------------------- */}

                            <div className="p-5 md:p-7">

                                <div className="flex items-start justify-between gap-4 mb-6">

                                    <div className="flex items-start gap-3">

                                        <div className="w-11 h-11 rounded-full bg-[#eaf5ff] text-[#0c213c] flex items-center justify-center text-xl">
                                            <FiMapPin />
                                        </div>

                                        <div>

                                            <h2 className="text-xl font-bold text-[#113173]">
                                                1. Shipping Address
                                            </h2>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Enter your delivery details
                                                to receive your order.
                                            </p>

                                        </div>

                                    </div>

                                    <span className="hidden md:block text-sm text-gray-500">
                                        {authLoading ? "Checking account…" : user ? `Signed in as ${user.email}` : <>Already have an account?{" "}<Link href="/login" className="text-[#0c213c] font-semibold">Login</Link></>}
                                    </span>

                                </div>


                                {/* Delivery Type */}

                                <div className="grid md:grid-cols-2 gap-3 mb-6">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDeliveryType("home")
                                        }
                                        className={`p-4 rounded-xl border text-left ${
                                            deliveryType === "home"
                                                ? "border-[#0c213c] bg-[#f3f9ff]"
                                                : "border-gray-200"
                                        }`}
                                    >

                                        <div className="flex items-center gap-3">

                                            <FiMapPin
                                                className="text-[#0c213c]"
                                                size={25}
                                            />

                                            <div>

                                                <p className="font-semibold text-[#113173]">
                                                    Home Delivery
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Deliver to your address
                                                </p>

                                            </div>

                                        </div>

                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDeliveryType("pickup")
                                        }
                                        className={`p-4 rounded-xl border text-left ${
                                            deliveryType === "pickup"
                                                ? "border-[#0c213c] bg-[#f3f9ff]"
                                                : "border-gray-200"
                                        }`}
                                    >

                                        <div className="flex items-center gap-3">

                                            <FiTruck
                                                className="text-gray-500"
                                                size={25}
                                            />

                                            <div>

                                                <p className="font-semibold text-[#113173]">
                                                    Self Pickup
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Collect from nearest branch
                                                </p>

                                            </div>

                                        </div>

                                    </button>

                                </div>


                                {/* Form */}

                                {deliveryType === "home" && (

                                    <div className="grid md:grid-cols-2 gap-5">

                                        {/* Full Name */}

                                        <div>

                                            <label className="block text-sm font-semibold mb-2">
                                                Full Name *
                                            </label>

                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName || user?.name || ""}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className="checkout-input"
                                            />

                                        </div>


                                        {/* Phone */}

                                        <div>

                                            <label className="block text-sm font-semibold mb-2">
                                                Phone Number *
                                            </label>

                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone || user?.phone || ""}
                                                onChange={handleChange}
                                                placeholder="Enter mobile number"
                                                className="checkout-input"
                                            />

                                        </div>


                                        {/* Email */}

                                        <div>

                                            <label className="block text-sm font-semibold mb-2">
                                                Email Address
                                                <span className="font-normal text-gray-400">
                                                    {" "}(
                                                    Optional)
                                                </span>
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email || user?.email || ""}
                                                onChange={handleChange}
                                                placeholder="Enter your email address"
                                                className="checkout-input"
                                            />

                                        </div>


                                        {/* Pincode */}

                                        <div>

                                            <label className="block text-sm font-semibold mb-2">
                                                Pincode *
                                            </label>

                                            <div className="flex gap-2">

                                                <input
                                                    type="text"
                                                    name="pincode"
                                                    value={formData.pincode}
                                                    onChange={handleChange}
                                                    placeholder="Enter pincode"
                                                    className="checkout-input"
                                                />

                                                <button
                                                    type="button"
                                                    className="px-5 rounded-xl bg-[#113173] text-white font-semibold"
                                                >
                                                    Check
                                                </button>

                                            </div>

                                        </div>


                                        {/* Address */}

                                        <div className="md:col-span-2">

                                            <label className="block text-sm font-semibold mb-2">
                                                Address *
                                            </label>

                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows="3"
                                                placeholder="House no, building, street, area"
                                                className="checkout-input resize-none"
                                            />

                                        </div>


                                        {/* City */}

                                        <div>

                                            <label className="block text-sm font-semibold mb-2">
                                                City *
                                            </label>

                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="Enter city"
                                                className="checkout-input"
                                            />

                                        </div>


                                        {/* State */}

                                        <div>

                                            <label className="block text-sm font-semibold mb-2">
                                                State *
                                            </label>

                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="checkout-input"
                                            >

                                                <option value="">
                                                    Select state
                                                </option>

                                                <option>
                                                    Haryana
                                                </option>

                                                <option>
                                                    Delhi
                                                </option>

                                                <option>
                                                    Rajasthan
                                                </option>

                                                <option>
                                                    Uttar Pradesh
                                                </option>

                                                <option>
                                                    Maharashtra
                                                </option>

                                                <option>
                                                    Punjab
                                                </option>

                                                <option>
                                                    Gujarat
                                                </option>

                                                <option>
                                                    Karnataka
                                                </option>

                                                <option>
                                                    Telangana
                                                </option>

                                            </select>

                                        </div>


                                        {/* Landmark */}

                                        <div>

                                            <label className="block text-sm font-semibold mb-2">
                                                Landmark{" "}
                                                <span className="font-normal text-gray-400">
                                                    (Optional)
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                name="landmark"
                                                value={formData.landmark}
                                                onChange={handleChange}
                                                placeholder="Nearby landmark"
                                                className="checkout-input"
                                            />

                                        </div>


                                        {/* Save Address */}

                                        <div className="md:col-span-2">

                                            <label className="flex items-center gap-2 text-sm">

                                                <input
                                                    type="checkbox"
                                                    checked={saveAddress}
                                                    onChange={(event) => setSaveAddress(event.target.checked)}
                                                    className="accent-[#0c213c] w-4 h-4"
                                                />

                                                Save this address for future orders

                                            </label>

                                        </div>

                                    </div>

                                )}

                            </div>


                            <div className="border-t" />


                            {/* ==================================
                                DELIVERY OPTIONS
                            ================================== */}

                            <div className="p-5 md:p-7">

                                <div className="flex items-center gap-3 mb-5">

                                    <div className="w-11 h-11 rounded-full bg-[#eaf5ff] text-[#0c213c] flex items-center justify-center text-xl">
                                        <FiTruck />
                                    </div>

                                    <div>

                                        <h2 className="text-xl font-bold text-[#113173]">
                                            2. Delivery Options
                                        </h2>

                                    </div>

                                </div>


                                <div className="grid md:grid-cols-2 gap-3">

                                    {/* Standard */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDeliveryMethod("standard")
                                        }
                                        className={`p-4 rounded-xl border text-left ${
                                            deliveryMethod === "standard"
                                                ? "border-[#0c213c] bg-[#f3f9ff]"
                                                : "border-gray-200"
                                        }`}
                                    >

                                        <div className="flex justify-between gap-3">

                                            <div className="flex gap-3">

                                                <div className="pt-1">

                                                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                                        deliveryMethod === "standard"
                                                            ? "border-[#0c213c]"
                                                            : "border-gray-400"
                                                    }`}>

                                                        {deliveryMethod === "standard" && (
                                                            <span className="w-2.5 h-2.5 bg-[#0c213c] rounded-full" />
                                                        )}

                                                    </span>

                                                </div>

                                                <div>

                                                    <p className="font-semibold text-[#113173]">
                                                        Standard Delivery
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        3 - 6 Business Days
                                                    </p>

                                                </div>

                                            </div>

                                            <span className="font-bold text-green-600">
                                                Free
                                            </span>

                                        </div>

                                    </button>


                                    {/* Express */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDeliveryMethod("express")
                                        }
                                        className={`p-4 rounded-xl border text-left ${
                                            deliveryMethod === "express"
                                                ? "border-[#0c213c] bg-[#f3f9ff]"
                                                : "border-gray-200"
                                        }`}
                                    >

                                        <div className="flex justify-between gap-3">

                                            <div className="flex gap-3">

                                                <div className="pt-1">

                                                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                                        deliveryMethod === "express"
                                                            ? "border-[#0c213c]"
                                                            : "border-gray-400"
                                                    }`}>

                                                        {deliveryMethod === "express" && (
                                                            <span className="w-2.5 h-2.5 bg-[#0c213c] rounded-full" />
                                                        )}

                                                    </span>

                                                </div>

                                                <div>

                                                    <p className="font-semibold text-[#113173]">
                                                        Express Delivery
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        1 - 2 Business Days
                                                    </p>

                                                </div>

                                            </div>

                                            <span className="font-bold">
                                                ₹100
                                            </span>

                                        </div>

                                    </button>

                                </div>

                            </div>


                            <div className="border-t" />


                            {/* ==================================
                                PAYMENT
                            ================================== */}

                            <div className="p-5 md:p-7">

                                <div className="flex items-center gap-3 mb-5">

                                    <div className="w-11 h-11 rounded-full bg-[#eaf5ff] text-[#0c213c] flex items-center justify-center text-xl">
                                        <FiCreditCard />
                                    </div>

                                    <div>

                                        <h2 className="text-xl font-bold text-[#113173]">
                                            3. Payment Method
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Choose a secure payment method
                                        </p>

                                    </div>

                                </div>


                                <div className="grid md:grid-cols-3 gap-3">

                                    {/* Online */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPaymentMethod("online")
                                        }
                                        className={`p-4 rounded-xl border text-left ${
                                            paymentMethod === "online"
                                                ? "border-[#0c213c] bg-[#f3f9ff]"
                                                : "border-gray-200"
                                        }`}
                                    >

                                        <FiCreditCard
                                            className="text-[#0c213c] mb-3"
                                            size={25}
                                        />

                                        <p className="font-semibold text-[#113173]">
                                            Online Payment
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            UPI, Card, Net Banking
                                        </p>

                                    </button>


                                    {/* COD */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPaymentMethod("cod")
                                        }
                                        className={`p-4 rounded-xl border text-left ${
                                            paymentMethod === "cod"
                                                ? "border-[#0c213c] bg-[#f3f9ff]"
                                                : "border-gray-200"
                                        }`}
                                    >

                                        <FiTruck
                                            className="text-green-600 mb-3"
                                            size={25}
                                        />

                                        <p className="font-semibold text-[#113173]">
                                            Cash on Delivery
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Pay at delivery
                                        </p>

                                    </button>


                                    {/* Bank */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPaymentMethod("bank")
                                        }
                                        className={`p-4 rounded-xl border text-left ${
                                            paymentMethod === "bank"
                                                ? "border-[#0c213c] bg-[#f3f9ff]"
                                                : "border-gray-200"
                                        }`}
                                    >

                                        <FiCreditCard
                                            className="text-[#0c213c] mb-3"
                                            size={25}
                                        />

                                        <p className="font-semibold text-[#113173]">
                                            Bank Transfer
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Direct bank transfer
                                        </p>

                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* ==================================
                            RIGHT SIDE
                        ================================== */}

                        <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm h-fit lg:sticky lg:top-5">

                            <div className="p-5 md:p-6">


                                {/* Order Summary Header */}

                                <div className="flex items-center justify-between border-b pb-4">

                                    <h2 className="text-xl font-bold text-[#113173]">
                                        Order Summary ({cartItems.length} items)
                                    </h2>

                                    <Link
                                        href="/shop"
                                        className="text-sm text-[#0c213c] font-semibold"
                                    >
                                        Edit Cart
                                    </Link>

                                </div>


                                {/* Products */}

                                <div className="divide-y">

                                    {cartItems.map((item) => (

                                        <div
                                            key={item.id}
                                            className="py-4 flex gap-3"
                                        >

                                            {/* Image */}

                                            <div className="w-20 h-20 rounded-xl bg-gray-50 border flex items-center justify-center overflow-hidden shrink-0">

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />

                                            </div>


                                            {/* Details */}

                                            <div className="flex-1 min-w-0">

                                                <h3 className="text-sm font-semibold text-[#113173] line-clamp-2">
                                                    {item.name}
                                                </h3>

                                                <div className="flex items-center gap-2 mt-1">

                                                    <span className="font-bold">
                                                        ₹
                                                        {Number(item.price).toLocaleString("en-IN")}
                                                    </span>

                                                    {item.oldPrice && (
                                                        <span className="text-xs text-gray-400 line-through">
                                                            ₹
                                                            {Number(item.oldPrice).toLocaleString("en-IN")}
                                                        </span>
                                                    )}

                                                </div>


                                                {/* Quantity */}

                                                <div className="flex items-center justify-between mt-3">

                                                    <div className="flex items-center border rounded-lg">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity - 1
                                                                )
                                                            }
                                                            className="w-7 h-7 flex items-center justify-center"
                                                        >
                                                            <FiMinus />
                                                        </button>

                                                        <span className="w-8 text-center text-sm font-semibold">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                            className="w-7 h-7 flex items-center justify-center"
                                                        >
                                                            <FiPlus />
                                                        </button>

                                                    </div>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeFromCart(item.id)
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        <FiTrash2 />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>


                                {/* Coupon */}

                                <div className="border-t pt-5 mt-2">

                                    <div className="flex items-center gap-2 mb-3">

                                        <FiTag className="text-[#113173]" />

                                        <span className="font-semibold text-[#113173]">
                                            Apply Coupon Code
                                        </span>

                                    </div>

                                    <div className="flex gap-2">

                                        <input
                                            type="text"
                                            value={coupon}
                                            onChange={(e) =>
                                                setCoupon(e.target.value)
                                            }
                                            placeholder="Enter coupon code"
                                            className="checkout-input"
                                        />

                                        <button
                                            type="button"
                                            onClick={applyCoupon}
                                            className="px-5 rounded-xl border border-[#0c213c] text-[#113173] font-semibold"
                                        >
                                            Apply
                                        </button>

                                    </div>

                                    <p className="text-xs text-gray-400 mt-2">
                                        Try: WELCOME10
                                    </p>

                                </div>


                                {/* Price Details */}

                                <div className="border-t mt-5 pt-5 space-y-3">

                                    <div className="flex justify-between text-sm">

                                        <span className="text-gray-600">
                                            Subtotal ({cartItems.reduce((count, item) => count + item.quantity, 0)} items)
                                        </span>

                                        <span className="font-semibold">
                                            ₹
                                            {cartTotal.toLocaleString("en-IN")}
                                        </span>

                                    </div>


                                    <div className="flex justify-between text-sm">

                                        <span className="text-gray-600">
                                            Shipping Charges
                                        </span>

                                        <span className="font-semibold text-green-600">
                                            {shippingCharge === 0
                                                ? "Free"
                                                : `₹${shippingCharge}`}
                                        </span>

                                    </div>


                                    {discount > 0 && (

                                        <div className="flex justify-between text-sm">

                                            <span className="text-gray-600">
                                                Discount
                                            </span>

                                            <span className="font-semibold text-green-600">
                                                -₹
                                                {discount.toLocaleString("en-IN")}
                                            </span>

                                        </div>

                                    )}

                                </div>


                                {/* Total */}

                                <div className="flex items-center justify-between bg-[#edf5ff] rounded-xl px-4 py-4 mt-5">

                                    <span className="text-lg font-bold text-[#113173]">
                                        Total Amount
                                    </span>

                                    <span className="text-2xl font-bold text-[#113173]">
                                        ₹
                                        {finalTotal.toLocaleString("en-IN")}
                                    </span>

                                </div>


                                {/* Place Order */}

                                {feedback && (
                                    <p role="status" className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                                        {feedback}
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={handlePlaceOrder}
                                    disabled={busy || authLoading}
                                    className="w-full mt-4 h-13 rounded-xl bg-[#113173] hover:bg-[#0c213c] text-white font-semibold flex items-center justify-center gap-2 transition"
                                >

                                    <FiLock />

                                    {busy ? "Processing…" : "Place Order"}

                                    <FiChevronRight />

                                </button>


                                {/* Trust */}

                                <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mt-4">

                                    <span className="flex items-center gap-1">
                                        <FiCheck className="text-green-600" />
                                        Secure Payment
                                    </span>

                                    <span>|</span>

                                    <span>
                                        Easy Returns
                                    </span>

                                    <span>|</span>

                                    <span>
                                        Genuine Products
                                    </span>

                                </div>


                                {/* Benefits */}

                                <div className="grid grid-cols-2 gap-2 bg-[#effcf4] rounded-xl p-4 mt-5">

                                    <div className="text-center p-2">

                                        <FiTruck
                                            className="mx-auto text-green-600"
                                            size={22}
                                        />

                                        <p className="font-semibold text-sm mt-1">
                                            Free Delivery
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            On eligible orders
                                        </p>

                                    </div>


                                    <div className="text-center p-2">

                                        <FiLock
                                            className="mx-auto text-green-600"
                                            size={22}
                                        />

                                        <p className="font-semibold text-sm mt-1">
                                            Secure Payments
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            100% secure
                                        </p>

                                    </div>


                                    <div className="text-center p-2">

                                        <span className="text-xl">
                                            🎧
                                        </span>

                                        <p className="font-semibold text-sm mt-1">
                                            24/7 Support
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Here to help
                                        </p>

                                    </div>


                                    <div className="text-center p-2">

                                        <span className="text-xl">
                                            ✓
                                        </span>

                                        <p className="font-semibold text-sm mt-1">
                                            Genuine Products
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Quality you can trust
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>

        </main>
    );
}
