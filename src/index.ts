import app from './app';
import config from './env';

const HOST = config.HOST || 'localhost';
const PORT = config.PORT || 3001;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://${HOST}:${PORT}`);
});