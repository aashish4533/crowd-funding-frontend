import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignCard from '../campaign/CampaignCard.js';
import './dashboard.css';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all campaigns
  const fetchCampaigns = async () => {
    try {
      // Check authentication token
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/signin'); // Redirect to Sign-In page if not authenticated
        return;
      }

      // Fetch campaigns with Authorization header
      const response = await axios.get('http://localhost:5000/api/dashboard/campaigns', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      if (error.response?.status === 401) {
        // Clear token and redirect if unauthorized
        localStorage.removeItem('authToken');
        navigate('/signin');
      } else {
        setError('Failed to load campaigns. Please try again later.');
      }
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('authToken'); // Clear token
    navigate('/signin'); // Redirect to Sign-In page
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>All Campaigns</h1>
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="campaign-list">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.campaignid}
              campaign={campaign}
              onDelete={fetchCampaigns} // Pass fetchCampaigns to refresh list after deletion
              onUpdate={fetchCampaigns} // Pass fetchCampaigns to refresh list after update
            />
          ))
        ) : (
          <p>No campaigns found. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
