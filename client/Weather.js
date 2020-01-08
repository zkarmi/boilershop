import React, { Component, useEffect, useState } from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import Axios from "axios";

const Weather = () => {

  // create state variables
  const [zip, setZip] = useState(0);
  const [coordinates, setCoords] = useState({
    latitude: 0,
    longitude: 0
  });
  const [weather, setWeather] = useState({});

  // event handler
  async function handleZipSubmit() {
    console.log('zip is: ', zip);
    console.log('coordinates is: ', coordinates);
    // await requestCoordinates();
    // await requestWeather();
  }

  // state update functions
  async function requestCoordinates() {
    const LOCATION_API_PATH = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q='
    const { data } = await Axios.get(LOCATION_API_PATH + zip);
    console.log('Location data: ', data);
    setCoords({
      latitude: data.records.fields.latitude,
      longitude: data.records.fields.longitude
    });
  }

  async function requestWeather() {
    const WEATHER_API_PATH = `https://api.darksky.net/forecast/${process.env.DARK_SKY_SECRET}/${coordinates.latitude},${coordinate.longitude}`;
    const { data } = await Axios.get(WEATHER_API_PATH);
    console.log('Weather data: ', data);
    setWeather(data);
  }

  return (
    <div className="weather-page">
      <div className="weather-head">
        <form onSubmit={e => { e.preventDefault(); handleZipSubmit(); }}>
          <input type="text" name="inputZip" onChange={e => setZip(e.target.value.trim())} />
          &nbsp;<button type="submit">Get Weather</button>
        </form>
      </div>
    </div>
  );
}

export default Weather;
