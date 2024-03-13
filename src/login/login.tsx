import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitPressed, setSubmitPressed] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitPressed(true);
    }

    useEffect(() => {
        if (submitPressed) {
            console.log(username, password);
            fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data['message'] === "Login successful") {
                        console.log('success');
                        localStorage.setItem('user_id', data['user_id']);
                        navigate('/screen')
                    }
                    else if (data['message'] === "Invalid username or password") {
                        console.log('fail');
                        alert('Invalid username or password')
                    }
                });
            setSubmitPressed(false); // Reset the state if needed
        }
    }, [submitPressed]);

    return (
        <>
            <div className='settings'>
                <div className='body'>
                    <div className='head-div'>
                        <h1 className='head'>Login page</h1>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Username:
                                <input type="text" name="name" onChange={(event) => setUsername(event.target.value)} />
                            </label>
                            <label>
                                Password:
                                <input type="password" name="name" onChange={(event) => setPassword(event.target.value)} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login