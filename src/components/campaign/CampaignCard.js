import axios from 'axios';
import React from 'react';


const CampaignCard = ({ campaign, onDelete, onUpdate }) => {
  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this campaign?');
    if (confirm) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/campaign/${campaign.CampaignID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (response.data.success) {
          alert('Campaign deleted successfully!');
          onDelete(); // Refresh campaigns
        }
      } catch (error) {
        console.error(error);
        alert('Failed to delete campaign.');
      }
    }
  };

  const handleUpdate = () => {
    
    alert('Update functionality coming soon!');
    onUpdate(); 
  };

  return (
    <div className="campaign-card">
      <h2>{campaign.Title}</h2>
      <p>{campaign.Description}</p>
      <p><strong>Goal:</strong> ${campaign.GoalAmount}</p>
      <p><strong>Raised:</strong> ${campaign.CurrentAmount}</p>
      <p><strong>Category:</strong> {campaign.Category}</p>
      <p><strong>Status:</strong> {campaign.Status}</p>
      <p><strong>End Date:</strong> {new Date(campaign.EndDate).toLocaleDateString()}</p>
      <button onClick={handleUpdate} className="update-button">Update</button>
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default CampaignCard;
