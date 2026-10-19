"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

export default function MyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState({
    first_name: "Anil",
    last_name: "Kumar",
    email: "anil@example.com",
    mobile: "+91 9876543210",
    gender: "Male",
    date_of_birth: "1988-05-10",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
    setMessage("");
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later Laravel API call will come here
    setProfile(formData);
    setIsEditing(false);
    setMessage("Profile updated successfully.");
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#113173]">
            My Profile
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your personal information and account details.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center justify-center gap-2 bg-[#0293fd] hover:bg-[#113173] text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <FaEdit />
            Edit Profile
          </button>
        )}
      </div>

      {/* Success Message */}
      {message && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          <FaCheckCircle />
          <span>{message}</span>
        </div>
      )}

      {/* Profile Top Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-7">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full bg-[#0293fd]/10 flex items-center justify-center text-[#0293fd] text-4xl shrink-0">
            <FaUser />
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {profile.first_name} {profile.last_name}
            </h2>

            <p className="text-gray-500 mt-1">
              {profile.email}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                Active Account
              </span>

              <span className="bg-blue-50 text-[#0293fd] text-xs font-semibold px-3 py-1.5 rounded-full">
                Customer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">

        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Personal Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your basic personal information.
            </p>
          </div>

          <FaUser className="text-[#0293fd] text-xl" />
        </div>

        <form onSubmit={handleSubmit}>

          <div className="p-5 md:p-7 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition ${
                    isEditing
                      ? "border-gray-300 focus:border-[#0293fd] focus:ring-2 focus:ring-[#0293fd]/10"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition ${
                    isEditing
                      ? "border-gray-300 focus:border-[#0293fd] focus:ring-2 focus:ring-[#0293fd]/10"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition ${
                    isEditing
                      ? "border-gray-300 focus:border-[#0293fd] focus:ring-2 focus:ring-[#0293fd]/10"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>

              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition ${
                    isEditing
                      ? "border-gray-300 focus:border-[#0293fd] focus:ring-2 focus:ring-[#0293fd]/10"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border outline-none ${
                  isEditing
                    ? "border-gray-300 focus:border-[#0293fd]"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth
              </label>

              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-[#0293fd]"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="px-5 md:px-7 pb-7 flex flex-col sm:flex-row gap-3 sm:justify-end">

              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                <FaTimes />
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ff360a] hover:bg-[#113173] text-white font-semibold transition"
              >
                <FaSave />
                Save Changes
              </button>

            </div>
          )}
        </form>
      </div>

      {/* Account Security */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-7">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ff360a] flex items-center justify-center shrink-0">
              <FaLock />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Account Security
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Keep your account secure by regularly updating your password.
              </p>
            </div>

          </div>

          <Link
            href="/account/password"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#113173] text-[#113173] font-semibold hover:bg-[#113173] hover:text-white transition"
          >
            <FaLock />
            Change Password
          </Link>

        </div>
      </div>

      {/* Account Information */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 md:p-6">

        <h3 className="font-bold text-[#113173]">
          Profile Information
        </h3>

        <p className="text-sm text-gray-600 mt-2 leading-6">
          Keep your profile information updated to receive order updates,
          delivery notifications and important account communications from
          Katharine Pharma.
        </p>

      </div>

    </div>
  );
}