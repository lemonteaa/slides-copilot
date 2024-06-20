import { fabric } from 'fabric';

import { create } from 'zustand'

const fabricCreateRect = (pointA, pointB) => {
    const xCoords = [pointA.x, pointB.x].sort((a, b) => a - b);
    const yCoords = [pointA.y, pointB.y].sort((a, b) => a - b);
    const myTestRect = new fabric.Rect({
        top: yCoords[0],
        left: xCoords[0],
        width: xCoords[1] - xCoords[0],
        height: yCoords[1] - yCoords[0],
        fill: 'purple'
    });
    return myTestRect;
}

export const useStore = create((set, get) => ({
  drawMode: "none",
  firstCoord: { x: 0, y: 0},
  canvasMouseDownCB: (opt) => {
    /*console.log(isDrawing)
    if (isDrawingRef.current) {
      setDrawCoords(opt.absolutePointer)
      console.log("Begin pos:")
      console.log(opt.absolutePointer)
    }*/
    console.log(get().drawMode);
    if (get().drawMode !== "none") {
        console.log("Begin pos:")
        console.log(opt.absolutePointer)
        set({ firstCoord: opt.absolutePointer})
    }
  },
  canvasMouseUpCB: (canvas, originalColor) => {
    // Curried fn
    return (opt) => {
        /*canvas.add(myTestRect);
        canvas.selectionColor = originalColor;
        setDrawing(false)
        setDrawCoords(null)*/
        if (get().drawMode !== "none") {
            canvas.add(fabricCreateRect(get().firstCoord, opt.absolutePointer))
            canvas.selectionColor = originalColor
            set({
                drawMode: "none",
                firstCoord: { x: 0, y: 0}
            })
        }
    }
  },
  changeDrawMode: (newMode) => {
    set({ drawMode: newMode })
  }
}))
