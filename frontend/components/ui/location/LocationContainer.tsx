'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import LocationCard from './LocationCard'
import locations from '@/mockdata/locations'

export default function LocationContainer() {
  return (
    <Swiper
      modules={[Autoplay]}
      freeMode={true}
      spaceBetween={20}
      slidesPerView={'auto'}
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={8000}
    >
      {locations.map((loc) => (
        <SwiperSlide key={loc.name} style={{ width: '172px' }}>
          <LocationCard location={loc} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
