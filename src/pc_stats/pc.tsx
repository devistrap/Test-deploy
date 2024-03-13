import './ps.css';
import { useState, useEffect } from 'react';


function Pc() {
  const [message, setMessage] = useState({} as any);

      
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5000/api')
        .then(response => response.json())
        .then(data => setMessage(data));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='pc'>
      <table className='table'>
        <tr>
          <td>used memory: </td>
          <td>{(message['usedmem'] / 1000).toFixed(1) as unknown as number} GB</td>
        </tr>
        <tr>
          <td>total uptime:</td>
          <td className='td_special'> {(message['uptime'] / 60).toFixed(0)} : {(message['uptime'] % 60).toFixed(0)}</td>
        </tr>
        <tr><td colSpan={2}>site has been up for {message['process']} seconds</td></tr>
      </table>
    </div>
  );
}

export default Pc;