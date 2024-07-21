import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function postRequest(endpoint: string, data: object) {
  // todo check for existing
  const token = window.localStorage.getItem('token') || '';
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(`${backendUrl}/${endpoint}`, data, config);
  return response;
}
