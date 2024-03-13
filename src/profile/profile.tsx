import {useEffect, useState} from "react";
import './profile.css';



function Profile() {
    const [user] = useState(localStorage.getItem('user_id'));
    const [data, setData] = useState({
        message: {
            name: "",
            email: "",
            password: "",
            ID: 0,

        }
    })

    useEffect(() => {
            fetch('http://localhost:5000/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": user,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setData(data)

                });


    }, []);

 

    return (
        <div className='settings'>
            <div className='main'>
                    <h1 className='title'>Profile</h1>
                <div>
                    <table>
                        <tr>
                            <td>Username:</td>
                            <td> {data.message.name} </td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{data.message.email}</td>
                        </tr>
                    </table>
                    
                </div>
            </div>
        </div>
    )
}

export default Profile;