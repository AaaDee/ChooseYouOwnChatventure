import axios from 'axios';
import { ChatHistory, UserInput } from '../types';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

type DataTypes = ChatHistory | UserInput;

export async function postRequest(endpoint: string, data?: DataTypes) {
  // todo check for existing
  const token = window.localStorage.getItem('token') || '';
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(`${backendUrl}/${endpoint}`, data, config);
  return response;
}
