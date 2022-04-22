import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { Container, Typography, Tab } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Diagnosis from "./Diagnosis";
import Motivation from "./Motivation";
import Alert from "./Alert";

const GET_PATIENT = gql`
  query GetPatient($patientId: String) {
    patient(id: $patientId) {
      firstName
      lastName
    }
  }
`;

const ADD_ALERT = gql `
mutation CreateAlert($patientId: String!, $message: String!) {
  createAlert(patientId: $patientId, message: $message) {
    _id
  }
}`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MyActions({ showSnackBar }) {
  const [patient, setPatient] = useState(null);
  const { state } = useLocation();
  const patientId = "62603c330bbc2a5bee4ec5a0"; // todo: get from login
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

  // add alerts
  const [addAlert, { AddData, AddLoading, AddError }] = useMutation(ADD_ALERT,
    {
      onCompleted: data => {
        console.log(data);
        showSnackBar({message: 'An alert has been sent', severity: 'success'});
        // go to vitals information tab on success
        setTabValue(0);
      },
      onError: error => {
        showSnackBar({message: 'Failed to send alert', severity: 'error'});
        console.log(error);
    }
  });

  const processAddAlert = (addAlertRequest) => {
    // call the mutation
    console.log('addalertrequest -> ', addAlertRequest);
    addAlert({ variables: addAlertRequest});
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md">
      {patient && (
        <div>
          <Typography variant="h5" color="textPrimary">
            Welcome, {patient.firstName} {patient.lastName}!
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                // disable the tab indicator because it doesn't work well with wrapped container
                TabIndicatorProps={{ sx: { display: "none" } }}
                sx={{
                  "& .MuiTabs-flexContainer": {
                    flexWrap: "wrap",
                  },
                }}
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Actions Tab"
              >
                <Tab label="Send Alert" {...a11yProps(0)} />
                <Tab label="Enter Vitals" {...a11yProps(1)} />
                <Tab label="Diagnosis" {...a11yProps(2)} />
                <Tab label="Motivation" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <Alert processAddAlert={processAddAlert}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Enter Vitals
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Diagnosis />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <Motivation />
            </TabPanel>
          </Box>
        </div>
      )}
    </Container>
  );
}
