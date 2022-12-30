import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import boom from 'express-boom';

import checkAuth from './middlewares/auth';
import routes from './routes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }),
);
app.use(bodyParser.json());
app.use(boom());
app.use('/api', checkAuth(), routes);
app.use('/api', (req, res) => {
  if (req.originalUrl !== '/api') {
    res.status(404);
    res.send();
    return;
  }
  res.status(200);
  res.send(`
    <h1>Welcome to the RR Draft Server</h1>
    <h2>Environment: <strong>${process.env.ENV_NAME}</strong></h2>
  `);
});

export default app;
