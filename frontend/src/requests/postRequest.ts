import axios from 'axios';
import { ChatHistory, ImageDescription, UserInput } from '../types';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

type DataTypes = ChatHistory | UserInput | ImageDescription;

export async function postRequest(endpoint: string, data?: DataTypes) {
  const token = window.localStorage.getItem('token') || '';
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(`${backendUrl}/${endpoint}`, data, config);
  return response;
}
