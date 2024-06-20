import * as React from 'react';
import { useState, useRef } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TitleIcon from '@mui/icons-material/Title';
import RectangleIcon from '@mui/icons-material/Rectangle';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { Toolbar, Typography, Button, ButtonGroup, Divider, IconButton, Menu, MenuItem } from '@mui/material';

import { useStore } from '../Store'

export function SlidesMainToolbar() {
    // Toolbar
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Global Store
    const changeDrawMode = useStore((state) => state.changeDrawMode);

    return (
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
            <IconButton onClick={() => { changeDrawMode("text") }}>
                <TitleIcon/>
            </IconButton>
            <IconButton onClick={() => { changeDrawMode("image") }}>
                <AddPhotoAlternateIcon/>
            </IconButton>
            <IconButton onClick={() => { changeDrawMode("shape") }}>
                <RectangleIcon/>
            </IconButton>
        </ButtonGroup>
    </Toolbar>);
}
