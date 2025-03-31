import React from 'react'

const ToastMessage = ({message}) => {
  return (
    <div className='flex justify-center items-center fixed top-0 z-50'>
        <div className='flex justify-center w-[250px] bg-amber-500 p-5 rounded-[5px]'>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default ToastMessage