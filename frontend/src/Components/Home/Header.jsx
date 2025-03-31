import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-amber-50 fixed top-0 w-[100%] z-10'>
        <p className='p font-bold'>Company Name</p>
        <div className='flex justify-between items-center w-[10%]'>
            <p className='p font-bold'>About</p>
            <p className='p font-bold'>Contact</p>
        </div>
    </div>
  )
}

export default Header