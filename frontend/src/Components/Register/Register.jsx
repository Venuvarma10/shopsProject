import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import registerbg from '../../assets/registerbg1.jpg'
const Register = () => {
  const navigate=useNavigate();
  const firstNameRegex=/^[A-Za-z][A-Za-z'-]{1,49}$/; //Only letters, hyphens, and apostrophes; 2-50 characters
  const lastNameRegex=/^[A-Za-z][A-Za-z'-]{1,49}$/; //Only letters, hyphens, and apostrophes; 2-50 characters
  const mobileNumberRegex=/^[6789]\d{9}$/;  //Must be 10 digits, starting with 6, 7, 8, or 9.
  const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/; //Must be 8+ characters with at least one uppercase, one lowercase, one digit, and one special character.

  const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    mobileNumber:"",
    password:"",
    confirmPassword:""
  })

  const [error,setError]=useState({
    firstNameError:true,
    lastNameError:true,
    mobileNumberError:true,
    passwordError:true,
    confirmPasswordError:true
  })

  const handleChange=(e)=>{
    const {name,value}=e.target;
    if (name === "firstName") {
      setError(prevState => ({ ...prevState, firstNameError: value?firstNameRegex.test(value):true }));
    } else if (name === "lastName") {
      setError(prevState => ({ ...prevState, lastNameError: value?lastNameRegex.test(value):true}));
    } else if (name === "password") {
      setError(prevState => ({ ...prevState, passwordError: value?passwordRegex.test(value):true}));
    } else if (name === "confirmPassword") {
      setError(prevState => ({ ...prevState, confirmPasswordError: value?formData.password === value:true}));
    }else if (name === "mobileNumber") {
      setError(prevState => ({ ...prevState, mobileNumberError: value?mobileNumberRegex.test(value):true}));
    }
    setFormData({...formData,[name]:value})
  }

  const registerUser=async()=>{
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) 
      });
      const new_data = await response.json();

      if (!response.ok) {
          throw new Error(new_data.username[0]);
      }

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

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(formData.firstName && formData.lastName && formData.mobileNumber && formData.password && formData.confirmPassword===formData.password){
      registerUser();
    }else{
      alert("Require All Fields")
    }
    console.log(formData);
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen bg-fit bg-[center_top_10%] bg-no-repeat" style={{ backgroundImage: `url(${registerbg})` }}>
          <div className="absolute inset-0 backdrop-blur-[2px] flex flex-col justify-center items-center w-full h-screen">
            <div className='relative z-10 border-none shadow-lg shadow-[rgba(187,51,255,0.5)] rounded-[10px] text-center p-9 bg-[#fff] opacity-85'>
          <h2 className='text-[28px] text-[#bb33ff] font-bold mt-4'>Register</h2>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <div className='relative'>
              <input type='text' placeholder='First name' className='input-auth relative' name='firstName'/>
              {!error.firstNameError && <span className='error-message'>Only letters, hyphens, and apostrophes; 2-50 characters</span>}
            </div>
            <div className='relative'>
              <input type="text" placeholder='Last name'  className='input-auth' name='lastName'/>
              {!error.lastNameError && <span className='error-message'>Only letters, hyphens, and apostrophes; 2-50 characters</span>}
            </div>
            <div className='relative'>
              <input type='number' placeholder='Mobile number' className='input-auth' name='mobileNumber'/>
              {!error.mobileNumberError && <span className='error-message'>Must be 10 digits, starting with 6, 7, 8, or 9</span>}
            </div>
            <div className='relative'>
              <input type="password" placeholder='Password'  className='input-auth' name='password'/>
              {!error.passwordError && <span className='error-message'>Must be 8+ characters with at least one uppercase, one lowercase, one digit, and one special character</span>}
            </div>
            <div className='relative'>
              <input type="password" placeholder='Confirm Password'  className='input-auth' name='confirmPassword'/>
              {!error.confirmPasswordError && <span className='error-message'>Passwords do not match</span>}
            </div>
            <button type="submit" className='submit-button'>Submit</button>
          </form>
          <p className='p text-start px-4'>Already have an Account?&nbsp;<NavLink to={"/owners/login"} className="text-blue-900">Login</NavLink></p>
        </div>
        </div>
      </div>
  )
}

export default Register