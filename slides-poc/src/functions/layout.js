import { fabric } from 'fabric';

export function randomFromList(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)]
}
export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//genLayout(canvas);

export const titles = ["Slide Title", "Introduction", "Agenda", "Main advantages", "Conclusion"];
export const subtext = ["Hello world", "Testing", "Foo bar", "More things to come"];

export function genLayout(c, title_text, main_text) {
    const top_margin = 20;
    const left_right_margin = 20;
    const layout_vertical_margin = 10;
    const layout_horizontal_margin = 30;
    const title_height = 60;

    const box_width = (800 - 2 * left_right_margin - layout_horizontal_margin) / 2;
    const box_height = 500 - 2 * top_margin - title_height - layout_vertical_margin;

    const sample_text = "- Lorem point 1\n- Ipsum point 2\n- More point 3\n  - Subpoint 1\n  - Subpoint 2";

    const title = new fabric.IText(title_text, {
        top: top_margin,
        left: left_right_margin,
        height: title_height,
        width: 800 - 2 * left_right_margin,
        fontFamily: "Arial",
        fontSize: 30,
        fontWeight: "bold"
    });
    const right_text = new fabric.IText(main_text, {
        top: top_margin + title_height + layout_vertical_margin,
        left: left_right_margin + box_width + layout_horizontal_margin,
        height: box_height,
        width: box_width,
        fontFamily: "Arial",
        fontSize: 15,
        fontWeight: "normal"
    });
    c.add(title);
    c.add(right_text);
    /*fabric.Image.fromURL('https://picsum.photos/id/' + randomInteger(0, 800) + '/' + box_width + '/' + box_height, function(oImg) {
        oImg.set({
            top: top_margin + title_height + layout_vertical_margin,
            left: left_right_margin,
            height: box_height,
            width: box_width
        });
        var img_e = oImg.getElement();
        img_e.setAttribute('crossOrigin', 'anonymous');
        c.add(oImg);
    });*/
}

