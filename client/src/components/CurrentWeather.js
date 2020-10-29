import React from 'react';
import WeatherIcon from './WeatherIcon';


class CurrentWeather extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            isLoaded: false
		};
    }

    render() {
        const weatherData = this.props.weatherData;
        const units_set = this.props.units_set;
        return (
            <div>
                <div>
                    <h3>Current Conditions</h3>
                    <h4>{Math.round(weatherData.current.temp)}&deg;{units_set[0]} {weatherData.current.weather[0].description}</h4>
                    <WeatherIcon weatherData={this.props.weatherData} />
                    <div>High: {Math.round(weatherData.daily[0].temp.max)}&deg;{units_set[0]}</div>
                    <div>Low: {Math.round(weatherData.daily[0].temp.min)}&deg;{units_set[0]}</div>
                    <div>Humidity: {weatherData.current.humidity}%</div>
                    <div>Wind: {Math.round(weatherData.current.wind_speed * 2.237)} {units_set[1]}</div>
                </div>
                
            </div>
        )
    }
}

export default CurrentWeather;
