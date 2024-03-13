import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './nav/nav.tsx'
import Weather from './Weather/weather.tsx'
import Github from './github/github.tsx'
import Internet from './internet/internet.tsx'
import Pc from './pc_stats/pc.tsx'
import Settings from "./settings/settings.tsx";
import ClashOfClans from "./clashofclans/clashofclans.tsx";
import Login from "./login/login.tsx";
import Register from "./register/register.tsx";
import Profile from "./profile/profile.tsx";

import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


function Main() {
    const [components, setComponents] = useState([<Nav/>]);

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
                console.log(data);
                const newComponents = [<Nav/>];
                if (data["pc_stats"] === 'true') {
                    newComponents.push(<Pc/>);
                }
                if (data["internet_stats"] === 'true') {
                    newComponents.push(<Internet/>);
                }
                if (data["weather_stats"] === 'true') {
                    newComponents.push(<Weather/>);
                }
                if (data["coc"] === 'true') {
                    newComponents.push(<ClashOfClans/>);
                }
                if (data["github"] === 'true') {
                    newComponents.push(<Github/>);
                }



                setComponents(newComponents);

            });
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: [<Nav/>, <Login/>,],
        },
        {
            path: "/settings",
            element: [<Nav/>, <Settings/>,],
        },
        {
            path: "/login",
            element: [<Nav/>, <Login/>,],
        },
        {
            path: "/register",
            element: [<Nav/>, <Register/>,],
        },
        {
            path: "/profile",
            element: [<Nav/>, <Profile/>,],
        },
        {
            path: "/screen",
            element: components
        }
    ]);

    return (
        <RouterProvider
            router={router}

            // @ts-expect-error descr
            basename="/loading_screen"
        />
    );
}



ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
)