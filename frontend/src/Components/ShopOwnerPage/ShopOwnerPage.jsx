import React, { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import BannerSlider from "./BannerSlider.jsx";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

const ShopOwnerPage = () => {
    const [shopDetails, setShopDetails] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const [status, setStatus] = useState(false);

    const handleClick = () => {
        setStatus(!status);
    };

    const handleClickNext = () => {
        if (activeSlide < shopDetails.length - 1) {
            setActiveSlide(activeSlide + 1);
        }
    };

    const handleClickPrev = () => {
        if (activeSlide > 0) {
            setActiveSlide(activeSlide - 1);
        }
    };

    const getData = async () => {
        try {
            const token = localStorage.getItem("token"); // Secure token retrieval
            const response = await fetch("http://127.0.0.1:8000/api/shop_create_view/", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNjIxNDAxLCJpYXQiOjE3NDM1MDI2MDEsImp0aSI6ImFmODIyYTBhM2RiMzQzNWQ4OTRjOGZhODJkZGQzODk4IiwidXNlcl9pZCI6M30.BDC7bWWdpkgKs1GAPGRJGTI_AnhcgtGPgRjCuhMIjMc",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.details);
            }
            setShopDetails([...data]);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <div className='flex justify-center items-center mt-5'>
            <div className='p-5 border'>
                {shopDetails[activeSlide]?.images && <BannerSlider images={shopDetails[activeSlide].images} />}
                {shopDetails.length > 0 && (
                    <>
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-2xl font-bold'>{shopDetails[activeSlide]?.shopName}</p>
                            <div className='flex items-center justify-between w-[35%]'>
                                <button className='edit-delete'>Edit</button>
                                <button className='edit-delete'>Delete</button>
                            </div>
                        </div>
                        <p className='p font-bold'>{shopDetails[activeSlide]?.owner_name}</p>
                        <p className='p w-100'>
                            <IoLocation className='inline pr-1 text-2xl relative bottom-0.5' />
                            {shopDetails[activeSlide]?.address}, {shopDetails[activeSlide]?.city}, {shopDetails[activeSlide]?.state}, {shopDetails[activeSlide]?.country}, {shopDetails[activeSlide]?.pincode}
                        </p>
                        <p className='p'>
                            <FaClock className='inline pr-1 text-[22px] relative bottom-0.5' />
                            {shopDetails[activeSlide]?.openingTime} - {shopDetails[activeSlide]?.closingTime}
                        </p>
                    </>
                )}

                <div className='flex justify-between items-center mt-8'>
                    <button className={`edit-delete text-[26px] ${shopDetails.length === 1 || activeSlide === 0 ? "invisible" : "block"}`} name="prev" onClick={handleClickPrev}><HiArrowSmLeft /></button>
                    <button className='edit-delete' name='open/close' onClick={handleClick}>{status ? "Open" : "Close"}</button>
                    <button className={`edit-delete text-[26px] ${activeSlide === shopDetails.length - 1 ? "invisible" : "block"}`} name="next" onClick={handleClickNext}><HiArrowSmRight /></button>
                </div>
            </div>
        </div>
    );
};

export default ShopOwnerPage;
