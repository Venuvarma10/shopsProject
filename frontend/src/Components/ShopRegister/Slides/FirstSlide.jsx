import React, { useContext } from 'react'
import ShopImageUploader from '../ShopImageUploader'
import { ShopContext } from '../../ContextAPI/ShopContext';

const FirstSlide = () => {
  const {shopForm}=useContext(ShopContext);
  const category=["Medicals", "Textile", "Xerox", "Provisions", "Fruits and Vegetables","Super Market","Gold Shop","Restaurants"]  

  return (
    <>
        <input type='text' placeholder="Shop's name" className='input-auth' name="shopName" value={shopForm.shopName || null}/>
        <select className='w-100 p-2 rounded-[15px] border-2 border-gray-600 focus:outline-none overflow-hidden' name="category" value={shopForm.category || null}>
            <option>Select Shop's Category</option>
            {category.map(val=><option key={val} >{val}</option>)}
        </select>
        <ShopImageUploader/>
    </>
  )
}

export default FirstSlide