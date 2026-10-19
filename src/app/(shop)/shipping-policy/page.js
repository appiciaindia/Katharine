"use client";

import React from "react";
import Link from "next/link";
import {
  FiTruck,
  FiClock,
  FiMapPin,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";

const ShippingPolicyPage = () => {
  return (
    <main className="bg-white min-h-screen">

      {/* Breadcrumb */}
      <section className="bg-[#f5f9ff] border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#f89a18]">
              Home
            </Link>

            <span>/</span>

            <span className="text-[#0c213c] font-medium">
              Shipping Policy
            </span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-linear-to-r from-[#0c213c] to-[#f89a18]">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-white">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/15 flex items-center justify-center">
            <FiTruck className="text-3xl" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Shipping Policy
          </h1>

          <p className="max-w-2xl mx-auto text-white/90 text-sm md:text-base">
            Learn about order processing, delivery, shipping charges,
            tracking and delivery-related policies at Katharine Pharma.
          </p>

        </div>
      </section>

      {/* Quick Highlights */}
      <section className="max-w-364 mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="border rounded-2xl p-6 bg-white shadow-sm">
            <FiClock className="text-3xl text-[#f89a18] mb-4" />

            <h3 className="font-semibold text-lg text-[#0c213c] mb-2">
              Order Processing
            </h3>

            <p className="text-gray-600 text-sm">
              Orders are processed after successful order confirmation
              and payment verification.
            </p>
          </div>

          <div className="border rounded-2xl p-6 bg-white shadow-sm">
            <FiTruck className="text-3xl text-[#ff360a] mb-4" />

            <h3 className="font-semibold text-lg text-[#0c213c] mb-2">
              Safe Delivery
            </h3>

            <p className="text-gray-600 text-sm">
              We make reasonable efforts to ensure products are packed
              and delivered safely.
            </p>
          </div>

          <div className="border rounded-2xl p-6 bg-white shadow-sm">
            <FiMapPin className="text-3xl text-[#f89a18] mb-4" />

            <h3 className="font-semibold text-lg text-[#0c213c] mb-2">
              Order Tracking
            </h3>

            <p className="text-gray-600 text-sm">
              Customers may use available tracking information to check
              their shipment status.
            </p>
          </div>

        </div>
      </section>

      {/* Policy Content */}
      <section className="max-w-364 mx-auto px-4 pb-16">

        {/* 01 */}
        <PolicySection
          number="01"
          title="Order Processing"
          icon={<FiPackage />}
        >
          <p>
            Once an order is successfully placed, our team processes the
            order for dispatch. Orders may be subject to payment verification
            before shipment.
          </p>

          <p>
            Processing time may vary depending on product availability,
            order details and other operational factors.
          </p>
        </PolicySection>

        {/* 02 */}
        <PolicySection
          number="02"
          title="Shipping & Delivery"
          icon={<FiTruck />}
        >
          <p>
            We aim to dispatch and deliver orders as efficiently as possible.
            Delivery availability may depend on the destination, product
            availability and logistics service.
          </p>

          <p>
            Delivery timelines shown at checkout or communicated by our team
            are estimates and may change because of operational or external
            circumstances.
          </p>
        </PolicySection>

        {/* 03 */}
        <PolicySection
          number="03"
          title="Estimated Delivery Time"
          icon={<FiClock />}
        >
          <p>
            Estimated delivery time can vary according to the delivery
            location, product availability, courier service and other
            logistical conditions.
          </p>

          <p>
            Any delivery estimate should be considered indicative rather
            than a guaranteed delivery date.
          </p>
        </PolicySection>

        {/* 04 */}
        <PolicySection
          number="04"
          title="Shipping Charges"
          icon={<FiTruck />}
        >
          <p>
            Applicable shipping charges, if any, will be displayed during
            the ordering or checkout process.
          </p>

          <p>
            Shipping charges may vary depending on the destination,
            order value, product type and applicable delivery conditions.
          </p>
        </PolicySection>

        {/* 05 */}
        <PolicySection
          number="05"
          title="Order Tracking"
          icon={<FiMapPin />}
        >
          <p>
            If tracking information is available for your shipment,
            it may be shared through the registered contact details or
            made available through your account.
          </p>

          <p>
            You can also contact our support team for assistance regarding
            your order status.
          </p>
        </PolicySection>

        {/* 06 */}
        <PolicySection
          number="06"
          title="Delayed Delivery"
          icon={<FiAlertCircle />}
        >
          <p>
            Delivery may occasionally be delayed due to weather conditions,
            transportation issues, holidays, high order volumes, courier
            delays or other circumstances beyond our reasonable control.
          </p>

          <p>
            In case of a significant delay, customers may contact our support
            team for an update.
          </p>
        </PolicySection>

        {/* 07 */}
        <PolicySection
          number="07"
          title="Incorrect or Incomplete Address"
          icon={<FiMapPin />}
        >
          <p>
            Customers are responsible for providing a complete and accurate
            delivery address and contact information while placing an order.
          </p>

          <p>
            Incorrect or incomplete address information may result in delayed
            delivery, return of the shipment or additional delivery charges.
          </p>
        </PolicySection>

        {/* 08 */}
        <PolicySection
          number="08"
          title="Damaged Package"
          icon={<FiAlertCircle />}
        >
          <p>
            If the package appears damaged at the time of delivery, customers
            should inspect the shipment and contact our support team as soon
            as possible.
          </p>

          <p>
            Photographs or other relevant information may be requested to
            help us investigate the issue.
          </p>
        </PolicySection>

        {/* 09 */}
        <PolicySection
          number="09"
          title="Non-Delivery or Delivery Issue"
          icon={<FiAlertCircle />}
        >
          <p>
            If your order has not been delivered within the expected time,
            please contact our customer support team with your order details.
          </p>

          <p>
            Our team will review the shipment status and assist you with
            the available resolution.
          </p>
        </PolicySection>

        {/* Contact */}
        <section className="mt-10 rounded-2xl bg-[#f5f9ff] border border-[#dbeafe] p-6 md:p-8">

          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-full bg-[#f89a18] text-white flex items-center justify-center">
              <FiCheckCircle className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0c213c] mb-2">
                Need Help With Your Delivery?
              </h2>

              <p className="text-gray-600 mb-5">
                If you have any questions regarding your order or delivery,
                please contact our support team.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#ff360a] hover:bg-[#e62f08] text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Contact Us
              </Link>
            </div>

          </div>

        </section>

        {/* Back */}
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#f89a18] hover:text-[#0c213c] font-medium"
          >
            <FiArrowLeft />
            Continue Shopping
          </Link>
        </div>

      </section>

    </main>
  );
};


/* Reusable Policy Section */
const PolicySection = ({ number, title, icon, children }) => {
  return (
    <section className="border-b border-gray-200 py-8">

      <div className="flex gap-4">

        <div className="shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[#eaf5ff] text-[#f89a18] flex items-center justify-center text-xl">
            {icon}
          </div>
        </div>

        <div className="flex-1">

          <div className="flex items-center gap-3 mb-3">

            <span className="text-sm font-bold text-[#ff360a]">
              {number}
            </span>

            <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
              {title}
            </h2>

          </div>

          <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">
            {children}
          </div>

        </div>

      </div>

    </section>
  );
};

export default ShippingPolicyPage;