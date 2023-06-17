'use client'
import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function Home() {
  const [city,setCity] = useState('')
  const [weather,setWeather] = useState('')
  const [err,setErr] = useState('')
  const findWeather = async (e) => {
    e.preventDefault()
      try{
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`);
        setWeather(res.data)
        setErr('')
      }catch(err){
        setErr(err)
      }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-weather-bg">
      <div className='w-full h-full flex flex-col place-content-center place-items-center'>
          <div className='w-full lg:w-3/5 rounded-xl border-2 p-3 lg:px-5 lg:py-28 border-gray-300 gap-4 bg-gray-300 bg-opacity-30 backdrop-blur flex flex-col place-content-center place-items-center'>
              <h1 className='font-semibold text-white text-xl'>Get weather by city name</h1>
              {
                !weather ? 
                  <form onSubmit={findWeather} className='w-full flex flex-col gap-3 lg:gap-8 place-items-center'>
                    <input value={city} onChange={(e)=>setCity(e.target.value)} className=' w-5/6 xl:w-4/6 px-5 py-2 rounded-2xl outline-none text-black placeholder:text-black' placeholder='Enter the city name'/>
                    <button className='w-3/4 xl:w-1/4 bg-black rounded-3xl text-center px-5 py-3 text-white'>Get Weather</button>
                  </form>
                :
                <div className='w-full flex flex-col place-content-center place-items-center gap-5'>
                  <Image src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt={'weather-icon'} width={100} height={70}/>
                  <div className='flex flex-col gap-3 text-center'>
                    <h1 className='font-semibold text-xl text-center'>{weather.name}</h1>
                    <p className='text-white text-lg'>temp : {weather?.main.temp}&deg;c</p>
                    <p className='text-white text-lg'>humidity : {weather?.main.humidity}</p>
                    <p className='text-white text-lg'>desc : {weather?.weather[0].description}</p>
                  </div>
                  <button className='w-1/4 bg-black text-white font-semibold px-5 py-3 rounded-2xl' onClick={()=>setWeather('')}>Check another</button>
                </div>
              }

              {
                err && 
                <p>{err?.response?.data?.message}</p>
              }
              
          </div>
      </div>
    </main>
  )
}
