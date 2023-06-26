import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Display = ({ countries }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState({});
  console.log("countries", countries);
  console.log("Countries", countries);
  useEffect(() => {
    console.log("use effect executed")
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital[0]}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, [countries]);
  console.log("weatheris",weather)
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          <h2>{country.name.common}</h2>
          <br />
          <br />
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags["png"]} alt="flag of country"></img>
          {Object.keys(weather).length>0 && <div>
          <h2>Weather in {country.capital[0]}</h2>
           <p>Temperature {weather.main.temp} Celcius</p> 
           <img
            alt="weather icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          />
          <p>Wind {weather.wind.speed} m/s</p>
          </div> }
        </div>
      ))}
    </div>
  );
};

function App() {
  console.log("re rendered again");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [displayView, setDisplayView] = useState("");

  console.log("input has value", country);
  const handleclick = (country) => {
    setDisplayView(
      filteredCountries.filter(
        (x) => x.name.common.toLowerCase() === country.name.common.toLowerCase()
      )
    );
  };

  let filteredCountries = countries.filter((item) =>
    item.name.common.toLowerCase().startsWith(country.toLowerCase())
  );

  const handleChange = (e) => {
    setCountry(e.target.value);
    setDisplayView("");
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <label>find countries</label>
      <input value={country} onChange={handleChange}></input>
      {filteredCountries.length > 10 && <p>Too many countries</p>}
      {filteredCountries.length > 1 &&
        filteredCountries.length < 10 &&
        filteredCountries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleclick(country)}>show</button>
          </p>
        ))}
      {displayView && <Display countries={displayView} />}
      {filteredCountries.length === 1 && (
        <Display countries={filteredCountries} />
      )}
    </div>
  );
}

export default App;
