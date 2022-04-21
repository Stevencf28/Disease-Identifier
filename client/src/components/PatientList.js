import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import {
  Container,
  ListItemButton,
  ListItemText,
  ListItem,
  ListItemIcon,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const GET_PATIENTS = gql`
query ExampleQuery {
  patients {
    _id
    firstName
    lastName
  }
}`;

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  // query patients
  const { loading, error, data, refetch } = useQuery(GET_PATIENTS, 
    {onCompleted: data => {  
      if (data && data.patients) {
        console.log('patients -> ', data);
        setPatients(data.patients);
      }
    }}
  );

  const redirectToPatientActions = (patient) => {
    console.log('go to patient vitals -> ', patient);
    navigate("/patientActions", { state: { patientId: patient._id } });
  }

  return (
    <Container>
      {patients.length > 0 ? 
      (
        <div>
          <Typography variant="h5" color="textPrimary">
            Patients Found
          </Typography>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <nav aria-label="Course List">
              {patients.map((patient, idx) => (
                <ListItem disablePadding key={patient._id} onClick={() => redirectToPatientActions(patient)}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {patient.firstName + " " + patient.lastName}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </nav>
          </Box>
        </div>
      )
      :
      (
        <Typography variant="h5" color="textPrimary">
          No patients found
        </Typography>
      )}
    </Container>
  )
}
