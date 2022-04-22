import React, { useState, useContext } from 'react'
import { gql, useQuery, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  Container,
  Typography,
  Tab
} from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import PatientVitals from './PatientVitals';
import VitalsForm from './VitalsForm';
import SendMotivation from './SendMotivation';
import PatientAlerts from './PatientAlerts';
import { UserContext } from '../shared/UserContext';

const GET_PATIENT = gql`
query GetPatient($patientId: String) {
  patient(id: $patientId) {
    firstName
    lastName
  }
}`;

const ADD_PATIENT_VITALS = gql `
mutation CreateVitals($nurseId: String!, $patientId: String!, $temperature: String!, 
          $heartRate: String!, $bloodPressure: String!, $respiratoryRate: String!, $visitDate: Date!) {
  createVitals(nurseId: $nurseId, patientId: $patientId, temperature: $temperature, heartRate: $heartRate, 
          bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate, visitDate: $visitDate) {
    _id
  }
}`;

const ADD_MOTIVATION = gql`
mutation Mutation($content: String!, $type: String!, $patientId: String!) {
  createMotivation(content: $content, type: $type, patientId: $patientId) {
    _id
  }
}`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NursePatientActions({showSnackBar}) {
  const [patient, setPatient] = useState(undefined);
  const { state } = useLocation();
  const { user } = useContext(UserContext);
  const patientId = state.patientId;
  const nurseId = user.userId;
  console.log('patient nurse', patientId, nurseId);
  const [tabValue, setTabValue] = useState(0); 

  // get the patient name
	const { loading, error, data, refetch } = useQuery(GET_PATIENT, 
    {
			variables: { "patientId": patientId },
			onCompleted: data => {
      
      if (data && data.patient) {
        console.log('patientData -> ', data);
				const patientData = data.patient;
				setPatient(patientData);
      }
    }}
  );

  // add patient vitals
  const [addVitals, { AddData, AddLoading, AddError }] = useMutation(ADD_PATIENT_VITALS,
		{
		onCompleted: data => {
			console.log(data);
			showSnackBar({message: 'Add Vitals Successful', severity: 'success'});
			// go to vitals information tab on success
      setTabValue(0);
		},
		onError: error => {
			showSnackBar({message: 'Add Vitals Failed', severity: 'error'});
			console.log(error);
		}
	});

  // add patient motivation
  const [addMotivation, { AddMotivationData, AddMotivationLoading, AddMotivationError }] = useMutation(ADD_MOTIVATION,
    {
    onCompleted: data => {
      console.log(data);
      showSnackBar({message: 'Add Motivations Successful', severity: 'success'});
    },
    onError: error => {
      showSnackBar({message: 'Add Motivations Failed', severity: 'error'});
      console.log(error);
    }
  });

  const processAddVitals = (addVitalsRequest) => {
    // call the mutation
    console.log('addvitalrequest -> ', addVitalsRequest);
		addVitals({ variables: addVitalsRequest });
  }

  const processAddMotivation = (addMotivationRequest) => {
    // call the mutation
    console.log('add motivation request -> , ', addMotivationRequest);
    addMotivation({variables: addMotivationRequest})
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md">
      {patient &&
        (
          <div>
            <Typography variant="h5" color="textPrimary">
              {patient.firstName} {patient.lastName} Records
            </Typography>


            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  // disable the tab indicator because it doesn't work well with wrapped container
                  TabIndicatorProps={{ sx: { display: 'none' } }}
                  sx={{
                    '& .MuiTabs-flexContainer': {
                      flexWrap: 'wrap',
                    },
                  }}
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="Actions Tab"
                >
                  <Tab label="Vital Informaton" {...a11yProps(0)} />
                  <Tab label="Enter Vitals" {...a11yProps(1)} />
                  <Tab label="Send Motivation" {...a11yProps(2)} />
                  <Tab label="Patient Alerts" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <PatientVitals patientId={patientId} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <VitalsForm patientId={patientId} nurseId={nurseId} processAddVitals={processAddVitals} />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <SendMotivation processAddMotivation={processAddMotivation} patientId={patientId} />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <PatientAlerts patientId={patientId} />
              </TabPanel>
            </Box>
          </div>
        )
      }
    </Container>
  )
}
