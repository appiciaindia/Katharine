"use client";

import React from "react";
import Link from "next/link";
import {
  FiFileText,
  FiCheckCircle,
  FiShoppingCart,
  FiCreditCard,
  FiTruck,
  FiRefreshCcw,
  FiUser,
  FiAlertCircle,
  FiShield,
  FiArrowLeft,
} from "react-icons/fi";

export default function TermsAndConditionPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <section className="border-b bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#f89a18]">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-[#0c213c]">
              Terms & Conditions
            </span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-[#0c213c]">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center text-white">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f89a18] flex items-center justify-center">
            <FiFileText className="text-3xl text-white" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Terms & Conditions
          </h1>

          <p className="max-w-3xl mx-auto text-white/80 text-sm md:text-base leading-7">
            Please read these Terms & Conditions carefully before using
            the Katharine Pharma website or placing an order.
          </p>

        </div>
      </section>

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-4 py-10">

        <div className="bg-[#f7f9fc] border border-gray-200 rounded-2xl p-6 md:p-8">

          <h2 className="text-xl md:text-2xl font-bold text-[#0c213c] mb-3">
            Welcome to Katharine Pharma
          </h2>

          <p className="text-gray-600 leading-7 text-sm md:text-base">
            These Terms & Conditions govern your use of the Katharine Pharma
            website, products and online services. By accessing this website,
            creating an account or placing an order, you agree to comply with
            these terms.
          </p>

        </div>

      </section>

      {/* Terms Content */}
      <section className="max-w-5xl mx-auto px-4 pb-16">

        <TermSection
          number="01"
          icon={<FiCheckCircle />}
          title="Acceptance of Terms"
        >
          <p>
            By accessing or using the Katharine Pharma website, you confirm
            that you have read, understood and agreed to these Terms &
            Conditions.
          </p>

          <p>
            If you do not agree with any part of these terms, please do not
            use the website or its services.
          </p>
        </TermSection>

        <TermSection
          number="02"
          icon={<FiShoppingCart />}
          title="Products and Product Information"
        >
          <p>
            We make reasonable efforts to provide accurate information about
            our products, including product names, descriptions, images,
            prices and availability.
          </p>

          <p>
            Product images may vary slightly from the actual product due to
            photography, packaging changes or screen settings.
          </p>

          <p>
            Product information should be reviewed carefully before placing
            an order.
          </p>
        </TermSection>

        <TermSection
          number="03"
          icon={<FiShoppingCart />}
          title="Orders"
        >
          <p>
            When you place an order through our website, you are making a
            request to purchase the selected products.
          </p>

          <p>
            We reserve the right to accept, cancel or decline an order in
            situations such as product unavailability, pricing errors,
            payment issues or other legitimate operational reasons.
          </p>
        </TermSection>

        <TermSection
          number="04"
          icon={<FiCreditCard />}
          title="Prices and Payments"
        >
          <p>
            Product prices displayed on the website are subject to change
            without prior notice.
          </p>

          <p>
            Applicable taxes, shipping charges or other charges, where
            applicable, may be displayed during checkout.
          </p>

          <p>
            Customers are responsible for providing accurate payment and
            billing information.
          </p>
        </TermSection>

        <TermSection
          number="05"
          icon={<FiTruck />}
          title="Shipping and Delivery"
        >
          <p>
            Orders are shipped to the delivery address provided by the
            customer during checkout.
          </p>

          <p>
            Delivery timelines are estimates and may vary depending on the
            destination, product availability, courier service, weather,
            holidays and other circumstances.
          </p>

          <p>
            Please refer to our{" "}
            <Link
              href="/shipping-policy"
              className="text-[#f89a18] font-semibold hover:underline"
            >
              Shipping Policy
            </Link>{" "}
            for additional information.
          </p>
        </TermSection>

        <TermSection
          number="06"
          icon={<FiRefreshCcw />}
          title="Returns, Replacement and Refunds"
        >
          <p>
            Returns, replacements and refunds are subject to the applicable
            return policy and product-specific conditions.
          </p>

          <p>
            Customers should check the applicable return and refund terms
            before placing an order.
          </p>

          <p>
            Where applicable, products must be returned in the required
            condition and within the applicable return period.
          </p>
        </TermSection>

        <TermSection
          number="07"
          icon={<FiUser />}
          title="User Account"
        >
          <p>
            If you create an account on our website, you are responsible for
            maintaining the confidentiality of your login credentials.
          </p>

          <p>
            You agree to provide accurate and updated information while
            creating or maintaining your account.
          </p>

          <p>
            Please notify us if you believe your account has been accessed
            without authorization.
          </p>
        </TermSection>

        <TermSection
          number="08"
          icon={<FiShield />}
          title="Website Usage"
        >
          <p>
            You agree to use this website only for lawful purposes and in a
            manner that does not harm the website, its users or our business.
          </p>

          <p>
            You must not attempt to gain unauthorized access to our website,
            servers, systems or customer information.
          </p>
        </TermSection>

        <TermSection
          number="09"
          icon={<FiAlertCircle />}
          title="Product Usage"
        >
          <p>
            Products should be used according to the instructions,
            recommendations and information provided with the respective
            product.
          </p>

          <p>
            Customers should carefully read product labels and instructions
            before use.
          </p>

          <p>
            Where professional veterinary advice is required, customers
            should consult a qualified veterinary professional.
          </p>
        </TermSection>

        <TermSection
          number="10"
          icon={<FiFileText />}
          title="Intellectual Property"
        >
          <p>
            Website content including text, graphics, logos, images,
            photographs, designs and other materials may be protected by
            applicable intellectual property laws.
          </p>

          <p>
            Such content may not be copied, reproduced, modified or
            distributed without appropriate permission.
          </p>
        </TermSection>

        <TermSection
          number="11"
          icon={<FiAlertCircle />}
          title="Limitation of Liability"
        >
          <p>
            We make reasonable efforts to keep website information accurate
            and available, but we do not guarantee that the website will
            always be uninterrupted, error-free or completely free from
            technical issues.
          </p>

          <p>
            To the extent permitted by applicable law, Katharine Pharma shall
            not be responsible for losses resulting from circumstances beyond
            our reasonable control.
          </p>
        </TermSection>

        <TermSection
          number="12"
          icon={<FiShield />}
          title="Privacy"
        >
          <p>
            Your use of our website may involve the collection and processing
            of information as described in our applicable Privacy Policy.
          </p>

          <p>
            Please review our Privacy Policy to understand how information
            may be handled.
          </p>
        </TermSection>

        <TermSection
          number="13"
          icon={<FiFileText />}
          title="Changes to These Terms"
        >
          <p>
            We may update or modify these Terms & Conditions from time to
            time to reflect changes in our services, website or applicable
            requirements.
          </p>

          <p>
            Updated terms will become effective when published on this page.
          </p>
        </TermSection>

        <TermSection
          number="14"
          icon={<FiCheckCircle />}
          title="Contact Us"
        >
          <p>
            If you have questions about these Terms & Conditions, orders,
            products or our services, please contact our support team.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-3 bg-[#f89a18] hover:bg-[#d97f05] text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Contact Us
          </Link>
        </TermSection>

        {/* Important Notice */}
        <section className="mt-8 rounded-2xl border border-[#f89a18]/30 bg-[#fff8ed] p-6 md:p-8">

          <div className="flex gap-4">

            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#f89a18] text-white flex items-center justify-center">
              <FiAlertCircle className="text-xl" />
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#0c213c] mb-2">
                Important Notice
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-7">
                Please read the product information, applicable policies and
                order details carefully before completing your purchase.
              </p>
            </div>

          </div>

        </section>

        {/* Back to Shopping */}
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
};


/* Reusable Section */
const TermSection = ({
  number,
  icon,
  title,
  children,
}) => {
  return (
    <section className="border-b border-gray-200 py-8">

      <div className="flex gap-4 md:gap-5">

        <div className="shrink-0">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#fff3df] text-[#f89a18] flex items-center justify-center text-xl">
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
};



