import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Router, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer.jsx';
import Hotels from './pages/Hotels.jsx';
import RoomDetails from './pages/RoomDetails.jsx';
import MyBookings from './pages/MyBookings.jsx';
import HotelReg from './components/HotelReg.jsx';
import Layout from './pages/HotelOwner/Layout.jsx';
import Dashboard from './pages/HotelOwner/Dashboard.jsx';
import AddRoom from './pages/HotelOwner/AddRoom.jsx';
import ListRoom from './pages/HotelOwner/ListRoom.jsx';
import AddHotel from './pages/HotelOwner/AddHotel.jsx';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext.jsx';
import Loader from './components/Loader.jsx';
const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showHotelReg} = useAppContext();
  
  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}
      <div className='min-h-[7-vh]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/loader/:" element={<Loader />} />
          <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="add-room" element={<AddRoom/>}/>
            <Route path="list-room" element={<ListRoom/>}/>
            <Route path="add-hotel" element={<AddHotel />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App