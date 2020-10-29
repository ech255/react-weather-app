import React from 'react';
import CurrentWeather from './CurrentWeather';
import LocationMap from './LocationMap';
import WeeklyWeather from './WeeklyWeather';


class Weather extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            error: null,
			isLoaded: false,
            weatherData: [],
            units: "imperial",
            units_set: ["F", "mph"]
		};
    }

    // after component loads call the server for weather data
    componentDidMount() {
        this.getWeatherData();
    }

    getWeatherData() {
        var postData = {
            lat: this.props.lat,
            lon: this.props.lon,
            units: this.state.units
        };
        console.log(postData);
        // fetch weather data from server
        fetch('/forecastData', {
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
        } else if (!this.state.isLoaded ) {
            // don't render weather block until the component is loaded
            return <div>Loading...</div>;
        } else {
            var weeklyWeatherComponents = [];
            for (var i = 0; i < 7; i++) {
                weeklyWeatherComponents.push(
                    <WeeklyWeather
                        weatherData = {this.state.weatherData}
                        dayValue = {[i]}
                        units={this.state.units}
                        units_set={this.state.units_set}
                    />
                );
            }
			return (
                <div className="weather-container">
                    <div>
                        <input type="radio" value="metric" name="units" checked={this.state.units === "metric"} onChange={event => this.setUnits(event)} /> Metric
                        <input type="radio" value="imperial" name="units" checked={this.state.units === "imperial"} onChange={event => this.setUnits(event)} /> US
                    </div>
                    <CurrentWeather weatherData={this.state.weatherData} units={this.state.units} units_set={this.state.units_set} />
                    <h3>Weekly Forecast</h3>
                    <div className="weekly-weather-container">
                        {weeklyWeatherComponents}
                    </div>
                    <LocationMap lat={this.props.lat} lon={this.props.lon}/>
                </div>
            )
        }
    }
}

export default Weather;
