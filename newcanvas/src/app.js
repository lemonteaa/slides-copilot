import { fabric as f } from 'fabric'

import Dexie from 'dexie';

const db = new Dexie('newCanvas_SaveSlides');

db.version(1).stores({
    slides: '++id, content, preview'
})


const canvas = new f.Canvas('canvas')
/*const rect = new f.Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    fill: 'red'
})
canvas.add(rect)*/

function genLayout(c, title_text, main_text) {
    const top_margin = 20;
    const left_right_margin = 20;
    const layout_vertical_margin = 10;
    const layout_horizontal_margin = 30;
    const title_height = 60;

    const box_width = (800 - 2 * left_right_margin - layout_horizontal_margin) / 2;
    const box_height = 500 - 2 * top_margin - title_height - layout_vertical_margin;

    const sample_text = "- Lorem point 1\n- Ipsum point 2\n- More point 3\n  - Subpoint 1\n  - Subpoint 2";

    const title = new f.IText(title_text, {
        top: top_margin,
        left: left_right_margin,
        height: title_height,
        width: 800 - 2 * left_right_margin,
        fontFamily: "Arial",
        fontSize: 30,
        fontWeight: "bold"
    });
    const right_text = new f.IText(main_text, {
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
    f.Image.fromURL('https://picsum.photos/id/' + randomInteger(0, 800) + '/' + box_width + '/' + box_height, function(oImg) {
        oImg.set({
            top: top_margin + title_height + layout_vertical_margin,
            left: left_right_margin,
            height: box_height,
            width: box_width
        });
        var img_e = oImg.getElement();
        img_e.setAttribute('crossOrigin', 'anonymous');
        c.add(oImg);
    });
}

function randomFromList(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)]
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//genLayout(canvas);

const titles = ["Slide Title", "Introduction", "Agenda", "Main advantages", "Conclusion"];
const subtext = ["Hello world", "Testing", "Foo bar", "More things to come"];

document.getElementById('addslide').addEventListener('click', async () => {
    canvas.remove(...canvas.getObjects());
    genLayout(canvas, randomFromList(titles), randomFromList(subtext));
    canvas.renderAll();
})

document.getElementById('saveslide').addEventListener('click', async () => {
    await db.slides.add({ content: canvas.toJSON(), preview: canvas.toDataURL('png')})
    alert("Saved to DB.")
})

document.getElementById('loadSlide').addEventListener('click', async () => {
    var slides = await db.slides.toArray();
    console.log(slides);
    document.getElementById('slidepreviews').innerHTML = '';
    for (const s of slides) {
        console.log(s);
        var elem = document.createElement("img");
        elem.setAttribute("src", s.preview)
        elem.setAttribute("height", "125");
        elem.setAttribute("width", "200");
        elem.setAttribute("alt", s.id);
        document.getElementById('slidepreviews').appendChild(elem);
    }

})



/*document.getElementById('ai').addEventListener('click', async () => {
    // Hey
    const prompt = document.getElementById('req').value
    console.log(prompt)

    const ans = await axios.post('http://localhost:5000/ai/timeline', {
        prompt: prompt
    })
    console.log(ans.data)

    TimelineInfographic(canvas, {x1: 50, y1: 50, x2: 750, y2: 450}, ans.data['milestones'])
}, false)*/

