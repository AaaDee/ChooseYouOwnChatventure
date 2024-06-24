import axios from 'axios';

export async function ping(): Promise<string> {
  const url = 'http://localhost:3001/ping';
  const response = await axios.get<string>(url);
  return response.data;
}
