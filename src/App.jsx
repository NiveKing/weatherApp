import axios from 'axios'
import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [data, setData] = useState({});
  const [coordinates, setCoordinates] = useState([{}]);
  const [location, setLocation] = useState('')

  const url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=e090b7e6785b84eaabc86d57b4c14ce2`
  const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&units=imperial&appid=e090b7e6785b84eaabc86d57b4c14ce2`

  const searchLocation = async () => {
      // getting the coordinates
      await axios.get(url1).then((response) => {
        setCoordinates(response.data);
      })
  }

  useEffect(() => {
    // using the coordinates into the 2nd url
    if (coordinates) {
      axios.get(url2).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  },[coordinates])

  return (
    <div className="app">
      <div className="search">
        <input
        value={location} 
        onChange={(event => setLocation(event.target.value))} 
        placeholder='Enter Location'
        type='text' />
      </div>
      <div className="submit">
        <button onClick={searchLocation}>Submit</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p>: null}
          </div>
        </div>
        { data.name != undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Windspeed</p>
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default App
