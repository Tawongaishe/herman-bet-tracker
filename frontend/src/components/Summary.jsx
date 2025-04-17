import React from 'react';
import './Summary.css';

const Summary = ({ summary }) => {
  if (!summary) {
    return <div className="loading">Loading summary...</div>;
  }

  // Determine who owes whom based on the difference
  const renderOwingSummary = () => {
    if (summary.difference === 0) {
      return (
        <div className="all-settled">
          <h3>All Settled Up! 🎉</h3>
          <p>No debts between you and Herman.</p>
        </div>
      );
    }

    if (summary.difference < 0) {
      // Negative difference means Herman owes you
      return (
        <div className="herman-owes">
          <h3>Herman owes you:</h3>
          <div className="amount-display">
            <span className="currency">$</span>
            <span className="amount">{Math.abs(summary.difference).toFixed(2)}</span>
          </div>
        </div>
      );
    }

    if (summary.difference > 0) {
      // Positive difference means you owe Herman
      return (
        <div className="you-owe">
          <h3>You owe Herman:</h3>
          <div className="amount-display">
            <span className="currency">$</span>
            <span className="amount">{summary.difference.toFixed(2)}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="summary-container">
      <h2>Betting Summary</h2>
      
      <div className="summary-card">
        {renderOwingSummary()}
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Bets</h3>
          <div className="stat-value">{summary.herman + summary.you}</div>
        </div>
        
        <div className="stat-card">
          <h3>You Won</h3>
          <div className="stat-value">{summary.you || 0}</div>
        </div>
        
        <div className="stat-card">
          <h3>Herman Won</h3>
          <div className="stat-value">{summary.herman || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default Summary;