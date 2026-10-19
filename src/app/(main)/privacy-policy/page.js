"use client";

import React from "react";
import Link from "next/link";
import {
  FiShield,
  FiUser,
  FiLock,
  FiDatabase,
  FiCreditCard,
  FiGlobe,
  FiMail,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <section className="bg-[#f7f9fc] border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link
              href="/"
              className="hover:text-[#f89a18]"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-[#0c213c]">
              Privacy Policy
            </span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-[#0c213c]">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center text-white">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f89a18] flex items-center justify-center">
            <FiShield className="text-3xl" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>

          <p className="max-w-3xl mx-auto text-white/80 text-sm md:text-base leading-7">
            Your privacy is important to us. This Privacy Policy explains
            how Katharine Pharma may collect, use and protect information
            when you use our website and services.
          </p>

        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-4 py-10">

        <div className="bg-[#f7f9fc] border border-gray-200 rounded-2xl p-6 md:p-8">

          <h2 className="text-xl md:text-2xl font-bold text-[#0c213c] mb-3">
            Our Commitment to Your Privacy
          </h2>

          <p className="text-gray-600 leading-7 text-sm md:text-base">
            Katharine Pharma respects your privacy and is committed to
            protecting the information you provide while using our website,
            creating an account, purchasing products or contacting us.
          </p>

        </div>

      </section>

      {/* Policy Sections */}
      <section className="max-w-5xl mx-auto px-4 pb-16">

        {/* 01 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiUser />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  01
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  Information We May Collect
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  We may collect information that you provide when you
                  create an account, place an order, contact us or use
                  certain features of our website.
                </p>

                <p>
                  This information may include your name, contact details,
                  delivery address, billing information and other details
                  required to process your request or order.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* 02 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiDatabase />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  02
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  How We Use Your Information
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  Information may be used to process and deliver orders,
                  provide customer support, manage your account and
                  communicate with you about your requests.
                </p>

                <p>
                  We may also use information to improve our website,
                  products, services and overall customer experience.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* 03 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiCreditCard />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  03
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  Payment Information
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  Payment transactions may be processed through third-party
                  payment providers.
                </p>

                <p>
                  Payment information may be handled by the applicable
                  payment service according to its own privacy and security
                  policies.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* 04 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiLock />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  04
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  Data Security
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  We take reasonable measures to protect information from
                  unauthorized access, misuse, alteration or disclosure.
                </p>

                <p>
                  However, no internet transmission or electronic storage
                  system can be guaranteed to be completely secure.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* 05 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiGlobe />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  05
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  Cookies and Website Technologies
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  Our website may use cookies or similar technologies to
                  improve functionality, remember preferences and understand
                  how visitors use the website.
                </p>

                <p>
                  You may be able to manage certain cookie preferences
                  through your browser settings.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* 06 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiUser />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  06
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  Account Information
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  If you create an account, you are responsible for keeping
                  your login credentials confidential.
                </p>

                <p>
                  Please ensure that the information associated with your
                  account remains accurate and updated.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* 07 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiShield />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  07
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  Sharing of Information
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  We may share necessary information with service providers
                  who help us operate our website, process payments, deliver
                  orders or provide related services.
                </p>

                <p>
                  Information may also be disclosed where required by law
                  or to protect our legal rights and legitimate interests.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* 08 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiCheckCircle />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  08
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  Your Choices
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  You may contact us regarding your personal information,
                  account details or communication preferences.
                </p>

                <p>
                  Certain information may need to be retained where required
                  for order processing, legal, accounting or operational
                  purposes.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* 09 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiAlertCircle />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  09
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  Third-Party Websites
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  Our website may contain links to third-party websites or
                  services.
                </p>

                <p>
                  We are not responsible for the privacy practices or content
                  of third-party websites. Please review their respective
                  privacy policies before providing information.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* 10 */}
        <section className="border-b border-gray-200 py-8">
          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#fff4e3] text-[#f89a18] flex items-center justify-center text-xl">
              <FiMail />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#f89a18]">
                  10
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                  Contact Us
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-7">

                <p>
                  If you have questions about this Privacy Policy or how
                  your information is handled, please contact our support
                  team.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-2 bg-[#f89a18] hover:bg-[#d97f05] text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Contact Us
                  <FiMail />
                </Link>

              </div>
            </div>

          </div>
        </section>

        {/* Notice */}
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
                This Privacy Policy is intended as general website policy
                content. Please update it with your actual company details,
                data practices, contact information and applicable legal
                requirements before publishing it as your final legal policy.
              </p>

            </div>

          </div>

        </section>

        {/* Back */}
        <div className="mt-8">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#f89a18] hover:text-[#0c213c] font-semibold"
          >
            <FiArrowLeft />
            Back to Home
          </Link>

        </div>

      </section>

    </main>
  );
}