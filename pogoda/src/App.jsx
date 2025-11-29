import React from 'react'
import SearchSection from './components/SearchSection'
import CurrentWeather from './components/CurrentWeather'
import HourlyWeatherItem from './components/HourlyWeatherItem'

const App = () => {
  const getWeatherDetails = async (API_URL) => {
    try{
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
    return (
    <div className="container">
      <SearchSection getWeatherDetails={getWeatherDetails} />
      <div className="weather-section">
        <CurrentWeather />
        <div className="hourly-forecast">
          <ul className="weather-list">
            <HourlyWeatherItem />
            <HourlyWeatherItem />
            <HourlyWeatherItem />
            <HourlyWeatherItem />
            <HourlyWeatherItem />
            <HourlyWeatherItem />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
