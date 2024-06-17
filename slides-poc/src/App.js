import logo from './logo.svg';
import './App.css';

//import React from 'react';
//import { Grid, Toolbar, Typography } from '@material-ui/core';

import * as React from 'react';
import { Grid, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">
          Title
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Toolbar>
          {/* Add toolbar items here */}
          <Typography variant="h6">Toolbar</Typography>
        </Toolbar>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Column 1</Typography>
        {/* Add content for column 1 here */}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Column 2</Typography>
        {/* Add content for column 2 here */}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Column 3</Typography>
        {/* Add content for column 3 here */}
      </Grid>
    </Grid>
  );
}

export default App;
