import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, HealthCheckRating } from "../types";
import { Icon } from "semantic-ui-react";
import { useStateValue, updatePatient } from "../state";

const getHealthCheckRatingColor = (rating: HealthCheckRating) =>{
  if(rating  <= 0)
    return "green";
  if(rating <= 2)
    return "orange";
  
  return "red";
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <div className="item">
        <h3>{entry.date} <Icon className="user md" /></h3>
        <p>{entry.description}</p>
        <p><Icon className="heart" color={getHealthCheckRatingColor(entry.healthCheckRating)}/></p>
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

  // return (
  //   <div>
  //     <p>{entry.date} {entry.description}</p>
  //     {entry.diagnosisCodes && 
  //       <ul>
  //         {entry.diagnosisCodes.map(x => <li key={x}>{x}</li>)}
  //       </ul>}
  //   </div>
  // );
};

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();

  const [details, setDetails] = useState<Patient | undefined>(undefined);

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

      {details.entries &&
        <div className="entry-details">
          <h3>Entries:</h3>
          <div role="list" className="ui celled list">
            {details.entries.map(entry => <div key={entry.id} className="item" >
              <EntryDetails entry={entry} /> </div>)}
          </div>
        </div>}
    </div>
  );
};

export default PatientDetailsPage;