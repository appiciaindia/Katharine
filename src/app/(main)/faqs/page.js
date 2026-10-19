"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    FiSearch,
    FiChevronDown,
    FiMessageCircle,
    FiHelpCircle,
} from "react-icons/fi";

const faqData = [
    {
        category: "General",
        question: "What is Katharine Pharma?",
        answer:
            "Katharine Pharma provides animal nutrition and wellness products designed to support the health, growth, immunity and overall well-being of animals.",
    },
    {
        category: "General",
        question: "What types of animal products do you offer?",
        answer:
            "We offer a range of animal nutrition products including mineral supplements, calcium supplements, vitamin supplements, liver tonics, feed supplements, digestive supplements, immunity supplements and animal wellness products.",
    },
    {
        category: "Products",
        question: "Which animals are your products suitable for?",
        answer:
            "Our product range may include solutions for cattle, goats, poultry, dogs and cats. Please check the individual product details for its recommended animal type and usage.",
    },
    {
        category: "Products",
        question: "How can I find the right product for my animal?",
        answer:
            "You can browse products by category and animal type. For product-specific guidance, please check the product information or contact our support team.",
    },
    {
        category: "Products",
        question: "Where can I find product dosage information?",
        answer:
            "Dosage information is provided on the individual product page wherever applicable. Always follow the product label and recommended usage instructions.",
    },
    {
        category: "Orders",
        question: "How can I place an order?",
        answer:
            "Select the product you want, add it to your cart, proceed to checkout, enter your delivery details, select the available payment option and place your order.",
    },
    {
        category: "Orders",
        question: "Can I order multiple products together?",
        answer:
            "Yes. You can add multiple products to your shopping cart and place them together in a single order, subject to product availability.",
    },
    {
        category: "Orders",
        question: "How can I check my order status?",
        answer:
            "After placing an order, you can check your order information and tracking status from your account section when tracking information is available.",
    },
    {
        category: "Shipping",
        question: "Do you provide home delivery?",
        answer:
            "Yes, delivery is available to serviceable locations. Delivery availability and charges may depend on your location and order details.",
    },
    {
        category: "Shipping",
        question: "How long does delivery take?",
        answer:
            "Delivery time can vary depending on your location, product availability and shipping method selected at checkout.",
    },
    {
        category: "Payment",
        question: "What payment methods are available?",
        answer:
            "Available payment methods are displayed during checkout. Depending on the order and service availability, options may include online payment, Cash on Delivery or bank transfer.",
    },
    {
        category: "Payment",
        question: "Is online payment secure?",
        answer:
            "Online payments are processed through the payment method available at checkout. Please do not share your card, OTP or banking credentials with anyone.",
    },
    {
        category: "Returns",
        question: "Can I return a product?",
        answer:
            "Return eligibility depends on the product, order condition and applicable return policy. Please check our return policy or contact customer support before returning an item.",
    },
    {
        category: "Returns",
        question: "What should I do if I receive a damaged product?",
        answer:
            "Please contact our customer support team as soon as possible with your order details and clear photographs of the package and product.",
    },
    {
        category: "Support",
        question: "How can I contact Katharine Pharma?",
        answer:
            "You can contact our support team through the Contact Us page. Please keep your order number ready if your query is related to an existing order.",
    },
];

const categories = [
    "All",
    "General",
    "Products",
    "Orders",
    "Shipping",
    "Payment",
    "Returns",
    "Support",
];

export default function FAQPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [openIndex, setOpenIndex] = useState(null);

    const filteredFAQs = useMemo(() => {
        return faqData.filter((faq) => {
            const matchesCategory =
                activeCategory === "All" ||
                faq.category === activeCategory;

            const searchText = search.toLowerCase();

            const matchesSearch =
                !search ||
                faq.question.toLowerCase().includes(searchText) ||
                faq.answer.toLowerCase().includes(searchText);

            return matchesCategory && matchesSearch;
        });
    }, [search, activeCategory]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="bg-[#f8fbff] min-h-screen">

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 pt-5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-[#113173]">
                        Home
                    </Link>

                    <span>/</span>

                    <span className="text-[#113173] font-medium">
                        FAQ
                    </span>
                </div>
            </div>

            {/* Hero */}
            <section className="mt-5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="rounded-3xl overflow-hidden bg-linear-to-r from-[#eaf5ff] to-[#fff4e8]">
                        <div className="px-6 py-12 md:px-12 md:py-16 text-center">

                            <div className="w-16 h-16 mx-auto rounded-full bg-white shadow flex items-center justify-center text-[#113173] text-3xl">
                                <FiHelpCircle />
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-[#113173] mt-5">
                                Frequently Asked Questions
                            </h1>

                            <p className="max-w-2xl mx-auto mt-4 text-gray-600 leading-7">
                                Find answers to common questions about Katharine
                                Pharma products, orders, delivery, payments and support.
                            </p>

                            {/* Search */}
                            <div className="max-w-2xl mx-auto mt-7 relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setOpenIndex(null);
                                    }}
                                    placeholder="Search your question..."
                                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#0293fd] shadow-sm"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 py-7">

                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => {
                                setActiveCategory(category);
                                setOpenIndex(null);
                            }}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition ${
                                activeCategory === category
                                    ? "bg-[#113173] text-white"
                                    : "bg-white border text-gray-600 hover:border-[#113173] hover:text-[#113173]"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

            </section>

            {/* FAQ List */}
            <section className="max-w-7xl mx-auto px-4 pb-14">

                <div className="space-y-4">

                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => {

                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={`${faq.category}-${faq.question}`}
                                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                                >

                                    <button
                                        type="button"
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between gap-5 text-left px-5 md:px-6 py-5"
                                    >

                                        <div className="flex items-start gap-4">

                                            <div className="w-9 h-9 rounded-full bg-[#eef7ff] flex items-center justify-center text-[#0293fd] shrink-0">
                                                <FiHelpCircle />
                                            </div>

                                            <div>
                                                <span className="text-xs text-[#0293fd] font-semibold uppercase">
                                                    {faq.category}
                                                </span>

                                                <h2 className="md:text-2xl text-xl font-bold text-[#113173] mt-1">
                                                    {faq.question}
                                                </h2>
                                            </div>

                                        </div>

                                        <FiChevronDown
                                            className={`text-xl text-gray-500 shrink-0 transition-transform ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />

                                    </button>

                                    {isOpen && (
                                        <div className="px-5 md:px-6 pb-5">

                                            <div className="border-t pt-4 pl-0 md:pl-13">
                                                <p className="text-gray-600 leading-7">
                                                    {faq.answer}
                                                </p>
                                            </div>

                                        </div>
                                    )}

                                </div>
                            );
                        })
                    ) : (
                        <div className="bg-white rounded-2xl border p-12 text-center">

                            <div className="text-5xl mb-4">
                                🔍
                            </div>

                            <h2 className="text-xl font-bold text-[#113173]">
                                No Questions Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Try another search term or select another category.
                            </p>

                        </div>
                    )}

                </div>

            </section>

            {/* Still Need Help */}
            <section className="max-w-7xl mx-auto px-4 pb-14">

                <div className="bg-[#113173] rounded-3xl px-6 py-10 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

                    <div className="text-center md:text-left">

                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Still Have Questions?
                        </h2>

                        <p className="text-blue-100 mt-2">
                            Our team is here to help you with your queries.
                        </p>

                    </div>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-[#ff360a] hover:bg-[#e92f00] text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        <FiMessageCircle />
                        Contact Us
                    </Link>

                </div>

            </section>

        </main>
    );
}