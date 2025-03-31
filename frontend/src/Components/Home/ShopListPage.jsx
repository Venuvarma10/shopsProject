import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import ToastMessage from '../Toasts/ToastMessage';
import { IoLocation } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";

const ShopListPage = () => {
    const {shopimg}=assets;
    const [toast,setToast]=useState(false);
    const [message,setMessage]=useState('Close');
    const handleClick=()=>{
        setToast(true);
    }
    useEffect(()=>{
        setTimeout(()=>{
            setToast(false);
        },800)
    },[toast])
  return (
    <>
        {toast && <ToastMessage message={message}/>}
        <div className='w-[100%] flex justify-between items-start border-1 mt-3 space-x-1.5 p-[15px] cursor-pointer' onClick={handleClick}>
            <div className='w-[24%] h-[120px] p-1'>
                <img src={shopimg} alt='shopImage' className='w-[100%] h-[120px]'/>
            </div>
            <div className='w-[60%]'>
                <p className='p font-bold'>Shop Name</p>
                <p className='p font-semibold'><IoLocation className='inline pr-1 text-2xl relative bottom-0.5'/>11/2, NGO's Colony, Puttur, Andhra Pradesh, India</p>
                <p className='p'><FaClock className='inline pr-1 text-[22px] relative bottom-0.5'/>{"10:00AM"+" - "+"09:00PM" +" (Estimated time)"} </p>
            </div>
            <div>
                <p className='p font-bold'>Category</p>
            </div>
        </div>
    </>
  )
}

export default ShopListPage