import React from "react";
import { FormikProps, ErrorMessage, Formik, Field, Form } from "formik";
import { Diagnosis, HealthCheckRating, HealthCheckEntry } from "../types";
import { DropdownProps, Dropdown, Grid, Button, Form as SemanticForm } from "semantic-ui-react";
import { TextField, Props, SelectField } from "../forms/FormField";
import ModalDialog, { ModalProps } from "../utils/ModalDialog";
import { useStateValue } from "../state";


export type EntryFormValues = Omit<HealthCheckEntry, "id">;

type HealthCheckOption = {
  value: HealthCheckRating;
  label: string;
};

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

const initialValues: EntryFormValues = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating.Healthy,
};

const AddEntryForm: React.FC<Props<EntryFormValues>> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (<div>
    <Formik initialValues={initialValues} onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if(!Date.parse(values.date)){
          errors.date = "Date is not in the correct format";
        }
        
        return errors;
      }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField<HealthCheckRating>
              label="Health check rating"
              name="healthCheckRating"
              options={healthCheckOptions}
            />
            <DiagnosisSelection diagnoses={diagnoses} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  </div>);
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <SemanticForm.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </SemanticForm.Field>
  );
};

const AddEntryModal = (props: ModalProps<EntryFormValues>) => (
  <ModalDialog<EntryFormValues> {...props}>
    <AddEntryForm onSubmit={props.onSubmit} onCancel={props.onClose} />
  </ModalDialog>
);

export default AddEntryModal;