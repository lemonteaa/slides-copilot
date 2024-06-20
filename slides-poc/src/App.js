import logo from './logo.svg';
import './App.css';

//import React from 'react';
//import { Grid, Toolbar, Typography } from '@material-ui/core';

import * as React from 'react';
import { useState, useRef } from 'react';
import { Grid, Toolbar, Typography, Card, 
  Button, ButtonGroup, Divider, IconButton, 
  Menu, MenuItem, TextField, Select } from '@mui/material';

import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

import { PhotoCamera } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TitleIcon from '@mui/icons-material/Title';
import RectangleIcon from '@mui/icons-material/Rectangle';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useStore } from './Store'

import { TitlebarBelowImageList } from './components/TempSlideList'

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

  const canvasMouseDownCB = useStore((state) => state.canvasMouseDownCB);
  const canvasMouseUpCB = useStore((state) => state.canvasMouseUpCB);
  const changeDrawMode = useStore((state) => state.changeDrawMode);
  //Totally a hack you need a proper state management lib like zustand for it to work
  const [ isDrawing, setDrawing ] = useState(false);
  const [ drawCoords, setDrawCoords ] = useState(null);
  const isDrawingRef = useRef();
  const drawCoordsRef = useRef();
  isDrawingRef.current = isDrawing;
  drawCoordsRef.current = drawCoords;
  //const [ selectionColor, setSelectionColor ] = useState("");
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

    // TODO: object:selected vs mouse:down vs selection:created
    // For selection: created/updated/cleared, options.selected and options.deselected are arrays
    canvas.on('selection:created', function(options) {
      //if (options.target) {
      //  console.log('an object was selected! ', options.target.type);
      //}
      console.log(options)
    });

    //setSelectionColor(canvas.selectionColor);
    const originalColor = canvas.selectionColor;

    canvas.on('mouse:down', canvasMouseDownCB);
    canvas.on('mouse:up', canvasMouseUpCB(canvas, originalColor));
  }
  //absolutePointer, mouse:up and down
  const onMore = () => {

    if (editor) {
      editor.canvas.selectionColor = 'green'
      //setDrawing(true)
      changeDrawMode("rect");
    }

    //editor?.canvas.setHeight(500);
    //editor?.canvas.setWidth(800);
    /*let originalColor = editor.canvas.selectionColor;
    if (editor) {
      editor.canvas.selectionColor = 'green';
      //editor.canvas.selection = false;
      editor.canvas.on('mouse:down', (opt) => {
        console.log(opt.absolutePointer)
      })
      editor.canvas.on('mouse:up', (opt) => {
        console.log(opt.absolutePointer)
        editor.canvas.selectionColor = originalColor;
        //editor.canvas.selection = true;
      })
    }*/
  }

  // Toolbar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Toolbar>
          <Typography variant="h6">Toolbar</Typography>
          <ButtonGroup sx={{ mx: 2 }} variant="outlined">
            <Button startIcon={ <FileDownloadIcon/> } >Download</Button>
            <Button onClick={handleClick} endIcon={ <ArrowDropDownIcon/> }>Add New Slide</Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Title and Subtitle</MenuItem>
              <MenuItem onClick={handleClose}>Two Columns</MenuItem>
              <MenuItem onClick={handleClose}>Empty</MenuItem>
            </Menu>
          </ButtonGroup>
          <Divider orientation="vertical" flexItem />
          <ButtonGroup sx={{ mx: 2 }} variant="outlined">
            <Typography variant="h6">Insert:</Typography>
            <IconButton>
              <TitleIcon/>
            </IconButton>
            <IconButton>
              <AddPhotoAlternateIcon/>
            </IconButton>
            <IconButton>
              <RectangleIcon/>
            </IconButton>
          </ButtonGroup>
        </Toolbar>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Column 1</Typography>
        <TitlebarBelowImageList/>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Column 2</Typography>
        <Card sx={{border: '1px solid green', borderRadius: 2}} variant="outlined">
          <button onClick={onAddCircle}>Add circle</button>
          <button onClick={onAddRectangle}>Add Rectangle</button>
          <button onClick={onMore}>Test</button>
          <FabricJSCanvas className="sample-canvas" onReady={myOnReady} />
        </Card>
        <span>isDrawing: {isDrawing.toString()}, drawCoords: {drawCoords ? drawCoords.x : "none"}</span>
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
