import express from 'express';
import calculateBmi from './calculateBmi';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const query = req.query;
  if (query.height && query.weight) {
    const height = Number(query.height);
    const weight = Number(query.weight);
    if (!isNaN(height) && !isNaN(weight)) {
      const result = calculateBmi(height, weight);
      res.send({
        weight: weight,
        height: height,
        bmi: result,
      });
    } else {
      res.send({ error: 'malformed parameters' });
    }
  } else {
    res.send({ error: 'malformed parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
