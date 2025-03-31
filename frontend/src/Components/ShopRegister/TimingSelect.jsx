import React, { useContext } from 'react'
import { ShopContext } from '../ContextAPI/ShopContext'

const TimingSelect = () => {

    const {shopForm}=useContext(ShopContext);
  return (
    <div className="flex justify-center items-center">
        <div className="w-[350px] p-6 ">
            <label className="block text-lg font-bold mb-2">Shop Timings</label>
            {/* Opening Time */}
            <div className=" text-start mb-3">
                <label className="block font-semibold mb-1">Opening Time</label>
                <div className="flex space-x-2">
                    <select className="border border-gray-300 p-2 rounded-md" name="openHrs" value={shopForm.openingTime.slice(0,2)==="__"? null:shopForm.openingTime.slice(0,2)}>
                        {["_ _","01","02","03","04","05","06","07","08","09","10","11","12"].map((val, i) => (
                            <option key={i + 1}>{val}</option>
                        ))}
                    </select>
                    <span>:</span>
                    <select className="border border-gray-300 p-2 rounded-md" name="openMin" value={shopForm.openingTime.slice(3,5)==="__"? null:shopForm.openingTime.slice(3,5)}>
                        {["_ _","00","15","30","45"].map((min) => (
                            <option key={min}>{min}</option>
                        ))}
                    </select>
                    <select className="border border-gray-300 p-2 rounded-md" name="openAMPM" value={shopForm.openingTime.slice(5,7)}>
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                </div>
            </div>

            {/* Closing Time */}
            <div className="text-start mb-3">
                <label className="block font-semibold mb-1">Closing Time</label>
                <div className="flex space-x-2">
                    <select className="border border-gray-300 p-2 rounded-md" name="closeHrs" value={shopForm.closingTime.slice(0,2)==="__"? null:shopForm.closingTime.slice(0,2)}>
                        {["_ _","01","02","03","04","05","06","07","08","09","10","11","12"].map((val, i) => (
                            <option key={i + 1}>{val}</option>
                        ))}
                    </select>
                    <span>:</span>
                    <select className="border border-gray-300 p-2 rounded-md" name="closeMin" value={shopForm.openingTime.slice(3,5)==="__"? null:shopForm.closingTime.slice(3,5)}>
                        {["_ _","00","15","30","45"].map((min) => (
                            <option key={min}>{min}</option>
                        ))}
                    </select>
                    <select className="border border-gray-300 p-2 rounded-md" name="closeAMPM" value={shopForm.closingTime.slice(5,7)}>
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

  )
}

export default TimingSelect