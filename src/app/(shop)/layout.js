"use client";

import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
    CartProvider,
    useCart,
} from "@/context/CartContext";

function ShoppingContent({ children }) {

    const {
        cartItems,
        isCartOpen,
        closeCart,
        updateQuantity,
        removeFromCart,
    } = useCart();

    return (
        <>
            <Header />

            <main>
                {children}
            </main>

            <Footer />

            <CartDrawer
                isOpen={isCartOpen}
                onClose={closeCart}
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />
        </>
    );
}

export default function ShopingLayout({ children }) {
    return (
        <CartProvider>
            <ShoppingContent>
                {children}
            </ShoppingContent>
        </CartProvider>
    );
}