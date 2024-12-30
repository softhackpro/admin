import React from 'react'
import OrderStatistics from './Chart'
import Withdraw from './Withdraw'
import RecentOrder from './RecentOrder'
import Products from './Products'

const Home = () => {
  return (
    <div className="container">
        <div className="row g-4">
          
          <OrderStatistics/>
          <Withdraw/>
          
         
        </div>

        <RecentOrder/>
  

        <Products/>

        
      </div>
  )
}

export default Home