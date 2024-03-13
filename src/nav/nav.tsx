import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './nav.css';
import setting  from '../assets/settings.png';


function Nav() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [user, setUser] = useState(localStorage.getItem('user_id'));




  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
        <div className='nav'>
            <div>
            <p className='welcome'>
                {currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds()} </p>
            </div>


            <div>
            <Link to={'/settings'}><img src={setting} alt="Setting icon" className='setting'/></Link>

                {!user && <Link to={'/register'}> <button className='login' >register</button></Link>}
                {!user &&<Link to={'/login'}> <button className="login" >Login</button></Link>}
                {user && <Link to={'/'}><button className="login" onClick={() => {
                    localStorage.removeItem('user_id');
                    setUser(null);
                }}>Logout</button></Link>}
                {user && <Link to={'profile'}><button className="login">Profile</button></Link>}

            </div>


        </div>
    </>
  )
}

export default Nav

