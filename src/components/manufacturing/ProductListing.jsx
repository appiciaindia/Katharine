"use client";

import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

function productPacking(product) {
    const sizes = Array.isArray(product.pack_sizes)
        ? product.pack_sizes.map((size) => String(size || '').trim()).filter(Boolean)
        : [];
    // Older product entries sometimes contain the default placeholder "1";
    // SKU has the actual pack size for those records (for example, 100ml).
    if (!sizes.length || (sizes.length === 1 && sizes[0] === '1' && product.sku)) {
        return product.sku ? [product.sku] : sizes;
    }
    return sizes;
}

function compositionRows(ingredients) {
    return (Array.isArray(ingredients) ? ingredients : []).map((ingredient) => {
        if (typeof ingredient === 'string') ingredient = { name: ingredient };
        const rawName = String(ingredient?.name || '').trim();
        const savedQuantity = String(ingredient?.quantity || '').trim();
        if (savedQuantity) return { name: rawName, quantity: savedQuantity };

        // Support older entries pasted with a tab or pipe instead of the
        // explicit quantity field, and split trailing amounts like "Vitamin E50mg".
        const separatorIndex = rawName.search(/[\t|]/);
        if (separatorIndex >= 0) {
            return {
                name: rawName.slice(0, separatorIndex).trim(),
                quantity: rawName.slice(separatorIndex + 1).replace(/^[\t|\s]+/, '').trim(),
            };
        }
        const trailingAmount = rawName.match(/\d[\d,.]*(?:\s*(?:mcg|µg|μg|mg|kg|g|IU|ml|%))?\s*$/i);
        if (trailingAmount && trailingAmount.index > 0) {
            return {
                name: rawName.slice(0, trailingAmount.index).trim(),
                quantity: trailingAmount[0].trim(),
            };
        }
        return { name: rawName, quantity: '' };
    }).filter((ingredient) => ingredient.name);
}

const ProductListing = ({ list, title, subtitle }) => {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const products = Array.isArray(list) ? list : [];

    return (
        <div className='py-10 lg:py-20 md:py-14 px-3 md:px-7 lg:px-10'>
            <div className="flex items-center mb-4 justify-center">
                <div className="xl:w-3/5 lg:w-3/4 text-center">
                    <h2 className='lg:text-4xl text-xl md:text-3xl font-bold mb-4'>{title}</h2>
                    <p>{subtitle}</p>
                </div>
            </div>
            <div className="">
                <table border="1" cellPadding="8" className='border border-collapse w-full'>
                    <thead>
                        <tr className='bg-[#0c213c] text-white'>
                            <th className='md:px-3 px-1.5 md:py-2 py-1 border border-r-amber-100 text-left text-[12px] md:text-[15px]'>SR. No.</th>
                            <th className='md:px-3 px-1.5 md:py-2 py-1 border border-r-amber-100 text-left text-[12px] md:text-[15px]'>Products Type</th>
                            <th className='md:px-3 px-1.5 md:py-2 py-1 border border-r-amber-100 text-left text-[12px] md:text-[15px]'>Suitable For</th>
                            <th className='md:px-3 px-1.5 md:py-2 py-1 border border-r-amber-100 text-left text-[12px] md:text-[15px]'>Packing</th>
                            <th className='md:px-3 px-1.5 md:py-2 py-1 text-left md:text-[15px] text-[12px]'>Ingredients</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => {
                            return (
                                <tr key={item.id} className='odd:bg-amber-100 '>
                                    <td className='md:px-3 px-1.5 md:py-2 border border-r-gray-500 text-[10px] md:text-[15px]'>{index + 1}</td>
                                    <td className='md:px-3 px-1.5 md:py-2 border border-r-gray-500 text-[10px] md:text-[15px]'>{item.product_name}</td>
                                    <td className='md:px-3 px-1.5 md:py-2 border border-r-gray-500 text-[10px] md:text-[15px]'>{(item.suitable_for || []).join(", ") || "—"}</td>
                                    <td className='md:px-3 px-1.5 md:py-2 border border-r-gray-500 text-[10px] md:text-[15px]'>{productPacking(item).join(", ") || "—"}</td>
                                    <td className='md:px-3 px-1.5 md:py-2 border border-r-gray-500 text-[10px] md:text-[15px]'><button type='button' className='cursor-pointer text-[#0c213c] hover:text-emerald-500 ease-in-out duration-500' onClick={() => setSelectedProduct(item)}><b>View Composition</b></button></td>
                                </tr>
                            )
                        })}
                        {!products.length && <tr><td colSpan={5} className='px-3 py-10 text-center text-slate-500'>No published products are available in this category yet.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* ===Product-Ingredients-Popup=== */}
            {selectedProduct && (
            <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/80 p-4">
                <div className="rounded-xl border border-amber-50 lg:w-[40%] md:w-[70%]">
                    <div className="bg-blue-100 py-2 px-3 rounded-t-xl flex items-center justify-between">
                        <div className="mr-4 md:w-2/3">
                            <span className='text-[13px] font-medium'>PRODUCT COMPOSITION</span>
                            <h5 className='text-xl font-semibold text-[#0c213c]'>{selectedProduct.product_name}</h5>
                            <p>{selectedProduct.composition_title}</p>
                        </div>
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-200 text-2xl cursor-pointer hover:bg-red-300 duration-500 ease-in-out" onClick={()=>setSelectedProduct(null)} >
                            <IoMdClose />
                        </div>
                    </div>
                    <div className="p-3 grid grid-cols-2 gap-x-3 bg-white ">
                        <div className="rounded-xl bg-amber-100 p-2">
                            <span className='text-[13px] md:text-[15px]'>Suitable For</span>
                            <h6 className='font-semibold md:text-[18px] text-[14px]'>{(selectedProduct.suitable_for || []).join(" , ") || "—"}</h6>
                        </div>
                        <div className="rounded-xl bg-cyan-100 p-2">
                            <span className='text-[13px] md:text-[15px]'>Packing</span>
                            <h6 className='font-semibold md:text-[18px] text-[14px]'>{productPacking(selectedProduct).join(" , ") || "—"}</h6>
                        </div>
                    </div>
                    <div className="p-3 bg-white rounded-b-xl pb-6 lg:max-h-140 md:max-h-70 max-h-60 overflow-y-scroll overflow-x-hidden">
                        <h4 className='font-bold mb-2'>Ingredients</h4>
                    <table className='w-full border border-amber-100 rounded-2xl'>
                        <thead>
                        <tr className='bg-cyan-100 text-left rounded-2xl'>
                            <th className='px-2 py-1'>S.No.</th>
                            <th className='px-2 py-1'>Ingredients</th>
                            <th className='px-2 py-1'>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {compositionRows(selectedProduct.ingredients).map((item, index)=>{
                            return(
                                <tr key={index} className='odd:bg-cyan-50'>
                                    <td className='px-2 py-1'>{index + 1}</td>
                                    <td className='px-2 py-1'>{item.name}</td>
                                    <td className='px-2 py-1'>{item.quantity}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    {!(selectedProduct.ingredients || []).length && <p className="mt-3 text-sm text-slate-500">Composition has not been added yet.</p>}
                    </div>
                </div>
            </div>)}

        </div>
    )
}

export default ProductListing;
