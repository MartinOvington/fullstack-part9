interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsArray = (args: Array<string>): Array<number> => {
  if (args.length < 3) {
    throw new Error('Too few arguments');
  }
  const exerciseHrs = new Array(args.length - 2);

  for (let i = 2; i < args.length; i++) {
    const ans = Number(args[i]);
    if (!isNaN(ans)) {
      exerciseHrs[i - 2] = ans;
    } else {
      throw new Error('One or more arguments was not a number');
    }
  }
  return exerciseHrs as number[];
};

const calculateExercises = (
  exerciseHrs: Array<number>,
  target: number
): Result => {
  const periodLength = exerciseHrs.length;
  const trainingDays = exerciseHrs.filter((hrs) => hrs > 0).length;
  const average =
    exerciseHrs.length === 0
      ? 0
      : exerciseHrs.reduce((a, b) => a + b) / exerciseHrs.length;
  const success = average >= target;
  let rating;
  let ratingDescription;
  if (target * 0.75 < average && average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (average >= target) {
    rating = 3;
    ratingDescription = 'very good';
  } else {
    rating = 1;
    ratingDescription = 'gotta try harder';
  }

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

try {
  const exerciseHrs = parseArgumentsArray(process.argv);
  const result = calculateExercises(exerciseHrs, 1);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
