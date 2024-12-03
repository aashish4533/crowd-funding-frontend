import axios from 'axios';
import React, { useState } from 'react';

const UpdateCampaign = ({ campaign, onUpdate }) => {
    const [formData, setFormData] = useState(campaign);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/campaign/${campaign.campaignid}`, formData);
            if (response.data.success) {
                onUpdate();
                alert('Campaign updated successfully!');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to update campaign.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <input name="goalAmount" value={formData.goalAmount} onChange={handleChange} placeholder="Goal Amount" type="number" required />
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
            <input name="endDate" value={formData.endDate} onChange={handleChange} type="date" required />
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <button type="submit">Update Campaign</button>
        </form>
    );
};

export default UpdateCampaign;
