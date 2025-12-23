import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assests'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useEffect } from 'react';


const AddRoom = () => {

    const {axios, getToken} = useAppContext()
    const [hotels, setHotels] = useState([]);

    const[images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    })

    const [inputs, setInputs] = useState({
        hotel:'',
        roomName:'',
        roomType:'',
        pricePerNight: 0,
        description: '',
        amenities: {
            'Free Wifi' : false,
            'Free Breakfast' : false,
            'Room Service' : false,
            'Mountain View' : false,
            'Pool Access' : false
        }
    })

    useEffect(() => {
        const fetchHotels = async () => {
            try {
            const token = await getToken();
            const res = await axios.get('/api/hotels/my-hotels', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                setHotels(res.data.hotels);
                if (res.data.hotels.length === 1) {
                    setInputs(prev => ({
                    ...prev,
                    hotel: res.data.hotels[0]._id
                }));
                }
            }
            } catch (error) {
            toast.error("Failed to load hotels");
            }
        };

        fetchHotels();
    }, []);

    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async(e)=>{
        e.preventDefault()

        // Check if all inputs are filled
        if(!inputs.hotel ||!inputs.roomName || !inputs.roomType || !inputs.pricePerNight || inputs.pricePerNight <= 0 || !inputs.amenities || !Object.values(images).some(image => image)){
            toast.error("Please fill in all the details")
            return;
        }
        setLoading(true);

        try {
            const formData = new FormData()

            formData.append("hotelId", inputs.hotel);
            formData.append('roomName', inputs.roomName)
            formData.append('roomType', inputs.roomType)
            formData.append('pricePerNight', inputs.pricePerNight)
            if (inputs.description) {
            formData.append('description', inputs.description)
            }


            // Coverting Amenities to Array & keeoing only enabled Amenities
            const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key])
            formData.append('amenities', JSON.stringify(amenities))

            // Adding Images to FormData
            Object.keys(images).forEach((key)=>{
                images[key] && formData.append('images', images[key])
            })

            const {data} = await axios.post('/api/rooms/', formData, {headers: {Authorization : `Bearer ${await getToken()}`}})

            if(data.success){
                toast.success(data.message)
                setInputs({
                    hotel:'',
                    roomName:'',
                    roomType:'',
                    pricePerNight: 0,
                    description: '',
                    amenities: {
                        'Free Wifi' : false,
                        'Free Breakfast' : false,
                        'Room Service' : false,
                        'Mountain View' : false,
                        'Pool Access' : false
                    }
                })
                setImages({1: null, 2: null, 3: null, 4: null})
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }

  return (
    <form onSubmit={onSubmitHandler}>
        <Title align='left' font='outfit' title='Add Room' subtitle='Fill in the details carefully, including accurate room information, pricing, and amenities, to enhance the booking experience.'/>

        {/* Upload Images */}
        <p className='text-gray-800 mt-10'>Images</p>
        <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
            {Object.keys(images).map((key)=>(
                <label htmlFor={`roomImage${key}`} key={key}>
                    <img className='max-h-13 cursor-pointer opacity-80'
                    src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
                    <input type="file" accept='image/*' id={`roomImage${key}`} hidden onChange={e=> setImages({...images, [key]:e.target.files[0]})} />
                </label>
            ))}
        </div>

        {/* Hotel */}
        <div className="w-full lg:w-1/2">
            <div className="flex max-sm:flex-col sm:gap-4 mt-4">
                <div className="flex-1">
                <p className="text-gray-800 mt-4">Hotel</p>

                <select
                    className="border border-gray-300 mt-2 rounded p-2 w-full"
                    value={inputs.hotel}
                    onChange={e => setInputs({ ...inputs, hotel: e.target.value })}
                    required
                >
                    <option value="">Select hotel</option>
                    {hotels.map(hotel => (
                    <option key={hotel._id} value={hotel._id}>
                        {hotel.name} ({hotel.city})
                    </option>
                    ))}
                </select>

                </div>
            </div>
        </div>


        {/* Room Name */}
        <div className="w-full lg:w-1/2">
            <div className="flex max-sm:flex-col sm:gap-4 mt-4">
                <div className="flex-1">
                    <p className="text-gray-800 mt-4">Room Name</p>
                    <input type="text" className="border border-gray-300 mt-1 rounded p-2 w-full" value={inputs.roomName} onChange={e => setInputs({ ...inputs, roomName: e.target.value })}
                    />
                </div>
            </div>
        </div>

        {/* Room Type and price/night */}
        <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
            <div className='flex-1 max-w-48'>
                <p className='text-gray-800 mt-4'>Room Type</p>
                <select value={inputs.roomType} onChange={e=>setInputs({...inputs, roomType: e.target.value})}
                className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                    <option value="">Select Room Type</option>
                    <option value="Single Bed">Single Bed</option>
                    <option value="Double Bed">Double Bed</option>
                    <option value="Suite">Suite</option>
                </select>
            </div>

            <div>
                <p className='mt-4 text-gray-800'>
                    Price <span className='text-xs'>/ night</span>
                </p>
                <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24' value={inputs.pricePerNight} onChange={e=>setInputs({...inputs, pricePerNight: e.target.value})}/>
            </div>

        </div>

        {/* Room Description */}
        <div className="w-full lg:w-1/2">
        <p className="text-gray-800 mt-4">Room Description</p>
        <textarea
            rows={4}
            className="border border-gray-300 mt-1 rounded p-2 w-full"
            placeholder="Describe the room, atmosphere, size, view, comfort, etc. (Optional)"
            value={inputs.description}
            onChange={e =>
            setInputs({ ...inputs, description: e.target.value })
            }
        />
        </div>

        <p className='text-gray-800 mt-4'>Amenities</p>
        <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
            {Object.keys(inputs.amenities).map((amenity, index)=>(
                <div key={index}>
                    <input type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} onChange={()=>setInputs({...inputs, amenities:{...inputs.amenities, [amenity]: !inputs.amenities[amenity]}})} />
                    <label htmlFor={`amenities${index+1}`}>  {amenity}</label>
                </div>
            ))}
        </div>
        <button className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer' disabled={loading}>
            {loading ? 'Adding...' : 'Add Room'}
        </button>
    </form>
  )
}

export default AddRoom