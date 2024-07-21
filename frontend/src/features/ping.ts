import axios from 'axios';

export async function ping(): Promise<string> {
  const url = `http://${process.env.REACT_APP_BACKEND_URL}/ping`;
  const response = await axios.get<string>(url);
  return response.data;
}
