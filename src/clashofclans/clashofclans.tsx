import { useEffect, useState } from 'react';
import './clashofclans.css';
interface CocData {
    name: string;
    expLevel: number;
    role: string;
    clan: {
        name: string;
        clanLevel: number;
        tag: string;
    };
    attackWins: number;
    defenseWins: number;
    townHallLevel: number;
    trophies: number;
    league: {
        name: string;
    };
    builderHallLevel: number;
    builderBaseTrophies: number;
    builderBaseLeague: {
        name: string;
    };
}
function ClashOfClans() {
    const [cocData, setCocData] = useState<CocData | null>(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/coc', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json()) // return the result of response.json()
            .then(data => {
                console.log(data);
                setCocData(data);
            })
    }, []);

    if (!cocData) {
        return <div className='main'>Loading...</div>;
    }

    return (
        <div className='main'>
            <h1>Clash of Clans stats of {cocData['name']} </h1>
            <p>XP Level: {cocData['expLevel']}</p>
            <div className='spread'>
                <div className='inv'>

                <h3>Clan</h3>
                <p>Role: {cocData['role']}</p>
                <p>{cocData['clan']['name']} ({cocData['clan']['clanLevel']}) </p>
                <p>Clan tag: {cocData['clan']['tag']}</p>
                <p>you have won {cocData['attackWins']} battles and lost {cocData['defenseWins']} battles</p>
                </div>

                <div className='inv'>
                    <h3>Village</h3>
                    <p>Townhall level: {cocData['townHallLevel']}</p>
                    <p>{cocData['trophies']} trophies in {cocData['league']['name']} </p>
                </div>
                <div className='inv'>
                    <h3>Builder base</h3>
                    <p>Builder hall level: {cocData['builderHallLevel']}</p>
                    <p>{cocData['builderBaseTrophies']} trophies in {cocData['builderBaseLeague']['name']} </p>
                </div>
            </div>

        </div>
    )

}

export default ClashOfClans;