import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assests'
import { useAppContext } from '../../context/AppContext'

const Dashboard = () => {
    const{user, getToken, toast, axios} = useAppContext();

    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,

    })

    const fetchDashboardData = async()=>{
        try {
           const {data} = await axios.get('/api/bookings/hotel', {headers: {Authorization : `Bearer ${await getToken()}`}})
           if(data.success){
            setDashboardData(data.dashboardData)
           } else{
            toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user){
            fetchDashboardData();
        }
    }, [user])

  return (
    <div>
        <Title align='left' font='outfit' title='Dashboard' subtitle='Manage your rooms, bookings, and revenue effortlessly with real-time insights—powered by SukStay.' />
        <div className='flex gap-4 my-8'>
            {/* Total Bookings */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                <img src={assets.totalBookingIcon} alt="" className='max-sx:hidden h-10' />
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-lg'>Total Bookings</p>
                    <p className='text-neutral-400 text-base'>{dashboardData.totalBookings}</p>
                </div>
            </div>

            {/* Total Reveune */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                <img src={assets.totalRevenueIcon} alt="" className='max-sx:hidden h-10' />
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-lg'>Total Revenue</p>
                    <p className='text-neutral-400 text-base'>{dashboardData.totalRevenue.toLocaleString()} ฿</p>
                </div>
            </div>
        </div>
        {/* Recent Bookings */}
        <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
        <div className='w-full max-w-5xl justtext-left border border-gray-300 rounded-lg max-h-150 overflow-y-scroll'>
            <table className='w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='py-3 px-4 text-gray-800 font-medium'>Username</th>
                        <th className='py-3 px-4 text-gray-800 font-medium'>Hotel Name</th>
                        <th className='py-3 px-4 text-gray-800 font-medium'>Room Name</th>
                        <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Type</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {dashboardData.bookings.map((item, index)=>(
                        <tr key={index}>
                            <td className='py-4 px-4 text-gray-700 border-t border-gray-300'>
                                {item.user.username}
                            </td>
                            <td className='py-4 px-4 text-gray-700 border-t border-gray-300'>
                                {item.hotel.name}
                            </td>
                            <td className='py-4 px-4 text-gray-700 border-t border-gray-300'>
                                {item.room.roomName}
                            </td>
                            <td className='py-4 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                {item.room.roomType}
                            </td>
                            <td className='py-4 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                {item.totalPrice.toLocaleString()} ฿
                            </td>
                            <td className='py-4 px-4 text-gray-700 border-t border-gray-300 items-center'>
                                <div className='flex justify-center'>
                                    <button className={`inline-flex items-center justify-center py-1 px-3 text-xs rounded-full ${item.isPaid ? 'bg-green-200 text-green-600' : 'bg-amber-200 text-yellow-600'}`}>
                                        {item.isPaid ? 'Completed' : 'Pending'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default Dashboard