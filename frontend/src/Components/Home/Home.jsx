import React,{useState, useEffect} from 'react'
import ShopListPage from './ShopListPage'
import Filter from './Filter'
import Header from './Header'

const Home = () => {
    const [shopsData,setShopsData]=useState([]);
    const [filter, setFilter] = useState({
        category:"",
        state:"",
        city:""
    });

    const filterShopsData=async()=>{
        try {
            const response = await fetch(`http://127.0.0.1:8000/users/search-shop/?category=${filter.category}&state=${filter.state}&city=${filter.city}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.details);
            }
            // Update state with the new list of shops
            setShopsData([...data]);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }
    
    const handleChange=(e)=>{
        setFilter({...filter,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        filterShopsData();
    }
    const getData=async()=>{
        try {
            const token = localStorage.getItem("token"); // Secure token retrieval
            const response = await fetch("http://127.0.0.1:8000/users/list_of_shops/", {
                method: "GET",
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.details);
            }
            // Update state with the new list of shops
            setShopsData([...data]);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }
    useEffect(()=>{
        getData()
    },[])
    
  return (
    
    <>
    <Header />
    <div className='w-[100%] p-8 mt-15'>
        <div className='fixed top-25' onChange={handleChange} onSubmit={handleSubmit}>
            <Filter />
        </div>
        {shopsData.length?<div className='flex justify-end'>
            <div className="flex flex-col justify-center w-[65%] space-y-5 scroll-auto">
                {shopsData.map((val,ind)=><ShopListPage key={ind} data={val}/>)}
            </div>
        </div>:<div className='flex justify-center text-2xl items-center'><p>No shops Found</p></div>}
    </div>
    </>
  )
}

export default Home