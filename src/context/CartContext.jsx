"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage
    useEffect(() => {

        const savedCart = localStorage.getItem("katharine-cart");

        if (savedCart) {
            // Restoring browser-persisted cart state after hydration avoids an SSR mismatch.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCartItems(JSON.parse(savedCart));
        }

    }, []);

    // Save cart to localStorage
    useEffect(() => {

        localStorage.setItem(
            "katharine-cart",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);

    // Add product to cart
    const addToCart = (product, quantity = 1) => {

        setCartItems((currentItems) => {

            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {

                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );

            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity,
                },
            ];
        });

        // Open Cart Popup
        setIsCartOpen(true);
    };

    // Update quantity
    const updateQuantity = (id, quantity) => {

        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity,
                    }
                    : item
            )
        );
    };

    // Remove product
    const removeFromCart = (id) => {

        setCartItems((items) =>
            items.filter((item) => item.id !== id)
        );

    };

    const clearCart = () => setCartItems([]);

    // Close drawer
    const closeCart = () => {
        setIsCartOpen(false);
    };

    // Total items
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Total price
    const cartTotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                closeCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
};
