import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from "../../assets/bg.jpg"
const Login = () => {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    mobileNumber:"",
    password:""
  })

  const loginUser=async(formData)=>{
    try {
      //for login
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) 
      });
      const new_data = await response.json();
      if (!response.ok) {
        console.log(new_data);
        throw new Error(new_data.detail);
      }
      //for token
      const response1 = await fetch("http://127.0.0.1:8000/api/token/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData,username:formData.mobileNumber}) //used pre-build token generator in backend that's why i am putting username here
      });
      const new_data1 = await response1.json();
      if (!response1.ok) {
        
        throw new Error(new_data1.detail);
      }
      localStorage.setItem("refreshToken",new_data1.refresh)
      localStorage.setItem("accessToken",new_data1.access)
      navigate("/owners/shopowner")
    } catch (error) {
        alert(error.message);
    }
  }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(formData.mobileNumber && formData.password){
      loginUser(formData);
    }else{
      alert("Require All Fields");
    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 backdrop-blur-[2px] flex flex-col justify-center items-center w-full h-screen">
        <div className='relative z-10 border-none shadow-lg shadow-[rgba(187,51,255,0.5)] rounded-[10px] text-center p-9 bg-[#fff] opacity-85'>
          <h2 className='text-[28px] text-[#bb33ff] font-bold mt-4'>Login</h2>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <input type='number' placeholder='Mobile number' className='input-auth ' name='mobileNumber' />
            <input type="password" placeholder='Password'  className='input-auth' name='password'/>
            <button type="submit" className='submit-button'>Submit</button>
          </form>
          <p className="p text-start px-3">Don't have an account?&nbsp;<NavLink to={"/owners/register"} className="text-blue-900">Register</NavLink></p>
        </div>
        </div>
      </div>
  )
}

export default Login