import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

const Display = ({ countries,handleclick,displayView }) => {
  console.log("countries",countries)
  console.log("displayView",displayView)
  console.log("keys",displayView)
   if(Object.keys(displayView).length>0)
   countries=[displayView.country]
   else
   {
    console.log("No time for display view")
    console.log("Countries",countries);
   }
  if (countries.length === 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <br/>
            <br/>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.values(country.languages).map(language => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={country.flags['png']} alt="flag of country"></img>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {/* Rendering country names */}
        {countries.map(country => (
          <p key={country.name.common}>{country.name.common} <button onClick={()=>handleclick(country)}>show</button></p>
        ))}
      </div>
    );
  }
};

function App() {
  console.log("re rendered again")
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [displayView, setDisplayView] = useState({});

  console.log("input has value", country);
  const handleclick = (country)=>{
    setDisplayView({country})
  }
  let filteredCountries = countries.filter(item =>
    item.name.common.toLowerCase().startsWith(country.toLowerCase())
  );

  const handleChange = (e) => {
    setCountry(e.target.value);
    console.log("before filter", countries);
    console.log("these are the filtered countries", filteredCountries);
    setDisplayView({});
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <label>find countries</label>
      <input
        value={country}
        onChange={handleChange}
      ></input>
      <Display countries={filteredCountries} handleclick={handleclick} displayView={displayView}/>
    </div>
  );
}

export default App;
