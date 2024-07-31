import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppointmentsPage = () => {
  const [doctorName, setDoctorName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleFetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3000/appointments/${doctorName}`); // Replace with your API endpoint
      if (response.data.message === 'Appointments retrieved successfully') {
        setAppointments(response.data.data);
      } else {
        setError('No appointments found.');
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Error fetching appointments.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrescribeClick = (patientName) => {
    navigate(`/prescribe/${encodeURIComponent(patientName)}`);
  };
  const handleViewRecordClick = (patientName) => {
    navigate(`/view-record/${encodeURIComponent(patientName)}`);
  };
  
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Doctor's Appointments
      </Typography>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Doctor's Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFetchAppointments}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Fetch Appointments'}
          </Button>
        </Grid>
      </Grid>
      {error && <Typography color="error">{error}</Typography>}
      {appointments.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Actions</TableCell> {/* New column for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>{new Date(appointment.time).toLocaleString()}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handlePrescribeClick(appointment.name)}
                    >
                      Prescribe
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewRecordClick(appointment.name)}
                    >
                      View Record
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AppointmentsPage;
