"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";

import {
    FaStar,
    FaHeart,
    FaShoppingCart,
    FaMinus,
    FaPlus,
    FaTruck,
    FaShieldAlt,
    FaUndo,
    FaCheckCircle,
    FaChevronRight,
} from "react-icons/fa";

import { useCatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";

const ProductDetails = ({ params }) => {
    const { slug } = use(params);

    const { data: product, loading, error } = useCatalogProduct(slug);

    const [quantity, setQuantity] = useState(1);
    const [selectedMedia, setSelectedMedia] = useState({ slug: "", src: "" });
    const [activeTab, setActiveTab] = useState("description");
    const [wishlist, setWishlist] = useState(false);
    const [reviewData, setReviewData] = useState({ slug: "", items: [], summary: null });
    const [reviewForm, setReviewForm] = useState({ rating: 5, title: "", body: "" });
    const [reviewNotice, setReviewNotice] = useState(null);
    const [reviewSubmitting, setReviewSubmitting] = useState(false);

    const { addToCart } = useCart();
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        const controller = new AbortController();
        let active = true;
        apiRequest(`/products/${encodeURIComponent(slug)}/reviews`, { signal: controller.signal })
            .then((response) => {
                if (!active) return;
                setReviewData({
                    slug,
                    items: Array.isArray(response.data) ? response.data : [],
                    summary: response.meta || { average_rating: 0, review_count: 0 },
                });
            })
            .catch(() => {
                if (active) setReviewData({ slug, items: [], summary: { average_rating: 0, review_count: 0 } });
            });

        return () => {
            active = false;
            controller.abort();
        };
    }, [slug]);

    const productReviews = reviewData.slug === slug ? reviewData.items : [];
    const reviewSummary = reviewData.slug === slug ? reviewData.summary : null;

    async function submitReview(event) {
        event.preventDefault();
        setReviewSubmitting(true);
        setReviewNotice(null);
        try {
            await apiRequest(`/products/${encodeURIComponent(slug)}/reviews`, {
                method: "POST",
                body: { ...reviewForm, rating: Number(reviewForm.rating) },
            });
            const response = await apiRequest(`/products/${encodeURIComponent(slug)}/reviews`);
            setReviewData({
                slug,
                items: Array.isArray(response.data) ? response.data : [],
                summary: response.meta || { average_rating: 0, review_count: 0 },
            });
            setReviewForm({ rating: 5, title: "", body: "" });
            setReviewNotice({ type: "success", text: "Thank you. Your review has been submitted for admin approval." });
        } catch (requestError) {
            setReviewNotice({ type: "error", text: requestError.message });
        } finally {
            setReviewSubmitting(false);
        }
    }

    const selectedImage = selectedMedia.slug === product?.slug
        ? selectedMedia.src
        : product?.image || "";

    // Product not found
    if (!product) {
        if (loading) {
            return <div className="min-h-[60vh] flex items-center justify-center text-gray-600">Loading product…</div>;
        }

        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0c213c]">
                        Product Not Found
                    </h2>

                    <p className="text-gray-500 mt-3">
                        The product you are looking for does not exist.
                    </p>

                    <Link
                        href="/shop"
                        className="inline-block mt-6 px-6 py-3 rounded-xl bg-[#0c213c] hover:bg-[#071a30] text-white font-semibold transition"
                    >
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    // Product values with safe fallbacks
    const categoryName =
        product.category ||
        product.categoryName ||
        "Animal Nutrition";

    const categorySlug =
        product.categorySlug ||
        "animal-wellness";

    const rating = Number(reviewSummary?.average_rating ?? product.rating ?? 0);
    const reviews = Number(reviewSummary?.review_count ?? product.reviewCount ?? 0);

    const productImages =
        product.images?.length > 0
            ? product.images
            : product.image
            ? [product.image]
            : [];

    const suitableFor = Array.isArray(product.suitableFor)
        ? product.suitableFor
        : ["Cattle", "Goat", "Poultry"];

    const benefits = Array.isArray(product.benefits)
        ? product.benefits
        : [
              "Supports overall animal health",
              "Supports healthy growth",
              "Helps improve vitality",
              "Provides nutritional support",
          ];

    const ingredients = Array.isArray(product.ingredients)
        ? product.ingredients
        : [
              "Essential Nutrients",
              "Minerals",
              "Vitamins",
          ];

    const description =
        product.description ||
        product.shortDescription ||
        "A quality animal nutrition product designed to support better health, growth and overall wellness.";

    const dosage =
        product.dosage ||
        "Use as directed on the product label or as advised by a qualified veterinarian or animal nutrition expert.";

    const storage =
        product.storage ||
        "Store in a cool, dry place away from direct sunlight. Keep out of reach of children and animals.";

    // Discount calculation
    const discount =
        product.oldPrice &&
        Number(product.oldPrice) > Number(product.price)
            ? Math.round(
                  ((Number(product.oldPrice) -
                      Number(product.price)) /
                      Number(product.oldPrice)) *
                      100
              )
            : 0;

    // Quantity
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    // Cart product
    const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        slug: product.slug,
        image: product.image,
        rating,
        reviewCount: reviews,
    };

    // Add to cart
    const handleAddToCart = () => {
        addToCart(cartProduct, quantity);
    };

    // Buy now
    const buyNow = () => {
        addToCart(cartProduct, quantity);
    };

    return (
        <div className="bg-white ">
            {error && (
                <p className="bg-amber-50 px-4 py-3 text-center text-sm text-amber-900" role="status">
                    The live product details are unavailable. Showing the saved product information for now.
                </p>
            )}
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                        <Link
                            href="/"
                            className="hover:text-[#f89a18] transition"
                        >
                            Home
                        </Link>

                        <FaChevronRight className="text-[10px]" />

                        <Link
                            href="/shop"
                            className="hover:text-[#f89a18] transition"
                        >
                            Shop
                        </Link>

                        <FaChevronRight className="text-[10px]" />

                        <Link
                            href={`/categories/${categorySlug}`}
                            className="hover:text-[#f89a18] transition"
                        >
                            {categoryName}
                        </Link>

                        <FaChevronRight className="text-[10px]" />

                        <span className="text-gray-800 font-medium line-clamp-1">
                            {product.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <section className="px-3 lg:px-12.5 md:px-5 py-10 lg:py-18 md:py-13">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

                        {/* LEFT - Product Images */}
                        <div>
                            <div className="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">

                                {/* Discount */}
                                {discount > 0 && (
                                    <span className="absolute top-4 left-4 z-10 bg-[#f89a18] text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                                        {discount}% OFF
                                    </span>
                                )}

                                {/* Wishlist */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setWishlist((prev) => !prev)
                                    }
                                    aria-label="Add to wishlist"
                                    className="absolute top-4 right-4 z-10 w-11 h-11 bg-white rounded-full shadow flex items-center justify-center hover:scale-105 transition"
                                >
                                    <FaHeart
                                        className={
                                            wishlist
                                                ? "text-red-500"
                                                : "text-gray-400"
                                        }
                                    />
                                </button>

                                {/* Main Image */}
                                <div className="h-90 md:h-125 flex items-center justify-center p-8">
                                    {selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt={product.name}
                                            onError={(event) => { event.currentTarget.src = "/logo.png"; }}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    ) : (
                                        <div className="text-gray-400">
                                            No Image Available
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {productImages.length > 0 && (
                                <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                                    {productImages.map((image, index) => (
                                        <button
                                            key={`${image}-${index}`}
                                            type="button"
                                            onClick={() =>
                                                setSelectedMedia({ slug: product.slug, src: image })
                                            }
                                            className={`w-20 h-20 rounded-xl border-2 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 ${
                                                selectedImage === image
                                                    ? "border-[#f89a18]"
                                                    : "border-gray-100"
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} ${
                                                    index + 1
                                                }`}
                                                onError={(event) => { event.currentTarget.src = "/logo.png"; }}
                                                className="w-full h-full object-contain"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT - Product Info */}
                        <div>
                            {/* Category */}
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="text-[#f89a18] font-semibold text-sm uppercase tracking-wide">{categoryName}</p>
                                {product.new_arrival && <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">New Arrival</span>}
                            </div>

                            {/* Product Name */}
                            <h1 className="text-3xl md:text-4xl font-bold text-[#0c213c] mt-2 leading-tight">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mt-4 flex-wrap">
                                {reviews > 0 ? <>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={
                                                star <= Math.round(rating)
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </div>

                                <span className="font-semibold text-gray-700">
                                    {rating.toFixed(1)}
                                </span>

                                <span className="text-gray-500">
                                    ({reviews} Reviews)
                                </span>
                                <Link href="#reviews" className="text-sm font-medium text-[#113173] underline underline-offset-2">Read reviews</Link>
                                </> : <Link href="#reviews" className="text-sm font-medium text-[#113173] underline underline-offset-2">Be the first to review</Link>}
                            </div>

                            {/* Short Description */}
                            <p className="text-gray-600 leading-7 mt-5">
                                {product.shortDescription ||
                                    "Quality animal nutrition support designed for better health, growth and overall wellness."}
                            </p>
                            {product.product_form && <p className="mt-3 text-sm text-gray-600"><span className="font-semibold text-gray-800">Product form:</span> <span className="capitalize">{product.product_form}</span></p>}

                            {/* Price */}
                            <div className="flex items-center gap-4 mt-6 flex-wrap">
                                <span className="text-3xl font-bold text-[#0c213c]">
                                    ₹
                                    {Number(
                                        product.price || 0
                                    ).toLocaleString("en-IN")}
                                </span>

                                {product.oldPrice &&
                                    Number(product.oldPrice) >
                                        Number(product.price) && (
                                        <>
                                            <span className="text-lg text-gray-400 line-through">
                                                ₹
                                                {Number(
                                                    product.oldPrice
                                                ).toLocaleString("en-IN")}
                                            </span>

                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                Save ₹
                                                {(
                                                    Number(
                                                        product.oldPrice
                                                    ) -
                                                    Number(product.price)
                                                ).toLocaleString("en-IN")}
                                            </span>
                                        </>
                                    )}
                            </div>

                            {/* Stock */}
                            <div className="mt-5">
                                {product.stock !== false ? (
                                    <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                                        <FaCheckCircle />
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="text-red-500 font-medium">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            {/* Quantity */}
                            <div className="mt-7">
                                <p className="font-semibold text-gray-800 mb-2">
                                    Quantity
                                </p>

                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={decreaseQuantity}
                                        className="w-11 h-11 border border-gray-200 rounded-l-lg flex items-center justify-center hover:bg-gray-50"
                                    >
                                        <FaMinus className="text-sm" />
                                    </button>

                                    <div className="w-14 h-11 border-t border-b border-gray-200 flex items-center justify-center font-semibold">
                                        {quantity}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={increaseQuantity}
                                        className="w-11 h-11 border border-gray-200 rounded-r-lg flex items-center justify-center hover:bg-gray-50"
                                    >
                                        <FaPlus className="text-sm" />
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-7">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={product.stock === false}
                                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-[#0c213c] hover:bg-[#071a30] text-white py-3.5 px-6 rounded-xl font-semibold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    <FaShoppingCart />
                                    Add to Cart
                                </button>

                                <button
                                    type="button"
                                    onClick={buyNow}
                                    disabled={product.stock === false}
                                    className="flex-1 cursor-pointer bg-[#f89a18] hover:bg-[#d97f05] text-white py-3.5 px-6 rounded-xl font-semibold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Trust Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                                <div className="border border-gray-100 rounded-xl p-4 text-center">
                                    <FaTruck className="mx-auto text-[#f89a18] text-xl" />

                                    <p className="text-sm font-semibold mt-2">
                                        Fast Delivery
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Doorstep Delivery
                                    </p>
                                </div>

                                <div className="border border-gray-100 rounded-xl p-4 text-center">
                                    <FaShieldAlt className="mx-auto text-[#f89a18] text-xl" />

                                    <p className="text-sm font-semibold mt-2">
                                        Quality Assured
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Trusted Products
                                    </p>
                                </div>

                                <div className="border border-gray-100 rounded-xl p-4 text-center">
                                    <FaUndo className="mx-auto text-[#f89a18] text-xl" />

                                    <p className="text-sm font-semibold mt-2">
                                        Secure Shopping
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Safe & Reliable
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Information Tabs */}
            <section className="border-t border-gray-100 py-12">
                <div className="container mx-auto px-4">

                    {/* Tabs */}
                    <div className="flex gap-2 md:gap-8 border-b border-gray-200 overflow-x-auto">
                        {[
                            ["description", "Description"],
                            ["benefits", "Benefits"],
                            ["ingredients", "Key Ingredients"],
                            ["usage", "Usage & Dosage"],
                            ["storage", "Storage"],
                        ].map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActiveTab(key)}
                                className={`pb-4 px-2 whitespace-nowrap font-semibold border-b-2 transition ${
                                    activeTab === key
                                        ? "text-[#0c213c] border-[#f89a18]"
                                        : "text-gray-500 border-transparent hover:text-[#0c213c]"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Description */}
                    {activeTab === "description" && (
                        <div className="pt-8 max-w-4xl">
                            <h2 className="text-2xl font-bold text-[#0c213c]">
                                Product Description
                            </h2>

                            <p className="text-gray-600 leading-8 mt-4">
                                {description}
                            </p>

                            <div className="mt-7">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Suitable For
                                </h3>

                                <div className="flex flex-wrap gap-3 mt-3">
                                    {suitableFor.map((item) => (
                                        <span
                                            key={item}
                                            className="bg-orange-50 text-[#0c213c] px-4 py-2 rounded-lg text-sm font-medium"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Benefits */}
                    {activeTab === "benefits" && (
                        <div className="pt-8 max-w-4xl">
                            <h2 className="text-2xl font-bold text-[#0c213c]">
                                Key Benefits
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-4 mt-5">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <FaCheckCircle className="text-green-500 mt-1 shrink-0" />

                                        <span className="text-gray-600">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Ingredients */}
                    {activeTab === "ingredients" && (
                        <div className="pt-8 max-w-4xl">
                            <h2 className="text-2xl font-bold text-[#0c213c]">
                                Key Ingredients
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
                                {ingredients.map((ingredient, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 border border-gray-100 rounded-xl p-4"
                                    >
                                        <span className="font-medium text-gray-700">
                                            {ingredient}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Usage */}
                    {activeTab === "usage" && (
                        <div className="pt-8 max-w-4xl">
                            <h2 className="text-2xl font-bold text-[#0c213c]">
                                Usage & Dosage
                            </h2>

                            <p className="text-gray-600 leading-7 mt-4">
                                {dosage}
                            </p>
                        </div>
                    )}

                    {/* Storage */}
                    {activeTab === "storage" && (
                        <div className="pt-8 max-w-4xl">
                            <h2 className="text-2xl font-bold text-[#0c213c]">
                                Storage Instructions
                            </h2>

                            <p className="text-gray-600 leading-7 mt-4">
                                {storage}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Customer reviews */}
            <section id="reviews" className="scroll-mt-24 border-t border-gray-100 py-12">
                <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-[#0c213c]">Customer Reviews</h2>
                                <p className="mt-1 text-sm text-gray-500">Ratings and feedback from our customers.</p>
                            </div>
                            {reviews > 0 ? (
                                <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3">
                                    <FaStar className="text-amber-400" />
                                    <span className="text-xl font-bold text-[#0c213c]">{rating.toFixed(1)}</span>
                                    <span className="text-sm text-gray-500">from {reviews} reviews</span>
                                </div>
                            ) : (
                                <span className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">No ratings yet</span>
                            )}
                        </div>

                        {productReviews.length ? (
                            <div className="mt-6 space-y-4">
                                {productReviews.map((review) => (
                                    <article key={review.id} className="rounded-2xl border border-gray-100 bg-white p-5">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="font-semibold text-[#0c213c]">{review.user_name}</p>
                                            <time className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString("en-IN")}</time>
                                        </div>
                                        <div className="mt-2 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                                            {[1, 2, 3, 4, 5].map((star) => <FaStar key={star} className={star <= review.rating ? "text-amber-400" : "text-gray-200"} />)}
                                        </div>
                                        {review.title && <h3 className="mt-3 font-semibold text-gray-800">{review.title}</h3>}
                                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">{review.body}</p>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-6 rounded-xl bg-gray-50 p-5 text-sm text-gray-600">No customer reviews yet. Be the first to share your experience.</p>
                        )}
                    </div>

                    <div className="h-fit rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-7">
                        <h2 className="text-xl font-bold text-[#0c213c]">Write a Review</h2>
                        {reviewNotice && <p role="status" className={`mt-4 rounded-lg px-3 py-2 text-sm ${reviewNotice.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>{reviewNotice.text}</p>}
                        {isLoggedIn ? (
                            <form onSubmit={submitReview} className="mt-5 space-y-4">
                                <p className="text-sm text-gray-600">Reviewing as {user?.name || "customer"}</p>
                                <fieldset>
                                    <legend className="text-sm font-medium text-gray-700">Your rating</legend>
                                    <div className="mt-2 flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} type="button" aria-label={`Rate ${star} out of 5`} aria-pressed={Number(reviewForm.rating) === star} onClick={() => setReviewForm((current) => ({ ...current, rating: star }))} className="text-2xl">
                                                <FaStar className={star <= reviewForm.rating ? "text-amber-400" : "text-gray-300"} />
                                            </button>
                                        ))}
                                    </div>
                                </fieldset>
                                <label className="block text-sm font-medium text-gray-700">Review title (optional)
                                    <input value={reviewForm.title} onChange={(event) => setReviewForm((current) => ({ ...current, title: event.target.value }))} maxLength={120} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm" />
                                </label>
                                <label className="block text-sm font-medium text-gray-700">Your review
                                    <textarea value={reviewForm.body} onChange={(event) => setReviewForm((current) => ({ ...current, body: event.target.value }))} required minLength={5} maxLength={2000} rows={5} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm" placeholder="What did you think about this product?" />
                                </label>
                                <button type="submit" disabled={reviewSubmitting} className="rounded-xl bg-[#113173] px-5 py-3 font-semibold text-white transition hover:bg-[#0c213c] disabled:opacity-60">
                                    {reviewSubmitting ? "Submitting…" : "Submit review"}
                                </button>
                            </form>
                        ) : (
                            <p className="mt-4 text-sm leading-6 text-gray-600">Please <Link href="/login" className="font-semibold text-[#113173] underline">sign in</Link> to leave a review.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Enquiry CTA */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="bg-[#0c213c] rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Need Help Choosing the Right Product?
                        </h2>

                        <p className="text-blue-100 mt-3 max-w-2xl mx-auto leading-7">
                            Our team can help you choose the right animal
                            nutrition product according to your requirements.
                        </p>

                        <Link
                            href="/contact"
                            className="inline-block mt-6 bg-[#f89a18] hover:bg-[#d97f05] text-white px-7 py-3 rounded-xl font-semibold transition"
                        >
                            Enquire Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;
