import 'dotenv/config';
import app from './app';

export function callback(PORT: number) {
  return () => console.log(`Server is running on port ${PORT}`);
}

const PORT = 3001;
app.listen(PORT, callback(PORT));
