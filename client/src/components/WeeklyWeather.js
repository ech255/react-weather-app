import React from 'react';
import WeeklyWeatherIcon from './WeeklyWeatherIcon';


class WeeklyWeather extends React.Component {
    render() {
        // load props
        const weatherData = this.props.weatherData;
        const units_set = this.props.units_set;
        // assign day of week and dates
        const dayValue = this.props.dayValue;
        var date = new Date(weatherData.daily[dayValue].dt * 1000);
        const dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const monthArray = ['January','February','March','April','May','June','July', 'August', 'September', 'October', 'November', 'December'];

		return (
            <div>
                <h4>{dayArray[date.getDay()]} {monthArray[date.getMonth()]} {date.getDate()}</h4>
                <h4>{weatherData.daily[dayValue].weather[0].description}</h4>
                <WeeklyWeatherIcon 
                    weatherData={this.props.weatherData}
                    dayValue={this.props.dayValue}
                />
                <div>
                    <div>High: {Math.round(weatherData.daily[dayValue].temp.max)}&deg;{units_set[0]} </div>
                    <div>Low: {Math.round(weatherData.daily[dayValue].temp.min)}&deg;{units_set[0]} </div>
                </div>
            </div>
        )
    }
}

export default WeeklyWeather;
