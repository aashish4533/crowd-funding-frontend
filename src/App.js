import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BackerCampaign from './components/backer/backer.js';
import CreateCampaign from './components/campaign/create.js';
import Dashboard from './components/dashboard/dashboard.js';
import Profile from './components/user/profile.js';
import Signin from './components/user/signin.js';
import Signup from './components/user/signup.js';
import Users from './components/user/users.js';

const Home = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome to Crowd Funding Platform</h1>
            <p style={styles.description}>
                Empowering ideas and turning dreams into reality. Join our community and make a difference today!
            </p>
            <div style={styles.buttons}>
                <Link to="/signin" style={styles.button}>Sign In</Link>
                <Link to="/signup" style={styles.button}>Sign Up</Link>
            </div>
        </div>
    );
};

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        // Check local storage for signed-in state
        const signedIn = localStorage.getItem('isSignedIn') === 'true';
        setIsSignedIn(signedIn);
    }, []);

    const handleSignIn = () => {
        setIsSignedIn(true);
        localStorage.setItem('isSignedIn', 'true');
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
        localStorage.removeItem('isSignedIn');
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin onSignIn={handleSignIn} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/dashboard"
                        element={isSignedIn ? <Dashboard onSignOut={handleSignOut} /> : <Signin onSignIn={handleSignIn} />}
                    />
                    <Route path="/campaign" element={<CreateCampaign />} />
                    <Route path="/backer" element={<BackerCampaign />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/profile" element={isSignedIn ? <Profile /> : <Signin onSignIn={handleSignIn} />} />
                </Routes>
            </div>
        </Router>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
        padding: '20px',
    },
    header: {
        fontSize: '2.5rem',
        color: '#2c3e50',
    },
    description: {
        fontSize: '1.2rem',
        color: '#7f8c8d',
        margin: '20px 0',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    button: {
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: '#3498db',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
};

export default App;
