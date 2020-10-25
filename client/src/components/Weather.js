import React from 'react';
import CurrentWeather from './CurrentWeather';

class Weather extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            error: null,
            isLocated: false,
			isLoaded: false,
            weatherData: [],
            lat: null,
            lon: null,
            units: "imperial",
            units_set: ["F", "mph"]
		};
    }

    // promise wrapper for geolocation
    getCurrentPosition() {
        if (navigator.geolocation) {
            return new Promise(
                (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
            )
        } else {
            return new Promise(
                resolve => resolve({})
            )
        }
    }

    getWeatherData() {
        var postData = {
            lat: this.state.lat,
            lon: this.state.lon,
            units: this.state.units
        };
        console.log(postData);
        // fetch weather data from server
        fetch('http://localhost:5555/forecastData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(
            // capture weather data
            (result) => {
                this.setState({
                    weatherData: result,
                    isLoaded: true
                });
                console.log(this.state.weatherData);
            },
            // capture error codes from server
            (error) => {
                this.setState({
                    error
                });
            }
        )
    }

    // after component loads call the server for weather data
    componentDidMount() {
        // call geolocation function
        this.getCurrentPosition()
        .then(
            (position) => {
                // pass coordinates to API call if successfully acquired
                if (position.coords) {
                    // set state values
                    this.setState({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        isLocated: true
                    });
                    this.getWeatherData();
                } else {
                    console.error("Geolocation is unsupported by this browser.");
                }
            }
        )
        // if error was detected, indicate cause
        .catch(
            (error) => {
                var msg = null;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        msg = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        msg = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        msg = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        msg = "An unknown error occurred.";
                        break;
                }
                console.log(msg);
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    setUnits(event) {
        console.log(event.target.value);
        if (event.target.value === "imperial") {
            this.setState(
                {
                    units: event.target.value,
                    units_set: ["F", "mph"]
                },
                this.getWeatherData
            );
        } else if (event.target.value === "metric") {
            this.setState(
                {
                    units: event.target.value,
                    units_set: ["C", "m/s"]
                },
                this.getWeatherData
            );
        }
    }

    render() {      
        // reload after weather data gathered
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            // don't render weather block until the component is loaded
            return <div>Loading...</div>;
        } else {
			return (
                <div>
                    <h1>Forecastr</h1>
                    <CurrentWeather weatherData={this.state.weatherData} units={this.state.units} units_set={this.state.units_set} />
                    <div>
                        <input type="radio" value="metric" name="units" checked={this.state.units === "metric"} onChange={event => this.setUnits(event)} /> Metric
                        <input type="radio" value="imperial" name="units" checked={this.state.units === "imperial"} onChange={event => this.setUnits(event)} /> US
                    </div>
                </div>
            )
        }
    }
}

export default Weather;