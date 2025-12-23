import React, { useState } from 'react'
import { assets, cities } from '../assets/assests'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import Title from '../components/Title'

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext()

  const [inputs, setInputs] = useState({
    name: '',
    address: '',
    contact: '',
    city: '',
    highlightTitle: '',
    highlightSubtitle: '',
    rating: 5,
  })

  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const { name, address, contact, city, highlightTitle, highlightSubtitle, rating } = inputs

    if (!name || !address || !contact || !city || !rating) {
      toast.error('Please fill in all required details')
      return
    }

    try {
      setLoading(true)
      const token = await getToken()

      const { data } = await axios.post(
        '/api/hotels',
        { name, address, contact, city, ...(highlightTitle && { highlightTitle }), ...(highlightSubtitle && { highlightSubtitle }), rating },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsOwner(true)
        setShowHotelReg(false)
        setInputs({
          name: '',
          address: '',
          contact: '',
          city: '',
          highlightTitle: '',
          highlightSubtitle: '',
          rating: 5,
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col md:flex-row bg-white rounded-xl max-w-4xl w-full md:w-3/4 overflow-hidden"
      >

        <div className="hidden md:block w-1/2 relative">
          <img
            src={assets.regImage}
            alt="reg-image"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="relative flex flex-col md:w-1/2 p-6 md:p-8">
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-3 right-3 h-4 w-4 cursor-pointer z-10" 
            onClick={() => setShowHotelReg(false)}
          />
          <Title
            align="left"
            font="outfit"
            title="Register Your Hotel"
            subtitle="Provide your hotel details to start listing rooms and accepting bookings."
            titleClass="text-lg"
            subtitleClass="text-sm"
          />

          {/* Hotel Name */}
          <div className="mt-3">
            <p className="text-gray-700 text-sm">Hotel Name</p>
            <input
              type="text"
              placeholder="Enter hotel name"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full mt-1 text-sm"
              required
            />
          </div>

          {/* Highlight Title */}
          <div className="mt-3">
            <p className="text-gray-700 text-sm">Highlight Title (Optional)</p>
            <input
              type="text"
              placeholder="Discover calm. Enjoy luxury. Experience wellness."
              value={inputs.highlightTitle}
              onChange={(e) => setInputs({ ...inputs, highlightTitle: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full mt-1 text-sm"
            />
          </div>

          {/* Highlight Subtitle */}
          <div className="mt-3">
            <p className="text-gray-700 text-sm">Highlight Subtitle (Optional)</p>
            <textarea
              rows={3}
              placeholder="Describe the hotel atmosphere and experience"
              value={inputs.highlightSubtitle}
              onChange={(e) => setInputs({ ...inputs, highlightSubtitle: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full mt-1 text-sm"
            />
          </div>

          {/* Contact */}
          <div className="mt-3">
            <p className="text-gray-700 text-sm">Contact Number</p>
            <input
              type="text"
              placeholder="Enter contact number"
              value={inputs.contact}
              onChange={(e) => setInputs({ ...inputs, contact: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full mt-1 text-sm"
              required
            />
          </div>

          {/* Address */}
          <div className="mt-3">
            <p className="text-gray-700 text-sm">Address</p>
            <input
              type="text"
              placeholder="Enter hotel address"
              value={inputs.address}
              onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full mt-1 text-sm"
              required
            />
          </div>

          {/* City */}
          <div className="mt-3">
            <p className="text-gray-700 text-sm">City</p>
            <select
              value={inputs.city}
              onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full mt-1 text-sm"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="mt-3">
            <p className="text-gray-700 text-sm">Hotel Rating (1 – 5)</p>
            <select
              value={inputs.rating}
              onChange={(e) => setInputs({ ...inputs, rating: Number(e.target.value) })}
              className="border border-gray-300 rounded p-2 w-full mt-1 text-sm"
            >
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-500 text-white px-6 py-2 rounded mt-5 hover:bg-indigo-600 transition-all ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            } text-sm`}
          >
            {loading ? 'Registering...' : 'Register Hotel'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default HotelReg