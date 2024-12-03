import axios from 'axios';
import React from 'react';

const CampaignCard = ({ campaign, onDelete }) => {
    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this campaign?');
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/campaign/${campaign.CampaignID}`);
                if (response.data.success) {
                    onDelete();
                    alert('Campaign deleted successfully!');
                }
            } catch (error) {
                console.error(error);
                alert('Failed to delete campaign.');
            }
        }
    };

    return (
        <div className="campaign-card">
            <h2>{campaign.Title}</h2>
            <p>{campaign.Description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default CampaignCard;
