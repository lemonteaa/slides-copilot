import logo from './logo.svg';
import './App.css';

//import React from 'react';
//import { Grid, Toolbar, Typography } from '@material-ui/core';

import * as React from 'react';
import { useState } from 'react';
import { Grid, Toolbar, Typography, Card, 
  Button, ButtonGroup, Divider, IconButton, 
  Menu, MenuItem, TextField, Select } from '@mui/material';

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

import { PhotoCamera } from '@mui/icons-material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  field1: '10',
  field2: '20',
  field3: '30',
  field4: '40',
  dropdown: 'option1',
};

const validationSchema = Yup.object({
  field1: Yup.number().integer().min(0),
  field2: Yup.number().integer().min(0),
  field3: Yup.number().integer().min(0),
  field4: Yup.number().integer().min(0),
  dropdown: Yup.string().oneOf(['option1', 'option2', 'option3']),
});

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [formData, setFormData] = useState(initialValues);

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: () => {}, // no submit handler needed
  });

  const handleBlur = (field) => {
    formik.setFieldTouched(field, true);
    if (formik.isValid) {
      setFormData(formik.values);
    }
  };

  const handleReset = () => {
    formik.resetForm();
    setFormData(initialValues);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">
          Title
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Toolbar>
          <Typography variant="h6">Toolbar</Typography>
          <ButtonGroup variant="contained">
            <Button>Button 1</Button>
            <Button>
              <PhotoCamera />
            </Button>
            <Button onClick={handleClick}>Button with Dropdown</Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Menu Item 1</MenuItem>
              <MenuItem onClick={handleClose}>Menu Item 2</MenuItem>
            </Menu>
          </ButtonGroup>
          <Divider orientation="vertical" flexItem />
          <ButtonGroup variant="contained">
            <Button>Button 2</Button>
            <IconButton aria-label="camera">
              <PhotoCamera />
            </IconButton>
          </ButtonGroup>
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
        <form>
          <TextField
            label="Field 1"
            value={formik.values.field1}
            onChange={formik.handleChange}
            onBlur={() => handleBlur('field1')}
            error={formik.touched.field1 && Boolean(formik.errors.field1)}
            helperText={formik.touched.field1 && formik.errors.field1}
          />
          <TextField
            label="Field 2"
            value={formik.values.field2}
            onChange={formik.handleChange}
            onBlur={() => handleBlur('field2')}
            error={formik.touched.field2 && Boolean(formik.errors.field2)}
            helperText={formik.touched.field2 && formik.errors.field2}
          />
          <TextField
            label="Field 3"
            value={formik.values.field3}
            onChange={formik.handleChange}
            onBlur={() => handleBlur('field3')}
            error={formik.touched.field3 && Boolean(formik.errors.field3)}
            helperText={formik.touched.field3 && formik.errors.field3}
          />
          <TextField
            label="Field 4"
            value={formik.values.field4}
            onChange={formik.handleChange}
            onBlur={() => handleBlur('field4')}
            error={formik.touched.field4 && Boolean(formik.errors.field4)}
            helperText={formik.touched.field4 && formik.errors.field4}
          />
          <Select
            label="Dropdown"
            value={formik.values.dropdown}
            onChange={formik.handleChange}
            onBlur={() => handleBlur('dropdown')}
            error={formik.touched.dropdown && Boolean(formik.errors.dropdown)}
            helperText={formik.touched.dropdown && formik.errors.dropdown}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
          <Button onClick={handleReset}>Reset</Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default App;
