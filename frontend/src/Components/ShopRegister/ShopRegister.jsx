import React,{useContext, useState} from 'react'
import FirstSlide from './Slides/FirstSlide';
import SecondSlide from './Slides/SecondSlide';
import ThirdSlide from './Slides/ThirdSlide';
import { ShopContext } from '../ContextAPI/ShopContext';
import { useNavigate } from 'react-router-dom';
const ShopRegister = () => {
    const navigate=useNavigate();
    const [activeSlide, setActiveSlide] = useState(0);
    const {shopForm,setShopForm}=useContext(ShopContext);

    const slides = [<FirstSlide />,<SecondSlide />,<ThirdSlide />];
    
    const nextSlide = () => {
      if((activeSlide===0 && shopForm.shopName && shopForm.category && shopForm.shopImages.length!==0) || 
          (activeSlide==1 && shopForm.openingTime.indexOf("_")===-1 && shopForm.closingTime.indexOf("_")===-1)){
        setActiveSlide(activeSlide + 1);
      }
    };
  
    const prevSlide = () => {
      setActiveSlide(activeSlide - 1);
    };

    const handleChange=(e)=>{
      if(e.target.name==="Sunday" || e.target.name==="Monday" || e.target.name==="Tuesday" || e.target.name==="Wednesday" || e.target.name==="Thursday" || e.target.name==="Friday" || e.target.name==="Saturday"){
        setShopForm({...shopForm,shopDaysOpen:{...shopForm.shopDaysOpen,[e.target.name]:+!shopForm.shopDaysOpen[e.target.name]}})
      }else if(e.target.name==="shopImages"){
        const files = Array.from(e.target.files);
        const imagePreviews = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        setShopForm({...shopForm,shopImages:[...shopForm.shopImages,...imagePreviews]})
      }else if(e.target.name==="address" || e.target.name==="state" || e.target.name==="city" || e.target.name==="pincode"){
        setShopForm({...shopForm,shopAddress:{...shopForm.shopAddress,[e.target.name]:e.target.value}})
      }else if(e.target.name==="openHrs"){
        let index=shopForm.openingTime.indexOf(":")
        let st=  e.target.value+shopForm.openingTime.slice(index);
        setShopForm({...shopForm,openingTime:st})
      }else if(e.target.name==="openMin"){
        let index=shopForm.openingTime.indexOf(":")
        let st= shopForm.openingTime.slice(0,index+1)+e.target.value+shopForm.openingTime.slice(index+3);
        setShopForm({...shopForm,openingTime:st})
      }else if(e.target.name==="closeHrs"){
        let index=shopForm.closingTime.indexOf(":")
        let st=  e.target.value+shopForm.closingTime.slice(index);
        setShopForm({...shopForm,closingTime:st})
      }else if(e.target.name==="closeMin"){
        let index=shopForm.closingTime.indexOf(":")
        let st= shopForm.closingTime.slice(0,index+1)+e.target.value+shopForm.closingTime.slice(index+3);
        setShopForm({...shopForm,closingTime:st})
      }else if(e.target.name==="openAMPM"){
        let lengthOpen=shopForm.openingTime.length;
        let st=shopForm.openingTime.slice(0,lengthOpen-2)+e.target.value;
        setShopForm({...shopForm,openingTime:st})
      }else if(e.target.name==="closeAMPM"){
        let lengthOpen=shopForm.closingTime.length;
        let st=shopForm.closingTime.slice(0,lengthOpen-2)+e.target.value;
        setShopForm({...shopForm,closingTime:st})
      }else{
        setShopForm({...shopForm,[e.target.name]:e.target.value});
      }
    }
        
  const handleSubmit=async (e)=>{
      e.preventDefault();
      if(shopForm.shopAddress.address && shopForm.shopAddress.city && shopForm.shopAddress.pincode && shopForm.shopAddress.state){
        const formData = new FormData();
        formData.append("shopName", shopForm.shopName);
        formData.append("category", shopForm.category);
        formData.append("openingTime", shopForm.openingTime);
        formData.append("closingTime", shopForm.closingTime);
        shopForm.shopImages.forEach((image) => {
          formData.append("images", image.file);
        });
        formData.append("shopDaysOpen", JSON.stringify(shopForm.shopDaysOpen));
        formData.append("address", shopForm.shopAddress.address);
        formData.append("state", shopForm.shopAddress.state);
        formData.append("city", shopForm.shopAddress.city);
        formData.append("country", shopForm.shopAddress.country);
        formData.append("pincode", shopForm.shopAddress.pincode);
        formData.forEach((value,ind)=>{
          console.log(value);
        })
        try {
          const token=localStorage.getItem("accessToken")
          const response = await fetch("http://127.0.0.1:8000/api/shop_create_view/", {
            method: "POST",
            headers:{
              "Authorization": `Bearer ${token}`,
            },
            body: formData,
          });
          const data=await response.json();
          console.log(data);
          if (!response.ok) {
            throw new Error(data.details);
          } 
          navigate("/owners/shopowner")
        } catch (error) {
          console.error("Error submitting form:", error.message);
        }
      }
    }
    console.log(shopForm)

  return (
    <div className='flex flex-col justify-center items-center w-full my-10'>
        <div className='border-1 rounded-[10px] text-center p-10'>
          <h2 className='text-[28px] text-blue-700 font-bold mt-4'>Shop Register</h2>
          <form onSubmit={handleSubmit} onChange={handleChange} >
            {slides[activeSlide]}
            <div className='flex justify-center items-center mb-4'>
              <div className='flex justify-between w-100'>
                  <button type="button" className={`submit-button ${activeSlide==0?"invisible":"block"}`} onClick={prevSlide}>Prev</button>
                  <button type="button" className={`submit-button ${activeSlide==slides.length-1?"hidden":"block"} `} onClick={nextSlide}>Next</button>
                  <button type='submit' className={`submit-button ${activeSlide!=slides.length-1?"hidden":"block"} `} >Submit</button>
              </div>
          </div>
          </form>
          
        </div>
    </div>
  )
}

export default ShopRegister