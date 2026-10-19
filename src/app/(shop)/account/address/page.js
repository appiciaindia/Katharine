"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaPhone,
  FaHome,
  FaBriefcase,
  FaCheckCircle,
  FaTimes,
  FaSave,
} from "react-icons/fa";

export default function ManageAddresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Anil Kumar",
      mobile: "+91 9876543210",
      address:
        "House No. 123, Sector 45, Near Main Market",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122003",
      landmark: "Near Main Market",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: "Anil Kumar",
      mobile: "+91 9876543210",
      address:
        "Plot No. 12, Udyog Vihar, Phase 4",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122016",
      landmark: "Near Metro Station",
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    type: "Home",
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    isDefault: false,
  };

  const [formData, setFormData] = useState(emptyForm);

  // Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add New Address
  const handleAddAddress = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  // Edit Address
  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  // Cancel
  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  // Save Address
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === editingId
            ? {
                ...formData,
                id: editingId,
              }
            : address
        )
      );
    } else {
      const newAddress = {
        ...formData,
        id: Date.now(),
      };

      setAddresses((prev) => [...prev, newAddress]);
    }

    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  // Delete Address
  const handleDelete = (id) => {
    const address = addresses.find((item) => item.id === id);

    if (address?.isDefault) {
      alert("Default address cannot be deleted.");
      return;
    }

    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) =>
        prev.filter((address) => address.id !== id)
      );
    }
  };

  // Set Default Address
  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#113173]">
            Manage Addresses
          </h1>

          <p className="text-gray-500 mt-1">
            Add, edit and manage your delivery addresses.
          </p>
        </div>

        <button
          onClick={handleAddAddress}
          className="inline-flex items-center justify-center gap-2 bg-[#0293fd] hover:bg-[#113173] text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <FaPlus />
          Add New Address
        </button>

      </div>

      {/* Address Form */}
      {showForm && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          {/* Form Header */}
          <div className="flex items-center justify-between px-5 md:px-7 py-5 border-b border-gray-100">

            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Enter your complete delivery details.
              </p>
            </div>

            <button
              onClick={handleCancel}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
              <FaTimes />
            </button>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 md:p-7">

            {/* Address Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Address Type
              </label>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: "Home",
                    }))
                  }
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold transition ${
                    formData.type === "Home"
                      ? "border-[#0293fd] bg-[#0293fd]/10 text-[#0293fd]"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  <FaHome />
                  Home
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: "Office",
                    }))
                  }
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold transition ${
                    formData.type === "Office"
                      ? "border-[#0293fd] bg-[#0293fd]/10 text-[#0293fd]"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  <FaBriefcase />
                  Office
                </button>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#0293fd] focus:ring-2 focus:ring-[#0293fd]/10"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number *
                </label>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#0293fd] focus:ring-2 focus:ring-[#0293fd]/10"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Complete Address *
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House / Flat No., Street, Area"
                  rows="3"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:border-[#0293fd] focus:ring-2 focus:ring-[#0293fd]/10"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#0293fd]"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#0293fd]"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pincode *
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  maxLength="6"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#0293fd]"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Landmark
                </label>

                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Nearby landmark"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#0293fd]"
                />
              </div>

            </div>

            {/* Default Checkbox */}
            <div className="mt-5">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#0293fd]"
                />

                <span className="text-sm text-gray-700">
                  Make this my default delivery address
                </span>

              </label>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-7">

              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ff360a] hover:bg-[#113173] text-white font-semibold transition"
              >
                <FaSave />
                {editingId ? "Update Address" : "Save Address"}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Address List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {addresses.map((address) => (
          <div
            key={address.id}
            className={`bg-white rounded-2xl border shadow-sm p-5 md:p-6 ${
              address.isDefault
                ? "border-[#0293fd]"
                : "border-gray-100"
            }`}
          >

            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-[#0293fd]/10 text-[#0293fd] flex items-center justify-center">
                  {address.type === "Office" ? (
                    <FaBriefcase />
                  ) : (
                    <FaHome />
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    {address.type}
                  </h3>

                  {address.isDefault && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 mt-1">
                      <FaCheckCircle />
                      Default Address
                    </span>
                  )}
                </div>

              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={() => handleEdit(address)}
                  className="w-9 h-9 rounded-lg bg-blue-50 text-[#0293fd] hover:bg-[#0293fd] hover:text-white flex items-center justify-center transition"
                  title="Edit Address"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(address.id)}
                  className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                  title="Delete Address"
                >
                  <FaTrash />
                </button>

              </div>

            </div>

            {/* Address Details */}
            <div className="mt-5 space-y-3">

              <h4 className="font-bold text-gray-800">
                {address.name}
              </h4>

              <div className="flex items-start gap-3 text-sm text-gray-600">

                <FaMapMarkerAlt className="text-[#0293fd] mt-1 shrink-0" />

                <p className="leading-6">
                  {address.address}
                  <br />
                  {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>

              </div>

              {address.landmark && (
                <p className="text-sm text-gray-500 pl-6">
                  Landmark: {address.landmark}
                </p>
              )}

              <div className="flex items-center gap-3 text-sm text-gray-600">

                <FaPhone className="text-[#0293fd]" />

                <span>{address.mobile}</span>

              </div>

            </div>

            {/* Set Default */}
            {!address.isDefault && (
              <button
                onClick={() => handleSetDefault(address.id)}
                className="mt-5 text-sm font-semibold text-[#0293fd] hover:text-[#113173] transition"
              >
                Set as Default
              </button>
            )}

          </div>
        ))}

      </div>

      {/* Empty State */}
      {addresses.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 text-[#0293fd] flex items-center justify-center text-2xl">
            <FaMapMarkerAlt />
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-5">
            No Addresses Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add a delivery address to make your checkout faster.
          </p>

          <button
            onClick={handleAddAddress}
            className="mt-5 inline-flex items-center gap-2 bg-[#0293fd] hover:bg-[#113173] text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <FaPlus />
            Add New Address
          </button>

        </div>
      )}

      {/* Bottom Info */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

        <h3 className="font-bold text-[#113173]">
          Delivery Address
        </h3>

        <p className="text-sm text-gray-600 mt-2 leading-6">
          Your saved addresses can be used during checkout. You can add
          multiple addresses and select one as your default delivery address.
        </p>

      </div>

    </div>
  );
}