import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './rewards.css';

const Rewards = ({ campaignID }) => {
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get(`/api/rewards/${campaignID}`);
                setRewards(response.data);
            } catch (error) {
                console.error('Failed to fetch rewards:', error);
            }
        };

        fetchRewards();
    }, [campaignID]);

    return (
        <div className="rewards-container">
            <h2>Campaign Rewards</h2>
            {rewards.length > 0 ? (
                rewards.map((reward) => (
                    <div className="reward-card" key={reward.rewardID}>
                        <p><strong>Description:</strong> {reward.rewardDescription}</p>
                        <p><strong>Minimum Donation:</strong> ${reward.minDonationAmount}</p>
                        <p><strong>Delivery Date:</strong> {new Date(reward.deliveryDate).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No rewards available for this campaign.</p>
            )}
        </div>
    );
};

export default Rewards;
