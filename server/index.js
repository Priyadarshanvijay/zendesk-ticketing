import dotenv from 'dotenv';
import express from 'express';
import ExpressApp from './src/express.js';

const startServer = async () => {
  dotenv.config();
  const app = express();
  const port = process.env.PORT || 3000;
  ExpressApp({ app });
  app.listen(port, () => console.log(`Server started at port ${port}`))
    .on('error', () => {
      process.exit(1);
    });;
}

startServer();