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

const calculateExercises = (exerciseHrs: Array<number>): Result => {
  const periodLength = exerciseHrs.length;
  const trainingDays = exerciseHrs.filter((hrs) => hrs > 0).length;
  const average =
    exerciseHrs.reduce((a, b) => a + b) /
    (exerciseHrs.length === 0 ? 1 : exerciseHrs.length);
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

try {
  const exerciseHrs = parseArgumentsArray(process.argv);
  const result = calculateExercises(exerciseHrs);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
