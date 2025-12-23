import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData } from '../assets/assests';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const RoomDetails = () => {
    const{id} = useParams();
    const {rooms, getToken, axios, navigate} = useAppContext()
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(1);

    const [isAvailable, setIsAvailable] = useState(false);

    // Check if the Room is Available
    const checkAvailability = async()=>{
        try {
            // Check is Check-In Date is grater than Check-Out Date
            if(checkInDate>=checkOutDate){
                toast.error('Check-In Date should be less than Check-out Date')
                return;
            }
            const{data} = await axios.post('/api/bookings/check-availability', {room:id, checkInDate, checkOutDate})
            if(data.success){
                if(data.isAvailable){
                    setIsAvailable(true)
                    toast.success('Room is available.')
                }else{
                    setIsAvailable(false)
                    toast.error('Room is not available.')
                }
            }else{
                toast.error(data.message)
            }
        } catch (error) {
           toast.error(error.message) 
        }
    }

    // onSubmitHandler function to check availability & book the room
    const onSubmitHandler = async(e)=>{
        try {
            e.preventDefault();
            if(!isAvailable){
                return checkAvailability();
            }else{
                const {data} = await axios.post('/api/bookings/book', {room: id, checkInDate, checkOutDate, guests, paymentMethod: "Pay At the Hotel"}, {headers: {Authorization: `Bearer ${await getToken()}`}})
                if(data.success){
                    toast.success(data.message)
                    navigate('/my-bookings')
                    scrollTo(0,0)
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {        
        const room = rooms.find(room=> room._id === id);
        room && setRoom(room)
        room && setMainImage(room.images[0]);
    }, [rooms]);

    const fetchRoom = async () => {
        const { data } = await axios.get(`/api/rooms/${id}`);
        if (data.success) setRoom(data.room);
    };
    useEffect(() => {
        fetchRoom();
    }, [id]);


  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/* Room details content */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name}</h1>
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>

        {/* Room Rating */}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating rating={room.hotel.rating} />
            <span className='ml-2'> {room.hotel.rating}</span>
        </div>

        {/* Room Address */}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <img src={assets.locationIcon} alt="location-icon" />
            <span>{room.hotel.address}</span>
        </div>

       {/* Room Images */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
            <div className='lg:w-1/2 w-full'>
                
                <img src={mainImage} alt="Room Image" className='w-full h-full rounded-xl shadow-lg object-cover' />
            </div>

            <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                {room?.images.length > 1 && room.images.map((image, index)=>(
                    <img 
                        onClick={()=>setMainImage(image)}
                        key={index} 
                        src={image} 
                        alt="Room Image" 
                        className={`w-full h-40 lg:h-64 rounded-xl shadow-lg object-cover cursor-pointer ${mainImage === image ? 'outline-3 outline-orange-500' : ''}`}
                    />
                ))}
            </div>
        </div>

        {/* RoomName, RoomType and Price */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-playfair'>
                    {room.roomName}
                    <span className='text-xl mt-4 text-gray-600 max-w-3xl'>  ({room.roomType})</span>
                </h1>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4 '>
                    {room.amenities.map((item, index)=>(
                       <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                            <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />    
                            <p className='text-xs'>{item}</p>
                       </div>
                    ))}
                </div>
            </div>
                    
            {/* Room Price */}
            <p className='text-2xl font-medium'>{room.pricePerNight.toLocaleString()} ฿/night</p>
        </div>

        {/* CheckIn Check out form */}
        <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
            <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500 '>
                <div className='flex flex-col'>
                    <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                    <input onChange={(e)=>setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]} type="date" id='checkInDate' placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                </div>    
            </div>
            <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
            <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-6 text-gray-500 '>
                <div className='flex flex-col'>
                    <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                    <input onChange={(e)=>setCheckOutDate(e.target.value)} min={checkInDate} disabled={!checkInDate} type="date" id='checkOutDate' placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                </div>    
            </div>
            <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
            <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-6 text-gray-500 '>
                <div className='flex flex-col'>
                    <label htmlFor="guests" className='font-medium'>Guests</label>
                    <input onChange={(e)=>setGuests(e.target.value)} value={guests} type="number" id='guests' placeholder='1' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                </div>    
            </div>

            <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
                {isAvailable ? "Book Now" : "Check Availability"}
            </button>
        </form>

        {/* Common Specifications */}
        <div className='mt-25 space-y-4'>
            {roomCommonData.map((spec, index)=>(
                <div key={index} className='flex items-start gap-2'>
                    <img src={spec.icon} alt={`${spec.title}-icon`}  className='w-6.5'/>
                    <div>
                        <p className='text-base'>{spec.title}</p>
                        <p className='text-gray-500'>{spec.description}</p>
                    </div>
                </div>
            ))}
        </div>

        {room.description && (
            <div className='max-w-3xl border-y border-gray-300 my-10 py-10'>
                <p className='text-xl'> {room.roomName}</p> <br></br>
                <span className='max-w-3xl my-10 py-10 text-gray-500'>{room.description}</span>
            </div>
        )}

        {room.hotel.highlightTitle && 
            <div className='mt-5 pt-5 inline-block'>
                <h1 className='text-3xl md:text-4xl font-playfair'>
                    {room.hotel.highlightTitle}
                </h1>
                <p className='text-xl mt-2 text-gray-500 text-right font-playfair'>
                    at <span className='text-2xl text-gray-900 font-playfair'>{room.hotel.name}</span>
                </p>
            </div>
        }


        {room.hotel.highlightSubtitle && 
        <h2 className=' text-gray-600 max-w-3xl mt-5 pt-5'>
            {room.hotel.highlightSubtitle}
        </h2>
        }


        {/* Hosted by */}
        <div className=' mt-20 flex flex-col items-start gap-4'>
            <div className='flex items-center gap-4'>
                <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
                <div>
                    <p className='text-lg md:text-xl'>Hosted by {room.hotel.owner?.username}</p>
                </div>
            </div>
        </div>
        <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>Contact Now</button>
    </div>
  )
}

export default RoomDetails