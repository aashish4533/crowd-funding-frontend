import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const handleUpdate = () => {
        // Logic for updating the user profile
        console.log('Update user profile');
    };

    const handleDelete = () => {
        // Logic for deleting the user profile
        console.log('Delete user profile');
        navigate('/'); // Redirect to home page after deletion
    };

    return (
        <div style={styles.container}>
            <h1>User Profile</h1>
            <p>Here you can update or delete your profile.</p>
            <button style={styles.button} onClick={handleUpdate}>Update Profile</button>
            <button style={styles.deleteButton} onClick={handleDelete}>Delete Profile</button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        backgroundColor: '#2ecc71',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        margin: '10px',
        padding: '10px 20px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Profile;
