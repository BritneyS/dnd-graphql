import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const ENV_PORT = process.env.ENV_PORT;

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(ENV_PORT, () =>
  console.log(`Example app listening on port ${ENV_PORT}`),
);

console.log('Hello Node.js project.');