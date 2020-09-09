import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, HealthCheckRating } from "../types";
import { Icon, Button } from "semantic-ui-react";
import { useStateValue, updatePatient } from "../state";
import AddEntryModal, { EntryFormValues } from "../AddEntryModal/AddEntryModal";

const getHealthCheckRatingColor = (rating: HealthCheckRating) => {
  if (rating <= 0)
    return "green";
  if (rating <= 2)
    return "orange";

  return "red";
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <div className="item">
        <h3>{entry.date} <Icon className="user md" /></h3>
        <p>{entry.description}</p>
        <p><Icon className="heart" color={getHealthCheckRatingColor(entry.healthCheckRating)} /></p>
      </div>;
    case "Hospital":
      return <div>
        <h3>{entry.date} <Icon className="hospital" /></h3>
        <p>{entry.description}</p>
        <p>{entry.specialist}</p>
      </div>;
    case "OccupationalHealthcare":
      return <div>
        <h3>{entry.date} <Icon className="stethoscope" /> {entry.employerName}</h3>
        <p>{entry.description}</p>

      </div>;
  }
};



const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();

  const [details, setDetails] = useState<Patient | undefined>(undefined);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const { data: newEntry } = await Axios.post<Entry>(
      `${apiBaseUrl}/patients/${details?.id}/entries`,
      values
    );
    if (details) {
      const updatedPatient: Patient = { ...details, entries:details.entries.concat(newEntry) };
      dispatch(updatePatient(updatedPatient));
    }
    closeModal();
  };

  useEffect(() => {
    const existingPatient = patients[id];

    if (existingPatient && existingPatient.ssn) {
      setDetails(existingPatient);
    } else {
      Axios.get(`${apiBaseUrl}/patients/${id}`).then(res => {
        dispatch(updatePatient(res.data));
        setDetails(res.data);
      });
    }
  }, [id, dispatch, patients]);

  if (!details)
    return <div></div>;

  return (
    <div>
      <h2>{details.name} <Icon className={details.gender === "male" ? "mars" : "venus"} /></h2>
      <p>ssn: {details.ssn}</p>
      <p>occupation: {details.occupation}</p>

      <Button onClick={openModal}>Add new medical entry</Button>
      {details.entries && details.entries.length > 0 &&
        <div className="entry-details">
          <h3>Entries:</h3>
          <div role="list" className="ui celled list">
            {details.entries.map(entry => <div key={entry.id} className="item" >
              <EntryDetails entry={entry} /> </div>)}
          </div>
        </div>}
      <AddEntryModal
        header="Add a new entry"
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel={() => { }}
        error={error}
        onClose={closeModal}
      />
    </div>


  );
};

export default PatientDetailsPage;