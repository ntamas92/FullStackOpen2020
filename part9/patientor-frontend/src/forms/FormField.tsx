import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Form } from "semantic-ui-react";

export interface Props<TFormValues> {
  onSubmit: (values: TFormValues) => void;
  onCancel: () => void;
}


type SelectFieldOption<T> = {
  value: T;
  label: string;
};

// props for select field component
type SelectFieldProps<T> = {
  name: string;
  label: string;
  options: SelectFieldOption<T>[];
};

export class SelectField<T extends string | number | undefined> extends React.Component<SelectFieldProps<T>> {
  render() {
    return (
      <Form.Field>
        <label>{this.props.label}</label>
        <Field as="select" name={this.props.name} className="ui dropdown">
          {this.props.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </Field>
      </Form.Field>
    );
  }
}

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);


