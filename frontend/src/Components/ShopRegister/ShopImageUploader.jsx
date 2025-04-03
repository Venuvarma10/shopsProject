import { useContext } from "react";
import { ShopContext } from "../ContextAPI/ShopContext";

const ShopImageUploader = () => {
  const {shopForm,setShopForm}=useContext(ShopContext);
 
  const removeImage = (index) => {
    const imagePreviews=shopForm.shopImages.filter((_, i) => i !== index);
    setShopForm({...shopForm,shopImages:[...imagePreviews]})
  };
  

  return (
    <div className="flex justify-center items-center">
      <div className="w-[400px]  p-6 text-center">
        <label className="block text-lg font-bold mb-6">Upload Shop Images</label>

        {/* Hidden File Input */}
        <input
          name="shopImages"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          id="shop-images"
        />
        <label
          htmlFor="shop-images"
          className="cursor-pointer border-2 border-dashed border-[#bb33ff] p-4 rounded-lg w-full text-gray-600 hover:border-blue-500 transition"
        >
          Click to Upload Images
        </label>
        <div className="mt-10">
        {/* Image Preview */}
        {shopForm.shopImages.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {shopForm.shopImages.map((img, index) => (
              <div key={index} className="relative">
                <img src={img.preview} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-md shadow" />
                <button
                  onClick={(e) =>{
                    removeImage(index)}}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ShopImageUploader;
