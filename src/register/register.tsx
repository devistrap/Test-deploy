import { useState, useEffect } from 'react'

import './register.css';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitPressed, setSubmitPressed] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitPressed(true);
    }

    useEffect(() => {
        if (submitPressed) {
            console.log(username, password);
            fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "email": email
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                });
            setSubmitPressed(false); // Reset the state if needed
        }
    }, [submitPressed]);

    return (
        <>
            <div className='settings'>
                <div className='body'>
                    <div className='head-div'>
                        <h1 className='head'>Register</h1>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Username:
                                <input type="text" name="name" onChange={(event) => setUsername(event.target.value)} />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="name" onChange={(event) => setEmail(event.target.value)} />
                            </label>
                            <label>
                                Password:
                                <input type="password" name="name"
                                    onChange={(event) => setPassword(event.target.value)} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register