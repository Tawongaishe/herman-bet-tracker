import axios from 'axios';

// Create an axios instance with custom config
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API wrapper service
const BettingAPI = {
  // Get all bets
  getAllBets: async () => {
    try {
      const response = await API.get('/bets');
      return response.data;
    } catch (error) {
      console.error('Error fetching bets:', error);
      throw error;
    }
  },

  // Add a new bet
  addBet: async (betData) => {
    try {
      const response = await API.post('/bets', betData);
      return response.data;
    } catch (error) {
      console.error('Error adding bet:', error);
      throw error;
    }
  },

  // Update an existing bet
  updateBet: async (betId, betData) => {
    try {
      const response = await API.put(`/bets/${betId}`, betData);
      return response.data;
    } catch (error) {
      console.error(`Error updating bet ${betId}:`, error);
      throw error;
    }
  },

  // Delete a bet
  deleteBet: async (betId) => {
    try {
      const response = await API.delete(`/bets/${betId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting bet ${betId}:`, error);
      throw error;
    }
  },

  // Get summary of what each person owes
  getSummary: async () => {
    try {
      const response = await API.get('/summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    }
  },
};

export default BettingAPI;