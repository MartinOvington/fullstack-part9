import { CoursePart } from '../types';

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.type) {
    case 'normal':
      return (
        <div>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <p>{course.description}</p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <p>Group projects {course.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <p>{course.description}</p>
          <p>Submission link {course.exerciseSubmissionLink}</p>
        </div>
      );
    default:
      return null;
  }
};

export default Part;
