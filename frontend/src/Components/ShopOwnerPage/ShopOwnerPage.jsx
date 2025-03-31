import React,{useState} from 'react'
import { assets } from '../../assets/assets.js'
import { IoLocation } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import BannerSlider from './BannerSlider.jsx';
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

const ShopOwnerPage = () => {
    
    const [shopDetails, setShopDetails] = useState([{
        "id": 15,
        "images": [],
        "owner_name": "ashwin reddy",
        "name": "shop",
        "address": "shop",
        "state": "shop",
        "city": "shop",
        "country": "shop",
        "pincode": "shop",
        "category": "shop",
        "openingtime": "shop",
        "closingtime": "shop",
        "Status": false,
        "worikingdays": null,
        "owner":5
    },]);
    const [activeSlide,setActiveSlide]=useState(0);
    const [status,setStatus]=useState(false);
    const {shopimg}=assets;
    const images=[shopimg,shopimg,shopimg,shopimg];

    const handleClick=(e)=>{
        setStatus(!status);
    }
    const handleClickNext=()=>{
        setActiveSlide(activeSlide+1);
    }
    const handleClickPrev=()=>{
        setActiveSlide(activeSlide-1);
    }
  return (
    <div className='flex justify-center items-center mt-5'>
        <div className='p-5 border'>
            <BannerSlider images={images}/>
            <div className='flex justify-between items-center mt-5'>
                <p className='text-2xl font-bold'>{shopDetails[activeSlide].name}</p>
                <div className='flex items-center justify-between w-[35%]'>
                    <button className='edit-delete'>Edit</button>
                    <button className='edit-delete'>Delete</button>
                </div>
            </div>
            <p className='p font-bold'>{shopDetails[activeSlide].owner_name}</p>
            <p className='p w-100'><span><IoLocation className='inline pr-1 text-2xl relative bottom-0.5'/></span>{shopDetails[activeSlide].address+", "+shopDetails[activeSlide].city+", "+shopDetails[activeSlide].state+", "+shopDetails[activeSlide].country+", "+shopDetails[activeSlide].pincode}</p>
            <p className='p'><FaClock className='inline pr-1 text-[22px] relative bottom-0.5'/>{shopDetails[activeSlide].openingtime+" - "+shopDetails[activeSlide].closingtime} </p>
            <div className='flex justify-between items-center mt-8' onClick={handleClick}>
                <button className={`edit-delete text-[26px] ${shopDetails.length===1 ||activeSlide===0 ? "invisible" :"block" }`}  name="prev" onClick={handleClickPrev}><HiArrowSmLeft /></button>
                <button className='edit-delete' name='open/close' onClick={handleClick}>{status?"Open":"Close"}</button>
                <button className={`edit-delete text-[26px] ${activeSlide===shopDetails.length-1 ? "invisible" :"block" }`} name="next" onClick={handleClickNext}><HiArrowSmRight /></button>
            </div>
        </div>
    </div>
  )
}

export default ShopOwnerPage


