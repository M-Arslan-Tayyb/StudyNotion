import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/common/Header'

const AppLayout = () => {
  return (
    <div className='min-h-screen w-screen font-inter flex flex-col bg-richblack-900 overflow-x-hidden'>
      <Header className="" />
      <main className='flex justify-center overflow-x-hidden flex-col'>
        <Outlet />
      </main>
    </div>
  );
};


export default AppLayout
