const Total = (props: {
  courseParts: { name: string; exerciseCount: number }[];
}) => (
  <p>
    Number of exercises{' '}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;
