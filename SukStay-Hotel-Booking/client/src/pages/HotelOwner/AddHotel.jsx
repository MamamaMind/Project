import React, { useState } from 'react'
import Title from '../../components/Title'
import { cities } from '../../assets/assests'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddHotel = () => {

  const { axios, getToken, setIsOwner } = useAppContext()

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

    const { name, address, contact, city, highlightTitle, highlightSubtitle, rating, } = inputs

    if (!name || !address || !contact || !city || !rating) {
      toast.error('Please fill in all details')
      return
    }

    try {
      setLoading(true)

      const token = await getToken()

      const { data } = await axios.post(
        '/api/hotels',
        { name, address, contact, city, ...(highlightTitle && { highlightTitle }), ...(highlightSubtitle && { highlightSubtitle }), rating, },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (data.success) {
        toast.success(data.message)
        setIsOwner(true)

        // Optional: clear form
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
    <form onSubmit={onSubmitHandler} className="py-28 px-4 md:px-16 lg:px-24 xl:px-32">

      <Title
        align="left"
        font="outfit"
        title="Add Hotel"
        subtitle="Register your hotel details to start listing rooms and accepting bookings."
      />

      {/* Hotel Name */}
      <div className="w-full lg:w-1/2 mt-6">
        <p className="text-gray-800 mt-4">Hotel Name</p>
        <input
          type="text"
          className="border border-gray-300 mt-1 rounded p-2 w-full"
          value={inputs.name}
          onChange={e => setInputs({ ...inputs, name: e.target.value })}
          placeholder="Enter hotel name"
        />
      </div>

      {/* Hotel Highlight Title */}
      <div className="w-full lg:w-1/2 mt-4">
        <p className="text-gray-800 mt-4">Hotel Highlight Title</p>
        <input
          type="text"
          className="border border-gray-300 mt-1 rounded p-2 w-full"
          placeholder="Discover calm. Enjoy luxury. Experience wellness (Optional)"
          value={inputs.highlightTitle}
          onChange={e =>
            setInputs({ ...inputs, highlightTitle: e.target.value })
          }
        />
      </div>

      {/* Hotel Highlight Subtitle */}
      <div className="w-full lg:w-1/2 mt-4">
        <p className="text-gray-800 mt-4">Hotel Highlight Subtitle</p>
        <textarea
          rows={3}
          className="border border-gray-300 mt-1 rounded p-2 w-full"
          placeholder="Describe the hotel atmosphere and experience (Optional)"
          value={inputs.highlightSubtitle}
          onChange={e =>
            setInputs({ ...inputs, highlightSubtitle: e.target.value })
          }
        />
      </div>


      {/* Contact */}
      <div className="w-full lg:w-1/2 mt-4">
        <p className="text-gray-800 mt-4">Contact Number</p>
        <input
          type="text"
          className="border border-gray-300 mt-1 rounded p-2 w-full"
          value={inputs.contact}
          onChange={e => setInputs({ ...inputs, contact: e.target.value })}
          placeholder="Enter contact number"
        />
      </div>

      {/* Address */}
      <div className="w-full lg:w-1/2 mt-4">
        <p className="text-gray-800 mt-4">Address</p>
        <input
          type="text"
          className="border border-gray-300 mt-1 rounded p-2 w-full"
          value={inputs.address}
          onChange={e => setInputs({ ...inputs, address: e.target.value })}
          placeholder="Enter hotel address"
        />
      </div>

      {/* City */}
      <div className="w-full lg:w-1/2 mt-4">
        <p className="text-gray-800 mt-4">City</p>
        <select
          className="border border-gray-300 mt-1 rounded p-2 w-full"
          value={inputs.city}
          onChange={e => setInputs({ ...inputs, city: e.target.value })}
        >
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Hotel Rating */}
      <div className="w-full lg:w-1/2 mt-4">
        <p className="text-gray-800 mt-4">Hotel Rating (1 – 5)</p>

        <select
          className="border border-gray-300 mt-1 rounded p-2 w-full"
          value={inputs.rating}
          onChange={(e) =>
            setInputs({ ...inputs, rating: Number(e.target.value) })
          }
        >
          {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>




      {/* Submit */}
      <button
        disabled={loading}
        className={`bg-primary text-white px-8 py-2 rounded mt-8 ${
          loading ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Registering...' : 'Register Hotel'}
      </button>

    </form>
  )
}

export default AddHotel
