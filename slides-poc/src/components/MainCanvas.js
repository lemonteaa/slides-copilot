import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

import { useStore } from '../Store'

import { Typography, Card } from '@mui/material';

export function MainCanvas() {
    // Fabric JS hooks
    const { editor, onReady } = useFabricJSEditor()

    const canvasMouseDownCB = useStore((state) => state.canvasMouseDownCB);
    const canvasMouseUpCB = useStore((state) => state.canvasMouseUpCB);
    const changeDrawMode = useStore((state) => state.changeDrawMode);

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

    return (
        <>
            <Typography variant="h6">Column 2</Typography>
            <Card sx={{border: '1px solid green', borderRadius: 2}} variant="outlined">
                    <button onClick={onAddCircle}>Add circle</button>
                    <button onClick={onAddRectangle}>Add Rectangle</button>
                    <button onClick={onMore}>Test</button>
                <FabricJSCanvas className="sample-canvas" onReady={myOnReady} />
            </Card>
        </>
    )
}
