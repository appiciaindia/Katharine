"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiPackage,
  FiTruck,
  FiCreditCard,
  FiRefreshCcw,
  FiUser,
  FiMessageCircle,
  FiChevronRight,
  FiArrowRight,
  FiHelpCircle,
} from "react-icons/fi";

const helpCategories = [
  {
    title: "Orders & Products",
    description: "Order, product availability and product information.",
    icon: <FiPackage />,
    link: "/faqs",
  },
  {
    title: "Shipping & Delivery",
    description: "Delivery time, tracking and shipping related help.",
    icon: <FiTruck />,
    link: "/shipping-policy",
  },
  {
    title: "Payments",
    description: "Payment methods, failed payments and billing help.",
    icon: <FiCreditCard />,
    link: "/faqs",
  },
  {
    title: "Returns & Refunds",
    description: "Get help with returns, replacement and refunds.",
    icon: <FiRefreshCcw />,
    link: "/return-policy",
  },
  {
    title: "My Account",
    description: "Manage your profile, address and account details.",
    icon: <FiUser />,
    link: "/account",
  },
  {
    title: "Customer Support",
    description: "Need personal assistance? Contact our support team.",
    icon: <FiMessageCircle />,
    link: "/contact",
  },
];

const popularQuestions = [
  {
    question: "How can I place an order?",
    answer:
      "Browse our products, open the product details page, select the required quantity and click Add to Cart. You can then proceed to checkout and complete your order.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can check your order status from your account. If tracking information is available, it will be provided with your shipment details.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "Available payment options are shown during checkout. Depending on availability, options may include online payment, Cash on Delivery and bank transfer.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on the delivery location, product availability and logistics service. The estimated delivery information may be shown during the ordering process.",
  },
  {
    question: "What should I do if my package arrives damaged?",
    answer:
      "Please inspect the package at delivery and contact our support team as soon as possible. Photos or other information may be requested to investigate the issue.",
  },
  {
    question: "How can I contact Katharine Pharma?",
    answer:
      "You can contact our customer support team through the Contact Us page for assistance with your order, products, payments or delivery.",
  },
];

const HelpCenterPage = () => {
  const [search, setSearch] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  const filteredQuestions = popularQuestions.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <section className="border-b bg-[#f7faff]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#f89a18]">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-[#0c213c]">
              Help Center
            </span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-linear-to-r from-[#0c213c] to-[#f89a18]">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center text-white">

          <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-white/15 flex items-center justify-center">
            <FiHelpCircle className="text-3xl" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            How Can We Help You?
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-white/90">
            Find answers about orders, products, payments, shipping,
            returns and your Katharine Pharma account.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mt-8 relative">

            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your question..."
              className="w-full bg-white text-gray-800 rounded-2xl py-4 pl-13 pr-5 outline-none shadow-lg"
            />

          </div>

        </div>
      </section>

      {/* Help Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">

        <div className="text-center mb-10">
          <span className="text-[#f89a18] font-semibold text-sm">
            HELP TOPICS
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0c213c] mt-2">
            What Do You Need Help With?
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Select a topic below to find useful information and answers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {helpCategories.map((category) => (
            <Link
              href={category.link}
              key={category.title}
              className="group border border-gray-200 rounded-2xl p-6 hover:border-[#f89a18] hover:shadow-lg transition bg-white"
            >

              <div className="flex items-start justify-between">

                <div className="w-13 h-13 rounded-xl bg-[#eaf5ff] text-[#f89a18] flex items-center justify-center text-2xl group-hover:bg-[#f89a18] group-hover:text-white transition">
                  {category.icon}
                </div>

                <FiChevronRight className="text-gray-400 group-hover:text-[#f89a18] transition" />

              </div>

              <h3 className="text-lg font-bold text-[#0c213c] mt-5 mb-2">
                {category.title}
              </h3>

              <p className="text-sm text-gray-500 leading-6">
                {category.description}
              </p>

            </Link>
          ))}

        </div>

      </section>

      {/* Popular Questions */}
      <section className="bg-[#f7faff] py-12 md:py-16">

        <div className="max-w-5xl mx-auto px-4">

          <div className="text-center mb-10">

            <span className="text-[#ff360a] font-semibold text-sm">
              FAQ
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-[#0c213c] mt-2">
              Popular Questions
            </h2>

          </div>

          <div className="space-y-4">

            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((item, index) => {

                const isOpen = openQuestion === index;

                return (
                  <div
                    key={item.question}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setOpenQuestion(isOpen ? null : index)
                      }
                      className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-5"
                    >

                      <span className="font-semibold text-[#0c213c]">
                        {item.question}
                      </span>

                      <span
                        className={`shrink-0 text-[#f89a18] text-xl transition-transform ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      >
                        <FiChevronRight />
                      </span>

                    </button>

                    {isOpen && (
                      <div className="px-5 md:px-6 pb-5 text-gray-600 text-sm md:text-base leading-7 border-t">
                        <p className="pt-4">
                          {item.answer}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })
            ) : (
              <div className="text-center bg-white rounded-2xl p-10 border">
                <FiSearch className="mx-auto text-4xl text-gray-300 mb-3" />

                <h3 className="font-semibold text-[#0c213c]">
                  No results found
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Try searching with different keywords.
                </p>
              </div>
            )}

          </div>

          <div className="text-center mt-8">

            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 text-[#f89a18] font-semibold hover:text-[#0c213c]"
            >
              View All FAQs
              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>

      {/* Contact Support */}
      <section className="max-w-7xl mx-auto px-4 py-14">

        <div className="rounded-3xl bg-linear-to-r from-[#0c213c] to-[#f89a18] text-white p-8 md:p-12">

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-3">
                <FiMessageCircle className="text-2xl" />

                <span className="font-semibold">
                  STILL NEED HELP?
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Our Support Team Is Here For You
              </h2>

              <p className="text-white/85 max-w-xl text-sm md:text-base">
                Can't find the answer you're looking for?
                Get in touch with our team and we'll be happy to assist you.
              </p>

            </div>

            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-[#ff360a] hover:bg-[#e63108] px-7 py-3.5 rounded-xl font-semibold transition"
            >
              Contact Support
              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 pb-16">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <Link
            href="/shop"
            className="border rounded-xl p-5 text-center hover:border-[#f89a18] transition"
          >
            <FiPackage className="mx-auto text-2xl text-[#f89a18] mb-2" />
            <span className="text-sm font-semibold text-[#0c213c]">
              Shop Products
            </span>
          </Link>

          <Link
            href="/shipping-policy"
            className="border rounded-xl p-5 text-center hover:border-[#f89a18] transition"
          >
            <FiTruck className="mx-auto text-2xl text-[#f89a18] mb-2" />
            <span className="text-sm font-semibold text-[#0c213c]">
              Shipping Policy
            </span>
          </Link>

          <Link
            href="/faqs"
            className="border rounded-xl p-5 text-center hover:border-[#f89a18] transition"
          >
            <FiHelpCircle className="mx-auto text-2xl text-[#f89a18] mb-2" />
            <span className="text-sm font-semibold text-[#0c213c]">
              FAQs
            </span>
          </Link>

          <Link
            href="/contact"
            className="border rounded-xl p-5 text-center hover:border-[#f89a18] transition"
          >
            <FiMessageCircle className="mx-auto text-2xl text-[#f89a18] mb-2" />
            <span className="text-sm font-semibold text-[#0c213c]">
              Contact Us
            </span>
          </Link>

        </div>

      </section>

    </main>
  );
};

export default HelpCenterPage;