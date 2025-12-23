import React from 'react'
import HomeSearch from '../components/HomeSearch'
import CuratedDestinations from '../components/CuratedDestinations'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'


const Home = () => {
  return (
    <>
        <HomeSearch/>
        <CuratedDestinations/>
        <ExclusiveOffers/>
        <Testimonial/>
        <NewsLetter/>
    </>
  )
}

export default Home