import React from 'react'

const Filter = () => {
    const category=["Medicals", "Textile", "Xerox", "Provisions", "Fruits and Vegetables","Super Market","Gold Shop","Restaurants"]
    const state=["Andhra Pradesh","Telangana","Kerala","Karnataka","Bihar","Tamil Nadu","Maharastra"]
    const city=["Hyderabad","Banglore","Chennai","Mumbai","Puttur","Tirupati"]
  return (
    <>
        <form className='flex space-y-8 flex-col w-100' > 
            <h1 className='p font-bold'>Filter</h1>
            <select className='select-filter' name="category">
                <option value="all">Select your category</option>
                {category.map((value)=>{
                    return <option value={value} key={value}>{value}</option>
                })}
            </select>
            <select className='select-filter' name='city'>
                <option value="all">Select your city/town</option>
                {city.map((value)=>{
                    return <option value={value} key={value}>{value}</option>
                })}
            </select>
            <select className='select-filter' name='state'>
                <option value="all">Select your state</option>
                {state.map((value)=>{
                    return <option value={value} key={value}>{value}</option>
                })}
            </select>
            <div className='text-center' >
                <button  className='submit-button'>Search</button>
            </div>
        </form>
    </>
  )
}

export default Filter