import { fabric as f } from 'fabric'

import axios from 'axios'

const canvas = new f.Canvas('canvas')
const rect = new f.Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    fill: 'red'
})
canvas.add(rect)

const line = new f.Line([160, 170, 250, 100], {
    stroke: 'blue', strokeWidth: 5
})
canvas.add(line)

const cir = new f.Circle({
    radius: 20, fill: 'green', left: 100, top: 100
})
canvas.add(cir)

const text1 = new f.Text('Progress:\n- Testnet Launch\n- Wallet mode', {
    fontSize: 20,
    top: 100,
    left: 100
})
canvas.add(text1)

function TimelineInfographic(canvas, region, texts) {
    let ele = [];
    let { x1, y1, x2, y2 } = region
    let n = texts.length
    let c = (y1 + y2)/2
    canvas.add(new f.Line([ x1, c, x2, c], { stroke: 'grey', strokeWidth: 3 }))
    for (i = 0; i < n; i++) {
        let p = x1 + (x2 - x1)/(n+1) * (i+1)
        let e = (y2 - y1)/2 * 0.6
        let e2 = ((i % 2) == 0) ? c + e : c - e
        canvas.add(new f.Line([p, c, p, e2], { stroke: 'blue', strokeWidth: 5 }))
        canvas.add(new f.Circle({ radius: 20, fill: 'blue', top: e2 - 10, left: p - 10 }))
        canvas.add(new f.Text(texts[i], { fontSize: 20, top: e2, left: p }))
    }
    //console.log(ele)
    //canvas.add(ele)
    //return ele;
}

/*TimelineInfographic(canvas, {x1: 50, y1: 50, x2: 750, y2: 450}, 
    ['2015 Q2\n- Attention is all you need paper\n-New era of NLP', 
    '2018 Q1\n- BERT model', 
    '2021 Q4\n- Early generation of LLM\n- Scaling law\n- Chinhilla paper', 
    '2022 Q2\n- GPT 3 released\n- Hitting public consciousness',
    '2023 Q3\n- Mistral Open source LLM released\n- OSS Catching up to GPT 3.5 level\n- Commodification of intelligence']
)*/

//console.log(m)
    
//canvas.add(m)

document.getElementById('ai').addEventListener('click', async () => {
    // Hey
    const prompt = document.getElementById('req').value
    console.log(prompt)

    const ans = await axios.post('http://localhost:5000/ai/timeline', {
        prompt: prompt
    })
    console.log(ans.data)

    TimelineInfographic(canvas, {x1: 50, y1: 50, x2: 750, y2: 450}, ans.data['milestones'])
}, false)
