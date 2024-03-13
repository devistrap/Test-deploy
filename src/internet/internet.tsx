import './internet.css';
import { useEffect, useState } from 'react';




function Internet() {
    const [message, setMessage] = useState({
        downloadSpeed: 0,
        uploadSpeed: 0
    } as any);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:5000/api/speedtest')
                .then(response => response.json())
                .then(data => setMessage(data));
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    

    return (
        <div className='internet'>
            <table>
                <tr>

                    <td>Download speed</td>
                    <td><b>{(message['downloadSpeed']).toFixed(0)} mbps</b></td>
                </tr>
                <tr>
                    <td>Upload Speed</td>
                    <td><b>{(message['uploadSpeed']).toFixed(0)} mbps</b></td>
                </tr>
            </table>
        </div>
    );
}

export default Internet;