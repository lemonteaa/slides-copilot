import logo from './logo.svg';
import './App.css';

//import React from 'react';
//import { Grid, Toolbar, Typography } from '@material-ui/core';

import * as React from 'react';
import { Grid, Toolbar, Typography, Card } from '@mui/material';

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

function App() {
  const { editor, onReady } = useFabricJSEditor()
  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle()
  }
  const myOnReady = (canvas) => {
    onReady(canvas);
    canvas.setHeight(500);
    canvas.setWidth(800);
  }
  const onMore = () => {
    editor?.canvas.setHeight(500);
    editor?.canvas.setWidth(800);
  }

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
        <Card sx={{border: '1px solid green', borderRadius: 2}} variant="outlined">
          <button onClick={onAddCircle}>Add circle</button>
          <button onClick={onAddRectangle}>Add Rectangle</button>
          <button onClick={onMore}>Test</button>
          <FabricJSCanvas className="sample-canvas" onReady={myOnReady} />
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Column 3</Typography>
        {/* Add content for column 3 here */}
      </Grid>
    </Grid>
  );
}

export default App;
