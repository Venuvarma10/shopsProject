import React, { useContext } from 'react'
import { ShopContext } from '../../ContextAPI/ShopContext'

const ThirdSlide = () => {
  const {shopForm}=useContext(ShopContext);
  return (
    <>
        <h2 className='text-center mt-5 text-lg font-bold'>Shop's Address</h2>
        <input type='text' className='input-auth' placeholder='Address' name="address" value={shopForm.shopAddress.address || null}/>
        <input type='text' className='input-auth' placeholder='State' name="state" value={shopForm.shopAddress.state || null}/> 
        <input type='text' className='input-auth' placeholder='City' name="city" value={shopForm.shopAddress.city || null}/>
        <input type='text' className='input-auth' value={"India"} disabled/>
        <input type='text' className='input-auth' placeholder='Pincode' name="pincode" value={shopForm.shopAddress.pincode || null}/>        
    </>
)
}

export default ThirdSlide