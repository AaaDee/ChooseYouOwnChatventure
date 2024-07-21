import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function postRequest(endpoint: string, data: object) {
  const response = await axios.post(`${backendUrl}/${endpoint}`, data);
  return response;
}
