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

        canvas.on('mouse:down:before', canvasMouseDownCB(canvas));
        canvas.on('mouse:up', canvasMouseUpCB(canvas, originalColor));
    }

    return (
        <>
            <Typography variant="h6">Main Canvas</Typography>
            <Card sx={{border: '1px solid green', borderRadius: 2}} variant="outlined">
                <FabricJSCanvas className="sample-canvas" onReady={myOnReady} />
            </Card>
        </>
    )
}
