"use client";

import React from "react";
import Link from "next/link";
import {
    FiX,
    FiMinus,
    FiPlus,
    FiTrash2,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const CartDrawer = ({
    isOpen,
    onClose,
    cartItems,
    updateQuantity,
    removeFromCart,
}) => {

    if (!isOpen) {
        return null;
    }

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 ease-in-out duration-700 bg-black/40 z-[9998]"
            />
            {/* Drawer */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[9999] shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <div>
                        <h2 className="text-xl font-bold text-[#113173]">
                            Shopping Cart
                        </h2>
                        <p className="text-sm text-gray-500">
                            {cartItems.length}{" "}
                            {cartItems.length === 1
                                ? "Item"
                                : "Items"}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xl"
                    >
                        <FiX />
                    </button>
                </div>
                {/* Items */}
                <div className="flex-1 overflow-y-auto p-5">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">

                            <div className="text-5xl mb-4">
                                🛒
                            </div>

                            <h3 className="text-lg font-semibold">
                                Your cart is empty
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Add some products to your cart.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className="flex gap-3 border-b pb-4"
                                >

                                    {/* Image */}
                                    <div className="w-20 h-20 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain"
                                        />

                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">

                                        <h3 className="font-semibold text-sm line-clamp-2">
                                            {item.name}
                                        </h3>

                                        {Number(item.reviewCount || 0) > 0 && <Link href={`/products/${item.slug}#reviews`} className="mt-1 flex items-center gap-1 text-xs text-gray-500 hover:text-[#113173]">
                                            <FaStar className="text-amber-400" />
                                            <span>{Number(item.rating || 0).toFixed(1)}</span>
                                            <span>({Number(item.reviewCount || 0)} reviews)</span>
                                        </Link>}

                                        <p className="font-bold text-[#113173] mt-1">
                                            ₹
                                            {Number(
                                                item.price
                                            ).toLocaleString("en-IN")}
                                        </p>

                                        <div className="flex items-center justify-between mt-3">

                                            {/* Quantity */}
                                            <div className="flex items-center border rounded-lg">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="w-8 h-8 flex items-center justify-center"
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
                                                    className="w-8 h-8 flex items-center justify-center"
                                                >
                                                    <FiPlus />
                                                </button>

                                            </div>

                                            {/* Remove */}
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
                    )}

                </div>

                {/* Bottom */}
                {cartItems.length > 0 && (

                    <div className="border-t p-5">

                        <div className="flex justify-between mb-4">

                            <span className="text-gray-600">
                                Subtotal
                            </span>

                            <span className="font-bold text-lg">
                                ₹
                                {subtotal.toLocaleString(
                                    "en-IN"
                                )}
                            </span>

                        </div>

                        <Link
                            href="/checkout"
                            onClick={onClose}
                            className="w-full h-12 bg-[#113173] text-white rounded-xl flex items-center justify-center font-semibold hover:bg-[#0293fd] transition"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
