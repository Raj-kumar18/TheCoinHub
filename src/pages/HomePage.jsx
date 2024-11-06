import Banner from '@/components/Banner'
import CoinsTable from '@/components/CoinsTable'
import React from 'react'

const HomePage = () => {
  return (
    <div className="homePage w-full h-[100vh]">

      <Banner/>
      <CoinsTable/>
    </div>

  )
}

export default HomePage
