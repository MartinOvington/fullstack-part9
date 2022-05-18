import Part from './part';
import { CoursePart } from '../types';

const Content = (props: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {props.courseParts.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </div>
  );
};

export default Content;
