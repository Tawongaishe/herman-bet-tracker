import React, { useState, useEffect } from 'react';
// Directly use your provided API
import BettingAPI from './services/api';
import BetList from './components/BetList';
import AddBetForm from './components/AddBetForm';
import Summary from './components/Summary';
import './App.css';

function App() {
  const [bets, setBets] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bets');

  useEffect(() => {
    fetchBets();
    fetchSummary();
  }, []);

  const fetchBets = async () => {
    try {
      setIsLoading(true);
      const data = await BettingAPI.getAllBets();
      setBets(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch bets:', error);
      setIsLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const data = await BettingAPI.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    }
  };

  const handleAddBet = async (betData) => {
    try {
      await BettingAPI.addBet(betData);
      fetchBets();
      fetchSummary();
    } catch (error) {
      console.error('Failed to add bet:', error);
    }
  };

  const handleUpdateBet = async (betId, betData) => {
    try {
      await BettingAPI.updateBet(betId, betData);
      fetchBets();
      fetchSummary();
    } catch (error) {
      console.error('Failed to update bet:', error);
    }
  };

  const handleDeleteBet = async (betId) => {
    try {
      await BettingAPI.deleteBet(betId);
      fetchBets();
      fetchSummary();
    } catch (error) {
      console.error('Failed to delete bet:', error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Bet Tracker</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'bets' ? 'active' : ''} 
            onClick={() => setActiveTab('bets')}
          >
            Bets
          </button>
          <button 
            className={activeTab === 'add' ? 'active' : ''} 
            onClick={() => setActiveTab('add')}
          >
            Add Bet
          </button>
          <button 
            className={activeTab === 'summary' ? 'active' : ''} 
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
        </div>
      </header>

      <main>
        {activeTab === 'bets' && (
          <BetList 
            bets={bets} 
            isLoading={isLoading} 
            onUpdateBet={handleUpdateBet} 
            onDeleteBet={handleDeleteBet} 
          />
        )}
        {activeTab === 'add' && (
          <AddBetForm onAddBet={handleAddBet} />
        )}
        {activeTab === 'summary' && (
          <Summary summary={summary} />
        )}
      </main>
    </div>
  );
}

export default App;