import { NavLink } from "react-router-dom";
import { useState } from "react";
const Login = () => {
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
      console.log(new_data1);
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
    <div className='flex flex-col justify-center items-center w-full h-screen '>
        <div className='border-1 rounded-[10px] text-center p-9'>
          <h2 className='text-[28px] text-blue-700 font-bold mt-4'>Login</h2>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <input type='number' placeholder='Mobile number' className='input-auth' name='mobileNumber' />
            <input type="password" placeholder='Password'  className='input-auth' name='password'/>
            <button type="submit" className='submit-button'>Submit</button>
          </form>
          <p className="p text-start px-3">Don't have an account?&nbsp;<NavLink to={"/owners/register"} className="text-amber-900">Register</NavLink></p>
        </div>
      </div>
  )
}

export default Login