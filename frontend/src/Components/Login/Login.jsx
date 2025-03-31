import { NavLink } from "react-router-dom";
import { useState } from "react";
const Login = () => {

  const [formData,setFormData]=useState({
    mobile_number:"",
    password:""
  })

  const loginUser=async(formData)=>{
    try {
      const response = await fetch(LOGIN_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) 
      });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const new_data = await response.json();
        return {username: formData.username, token: new_data.token};
    } catch (error) {
        alert('Invalid username or password');
    }
  }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
    console.log(formData)
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    loginUser(formData)
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen '>
        <div className='border-1 rounded-[10px] text-center p-9'>
          <h2 className='text-[28px] text-blue-700 font-bold mt-4'>Login</h2>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <input type='number' placeholder='Mobile number' className='input-auth' name='mobile_number' />
            <input type="password" placeholder='Password'  className='input-auth' name='password'/>
            <button type="submit" className='submit-button'>Submit</button>
          </form>
          <p className="p text-start px-3">Don't have an account?&nbsp;<NavLink to={"/owners/register"} className="text-amber-900">Register</NavLink></p>
        </div>
      </div>
  )
}

export default Login