import React, { useState } from "react";
import axios from "axios";




function App() {

  const [data  , setData] = useState({})
  const [location , setLocation] = useState("")
  const APIKEY = process.env.REACT_APP_API_KEY
  console.log(APIKEY,"ppppppp");
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${APIKEY}`;


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(geoUrl).then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          getWeather(lat, lon);
        } else {
          console.log("Location not found");
        }
      });
      setLocation("");
    }
  };


  const getWeather = (lat, lon) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    axios.get(weatherUrl).then((response) => {
      setData(response.data);
    });
  };

  return (
    <div className="app">
      <div className="search">
        <input
        type="text"
        onChange={event=>setLocation(event.target.value)}
        value={location}
        placeholder="Enter Location"
        onKeyDown={searchLocation}
        />
      </div>
     <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
               {data.main?  <h1>{data.main.temp.toFixed()} °F</h1> : null }
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.name !==undefined &&
           <div className="bottom">
           <div className="feels">
             {data.main ? <p className="bold">{data.main.feels_like.toFixed()} °F</p> : null }
             <p>Feels Like</p>
           </div>
           <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity} %</p> : null }
           <p>Humidity</p>
           </div>
           <div className="wind">
             {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
               <p>Wind speed</p>
           </div>
         </div>
          }
       
     </div>
    </div>
  );
}

export default App;
