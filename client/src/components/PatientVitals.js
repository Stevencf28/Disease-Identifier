import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Container,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	TableHead,
	TablePagination,
} from "@mui/material";
import { gql, useQuery } from "@apollo/client";

const GET_VITALS = gql`
query GetPatientVitals($patientId: String) {
  vitalByPatient(_id: $patientId) {
    nurse {
      _id
      firstName
      lastName
    }
    _id
    temperature
    heartRate
    bloodPressure
    respiratoryRate
    visitDate
  }
}`;

export default function PatientVitals({patientId}) {
  const [patientVitals, setPatientVitals] = useState([]);

  /* Pagination Handlers */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /* Pagination Handlers end */

	const columns = [
		{ id: 'visitDate', label: 'Visit Date', minWidth: 170 },
		{ id: 'temperature', label: 'Temperature', minWidth: 100 },
		{ id: 'heartRate', label: 'Heart Rate', minWidth: 100 },
		{ id: 'bloodPressure', label: 'Blood Pressure', minWidth: 100 },
		{ id: 'respiratoryRate', label: 'Respiratory Date', minWidth: 100 },
	];

  // query vitals list
  const { loading, error, data, refetch } = useQuery(GET_VITALS,
    {
			variables: { "patientId": patientId },
			onCompleted: data => {
      
      if (data && data.vitalByPatient) {
        console.log('patient vitals -> ', data);
				const patientVitals = data.vitalByPatient;
				setPatientVitals(patientVitals);
      }
    }}
  );

  return (
    <div>
      {patientVitals.length > 0 ?
        <Container>
          <Typography variant="h6" color="textPrimary">
            Patient Vitals
          </Typography>
          <Grid>
				<TableContainer sx={{ maxHeight: 640 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{patientVitals
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((vital) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={vital._id}>
											{
												columns.map((column) => {
													let cellValue = vital[column.id];
                          return (
                            <TableCell key={column.id}>
                              {cellValue}
                            </TableCell>
                          )
												})
											}
										</TableRow>
									)
								})
							}
						</TableBody>
					</Table>
				</TableContainer>

				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={patientVitals.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
				</Grid>
        </Container>
        :
        <Typography variant="h6" color="textPrimary">
          Patient Vitals Not found
      	</Typography>
      }
    </div>
  )
}


