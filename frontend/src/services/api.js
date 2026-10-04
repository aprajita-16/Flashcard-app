import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082'; 

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDecks = async () => {
  const response = await apiClient.get('/decks');
  return response.data;
};

export const createDeck = async (deckData) => {
  const response = await apiClient.post('/decks', deckData);
  return response.data;
};