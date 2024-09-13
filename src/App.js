import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch country data using fetch API
    fetch('https://xcountries-backend.azurewebsites.net/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography variant="h6">Failed to load country data.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {countries.map((country) => (
        <Grid item xs={12} sm={8} md={6} lg={2} key={country.name}>
          <Card>
            <CardContent>
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                style={{ width: '100px', height: 'auto' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder-image.png'; }}
              />
              <Typography variant="h6">{country.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default App;
