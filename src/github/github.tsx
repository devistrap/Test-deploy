import  { useEffect, useState } from 'react';
import './github.css';

function GitHubUserStats() {
    const [userData, setUserData] = useState('null');
    const [githubusername, setgithubUsername] = useState('');


    useEffect(() => {
        fetch('http://localhost:5000/settings')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setgithubUsername(data["github-username"])
                console.log(githubusername)
                    fetch(`https://api.github.com/users/${data['github-username']}/repos`, {

                    })
                        .then(response => response.json())
                        .then(data => setUserData(data))
            });

    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>

            <h1 className='h1'>All github repo's</h1>
            
            <div className='wrapper'>
                {Array.isArray(userData) && userData.map((repo: any) => (
                    <div className='card'>
                        <h2>{repo.name}</h2>
                        <p>{repo.description}</p>
                        <p>created at: {new Date(repo['created_at']).toLocaleDateString()}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default GitHubUserStats;