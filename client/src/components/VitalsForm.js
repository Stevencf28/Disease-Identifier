import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
	FormControl,
	Button,
	FormHelperText,
	FormLabel,
	FormControlLabel,
  Typography
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import moment from "moment";

export default function VitalsForm({ patientId, nurseId, processAddVitals }) {
  const [temperature, setTemperature] = useState('0');
  const [heartRate, setHeartRate] = useState('0');
  const [bloodPressure, setBloodPressure] = useState('0');
  const [respiratoryRate, setRespiratoryRate] = useState('0');
  const [visitDate, setVisitDate] = useState(null);

  const [visitDateError, setVisitDateError] = useState({error: false, errorMsg: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    resetErrors();

    let isValid = true;

    if (visitDate === null) {
			setVisitDateError({error: true, errorMsg: "Visit Date is required"});
			isValid = false;
		}

    if (isValid) {
			const addVitalsRequest = {
        patientId,
        nurseId,
				temperature,
				heartRate,
				bloodPressure,
				respiratoryRate,
				visitDate
			};

      processAddVitals(addVitalsRequest);
    }
  }

  const resetErrors = () => {
		setVisitDateError({error: false, errorMsg: ""});
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
