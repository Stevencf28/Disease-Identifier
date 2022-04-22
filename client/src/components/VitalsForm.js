import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
	FormControl,
	Button,
	FormHelperText,
	InputLabel,
	Select,
	MenuItem,
  Typography
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import moment from "moment";
import { gql, useQuery } from "@apollo/client";

const GET_NURSES = gql`query GetNurses {
  nurses {
    _id
    firstName
    lastName
  }
}`;

export default function VitalsForm({ patientId, nurseId, processAddVitals, isFromPatientView }) {
  const [temperature, setTemperature] = useState('0');
  const [heartRate, setHeartRate] = useState('0');
  const [bloodPressure, setBloodPressure] = useState('0');
  const [respiratoryRate, setRespiratoryRate] = useState('0');
  const [visitDate, setVisitDate] = useState(null);
	const [nurses, setNurses] = useState([]);
	const [selectedNurse, setSelectedNurse] = useState('');

  const [visitDateError, setVisitDateError] = useState({error: false, errorMsg: ""});
	const [selectedNurseError, setSelectedNurseError] = useState({error: false, errorMsg: ""});

	  // query nurses only if its a patient 
		const { loading, error, data, refetch } = useQuery(GET_NURSES, 
			{
				skip: !isFromPatientView,
				onCompleted: data => {  
				if (data && data.nurses) {
					console.log('nurses -> ', data);
					setNurses(data.nurses);
				}
			}}
		);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetErrors();

    let isValid = true;

    if (visitDate === null) {
			setVisitDateError({error: true, errorMsg: "Visit Date is required"});
			isValid = false;
		}

		if (isFromPatientView) {
			if (!selectedNurse) {
				setSelectedNurseError({error: true, errorMsg: "Select a nurse"});
				isValid = false;
			}
		}

    if (isValid) {
			const nurseIdValue = isFromPatientView ? selectedNurse._id : nurseId;

			const addVitalsRequest = {
        patientId,
        nurseId: nurseIdValue,
				temperature,
				heartRate,
				bloodPressure,
				respiratoryRate,
				visitDate
			};

      processAddVitals(addVitalsRequest);

			if (isFromPatientView) {
				// reset form
				resetForm();
			}
    }
  }

  const resetErrors = () => {
		setVisitDateError({error: false, errorMsg: ""});
		setSelectedNurseError({error: false, errorMsg: ""});
	}

	const resetForm = () => {
		setTemperature('0');
		setHeartRate('0');
		setBloodPressure('0');
		setRespiratoryRate('0');
		setVisitDate(null);
		setSelectedNurse('');
	}

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" color="textPrimary">
				Add Vitals Information
			</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1 }} fullWidth>
						<TextField
              value={temperature}
							onChange={(e) => setTemperature(e.target.value)}
							label="Temperature"
							variant="outlined"
							color="primary"
							type="text"
						/>
					</FormControl>

          <FormControl sx={{ m: 1 }} fullWidth>
						<TextField
              value={heartRate}
							onChange={(e) => setHeartRate(e.target.value)}
							label="Heart Rate"
							variant="outlined"
							color="primary"
							type="text"
						/>
					</FormControl>

          <FormControl sx={{ m: 1 }} fullWidth>
						<TextField
              value={bloodPressure}
							onChange={(e) => setBloodPressure(e.target.value)}
							label="Blood Pressure"
							variant="outlined"
							color="primary"
							type="text"
						/>
					</FormControl>

          <FormControl sx={{ m: 1 }} fullWidth>
						<TextField
              value={respiratoryRate}
							onChange={(e) => setRespiratoryRate(e.target.value)}
							label="Respiratory Rate"
							variant="outlined"
							color="primary"
							type="text"
						/>
					</FormControl>

					<FormControl sx={{ m: 1 }} error={visitDateError.error} fullWidth>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
                value={visitDate}
								label="Appointment Date"
								onChange={(newValue) => {
									setVisitDate(moment(newValue).format("YYYY-MM-DD"));
								}}
								renderInput={(params) => <TextField {...params} error={visitDateError.error} readOnly />}
							/>
						</LocalizationProvider>
						{visitDateError.error && <FormHelperText>{visitDateError.errorMsg}</FormHelperText>}
					</FormControl>

					{ (nurses.length > 0 && isFromPatientView) && 
						<FormControl sx={{ m: 1 }} error={selectedNurseError.error} fullWidth>
							<InputLabel id="visited-nurse">Nurse</InputLabel>
							<Select
							labelId="visited-nurse"
							id="visited nurse"
							label="Nurse"
							value={selectedNurse}
							onChange={(e) => setSelectedNurse(e.target.value)}
							>
								{nurses.map((nurse) => (
                  <MenuItem
                    key={nurse._id}
                    value={nurse}
                  >
                    {`${nurse.firstName} ${nurse.lastName}`}
                  </MenuItem>
                ))}
							</Select>
							{selectedNurseError.error && <FormHelperText>{selectedNurseError.errorMsg}</FormHelperText>}
						</FormControl>
					}

          <br />
					<br />
					<div style={{display: 'flex', justifyContent:'flex-end', width:'100%'}}>
						<Button
							type="submit"
							color="primary"
							variant="contained"
							endIcon={<KeyboardArrowRight />}
						> Submit </Button>
					</div>
        </form>
      </Box>
    </Container>
  )
}
