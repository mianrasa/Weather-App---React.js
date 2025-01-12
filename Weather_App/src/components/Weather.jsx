import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import clear_icon from '../assets/images/clear.png'
import cloud_icon from '../assets/images/cloud.png'
import drizzle_icon from '../assets/images/drizzle.png'
import humidity_icon from '../assets/images/humidity.png'
import mist_icon from '../assets/images/mist.png'
import rain_icon from '../assets/images/rain.png'
import search_icon from '../assets/images/search.png'
import snow_icon from '../assets/images/snow.png'
import thunderstorm_icon from '../assets/images/thunderstorm.png'
import wind_icon from '../assets/images/wind.png'


const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false)

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunderstorm_icon,
    "11n": thunderstorm_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,    
  }

  const search = async(city)=>{
    if(city === ''){
      alert('Enter City Name!')
      return;
    }
    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      console.log(data)
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      })
    } 
    catch (error) {
      setWeatherData(false);
      console.error("Error in fetching the weather data");
    }
  }

  useEffect(()=>{
    search("Chennai");
  },[])


  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Enter city Name'/> 
        <img src={search_icon} alt="Search" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {
        weatherData?
        <>
          <img className='weather-icon' src={weatherData.icon} alt=""/>
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity"/>
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind"/>
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
        :
        <></>
      }
      
    </div>
  )
}

export default Weather