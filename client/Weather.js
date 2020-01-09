import React, { Component, useEffect, useState } from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import Axios from "axios";
import { render } from "react-dom";

class Weather extends Component {

  // create state variables
  constructor() {
    super();
    this.state = {
      zip: 0,
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      weather: {}
    }
  }

  // const [zip, setZip] = useState(0);
  // const [coordinates, setCoords] = useState({
  //   latitude: 0,
  //   longitude: 0
  // });
  // const [weather, setWeather] = useState({});

  // event handler
  handleZipSubmit() {
    console.log('zip is: ', this.state.zip);
    this.requestCoordinates();
    console.log('coordinates is: ', this.state.coordinates);
    this.requestWeather();
  }

  // state update functions
  requestCoordinates() {
    const LOCATION_API_PATH = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q='
    const { data } = Axios.get(LOCATION_API_PATH + this.state.zip);
    console.log('Location data: ', data);
    this.setState( (prevState) => {
      return {
        ...prevState,
        coordinates: {
          latitude: data.records.fields.latitude,
          longitude: data.records.fields.longitude
        }
      }
    });
    // setCoords({
    //   latitude: data.records.fields.latitude,
    //   longitude: data.records.fields.longitude
    // });
  }

  requestWeather() {
    const WEATHER_API_PATH = `https://api.darksky.net/forecast/${process.env.DARK_SKY_SECRET}/${this.state.coordinates.latitude},${this.state.coordinates.longitude}`;
    const { data } = Axios.get(WEATHER_API_PATH);
    console.log('Weather data: ', data);
    this.setState( (prevState) => {
      return {
        ...prevState,
        weather: data
      }
    });
    // setWeather(data);
  }

  render() {
    return (
      <div className="weather-page">
        <div className="weather-head">
          <form onSubmit={e => { e.preventDefault(); this.handleZipSubmit(); }}>
            <input type="text" name="inputZip" onChange={e => this.setState({ zip: e.target.value.trim() }) } />
            &nbsp;<button type="submit">Get Weather</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Weather;
