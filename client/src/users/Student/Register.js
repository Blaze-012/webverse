import React, { useState } from 'react';
import './style.css';

const App = () => {
    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [block, setBlock] = useState('');
    const [password, setPassword] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/student/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, regNo, block, password, roomNo }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Display the response message
                setIsRegistered(true);
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    if (isRegistered) {
        return (
            <div>
                <h1>Registration Successful!</h1>
                <p>Please proceed to login.</p>
                <a href="/Student/login">Go to Login</a>
            </div>
        );
    }

    return (
        <div className='container'>
            <h1>Registration Form</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Registration Number"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Block"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Room Number"
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                />
                <br />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/Student/login">Login</a></p>
        </div>
    );
};

export default App;