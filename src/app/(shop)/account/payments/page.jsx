"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FiCreditCard,
    FiPlus,
    FiTrash2,
    FiEdit2,
    FiShield,
    FiCheck,
    FiLock,
    FiChevronRight,
} from "react-icons/fi";

export default function PaymentsPage() {

    const [selectedCard, setSelectedCard] = useState(1);

    const [cards, setCards] = useState([
        {
            id: 1,
            type: "Visa",
            last4: "4582",
            name: "Anil Jangid",
            expiry: "08/29",
            color: "bg-[#113173]",
        },
        {
            id: 2,
            type: "Mastercard",
            last4: "7216",
            name: "Anil Jangid",
            expiry: "11/28",
            color: "bg-[#0293fd]",
        },
    ]);


    const removeCard = (id) => {

        setCards((prev) =>
            prev.filter((card) => card.id !== id)
        );

        if (selectedCard === id) {
            setSelectedCard(null);
        }
    };


    return (
        <main className="min-h-screen bg-[#f7faff]">

            {/* ======================================
                PAGE HEADER
            ====================================== */}

            <section className="bg-white border-b">

                <div className="container mx-auto px-4 py-8">

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <Link
                            href="/account"
                            className="hover:text-[#0293fd]"
                        >
                            My Account
                        </Link>

                        <FiChevronRight />

                        <span className="text-[#113173] font-medium">
                            Payments
                        </span>

                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#113173] mt-3">
                        Payment Methods
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your saved cards and payment methods.
                    </p>

                </div>

            </section>


            {/* ======================================
                MAIN
            ====================================== */}

            <section className="py-8 md:py-12">

                <div className="container mx-auto px-4">

                    <div className="grid xl:grid-cols-[1fr_320px] gap-6">


                        {/* ==================================
                            LEFT
                        ================================== */}

                        <div className="space-y-6">


                            {/* Saved Cards */}

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

                                <div className="flex items-center justify-between p-5 md:p-6 border-b">

                                    <div className="flex items-center gap-3">

                                        <div className="w-11 h-11 rounded-full bg-[#eaf5ff] text-[#0293fd] flex items-center justify-center text-xl">
                                            <FiCreditCard />
                                        </div>

                                        <div>

                                            <h2 className="text-xl font-bold text-[#113173]">
                                                Saved Cards
                                            </h2>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Your saved debit and credit cards
                                            </p>

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#113173] text-white font-semibold hover:bg-[#0293fd] transition"
                                    >
                                        <FiPlus />
                                        Add New Card
                                    </button>

                                </div>


                                <div className="p-5 md:p-6 space-y-4">

                                    {cards.length === 0 ? (

                                        <div className="text-center py-10">

                                            <FiCreditCard
                                                className="mx-auto text-gray-300"
                                                size={50}
                                            />

                                            <h3 className="text-lg font-semibold text-[#113173] mt-4">
                                                No saved cards
                                            </h3>

                                            <p className="text-gray-500 text-sm mt-1">
                                                Add a card for faster checkout.
                                            </p>

                                        </div>

                                    ) : (

                                        cards.map((card) => (

                                            <div
                                                key={card.id}
                                                className={`border rounded-2xl p-4 md:p-5 transition ${
                                                    selectedCard === card.id
                                                        ? "border-[#0293fd] bg-[#f7fbff]"
                                                        : "border-gray-200"
                                                }`}
                                            >

                                                <div className="flex flex-col md:flex-row md:items-center gap-4">

                                                    {/* Card Visual */}

                                                    <div
                                                        className={`w-full md:w-52 h-28 ${card.color} rounded-xl p-4 text-white relative overflow-hidden`}
                                                    >

                                                        <div className="flex justify-between items-start">

                                                            <span className="text-sm font-semibold">
                                                                {card.type}
                                                            </span>

                                                            <FiCreditCard
                                                                size={24}
                                                            />

                                                        </div>

                                                        <div className="mt-6 tracking-[3px] text-sm">
                                                            •••• •••• ••••{" "}
                                                            {card.last4}
                                                        </div>

                                                    </div>


                                                    {/* Card Details */}

                                                    <div className="flex-1">

                                                        <div className="flex items-center gap-2">

                                                            <h3 className="font-bold text-[#113173]">
                                                                {card.type} Card
                                                            </h3>

                                                            {selectedCard === card.id && (

                                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                                                                    Default
                                                                </span>

                                                            )}

                                                        </div>

                                                        <p className="text-sm text-gray-500 mt-2">
                                                            •••• {card.last4}
                                                        </p>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {card.name} · Expires{" "}
                                                            {card.expiry}
                                                        </p>


                                                        {/* Actions */}

                                                        <div className="flex flex-wrap gap-3 mt-4">

                                                            {selectedCard !== card.id && (

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setSelectedCard(card.id)
                                                                    }
                                                                    className="text-sm text-[#0293fd] font-semibold"
                                                                >
                                                                    Make Default
                                                                </button>

                                                            )}

                                                            <button
                                                                type="button"
                                                                className="flex items-center gap-1 text-sm text-gray-600 font-semibold"
                                                            >
                                                                <FiEdit2 size={14} />
                                                                Edit
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeCard(card.id)
                                                                }
                                                                className="flex items-center gap-1 text-sm text-red-500 font-semibold"
                                                            >
                                                                <FiTrash2 size={14} />
                                                                Remove
                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        ))

                                    )}

                                </div>

                            </div>


                            {/* Mobile Add Card */}

                            <button
                                type="button"
                                className="sm:hidden w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-[#113173] text-white font-semibold"
                            >
                                <FiPlus />
                                Add New Card
                            </button>


                            {/* Other Payment Methods */}

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

                                <div className="p-5 md:p-6 border-b">

                                    <h2 className="text-xl font-bold text-[#113173]">
                                        Other Payment Methods
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Available payment options during checkout.
                                    </p>

                                </div>


                                <div className="p-5 md:p-6 grid sm:grid-cols-2 gap-4">


                                    {/* UPI */}

                                    <div className="border rounded-xl p-4 flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-xl bg-[#f2f7ff] flex items-center justify-center text-[#113173] font-bold">
                                            UPI
                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-[#113173]">
                                                UPI Payment
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Google Pay, PhonePe, Paytm
                                            </p>

                                        </div>

                                        <FiCheck className="ml-auto text-green-600" />

                                    </div>


                                    {/* COD */}

                                    <div className="border rounded-xl p-4 flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                                            ₹
                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-[#113173]">
                                                Cash on Delivery
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Pay when your order arrives
                                            </p>

                                        </div>

                                        <FiCheck className="ml-auto text-green-600" />

                                    </div>


                                    {/* Net Banking */}

                                    <div className="border rounded-xl p-4 flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-xl bg-[#f2f7ff] flex items-center justify-center">
                                            🏦
                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-[#113173]">
                                                Net Banking
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-1">
                                                All major banks supported
                                            </p>

                                        </div>

                                        <FiCheck className="ml-auto text-green-600" />

                                    </div>


                                    {/* Wallets */}

                                    <div className="border rounded-xl p-4 flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-xl bg-[#f2f7ff] flex items-center justify-center">
                                            👛
                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-[#113173]">
                                                Wallets
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Paytm, Amazon Pay, etc.
                                            </p>

                                        </div>

                                        <FiCheck className="ml-auto text-green-600" />

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ==================================
                            RIGHT SIDEBAR
                        ================================== */}

                        <aside className="space-y-5">


                            {/* Security */}

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                                <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-2xl mb-4">
                                    <FiShield />
                                </div>

                                <h2 className="text-xl font-bold text-[#113173]">
                                    Secure Payments
                                </h2>

                                <p className="text-sm text-gray-500 mt-2 leading-6">
                                    Your payment information is protected
                                    with secure encryption.
                                </p>

                                <div className="mt-5 space-y-3">

                                    <div className="flex items-center gap-3 text-sm">
                                        <FiLock className="text-green-600" />
                                        100% Secure Transactions
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <FiCheck className="text-green-600" />
                                        Trusted Payment Gateway
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <FiCheck className="text-green-600" />
                                        Your card details are protected
                                    </div>

                                </div>

                            </div>


                            {/* Payment Info */}

                            <div className="bg-[#113173] rounded-2xl p-6 text-white">

                                <FiCreditCard size={32} />

                                <h3 className="text-lg font-bold mt-4">
                                    Easy & Flexible Payments
                                </h3>

                                <p className="text-sm text-white/70 mt-2 leading-6">
                                    Pay securely using cards, UPI,
                                    net banking, wallets or cash
                                    on delivery.
                                </p>

                            </div>


                            {/* Need Help */}

                            <div className="bg-white rounded-2xl border border-gray-100 p-6">

                                <h3 className="font-bold text-[#113173]">
                                    Need Help?
                                </h3>

                                <p className="text-sm text-gray-500 mt-2">
                                    Have questions about your payment?
                                    Our support team is here to help.
                                </p>

                                <Link
                                    href="/account/support"
                                    className="inline-flex mt-4 text-[#0293fd] font-semibold text-sm"
                                >
                                    Contact Support →
                                </Link>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>

        </main>
    );
}