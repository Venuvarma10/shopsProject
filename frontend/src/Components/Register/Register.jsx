import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';

const Register = () => {
  
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

  const handleSubmit=(e)=>{
    e.preventDefault();
    registerUser();
    console.log(formData);
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
        <div className='border-1 rounded-[10px] text-center p-9'>
          <h2 className='text-[28px] text-blue-700 font-bold mt-4'>Register</h2>
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
          <p className='p text-start px-4'>Already have an Account?&nbsp;<NavLink to={"/owners/login"}>Login</NavLink></p>
        </div>
      </div>
  )
}

export default Register