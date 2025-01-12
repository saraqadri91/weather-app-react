import React, { useRef, useState } from 'react';
import './Weather.css';  // Import the CSS file
import axios from 'axios';
import clearImg from '../images/pexels-prismattco-2905397.jpg';
import fogImg from '../images/fog.jpg';
import cloudyImg from '../images/cloudy.jpg';
import rainyImg from '../images/rainy.jpg';
import snowImg from '../images/snow.jpg';
import stormyImg from '../images/stormy.jpg';
import hazeImg from '../images/fog.jpg';
import defaultImg from '../images/cloud.jpg';
import Swal from 'sweetalert2';

const Weather = () => {
    const userCityRef = useRef(null);
    const [weather, setWeather] = useState([]);
    const [bgImage, setBgImage] = useState(`url(${defaultImg})`);  // Default background image

    const getCityName = async (event) => {
        event.preventDefault();
        const cityName = userCityRef.current.value;

        // Check if the input field is empty
        if (!cityName) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a city name!',
            });
            return;  // Prevent further execution
        }

        const APIkey = "8796e2fb83dfd44745e7174a288e24a0";
        setWeather([]);  // Clear the previous weather data

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`
            );

            // Set new weather data, replacing the previous one
            setWeather([response.data]);

            console.log(response);

            // Get weather condition from the API response
            const weatherCondition = response.data.weather[0].main.toLowerCase();

            // Change background based on weather condition
            switch (weatherCondition) {
                case "clear":
                    setBgImage(`url(${clearImg})`);
                    break;
                case "fog":
                    setBgImage(`url(${fogImg})`);
                    break;
                case "clouds":
                    setBgImage(`url(${cloudyImg})`);
                    break;
                case "rain":
                    setBgImage(`url(${rainyImg})`);
                    break;
                case "snow":
                    setBgImage(`url(${snowImg})`);
                    break;
                case "storm":
                    setBgImage(`url(${stormyImg})`);
                    break;
                case "haze":
                    setBgImage(`url(${hazeImg})`);
                    break;
                default:
                    setBgImage(`url(${defaultImg})`);
                    break;
            }
        } catch (error) {
            // Show SweetAlert error if the city is invalid or not found
            Swal.fire({
                icon: 'error',
                title: 'City Not Found',
                text: 'Please enter a valid city name.',
            });
            console.error(error);
        }
    };

    return (
        <div className="bg" style={{ backgroundImage: bgImage }}>
           
            <div className="flex">
                <div className="btflex">
                    <form>
                        <input
                            type="text"
                            placeholder="Enter a city name"
                            ref={userCityRef}
                        />
                        <button onClick={getCityName}>Search</button>
                    </form>
                </div>

                <div>
                    {/* Check if weather data exists and display it */}
                    {weather.length > 0 && weather.map((data, index) => (
                        <div key={index} className="weather-card">
                            <h2>Weather in {data.name}</h2>
                            <p>{data.main.temp}°C</p>
                            <p>{data.weather[0].main}</p>
                            {/* <p>{data.weather[0].description} {data.weather[0].icon} </p> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Weather;
