import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  CircularProgress,
  Grid,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
    reason: '',
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getAllDoctors');
        const fetchedDoctors = response.data;
        setDoctors(fetchedDoctors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast.error('Error fetching doctors. Please try again.');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date and time into a single UTC timestamp
    const combinedDateTime = new Date(`${formData.date}T${formData.time}:00Z`);
    const utcTimestamp = combinedDateTime.toISOString();

    // Find the selected doctor's name
    const selectedDoctorName = doctors.find((doctor) => doctor.name === formData.doctor)?.name || '';

    const payload = {
      id: uuidv4(), // Generate a unique ID
      time: utcTimestamp,
      doctor: selectedDoctorName, // Pass doctor's name instead of ID
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      reason: formData.reason,
    };

    try {
      const response = await axios.post('http://localhost:3000/book-appointment', payload); // Replace with your API endpoint
      console.log('Appointment booked successfully:', response.data);
      toast.success(`Appointment booked successfully! Reference Number: ${payload.id}`);
      // Clear the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        doctor: '',
        reason: '',
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Error creating the appointment record. Please try again.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Book an Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="doctor-label">Doctor</InputLabel>
              <Select
                labelId="doctor-label"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>
                  Select a doctor
                </MenuItem>
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.name} value={doctor.name}>
                    {doctor.name} - {doctor.specialization}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason for Visit"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Book Appointment
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default BookingPage;
