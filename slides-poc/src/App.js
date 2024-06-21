import './App.css';

//import React from 'react';
//import { Grid, Toolbar, Typography } from '@material-ui/core';

import * as React from 'react';
import { useState } from 'react';
import { Grid, Typography, Button, MenuItem, TextField, Select } from '@mui/material';

import { useFabricJSEditor } from 'fabricjs-react'

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TitlebarBelowImageList } from './components/TempSlideList'
import { SlidesMainToolbar } from './components/SlidesMainToolbar'
import { MainCanvas } from './components/MainCanvas'

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
  // Fabric JS hooks
  const { editor, onReady } = useFabricJSEditor()

  //Edit attribute form
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
        <SlidesMainToolbar/>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Column 1</Typography>
        <TitlebarBelowImageList/>
      </Grid>
      <Grid item xs={4}>
        <MainCanvas editor={editor} onReady={onReady} />
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
