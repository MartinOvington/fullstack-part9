import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises from './calculateExercises';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || daily_exercises === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.send({ error: 'parameters missing' }).status(400);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isNaN(Number(target)) || daily_exercises.length === undefined) {
    return res.send({ error: 'malformed parameters' }).status(400);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i = 0; i < daily_exercises.length; i++) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (isNaN(Number(daily_exercises[i]))) {
        return res.send({ error: 'malformed parameters' }).status(400);
      }
    } catch {
      return res.send({ error: 'malformed parameters' }).status(400);
    }
  }
  /* eslint-disable */
  const exerciseHrs = daily_exercises.map((s: string) => Number(s));
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(exerciseHrs, target);
  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
