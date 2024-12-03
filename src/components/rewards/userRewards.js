import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './userRewards.css';

const UserRewards = ({ userID }) => {
    const [userRewards, setUserRewards] = useState([]);

    useEffect(() => {
        const fetchUserRewards = async () => {
            try {
                const response = await axios.get(`/api/userRewards/${userID}`);
                setUserRewards(response.data);
            } catch (error) {
                console.error('Failed to fetch user rewards:', error);
            }
        };

        fetchUserRewards();
    }, [userID]);

    return (
        <div className="user-rewards-container">
            <h2>Your Rewards</h2>
            {userRewards.length > 0 ? (
                userRewards.map((reward) => (
                    <div className="user-reward-card" key={reward.userRewardID}>
                        <p><strong>Description:</strong> {reward.rewardDescription}</p>
                        <p><strong>Minimum Donation:</strong> ${reward.minDonationAmount}</p>
                        <p><strong>Status:</strong> {reward.deliveryStatus}</p>
                    </div>
                ))
            ) : (
                <p>You have no rewards yet.</p>
            )}
        </div>
    );
};

export default UserRewards;
