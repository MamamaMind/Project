import React, { useState, useMemo } from 'react';
import { assets, facilityIcons } from '../assets/assests';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mb-2 text-sm'>
      <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
      <span className='font-light select-none'>{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mb-2 text-sm'>
      <input type="radio" name="sortOption" checked={selected} onChange={() => onChange(label)} />
      <span className='font-light select-none'>{label}</span>
    </label>
  );
};

const Hotels = () => {
  const { rooms } = useAppContext(); // dynamic rooms from context
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [openFilters, setOpenFilters] = useState(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const roomTypes = ["Single Bed", "Double Bed", "Suite"];
  const priceRanges = ["Under 5,000 ฿", "5,000 - 10,000 ฿", "10,000 - 20,000 ฿", "Over 20,000 ฿"];
  const sortOptions = ["Price: Low to High", "Price: High to Low", "Newest First"];

  const toggleRoomType = (checked, label) => {
    setSelectedRoomTypes(prev => checked ? [...prev, label] : prev.filter(item => item !== label));
  };

  const togglePriceRange = (checked, label) => {
    setSelectedPriceRanges(prev => checked ? [...prev, label] : prev.filter(item => item !== label));
  };

  // Filter & sort rooms
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(room => selectedRoomTypes.length === 0 || selectedRoomTypes.includes(room.roomType))
      .filter(room => {
        if (selectedPriceRanges.length === 0) return true;
        return selectedPriceRanges.some(range => {
          const price = room.pricePerNight;
          if (range === 'Under 5,000 ฿') return price < 5000;
          if (range === '5,000 - 10,000 ฿') return price >= 5000 && price <= 10000;
          if (range === '10,000 - 20,000 ฿') return price > 10000 && price <= 20000;
          if (range === 'Over 20,000 ฿') return price > 20000;
          return true;
        });
      })
      .filter(room => {
        const destination = searchParams.get('destination');
        if (!destination) return true;
        return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'Price: High to Low') return b.pricePerNight - a.pricePerNight;
        if (sortBy === 'Newest First') return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
  }, [rooms, selectedRoomTypes, selectedPriceRanges, sortBy, searchParams]);

  const clearFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSortBy(null);
    setSearchParams({});
  };

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Left Side */}
      <div className='w-full lg:w-auto lg:flex-1 lg:mr-8'> 
        <div className='flex flex-col items-start text-left'>
          <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Unlock limited-time offers and exclusive packages crafted to elevate your stay and transform every visit into an unforgettable experience.</p>
        </div>

        {filteredRooms.map(room => (
          <div key={room._id} className='flex flex-col md:flex-row items-start md:items-center py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
            <img
              onClick={() => { navigate(`/hotels/rooms/${room._id}`); scrollTo(0, 0); }}
              src={room.images[0]} alt="hotel-img" title='View Room Details'

              className='w-full md:w-96 md:shrink-0 h-64 object-cover rounded-xl shadow-lg cursor-pointer'
            />

            <div className='flex flex-col gap-2'>
              <p className='text-gray-500'>{room.hotel.city}</p>
              <p
                onClick={() => { navigate(`/hotels/rooms/${room._id}`); scrollTo(0, 0); }}
                className='text-gray-800 text-3xl font-playfair cursor-pointer'>{room.hotel.name}</p>
              <p className='text-lg text-gray-600'>{room.roomName} ({room.roomType})</p>

              <div className='flex items-center'>
                <StarRating rating={room.hotel.rating} />
                <span className='ml-2'> {room.hotel.rating}</span>
              </div>
              <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span className='block truncate'>{room.hotel.address}</span> 
              </div>

              <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                {room.amenities.map((item, index) => (
                  <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                    <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                    <p className='text-xs'>{item}</p>
                  </div>
                ))}
              </div>

              <p className='text-xl font-medium text-gray-700'>{room.pricePerNight.toLocaleString()} ฿/night</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side --> Filter*/}
      <div className='bg-white w-80 min-w-[320px] shrink-0 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16 mb-20'>
        <div className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <div className='text-xs cursor-pointer'>
            <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>{openFilters ? 'HIDE' : 'SHOW'}</span>
            <span className='hidden lg:block' onClick={clearFilters}>CLEAR</span>
          </div>
        </div>

        <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox key={index} label={room} selected={selectedRoomTypes.includes(room)} onChange={toggleRoomType}/>
            ))}
          </div>

          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Price Ranges</p>
            {priceRanges.map((range, index) => (
              <CheckBox key={index} label={range} selected={selectedPriceRanges.includes(range)} onChange={togglePriceRange}/>
            ))}
          </div>

          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} selected={sortBy === option} onChange={setSortBy}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;