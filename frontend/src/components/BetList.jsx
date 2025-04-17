import React, { useState } from 'react';
import './BetList.css';

const BetList = ({ bets, isLoading, onUpdateBet, onDeleteBet }) => {
  const [editingBetId, setEditingBetId] = useState(null);
  const [editedBet, setEditedBet] = useState({});

  const handleEdit = (bet) => {
    setEditingBetId(bet.id);
    setEditedBet({ ...bet });
  };

  const handleCancelEdit = () => {
    setEditingBetId(null);
    setEditedBet({});
  };

  const handleSaveEdit = () => {
    onUpdateBet(editingBetId, editedBet);
    setEditingBetId(null);
    setEditedBet({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBet({ ...editedBet, [name]: name === 'amount' ? parseFloat(value) : value });
  };

  if (isLoading) {
    return <div className="loading">Loading bets...</div>;
  }

  if (bets.length === 0) {
    return <div className="no-bets">No bets yet. Add one!</div>;
  }

  return (
    
    <div className="bet-list">
    
      <h2>All Bets</h2>
      <div className="bet-cards">
        {bets.map((bet) => (
          <div key={bet.id} className="bet-card">
            {editingBetId === bet.id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    value={editedBet.description || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Winner</label>
                  <select 
                    name="person" 
                    value={editedBet.person || ''} 
                    onChange={handleChange}
                  >
                    <option value="">Select Winner</option>
                    <option value="you">You</option>
                    <option value="herman">Herman</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount ($)</label>
                  <input
                    type="number"
                    name="amount"
                    value={editedBet.amount || ''}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>
                <div className="edit-actions">
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="bet-header">
                  <span className={`winner-tag ${bet.person}`}>
                    {bet.person === 'you' ? 'You Won' : 'Herman Won'}
                  </span>
                  <span className="bet-amount">${bet.amount.toFixed(2)}</span>
                </div>
                <p className="bet-description">{bet.description}</p>
                <div className="bet-date">
                  {new Date(bet.date).toLocaleDateString()}
                </div>
                <div className="bet-actions">
                  <button onClick={() => handleEdit(bet)}>Edit</button>
                  <button onClick={() => onDeleteBet(bet.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default BetList;