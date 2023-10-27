import express from 'express';
import 'dotenv/config';

const app = express()
const port = process.env.API_PORT;

app.get('/', (req, res) => {
  res.send('QA Health Checker 2000')
})

app.listen(3000, () => {
  console.log(`QA Health Checker 2000 runing on http://localhost:${port}`)
})
