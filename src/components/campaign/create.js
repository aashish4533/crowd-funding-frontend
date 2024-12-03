import axios from 'axios';
import React, { useState } from 'react';
import './create.css';

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    GoalAmount: '',
    Category: '',
    StartDate: '',
    EndDate: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/campaign/create', formData);
      setMessage(response.data.message || 'Campaign created successfully!');
      setFormData({
        Title: '',
        Description: '',
        GoalAmount: '',
        Category: '',
        StartDate: '',
        EndDate: '',
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="create-campaign-container">
      <h1 className="create-campaign-header">Create a Campaign</h1>
      <form onSubmit={handleSubmit} className="create-campaign-form">
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          id="Title"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          placeholder="Enter campaign title"
          required
        />

        <label htmlFor="Description">Description</label>
        <textarea
          id="Description"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Describe your campaign"
          rows="5"
          required
        ></textarea>

        <label htmlFor="GoalAmount">Goal Amount</label>
        <input
          type="number"
          id="GoalAmount"
          name="GoalAmount"
          value={formData.GoalAmount}
          onChange={handleChange}
          placeholder="Enter goal amount (e.g., 5000)"
          required
        />

        <label htmlFor="Category">Category</label>
        <select
          id="Category"
          name="Category"
          value={formData.Category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Tech">Tech</option>
          <option value="Art">Art</option>
          <option value="Charity">Charity</option>
        </select>

        <label htmlFor="StartDate">Start Date</label>
        <input
          type="date"
          id="StartDate"
          name="StartDate"
          value={formData.StartDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="EndDate">End Date</label>
        <input
          type="date"
          id="EndDate"
          name="EndDate"
          value={formData.EndDate}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">
          Create Campaign
        </button>
      </form>
      {message && <p className="response-message">{message}</p>}
    </div>
  );
};

export default CreateCampaign;
