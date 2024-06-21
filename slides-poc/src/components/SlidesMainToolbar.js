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

import { Toolbar, Typography, Button, ButtonGroup, Divider, IconButton, Menu, MenuItem, Modal, Box, Link } from '@mui/material';

import { useStore } from '../Store'

import * as FabricLayout from '../functions/layout'

export function SlidesMainToolbar({ fabricEditor }) {
    // Toolbar
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [downloadModalOpen, setDownloadModalOpen] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        console.log(event.target.textContent)
        console.log(event.target.getAttribute("data-item"))
        setAnchorEl(null);

        if (event.target.getAttribute("data-item") == "two-cols") {
            if (fabricEditor) {
                const canvas = fabricEditor.canvas;
                //First save current slide
                persistCurrentSlide(canvas);
                //Then generate new canvas
                canvas.remove(...canvas.getObjects());
                FabricLayout.genLayout(canvas, FabricLayout.randomFromList(FabricLayout.titles), FabricLayout.randomFromList(FabricLayout.subtext));
                canvas.renderAll();
                //Then update
                addNewSlide(canvas);
            }
        }
    };

    // Global Store
    const changeDrawMode = useStore((state) => state.changeDrawMode);
    const persistCurrentSlide = useStore((state) => state.persistCurrentSlide);
    const addNewSlide = useStore((state) => state.addNewSlide);
    const allSlides = useStore((state) => state.slides);

    return (
    <Toolbar>
        <Typography variant="h6">Toolbar</Typography>
        <ButtonGroup sx={{ mx: 2 }} variant="outlined">
            <Button startIcon={ <FileDownloadIcon/> } onClick={() => { setDownloadModalOpen(true); }}>Download</Button>
            <Modal
                open={downloadModalOpen}
                onClose={() => { setDownloadModalOpen(false); }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Download all slides: click link below
                </Typography>
                <Link href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allSlides))} download="myslide.json">Link</Link>
                </Box>
            </Modal>
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
                <MenuItem data-item={"title"} onClick={handleClose}>Title and Subtitle</MenuItem>
                <MenuItem data-item={"two-cols"} onClick={handleClose}>Two Columns</MenuItem>
                <MenuItem data-item={"empty"} onClick={handleClose}>Empty</MenuItem>
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
