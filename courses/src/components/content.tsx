const Content = (props: {
  courseParts: { name: string; exerciseCount: number }[];
}) => {
  return (
    <div>
      {props.courseParts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
