import React from 'react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import ModalDialog, { ModalProps } from '../utils/ModalDialog';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal = (props: ModalProps<PatientFormValues>) => (
  <ModalDialog<PatientFormValues> {...props}>
    <AddPatientForm onSubmit={props.onSubmit} onCancel={props.onClose} />
  </ModalDialog>
);

export default AddPatientModal;
