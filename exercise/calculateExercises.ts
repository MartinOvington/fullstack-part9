interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const TARGET = 1;

const calculateExercises = (trainingHrs: Array<number>): Result => {
  const periodLength = trainingHrs.length;
  const trainingDays = trainingHrs.filter((hrs) => hrs > 0).length;
  const average =
    trainingHrs.reduce((a, b) => a + b) /
    (trainingHrs.length === 0 ? 1 : trainingHrs.length);
  const success = average >= TARGET;
  let rating;
  let ratingDescription;
  if (TARGET * 0.75 < average && average < TARGET) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (average >= TARGET) {
    rating = 3;
    ratingDescription = 'very good';
  } else {
    rating = 1;
    ratingDescription = 'gotta try harder';
  }
  const target = TARGET;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([1, 0, 1.5, 2, 0, 1]));
