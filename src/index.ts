import app from './app';

const port = 3001;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});