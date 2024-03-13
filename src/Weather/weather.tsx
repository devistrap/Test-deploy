import { useEffect, useState } from 'react';
import './weather.css';
import wind from '../assets/navigation.png';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
interface Hour {
    time: string;
    temp_c: number;
    feelslike_c: number;
}

interface Astro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
}

interface ForecastDay {
    astro: Astro;
    date: string;
    date_epoch: number;
    day: unknown;
    hour: Hour[];
    sun_phase: unknown;
}

interface Forecast {
    forecastday: ForecastDay[];
}

interface Current {
    temp_c: number;
    feelslike_c: number;
    condition: { text: string };
    wind_kph: number;
    wind_dir: string;
    wind_degree: number;
}

interface Location {
    name: string;
}

interface WeatherState {
    forecast: Forecast;
    current: Current;
    location: Location;
    data: unknown[];
}

function Weather() {
    const [state, setState] = useState<WeatherState | null>(null);


    useEffect(() => {
        fetch('http://localhost:5000/api')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {


                if (data && data.weather && data.weather.forecast && data.weather.forecast.forecastday) {
                    setState({...data.weather});
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    useEffect(() => {
        if (!state) return;

        const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const createChart = () => {
            const newChart = new Chart(ctx, {
                type: 'line',
                data: {
                    // Your chart data configuration
                    datasets: [{
                        label: 'Temperature over the day',
                        data: state.forecast.forecastday[0].hour.map(hour => ({
                            x: new Date(hour.time),
                            y: hour.temp_c
                        })),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                        {
                            label: 'Feels like',
                            data: state.forecast.forecastday[0].hour.map(hour => ({
                                x: new Date(hour.time),
                                y: hour.feelslike_c
                            })),
                            fill: false,
                            borderColor: 'rgb(255, 99, 132)',
                            tension: 0.1
                        }]
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: 'black' // change this to the color you want for the labels
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'hour',
                                parser: 'HH:mm', // format of your data
                                tooltipFormat: 'HH:mm', // format of the tooltip
                                displayFormats: {
                                    hour: 'HH:mm' // format of the axis labels
                                }
                            },
                            ticks: {
                                color: 'black' // change this to the color you want for the x-axis labels
                            }
                        },
                        y: {
                            ticks: {
                                color: 'black' // change this to the color you want for the y-axis labels
                            }
                        }
                    }
                }
            });

            return newChart;
        };

        const chart = createChart();

        return () => {
            chart.destroy();
        };
    }, [state]);

    if (!state) {
        return <div className='main'>Loading...</div>;
    }

    const style = {
        transform: `rotate(${state.current.wind_degree}deg)`,
    };

    return (
        <div className='main'>
            <h1>Weather in {state.location.name}</h1>
            <div className='temp'>
                <div>
                    Current Temperature: {state.current.temp_c} °C <br />
                    Feels like: {state.current.feelslike_c} °C <br />
                    Condition: {state.current.condition.text} <br />
                </div>
                <div>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
            <h2 className="header">Wind</h2>
            <div className='temp'>
                <div>
                    Wind speed: {(state.current.wind_kph * 0.2777777778).toFixed(0)} m/s<br />
                    Wind direction: {state.current.wind_dir} <br /><br />
                    <img src={wind} alt="Wind icon" className='wind' style={style} />
                </div>
                <div>
                    <canvas id="myChart2"></canvas>
                </div>
            </div>
            <h2 className="header">Sun and moon</h2>
            <div>
                <p>
                    Sunrise: {state.forecast.forecastday[0].astro.sunrise} <br />
                    Sunset: {state.forecast.forecastday[0].astro.sunset} <br />
                </p>
                <p>
                    Moonrise: {state.forecast.forecastday[0].astro.moonrise} <br />
                    Moonset: {state.forecast.forecastday[0].astro.moonset} <br />
                </p>
            </div>
        </div>
    );
}

export default Weather;