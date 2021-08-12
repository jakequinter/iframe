import { connectStateResults } from 'react-instantsearch-dom';

import OccurrenceCard from './OccurrenceCard';

import styles from '../../styles/Occurrences.module.scss';

type Occurrences = {
  hits: any;
};

export default function Occurrences({ hits }: Occurrences) {
  return (
    <div className={styles.container}>
      {hits &&
        hits.map(hit => (
          <OccurrenceCard
            key={hit.objectID}
            courseName={hit.course.name}
            instructorName={hit.instructor.name}
            startTime={hit.dates.Day1_StartTime}
            price={hit.course.price}
            venue={hit.course.location.name}
            city={hit.course.location.city}
            state={hit.course.location.state}
          />
        ))}
    </div>
  );
}