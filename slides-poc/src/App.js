import logo from './logo.svg';
import './App.css';

//import React from 'react';
//import { Grid, Toolbar, Typography } from '@material-ui/core';

import * as React from 'react';
import { useState, useRef } from 'react';
import { Grid, Toolbar, Typography, Card, 
  Button, ButtonGroup, Divider, IconButton, 
  Menu, MenuItem, TextField, Select, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

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

/* Copy from Official MUI doc */
function TitlebarBelowImageList() {
  return (
    <ImageList sx={{ width: 300, height: 700 }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];
/* End copy from official MUI doc */

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

    canvas.on('mouse:down', (opt) => {
      console.log(isDrawing)
      if (isDrawingRef.current) {
        setDrawCoords(opt.absolutePointer)
        console.log("Begin pos:")
        console.log(opt.absolutePointer)
      }
    })
    canvas.on('mouse:up', (opt) => {
      if (isDrawingRef.current) {
        //canvas.add()
        canvas.selectionColor = originalColor;
        setDrawing(false)
        setDrawCoords(null)
      }
    })
  }
  //absolutePointer, mouse:up and down
  const onMore = () => {

    if (editor) {
      editor.canvas.selectionColor = 'green'
      setDrawing(true)
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
