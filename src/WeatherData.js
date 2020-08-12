import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherData() {
  const [weather, updateWeather] = useState([]);
  const [feelsLike, currentFeels] = useState("");
  const [maxTemp, currentMaxTemp] = useState("");
  const [minTemp, currentMinTemp] = useState("");
  const [searchCity, updatesearchCity] = useState("");
  const [description, currentDescription] = useState("");
  const [temperature, currentTemp] = useState("");
  const [humidity, currentHumidity] = useState("");
  const [userInput, updateUserInput] = useState("");


  useEffect(() => {
    const checkWeather = async () => {
      const response = await axios(
        `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=Imperial&appid=${process.env.REACT_APP_API_KEY}`
      );
      updateWeather(response.data);
      currentFeels(response.data.main.feels_like);
      currentMaxTemp(response.data.main.temp_max);
      currentMinTemp(response.data.main.temp_min);
      currentDescription(response.data.weather[0].description);
      currentTemp(response.data.main.temp);
      currentHumidity(response.data.main.humidity);
    };
    checkWeather();
  }, [searchCity]);

  if (weather !== {}) {
    return (
      <>
        <header><h1>Weather Shenanigans</h1></header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatesearchCity(userInput);
          }}
        >
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            onChange={(e) => updateUserInput(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
        <p>Find out the current weather of where you're at!</p>

        <h3>City: {searchCity}</h3>
        <p>
          The current temperature in {searchCity} is {temperature}F with{" "}
          {description}.
        </p>
        <p>
          The high for today is {maxTemp}F with a low of {minTemp}F, and it
          feels like {feelsLike}F.
        </p>
        <p>The humidity is at {humidity}% </p>
      </>
    );
  }
}

export default WeatherData;
