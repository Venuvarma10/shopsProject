import React, { createContext,useState } from 'react';
const ShopContext = createContext();
const ShopProvider = ({ children }) => {
    
    const [shopForm,setShopForm] = useState({
        shopName:"",
        category:"",
        openingTime:"__:__AM",
        closingTime:"__:__AM",
        shopImages:[],
        shopDaysOpen:{Sunday:0,Monday:0,Tuesday:0,Wednesday:0,Thursday:0,Friday:0,Saturday:0},
        shopAddress:{
          address:"",
          state:"",
          city:"",
          country:"India",
          pincode:"",
        }});
    
    return (
        <ShopContext.Provider value={{
            shopForm,
            setShopForm
        }}>
            {children}
        </ShopContext.Provider>
    );
};
export { ShopProvider, ShopContext };