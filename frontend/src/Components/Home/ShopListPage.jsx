import React, { useEffect, useState } from 'react'
import ToastMessage from '../Toasts/ToastMessage';
import { IoLocation } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";

const ShopListPage = ({data}) => {
    const [toast,setToast]=useState(false);
    const [message,setMessage]=useState('Close');
    const getShopStatus=async()=> {
        try {
            const response = await fetch(`http://127.0.0.1:8000/users/single_shop/${data.id}/`);
            const shopData = await response.json(); // Renamed variable to shopData
            if (!response.ok) {
                throw new Error(shopData.details);
            }
            // Update state with the new list of shops
            console.log(shopData);
            setToast(true);
            setMessage(shopData.Status?"Opened":"Closed");
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }
    const handleClick=()=> {
        getShopStatus();  
    }
    useEffect(()=> {
        setTimeout(()=> {
            setToast(false);
        },800)
    },[toast])
  return (
    <>
        {toast && <ToastMessage message={message}/>}
        <div className='w-[100%] flex justify-between items-start border-1 mt-3 space-x-1.5 p-[15px] cursor-pointer' onClick={handleClick}>
            <div className='w-[24%] h-[120px] p-1'>
                <img src={data.images[0].image} alt='shopImage' className='w-[100%] h-[120px]'/>
            </div>
            <div className='w-[60%]'>
                <p className='p font-bold'>{data.shopName}</p>
                <p className='p font-semibold'><IoLocation className='inline pr-1 text-2xl relative bottom-0.5'/>{data?.address}, {data?.city}, {data?.state}, {data?.country}, {data?.pincode}</p>
                <p className='p'><FaClock className='inline pr-1 text-[22px] relative bottom-0.5'/>{data.openingTime+" - "+data.closingTime +" (Estimated time)"} </p>
            </div>
            <div>
                <p className='p font-bold'>{data.category}</p>
            </div>
        </div>
    </>
  )
}

export default ShopListPage;
