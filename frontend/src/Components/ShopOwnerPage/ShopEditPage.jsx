import { useContext, useEffect } from "react";
import FirstSlide from "../ShopRegister/Slides/FirstSlide"
import SecondSlide from "../ShopRegister/Slides/SecondSlide"
import ThirdSlide from "../ShopRegister/Slides/ThirdSlide"
import { useParams } from "react-router-dom";
import { ShopContext } from "../ContextAPI/ShopContext";

const ShopEditPage = () => {
    const { id } = useParams();
    const {shopForm,setShopForm}=useContext(ShopContext);
    let db;

    const addDataWithExpiry = (uniqueId, data) => {
        openDatabase().then((dbInstance) => {
            let transaction = dbInstance.transaction("EditData", "readwrite");
            let store = transaction.objectStore("EditData");
    
            const expiryTime = Date.now() + 30 * 60 * 1000; // 30 min expiry
            let record = { id: uniqueId, ...data, expiryTime };
    
            let request = store.put(record);
    
            request.onsuccess = () => console.log("Data added with 30 min expiry:", record);
            request.onerror = (event) => console.error("Error adding data:", event.target.error);
        }).catch((error) => {
            console.error("Database not initialized:", error);
        });
    };

    const openDatabase = () => {
        return new Promise((resolve, reject) => {
            if (db) {
                resolve(db);
                return;
            }
    
            const request = indexedDB.open("MyDatabase", 1);
    
            request.onsuccess = (event) => {
                db = event.target.result;
                console.log("Database opened successfully");
                resolve(db);
            };
    
            request.onerror = (event) => {
                console.error("Error opening database:", event.target.error);
                reject(event.target.error);
            };
    
            request.onupgradeneeded = (event) => {
                db = event.target.result;
                if (!db.objectStoreNames.contains("EditData")) {
                    db.createObjectStore("EditData", { keyPath: "id" });
                    console.log("Object store 'EditData' created.");
                }
            };
        });
    };
    

    const getDataWithExpiry = (id) => {
        openDatabase()
            .then((dbInstance) => {
                let transaction = dbInstance.transaction("EditData", "readonly");
                let store = transaction.objectStore("EditData");
                let request = store.get(Number(id));  // Ensure ID is retrieved as a number
    
                request.onsuccess = (event) => {
                    let record = event.target.result;
    
                    if (!record) {
                        console.warn(`No data found in IndexedDB for ID: ${id}`);
                        return;
                    }
    
                    // Check if the record has expired
                    if (record.expiryTime && Date.now() > record.expiryTime) {
                        console.warn(`Data expired for ID: ${id}. Deleting...`);
                        
                        // Use a separate readwrite transaction to delete
                        let deleteTransaction = dbInstance.transaction("EditData", "readwrite");
                        let deleteStore = deleteTransaction.objectStore("EditData");
                        deleteStore.delete(Number(id));
    
                        return;
                    }
    
                    console.log("Data retrieved successfully:", record);
                    
                    setShopForm((prev) => ({
                        ...prev,
                        shopName: record.shopName || "",
                        category: record.category || "",
                        openingTime: record.openingTime || "__:__AM",
                        closingTime: record.closingTime || "__:__AM",
                        shopImages: record.images || [],
                        shopDaysOpen: {
                            Sunday: record.shopDaysOpen?.Sunday || 0,
                            Monday: record.shopDaysOpen?.Monday || 0,
                            Tuesday: record.shopDaysOpen?.Tuesday || 0,
                            Wednesday: record.shopDaysOpen?.Wednesday || 0,
                            Thursday: record.shopDaysOpen?.Thursday || 0,
                            Friday: record.shopDaysOpen?.Friday || 0,
                            Saturday: record.shopDaysOpen?.Saturday || 0,
                        },
                        shopAddress: {
                            address: record.address || "",
                            state: record.state || "",
                            city: record.city || "",
                            country: record.country || "India",
                            pincode: record.pincode || "",
                        },
                    }));
                };
    
                request.onerror = (event) => {
                    console.error("Error fetching data from IndexedDB:", event.target.error);
                };
            })
            .catch((error) => {
                console.error("Database initialization error:", error);
            });
    };

    useEffect(()=>{
        getDataWithExpiry(id);
    },[])
    const handleChange=(e)=>{
        if(e.target.name==="Sunday" || e.target.name==="Monday" || e.target.name==="Tuesday" || e.target.name==="Wednesday" || e.target.name==="Thursday" || e.target.name==="Friday" || e.target.name==="Saturday"){
          setShopForm({...shopForm,shopDaysOpen:{...shopForm.shopDaysOpen,[e.target.name]:+!shopForm.shopDaysOpen[e.target.name]}})
        }else if(e.target.name==="shopImages"){
          const files = Array.from(e.target.files);
          const imagePreviews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
          }));
          setShopForm({...shopForm,shopImages:[...shopForm.shopImages,...imagePreviews]})
        }else if(e.target.name==="address" || e.target.name==="state" || e.target.name==="city" || e.target.name==="pincode"){
          setShopForm({...shopForm,shopAddress:{...shopForm.shopAddress,[e.target.name]:e.target.value}})
        }else if(e.target.name==="openHrs"){
          let index=shopForm.openingTime.indexOf(":")
          let st=  e.target.value+shopForm.openingTime.slice(index);
          setShopForm({...shopForm,openingTime:st})
        }else if(e.target.name==="openMin"){
          let index=shopForm.openingTime.indexOf(":")
          let st= shopForm.openingTime.slice(0,index+1)+e.target.value+shopForm.openingTime.slice(index+3);
          setShopForm({...shopForm,openingTime:st})
        }else if(e.target.name==="closeHrs"){
          let index=shopForm.closingTime.indexOf(":")
          let st=  e.target.value+shopForm.closingTime.slice(index);
          setShopForm({...shopForm,closingTime:st})
        }else if(e.target.name==="closeMin"){
          let index=shopForm.closingTime.indexOf(":")
          let st= shopForm.closingTime.slice(0,index+1)+e.target.value+shopForm.closingTime.slice(index+3);
          setShopForm({...shopForm,closingTime:st})
        }else if(e.target.name==="openAMPM"){
          let lengthOpen=shopForm.openingTime.length;
          let st=shopForm.openingTime.slice(0,lengthOpen-2)+e.target.value;
          setShopForm({...shopForm,openingTime:st})
        }else if(e.target.name==="closeAMPM"){
          let lengthOpen=shopForm.closingTime.length;
          let st=shopForm.closingTime.slice(0,lengthOpen-2)+e.target.value;
          setShopForm({...shopForm,closingTime:st})
        }else{
          setShopForm({...shopForm,[e.target.name]:e.target.value});
        }
        
      }
        
      useEffect(()=>{
        addDataWithExpiry(Number(id), shopForm);
      },[shopForm]);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(shopForm.shopAddress.address && shopForm.shopAddress.city && shopForm.shopAddress.pincode && shopForm.shopAddress.state){
          const formData = new FormData();
          formData.append("shopName", shopForm.shopName);
          formData.append("category", shopForm.category);
          formData.append("openingTime", shopForm.openingTime);
          formData.append("closingTime", shopForm.closingTime);
          shopForm.shopImages.forEach((image) => {
            formData.append("images", image.file);
          });
          formData.append("shopDaysOpen", JSON.stringify(shopForm.shopDaysOpen));
          formData.append("address", shopForm.shopAddress.address);
          formData.append("state", shopForm.shopAddress.state);
          formData.append("city", shopForm.shopAddress.city);
          formData.append("country", shopForm.shopAddress.country);
          formData.append("pincode", shopForm.shopAddress.pincode);
          formData.forEach((value,ind)=>{
            console.log(value);
          })
          try {
            const token=localStorage.getItem("accessToken")
            const response = await fetch("http://127.0.0.1:8000/api/shop_create_view/", {
              method: "POST",
              headers:{
                "Authorization": `Bearer ${token}`,
              },
              body: formData,
            });
            const data=await response.json();
            console.log(data);
            if (!response.ok) {
              throw new Error(data.details);
            } 
            navigate("/owners/shopowner")
          } catch (error) {
            console.error("Error submitting form:", error.message);
          }
        }
      }

    
    
  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
        <div className="flex flex-col justify-center items-center mb-4">
            <FirstSlide />
            <SecondSlide />
            <ThirdSlide />
            <button type='submit' className={`submit-button `} >Submit</button>
        </div> 
    </form>
  )
}

export default ShopEditPage