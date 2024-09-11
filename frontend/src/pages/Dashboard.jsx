// eslint-disable-next-line no-unused-vars
import React from 'react'

import Sidebar  from '../components/common/sidebar'
import MyProfile from '@/components/core/dashboard/MyProfile'

const Dashboard = () => {
    return (
        <div className='flex'>
        
            <Sidebar></Sidebar>
            <MyProfile></MyProfile>
        </div>

    )
}

export default Dashboard