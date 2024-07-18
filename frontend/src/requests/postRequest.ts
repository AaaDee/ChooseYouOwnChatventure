import axios from 'axios';

// todo set backend url in config
const backendUrl = 'http://localhost:3001';

export async function postRequest(endpoint: string, data: object) {
  const response = await axios.post(`${backendUrl}/${endpoint}`, data);
  return response;
}
