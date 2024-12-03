import React, { useEffect, useState } from 'react';
import './backer.css';

const Backer = () => {
    const [backers, setBackers] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        Title: '',
        amountDonated: '',
    });

    // Fetch backer campaign data
    useEffect(() => {
        fetch('http://localhost:5000/api/backer/add')
            .then((response) => response.json())
            .then((data) => setBackers(data))
            .catch((error) => console.error('Error fetching backer campaigns:', error));
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/backer/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setBackers([...backers, data.backerCampaign]);
                setFormData({ firstName: '', lastName: '', Title: '', amountDonated: '' });
            })
            .catch((error) => console.error('Error adding backer campaign:', error));
    };

    return (
        <div className="backer-container">
            <h1>Backer Campaign</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="backer-form">
                <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Campaign Title"
                    value={formData.Title}
                    onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount Donated"
                    value={formData.amountDonated}
                    onChange={(e) => setFormData({ ...formData, amountDonated: e.target.value })}
                    required
                />
                <button type="submit">Add Backer</button>
            </form>

            {/* Display Backers */}
            <div className="backer-list">
                <h2>All Backers</h2>
                {backers.map((backer) => (
                    <div key={backer.backerCampaignID} className="backer-card">
                        <p><strong>Name:</strong> {backer.firstName} {backer.lastName}</p>
                        <p><strong>Title:</strong> {backer.Title}</p>
                        <p><strong>Amount Donated:</strong> ${backer.amountDonated}</p>
                        <p><strong>Backed Date:</strong> {new Date(backer.backedDate).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Backer;
