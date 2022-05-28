import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { useStateValue } from '../state';

import {
  TextField,
  DiagnosisSelection,
  SelectField,
  HealthCheckRatingOption,
  EntryTypeOption,
} from '../AddPatientModal/FormField';

import { HealthCheckRating, EntryFormValues, EntryType } from '../types';

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
];

const entryTypeOptions: EntryTypeOption[] = [
  { value: 'HealthCheck', label: 'HealthCheck' },
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare' },
  { value: 'Hospital', label: 'Hospital' },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HealthCheckField = () => {
  return (
    <SelectField
      label="Health Risk Rating"
      name="healthCheckRating"
      options={healthCheckRatingOptions}
    />
  );
};

const HospitalField = () => {
  return (
    <div>
      <Field
        label="Discharge Date"
        placeholder="YYYY-MM-DD"
        name="dischargeDate"
        component={TextField}
      />
      <Field
        label="Criteria"
        placeholder="Criteria"
        name="dischargeCriteria"
        component={TextField}
      />
    </div>
  );
};

const OccupationHealthcareField = () => {
  return (
    <div>
      <Field
        label="Employer"
        placeholder="Employer Name"
        name="employerName"
        component={TextField}
      />
      <Field
        label="Sick leave start"
        placeholder="YYYY-MM-DD"
        name="startDate"
        component={TextField}
      />
      <Field
        label="Sick leave end"
        placeholder="YYYY-MM-DD"
        name="endDate"
        component={TextField}
      />
    </div>
  );
};

const OptionalFields = (entryType: EntryType) => {
  switch (entryType) {
    case 'HealthCheck':
      return <HealthCheckField />;
    case 'Hospital':
      return <HospitalField />;
    case 'OccupationalHealthcare':
      return <OccupationHealthcareField />;
    default:
      return null;
  }
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        type: 'HealthCheck',
        date: '',
        specialist: '',
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: '',
        dischargeDate: '',
        startDate: '',
        endDate: '',
        dischargeCriteria: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const date_regex = /\d{4}-\d{2}-\d{2}/;
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date && !date_regex.test(values.date)) {
          errors.date = 'Malformed date. Please enter YYYY-MM-DD';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {OptionalFields(values.type)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
