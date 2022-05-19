import diagnoses from '../../data/diagnoses';

import { Diagnoses } from '../types';

const getDiagnoses = (): Array<Diagnoses> => {
  return diagnoses;
};

export default { getDiagnoses };
