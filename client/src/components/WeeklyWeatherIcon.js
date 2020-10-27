import React from 'react';
// import icon svgs as react components
import { ReactComponent as ThunderStorm } from '../icons/26c8.svg';
import { ReactComponent as PartlyCloudyRain } from '../icons/1f326.svg';
import { ReactComponent as RainSky } from '../icons/1f327.svg';
import { ReactComponent as SnowSky } from '../icons/1f328.svg';
import { ReactComponent as Mist } from '../icons/1f32b.svg';
import { ReactComponent as ClearSky } from '../icons/1f31e.svg';
import { ReactComponent as CloudSky25 } from '../icons/1f324.svg';
import { ReactComponent as CloudSky50 } from '../icons/26c5.svg';
import { ReactComponent as CloudSky75 } from '../icons/1f325.svg';
import { ReactComponent as CloudSky100 } from '../icons/2601.svg';


class WeeklyWeatherIcon extends React.Component {
    render() {
        const weatherData = this.props.weatherData;
        const dayValue = this.props.dayValue;
		return (
            <div className="weather-block-forecast-icon">
                {/* thunderstorm prefix codes */}
                {weatherData.daily[dayValue].weather[0].id.toString()[0] === '2' && <ThunderStorm width="100" height="100" x="0" y="0"/>}
                {/* drizzle prefix codes */}
                {weatherData.daily[dayValue].weather[0].id.toString()[0] === '3' && <PartlyCloudyRain width="100" height="100" x="0" y="0"/>}
                {/* rain prefix codes */}
                {weatherData.daily[dayValue].weather[0].id.toString()[0] === '5' && <RainSky width="100" height="100" x="0" y="0"/>}
                {/* snow prefix codes */}
                {weatherData.daily[dayValue].weather[0].id.toString()[0] === '6' && <SnowSky width="100" height="100" x="0" y="0"/>}
                {/* atmospheric (mist/fog/ash) prefix codes */}
                {weatherData.daily[dayValue].weather[0].id.toString()[0] === '7' && <Mist width="100" height="100" x="0" y="0"/>}
                {/* clear sky prefix code */}
                {weatherData.daily[dayValue].weather[0].id === 800 && <ClearSky width="100" height="100" x="0" y="0"/>}
                {/* clouds prefix codes */}
                {weatherData.daily[dayValue].weather[0].id === 801 && <CloudSky25 width="100" height="100" x="0" y="0"/>}
                {weatherData.daily[dayValue].weather[0].id === 802 && <CloudSky50 width="100" height="100" x="0" y="0"/>}
                {weatherData.daily[dayValue].weather[0].id === 803 && <CloudSky75 width="100" height="100" x="0" y="0"/>}
                {weatherData.daily[dayValue].weather[0].id === 804 && <CloudSky100 width="100" height="100" x="0" y="0"/>}
            </div>
		)
	}
}

export default WeeklyWeatherIcon;
