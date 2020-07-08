import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
// import './App.css';
import axios from "axios";

const CountrySearch = ({ searchText, setSearchText }) => {
  return (
    <>
      <p>
        find countries{" "}
        <input
          type="text"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        ></input>
      </p>
    </>
  );
};

const CountryView = ({ countries }) => {
  let [countryDetails, setCountryDetails] = useState([]);
  useEffect(() => {
    setCountryDetails(
      countries.map((x) => ({ country: x, isDetailsVisible: false }))
    );
  }, [countries]);

  if (countries.length > 10) return <p>Too many countries, cannot render.</p>;

  if (countries.length === 0) return <p>No countries found.</p>;

  if (countries.length === 1) return <CountryDetails country={countries[0]} />;

  const triggerShowCountryDetails = (countryIndex) => (event) => {
    const countryDetailsCopy = [...countryDetails];
    countryDetailsCopy[countryIndex].isDetailsVisible = !countryDetailsCopy[
      countryIndex
    ].isDetailsVisible;
    setCountryDetails(countryDetailsCopy);
  };

  return (
    <div className="countries">
      {countryDetails.map((x, ind) => (
        <div key={x.country.name}>
          <p>
            {x.country.name}{" "}
            <button onClick={triggerShowCountryDetails(ind)}>
              {x.isDetailsVisible ? "hide" : "show"}
            </button>
          </p>
          {x.isDetailsVisible ? <CountryDetails country={x.country} /> : <></>}
        </div>
      ))}
    </div>
  );
};

const CountryDetails = ({ country }) => (
  <div className="countryDetails">
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h3>Languages</h3>
    <ul>
      {country.languages.map((language) => (
        <li>{language.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt={country.name} width="150" />
    <h3>Weather in {country.capital}</h3>
    <WeatherInfo country={country} />
  </div>
);

const WeatherInfo = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    axios
      .get("http://api.weatherstack.com/current?access_key=" + apiKey + "&query=" + country.name)
      .then((resp) => {
        if(resp.data.current !== undefined) 
          setWeatherInfo(resp.data.current)
        else
          setWeatherInfo(undefined)});
      
  }, [country]);

  if (weatherInfo === null) return <p>Loading weather info...</p>;

  if (weatherInfo === undefined) return <p>Weather service unavailable</p>;

  return (
    <div className="weatherInfo">
      <p>
        <b>temperature:</b> {weatherInfo.temperature} Celsius.
      </p>
      {weatherInfo.weather_icons.map((weatherIcon) => (
        <img src={weatherIcon} alt="weatherIcon" />
      ))}

      <p>
        <b>Wind:</b> {weatherInfo.wind_speed} mph direction{" "}
        {weatherInfo.wind_dir}
      </p>
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filteredCountries = countries.filter((x) =>
    x.name.toLowerCase().includes(searchText)
  );

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((resp) => {
      console.log("fetched " + resp.data.length + " countries");
      setCountries(resp.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <CountrySearch searchText={searchText} setSearchText={setSearchText} />
      <CountryView countries={filteredCountries} />
    </div>
  );
}

export default App;
