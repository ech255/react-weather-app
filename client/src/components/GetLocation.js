import React from 'react';
import Weather from './Weather';


class GetLocation extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            error: null,
            isLoaded: false,
            isLocated: false,
            lat: null,
            lon: null,
            zipcode: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        });
    }

    getLocationClick = () => {
        this.setState({
            isLocated: false
        });
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                isLocated: true
            });
        });
        console.log("Lat: "+this.state.lat+" Lon: "+this.state.lon);
    }

    handleChange(event) {
        this.setState({
            zipcode: event.target.value
        });
    }
    
    handleSubmit(event) {
        this.setState({
            isLocated: false
        });
        var zipData = {
            zipcode: this.state.zipcode
        };
        console.log(zipData);
        // fetch weather data from server
        fetch('/locationData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify(zipData)
        })
        .then(res => res.json())
        .then(
            // capture weather data
            (result) => {
                this.setState({
                    lat: result[0].latitude,
                    lon:result[0].longitude,
                    isLocated: true
                });
                console.log("Lat: " + this.state.lat + ", Lon: " + this.state.lon);
            },
            // capture error codes from server
            (error) => {
                this.setState({
                    error
                });
            }
        )


        event.preventDefault();
    }

    render() {
        // reload after weather data gathered
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            // don't render weather block until the component is loaded
            return <div>Loading...</div>;
        } else {
            const weatherSection = this.state.isLocated ? <Weather lat={this.state.lat} lon={this.state.lon} /> : ""
            return (
                <div>
                    <div className="title-container">
                        <h1>Bright Skies</h1>
                        Enable GPS or Enter your Zip Code
                        <div className="location-container">
                            <input type="button" value="Get Location" onClick={this.getLocationClick} />
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <input type="text" placeholder="Zip Code" value={this.state.zipcode} onChange={this.handleChange} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                    {weatherSection}
                    </div>
                
            )
        }
    }
}

export default GetLocation;
             