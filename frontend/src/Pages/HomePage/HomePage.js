import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    margin: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the Appointment System
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              ...buttonStyle,
              backgroundColor: '#1976d2', // Primary color
            }}
            onClick={() => handleNavigate('/add-doctor')}
          >
            Add Doctor
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              ...buttonStyle,
              backgroundColor: '#dc004e', // Secondary color
            }}
            onClick={() => handleNavigate('/booking')}
          >
            Book Appointment
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              ...buttonStyle,
              backgroundColor: '#9e9e9e', // Default color
            }}
            onClick={() => handleNavigate('/appointments')}
          >
            View Appointments
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
