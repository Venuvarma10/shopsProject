import React from 'react'
import ShopListPage from './ShopListPage'
import Filter from './Filter'
import Header from './Header'

const Home = () => {
    
    const arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    
  return (
    <>
    <Header />
    <div className='w-[100%] p-8 mt-15'>
        <div className='fixed top-25'>
            <Filter />
        </div>
        <div className='flex justify-end'>
            <div className="flex flex-col justify-center w-[65%] space-y-5 scroll-auto">
                {arr.map((_,ind)=><ShopListPage key={ind}/>)}
            </div>
        </div>
    </div>
    </>
  )
}

export default Home