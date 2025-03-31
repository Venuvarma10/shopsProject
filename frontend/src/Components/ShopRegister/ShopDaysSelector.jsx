import { useContext } from "react";
import { ShopContext } from "../ContextAPI/ShopContext";

const ShopDaysSelector = () => {

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const {shopForm}=useContext(ShopContext);

  return (
    <div className="flex justify-center items-center w-100 mx-9">
      <div className="w-[400px] p-6 ">
        <label className="block text-lg font-bold mb-3">Select Open Days</label>
        
        <div className="grid grid-cols-2 gap-2">
          {days.map((day) => (
            <label key={day} className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={shopForm.shopDaysOpen[day]}
                name={day}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="text-gray-800">{day}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopDaysSelector;
