import { fabric } from 'fabric';

import { create } from 'zustand'

import { produce } from 'immer'

const fabricCreateRegionObj = (pointA, pointB) => {
    const xCoords = [pointA.x, pointB.x].sort((a, b) => a - b);
    const yCoords = [pointA.y, pointB.y].sort((a, b) => a - b);
    return {
        top: yCoords[0],
        left: xCoords[0],
        width: xCoords[1] - xCoords[0],
        height: yCoords[1] - yCoords[0]
    }
}

const fabricCreateDynamic = (pointA, pointB, objType) => {
    const attr = fabricCreateRegionObj(pointA, pointB);
    if (objType === "shape") {
        //Hack to be a rect for now
        return new fabric.Rect({
            ...attr,
            fill: 'purple'
        })
    } else if (objType === "text") {
        const sample_text = "Lorem Ipsum...";
        return new fabric.IText(sample_text, {
            ...attr,
            fontFamily: "Arial",
            fontSize: 15,
            fontWeight: "normal"
        })
    } else {
        throw "Unknown fabric object type: " + objType
    }
}


//TODO: addNewSlide: may insert in middle
export const useStore = create((set, get) => ({
  drawMode: "none",
  firstCoord: { x: 0, y: 0},
  activeSlide: 0,
  slides: [],
  initSlide: (slide) => {
    set({ slides: [slide] })
  },
  loadSlide: (canvas, idx) => {
    canvas.loadFromJSON(get().slides[idx].content)
  },
  gotoSlide: (idx) => {
    set({ activeSlide: idx })
  },
  persistCurrentSlide: (canvas) => {
    set(produce((state) => {
        state.slides[state.activeSlide] = {
            content: canvas.toJSON(),
            preview: canvas.toDataURL('png')
        }
    }))
  },
  addNewSlide: (canvas) => {
    set(produce((state) => {
        state.slides.push({
            content: canvas.toJSON(),
            preview: canvas.toDataURL('png')
        });
        state.activeSlide += 1
    }))
  },
  canvasMouseDownCB: (canvas) => {
    return (opt) => {
        /*console.log(isDrawing)
        if (isDrawingRef.current) {
        setDrawCoords(opt.absolutePointer)
        console.log("Begin pos:")
        console.log(opt.absolutePointer)
        }*/
        console.log(get().drawMode);
        if (get().drawMode !== "none") {
            canvas.selectionColor = 'green'
            console.log("Begin pos:")
            console.log(opt.absolutePointer)
            set({ firstCoord: opt.absolutePointer})
        }
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
            canvas.add(fabricCreateDynamic(get().firstCoord, opt.absolutePointer, get().drawMode))
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
