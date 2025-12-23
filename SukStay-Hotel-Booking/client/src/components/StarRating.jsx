import React from 'react'
import { assets } from '../assets/assests'

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1

        if (rating >= starNumber) {
          // Full star
          return (
            <img
              key={index}
              src={assets.starIconFilled}
              alt="full-star"
              className="w-5 h-5"
            />
          )
        }

        if (rating >= starNumber - 0.5) {
          // Half star
          return (
            <img
              key={index}
              src={assets.starIconHalf}
              alt="half-star"
              className="w-5 h-5"
            />
          )
        }

        // Empty star
        return (
          <img
            key={index}
            src={assets.starIconOutlined}
            alt="empty-star"
            className="w-5 h-5"
          />
        )
      })}
    </div>
  )
}

export default StarRating
