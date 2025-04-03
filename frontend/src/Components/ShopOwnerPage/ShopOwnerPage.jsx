import React, { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import BannerSlider from "./BannerSlider.jsx";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";


const ShopOwnerPage = () => {
    const navigate=useNavigate();
    const [shopDetails, setShopDetails] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);    

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
            const token = localStorage.getItem("accessToken"); // Secure token retrieval
            const response = await fetch("http://127.0.0.1:8000/api/shop_create_view/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
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

    const handleClick = () => {
        updateStatus();
    };

    const updateStatus = async () => {
        try {
            const token = localStorage.getItem("accessToken"); // Secure token retrieval
            const response = await fetch(`http://127.0.0.1:8000/api/shop_update_mixin/${shopDetails[activeSlide].id}/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ Status: !shopDetails[activeSlide].Status }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.details);
            }
            setShopDetails((prev) =>
                prev.map((shop, index) =>
                    index === activeSlide ? { ...shop, Status: !shop.Status } : shop
                )
            );
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    const handleDelete = () => {
        deleteShop();
    }

    const deleteShop = async () => {
        try {
            const token = localStorage.getItem("accessToken"); // Secure token retrieval
            const response = await fetch(`http://127.0.0.1:8000/api/shop_update_mixin/${shopDetails[activeSlide].id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.details);
            }
            // Update state with the new list of shops
            setShopDetails([...data.shops]);
            console.log("Updated shopDetails after delete:", data.shops); // Log the updated shop details
            setActiveSlide(0);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };
    let db;

    const openDatabase = () => {
        return new Promise((resolve, reject) => {
            if (db) {
                resolve(db); // If already opened, return it
                return;
            }
    
            const request = indexedDB.open("MyDatabase", 1);
    
            request.onsuccess = (event) => {
                db = event.target.result;
                console.log("Database opened successfully:", db);
                resolve(db);
            };
    
            request.onerror = (event) => {
                console.error("Error opening database:", event.target.error);
                reject(event.target.error);
            };
    
            request.onupgradeneeded = (event) => {
                db = event.target.result;
                if (!db.objectStoreNames.contains("EditData")) {
                    db.createObjectStore("EditData", { keyPath: "Id" });
                    console.log("Object store 'EditData' created.");
                }
            };
        });
    };
    
    const addDataWithExpiry = (uniqueId, data) => {
        openDatabase().then((dbInstance) => {
            let transaction = dbInstance.transaction("EditData", "readwrite");
            let store = transaction.objectStore("EditData");
    
            const expiryTime = Date.now() + 30 * 60 * 1000; // 30 min expiry
            let record = { id: uniqueId, ...data, expiryTime };
    
            let request = store.put(record);
    
            request.onsuccess = () => console.log("Data added with 30 min expiry:", record);
            request.onerror = (event) => console.error("Error adding data:", event.target.error);
        }).catch((error) => {
            console.error("Database not initialized:", error);
        });
    };
    

    const handleEdit=()=>{
        console.log(shopDetails[activeSlide])
        addDataWithExpiry(1, shopDetails[activeSlide]);
        navigate(`/owners/shopEdit/${shopDetails[activeSlide].id}`)
    }

    useEffect(() => {
        getData();
    }, []);

    const addShop=()=>{
        navigate("/owners/shopregister")
    }
    return (
        <>
           {shopDetails.length && <div className={`flex justify-center items-center mt-5`}>
                <div className={`p-5 border-none rounded-[10px] ${shopDetails[activeSlide]?.Status ? "shadow-lg shadow-green-900" : "shadow-lg shadow-red-900"}`}>
                    {shopDetails[activeSlide]?.images && <BannerSlider images={shopDetails[activeSlide].images} />}
                    {shopDetails.length > 0 && (
                        <>
                            <div className='flex justify-between items-center mt-5'>
                                <p className='text-2xl font-bold'>{shopDetails[activeSlide]?.shopName}</p>
                                <div className='flex items-center justify-between w-[20%]'>
                                    <button className='edit-delete hover:text-red-400' onClick={handleEdit}><FiEdit2/></button>
                                    <button className='edit-delete ' onClick={handleDelete}><AiOutlineDelete /></button>
                                </div>
                            </div>
                            <p className='p font-semibold'>{shopDetails[activeSlide]?.owner_name}</p>
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
                        <button className={` text-[38px] cursor-pointer ${shopDetails.length === 1 || activeSlide === 0 ? "invisible" : "block"}`} name="prev" onClick={handleClickPrev}><HiArrowSmLeft /></button>
                        <button className={`buttons text-[#fff] ${shopDetails[activeSlide]?.Status ? "bg-red-500" : "bg-green-500"}`} name='open/close' onClick={handleClick}>{shopDetails[activeSlide]?.Status ? "Close" : "Open"}</button>
                        <button className={`text-[38px] cursor-pointer ${activeSlide === shopDetails.length - 1 ? "invisible" : "block"}`} name="next" onClick={handleClickNext}><HiArrowSmRight /></button>
                    </div>
                </div>
            </div> }
            <div className="flex justify-center items-center mt-10"><button className="submit-button " onClick={addShop}>Add Shop +</button></div>
        </>
    );
};

export default ShopOwnerPage;
