import Link from 'next/link';
import React from 'react';

const Button = ({ children, onClick, className = "", target='_self', type = "button", href, variant = "primary", disabled = false }) => {

    const baseClass = "pl-[20px] pr-[10px] py-[11px] inline-flex items-center justify-center rounded-full text-[16px] font-[500] ";

    const variants = {
        primary: "bg-[#0c213c] text-white hover:bg-[#eb9d19] ease-in-out duration-50",
        secondary: "bg-gray-900 text-white hover:bg-gray-800 ease-in-out duration-50",
        outline: "border border-[#0c213c] text-[#0c213c] hover:bg-[#0c213c] hover:text-white ease-in-out duration-50",
    }
    const classes = `${baseClass} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes} target={target}>
                {children}
            </Link>
        )
    }

    return (
        <button type={type} onClick={onClick} className={`${classes} ${disabled ? "cursor-not-allowed opacity-60" : ""}`} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button;
