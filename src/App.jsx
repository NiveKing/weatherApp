import axios from 'axios'
import { useState } from 'react'

import './App.css'

function App() {
  const [data, setData] = useState({});
  const [coordinates, setCoordinates] = useState([{}]);
  const [location, setLocation] = useState('')

  const url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=e090b7e6785b84eaabc86d57b4c14ce2`
  const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&appid=e090b7e6785b84eaabc86d57b4c14ce2`

  const searchLocation = () => {
      // getting the coordinates
      axios.get(url1).then((response) => {
        setCoordinates(response.data);
        // using the coordinates into the 2nd url
        
      })
      axios.get(url2).then((response) => {
        setData(response.data)
      })

      setLocation('')
  }

  return (
    <div className="app">
      <div className="search">
        <input
        value={location} 
        onChange={(event => setLocation(event.target.value))} 
        type='text' />
        <button onClick={searchLocation}>Submit</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}</h1> : null}
          </div>
          <div className="description">
            <p>clouds</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className='bold'>65</p>
          </div>
          <div className="humidity">
            <p className='bold'>20%</p>
          </div>
          <div className="wind">
            <p className='bold'>12 MPH</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
