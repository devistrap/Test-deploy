import { useState, useEffect } from 'react'

import { Link } from "react-router-dom";
import './settings.css';




function Settings() {
    const [pcStats, setPcStats] = useState(false);
    const [internetStats, setInternetStats] = useState(false);
    const [weatherStats, setWeatherStats] = useState(false);
    const [githubRepos, setGithubRepos] = useState(false);
    const [githubUsername, setgithubUsername] = useState('');
    const [cocStats, setCocStats] = useState(false);
    const [city, setCity] = useState('');
    function stringToBoolean(str: string): boolean {
        return str === "true";
    }

    useEffect(() => {
        fetch('http://localhost:5000/get_settings',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": localStorage.getItem('user_id')
                })
            }
            )
            .then(response => response.json())
            .then(data => {

                setPcStats(stringToBoolean(data["pc_stats"]));
                setInternetStats(stringToBoolean(data["internet_stats"]));
                setWeatherStats(stringToBoolean(data["weather_stats"]));
                setGithubRepos(stringToBoolean(data["github"]));
                setgithubUsername(data["github_username"]);
                setCity(data["city"]);
                setCocStats(stringToBoolean(data["coc"]));

                console.log(data);
                console.log(typeof data["pc_stats"])
            });
        console.log('get settings')
    }, []);

    useEffect(() => {
        if (pcStats || internetStats || weatherStats || githubRepos || githubUsername || city) {
            console.log(JSON.stringify({
                "pc-stats": pcStats,
                "internet-stats": internetStats,
                "weather-stats": weatherStats,
                "github": githubRepos,
                "coc": cocStats,
                "github-username": githubUsername,
                "city": city

            }))
            fetch('http://localhost:5000/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "pc-stats": pcStats,
                    "internet-stats": internetStats,
                    "weather-stats": weatherStats,
                    "github": githubRepos,
                    "coc": cocStats,
                    "github-username": githubUsername,
                    "city": city,
                    "user_id": localStorage.getItem('user_id')

                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch((error) => console.error('Error:', error));
            console.log('post settings')
        }
    }, [pcStats, internetStats, weatherStats, githubRepos, githubUsername, city, cocStats]);



    return (
        <>
            <div className='settings'>
                <div className='body'>
                    <div className='head-div'>
                        <h1 className='head'>settings page</h1>
                    </div>
                    <div>
                        <form>
                            <h3>If an checkbox is ticked the loading screen will show it!</h3>
                            <input className='checkbox' type="checkbox" id="vehicle1" name="vehicle1" value="Bike"
                                   checked={pcStats} onChange={() => setPcStats(!pcStats)}/>
                            <label className='checkbox-label' htmlFor="vehicle1"> PC statistics</label><br/>
                            <input className='checkbox' type="checkbox" id="vehicle2" name="vehicle2" value="Car"
                                   checked={internetStats} onChange={() => setInternetStats(!internetStats)}/>
                            <label className='checkbox-label' htmlFor="vehicle2"> Internet statistics</label><br/>
                            <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat"
                                   checked={weatherStats} onChange={() => setWeatherStats(!weatherStats)}/>
                            <label className='checkbox-label' htmlFor="vehicle3">Weather statistics</label><br/>
                            <input className='checkbox' type="checkbox" id="vehicle4" name="vehicle4" value="Boat"
                                   checked={githubRepos} onChange={() => setGithubRepos(!githubRepos)}/>
                            <label className='checkbox-label' htmlFor="vehicle4">Public github repo's</label><br/>
                            <input className='checkbox' type="checkbox" id="vehicle4" name="vehicle4" value="Boat"
                                   checked={cocStats} onChange={() => setCocStats(!cocStats)}/>
                            <label className='checkbox-label' htmlFor="vehicle4">Clash of clans stats</label><br/><br/>


                            <h2 className='sub'>Github settings</h2>
                            <label className='label' htmlFor="username">Username:</label><br/>
                            <input type="text" id="username" name="username" placeholder='Fill in your github username.'
                                   value={githubUsername}
                                   onChange={(event) => setgithubUsername(event.target.value)}/><br/>

                            <h2 className='sub'>Weather settings</h2>
                            <label className='label' htmlFor="city">City:</label><br/>
                            <input type="text" id="city" name="city" placeholder='fill in the city name' value={city}
                                   onChange={(event) => setCity(event.target.value)}/><br/>

                            <Link to={'/screen'}>
                                <button className='button' onClick={() => window.location.href = '/screen'}>Save and go
                                    back!
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings