import React, { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
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

const GET_PATIENT_ALERTS = gql`
query GetPatientAlerts($patientId: String) {
  alertByPatient(_id: $patientId) {
    message
    _id
  }
}`;

export default function PatientAlerts({patientId}) {
  const [alerts, setAlerts] = useState([]);

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
      { id: 'message', label: 'Notification', minWidth: '100%' },
    ];

  // query alerts
  const { loading, error, data, refetch } = useQuery(GET_PATIENT_ALERTS, 
    {
      variables: { "patientId": patientId },
      onCompleted: data => {  
      if (data && data.alertByPatient) {
        console.log('patient alerts -> ', data);
        setAlerts(data.alertByPatient);
      }
    }}
  );
  return (
    <div>
    {alerts.length > 0 ?
      <Container>
          <Typography variant="h6" color="textPrimary">
            Patient Alerts
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
							{alerts
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((alert) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={alert._id}>
											{
												columns.map((column) => {
													let cellValue = alert[column.id];
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
					count={alerts.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
				</Grid>
      </Container>
      :
      <Typography variant="h6" color="textPrimary">
        No alerts found
      </Typography>
    }
    </div>
  )
}
