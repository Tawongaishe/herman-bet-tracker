import React, { useState } from 'react';
import './AddBetForm.css';

const AddBetForm = ({ onAddBet }) => {
  const [betData, setBetData] = useState({
    description: '',
    person: '',
    amount: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBetData({ ...betData, [name]: name === 'amount' ? value : value });
    
    // Clear any error message when user types
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!betData.description || !betData.person || !betData.amount) {
      setErrorMessage('Please fill out all fields');
      return;
    }
    
    const amountValue = parseFloat(betData.amount);
    
    // Validate amount
    if (isNaN(amountValue) || amountValue <= 0) {
      setErrorMessage('Please enter a valid amount');
      return;
    }
    
    // Format data for submission
    const formattedData = {
      description: betData.description,
      person: betData.person,
      amount: amountValue,
      date: new Date().toISOString()
    };
    
    // Submit data
    onAddBet(formattedData);
    
    // Reset form
    setBetData({
      description: '',
      person: '',
      amount: ''
    });
  };

  return (
    <div className="add-bet-form">
      <h2>Add New Bet</h2>
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>What was the bet about?</label>
          <input
            type="text"
            name="description"
            value={betData.description}
            onChange={handleChange}
            placeholder="e.g., Chiefs win the Superbowl"
          />
        </div>
        
        <div className="form-group">
          <label>Who won?</label>
          <div className="winner-buttons">
            <button 
              type="button"
              className={betData.person === 'you' ? 'active' : ''}
              onClick={() => setBetData({ ...betData, person: 'you' })}
            >
              You
            </button>
            <button 
              type="button"
              className={betData.person === 'herman' ? 'active' : ''}
              onClick={() => setBetData({ ...betData, person: 'herman' })}
            >
              Herman
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={betData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        
        <button type="submit" className="submit-button">Add Bet</button>
      </form>
    </div>
  );
};

export default AddBetForm;
