"use client";

import React from "react";
import Link from "next/link";
import {
  FiRefreshCcw,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  FiCreditCard,
  FiClock,
  FiAlertCircle,
  FiMail,
  FiArrowLeft,
} from "react-icons/fi";

export default function ReturnAndRefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <section className="bg-[#f7f9fc] border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#f89a18]">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-[#0c213c]">
              Return & Refund Policy
            </span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-[#0c213c]">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center text-white">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f89a18] flex items-center justify-center">
            <FiRefreshCcw className="text-3xl" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Return & Refund Policy
          </h1>

          <p className="max-w-3xl mx-auto text-white/80 text-sm md:text-base leading-7">
            Please review our return, replacement and refund guidelines
            before placing your order with Katharine Pharma.
          </p>

        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-4 py-10">

        <div className="bg-[#f7f9fc] border border-gray-200 rounded-2xl p-6 md:p-8">

          <h2 className="text-xl md:text-2xl font-bold text-[#0c213c] mb-3">
            Our Return & Refund Commitment
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-7">
            We aim to provide quality products and a smooth shopping
            experience. If you receive a damaged, defective or incorrect
            product, please contact our support team as soon as possible
            so that we can review your request.
          </p>

        </div>

      </section>

      {/* Policy Sections */}
      <section className="max-w-5xl mx-auto px-4 pb-16">

        {/* 01 */}
        <PolicySection
          number="01"
          icon={<FiRefreshCcw />}
          title="Return Eligibility"
        >
          <p>
            Return or replacement requests may be considered for products
            that are damaged, defective or incorrectly delivered, subject
            to verification and applicable product conditions.
          </p>

          <p>
            Products must generally be returned in the condition required
            by our support team for inspection and processing.
          </p>
        </PolicySection>

        {/* 02 */}
        <PolicySection
          number="02"
          icon={<FiPackage />}
          title="Damaged Products"
        >
          <p>
            If your package or product arrives damaged, please contact us
            as soon as possible after delivery.
          </p>

          <p>
            Please keep the original packaging and product available until
            the issue has been reviewed.
          </p>

          <p>
            Photographs or videos of the package and product may be requested
            to help us evaluate the claim.
          </p>
        </PolicySection>

        {/* 03 */}
        <PolicySection
          number="03"
          icon={<FiAlertCircle />}
          title="Incorrect Product"
        >
          <p>
            If you receive a product different from the one ordered,
            please contact our customer support team with your order details.
          </p>

          <p>
            After verification, we may arrange an appropriate replacement
            or other applicable resolution.
          </p>
        </PolicySection>

        {/* 04 */}
        <PolicySection
          number="04"
          icon={<FiXCircle />}
          title="Non-Returnable Situations"
        >
          <p>
            Products may not be eligible for return where the issue is caused
            by misuse, improper storage, damage after delivery or use contrary
            to the product instructions.
          </p>

          <p>
            Products that have been altered, opened or used may be subject
            to additional return restrictions depending on the product and
            applicable requirements.
          </p>
        </PolicySection>

        {/* 05 */}
        <PolicySection
          number="05"
          icon={<FiClock />}
          title="Return Request Timeline"
        >
          <p>
            Customers should contact our support team promptly after receiving
            a damaged, defective or incorrect product.
          </p>

          <p>
            Any specific return period applicable to a product or order will
            be communicated through the applicable product or order terms.
          </p>
        </PolicySection>

        {/* 06 */}
        <PolicySection
          number="06"
          icon={<FiPackage />}
          title="Return Process"
        >
          <p>
            To request a return or replacement, please contact our support
            team and provide your order number and details of the issue.
          </p>

          <p>
            We may request photographs, videos or other information before
            approving a return or replacement.
          </p>

          <p>
            Do not send a product back unless our support team has provided
            the required return instructions.
          </p>
        </PolicySection>

        {/* 07 */}
        <PolicySection
          number="07"
          icon={<FiCreditCard />}
          title="Refunds"
        >
          <p>
            If a refund is approved, the applicable refund amount will be
            processed through the appropriate payment method or process.
          </p>

          <p>
            The time taken for the amount to reflect in your account may
            depend on the payment provider, bank or other financial
            institution.
          </p>
        </PolicySection>

        {/* 08 */}
        <PolicySection
          number="08"
          icon={<FiCreditCard />}
          title="Refund for Cancelled Orders"
        >
          <p>
            If an order is successfully cancelled before dispatch and a
            refund is applicable, the eligible amount may be processed
            according to the applicable order and payment conditions.
          </p>

          <p>
            Orders that have already been dispatched may be subject to
            different cancellation or return conditions.
          </p>
        </PolicySection>

        {/* 09 */}
        <PolicySection
          number="09"
          icon={<FiTruckIcon />}
          title="Shipping Charges"
        >
          <p>
            Shipping charges, where applicable, may not always be refundable.
          </p>

          <p>
            The treatment of shipping charges will depend on the reason for
            the return or refund and the applicable order conditions.
          </p>
        </PolicySection>

        {/* 10 */}
        <PolicySection
          number="10"
          icon={<FiCheckCircle />}
          title="Replacement"
        >
          <p>
            Where a replacement is approved, the replacement product will be
            subject to product availability.
          </p>

          <p>
            If the same product is unavailable, an alternative resolution
            may be offered where applicable.
          </p>
        </PolicySection>

        {/* 11 */}
        <PolicySection
          number="11"
          icon={<FiAlertCircle />}
          title="Inspection and Approval"
        >
          <p>
            All return, replacement and refund requests may be reviewed
            before approval.
          </p>

          <p>
            A request is not automatically considered approved merely because
            a return request has been submitted.
          </p>
        </PolicySection>

        {/* 12 */}
        <PolicySection
          number="12"
          icon={<FiMail />}
          title="Contact Us"
        >
          <p>
            If you have questions regarding a return, replacement or refund,
            please contact our customer support team with your order details.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-3 bg-[#f89a18] hover:bg-[#d97f05] text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Contact Support
            <FiMail />
          </Link>
        </PolicySection>

        {/* Important Notice */}
        <section className="mt-8 bg-[#fff8ed] border border-[#f89a18]/30 rounded-2xl p-6 md:p-8">

          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#f89a18] text-white flex items-center justify-center">
              <FiAlertCircle className="text-xl" />
            </div>

            <div>

              <h2 className="text-lg md:text-xl font-bold text-[#0c213c] mb-2">
                Important Notice
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-7">
                Return and refund eligibility may depend on the product,
                order status and applicable laws or business policies.
                Please contact our support team before returning any product.
              </p>

            </div>

          </div>

        </section>

        {/* Back */}
        <div className="mt-8">

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#f89a18] hover:text-[#0c213c] font-semibold"
          >
            <FiArrowLeft />
            Continue Shopping
          </Link>

        </div>

      </section>

    </main>
  );
}


/* Reusable Section */
function PolicySection({
  number,
  icon,
  title,
  children,
}) {
  return (
    <section className="border-b border-gray-200 py-8">

      <div className="flex gap-4 md:gap-5">

        <div className="shrink-0">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
            {icon}
          </div>
        </div>

        <div className="flex-1">

          <div className="flex items-center gap-3 mb-3">

            <span className="text-sm font-bold text-[#f89a18]">
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
}


/* Truck Icon Wrapper */
function FiTruckIcon() {
  return <FiPackage />;
}