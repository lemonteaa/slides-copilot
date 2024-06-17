import json
from flask import Flask, jsonify, request
from flask_cors import CORS

import requests
import os

url = os.environ['LLM_URL_BASE'] # example "https://api.unify.ai/v0/chat/completions"
headers = {
    "Authorization": f"Bearer {os.environ['LLM_API_KEY']}",
}

app = Flask(__name__)
CORS(app)

prompt_template = """Design appropiate texts for a timeline/milestone infographics in a presentation.
Your response should be a JSON array, where each item is a multiline string whose first two line is a subtitle with time (year + quarter), and subsequent lines are a markdown list of major events or achievements in that time period.
Example of response with the right format: ['Title1\\n2007 Q1\\n- First item\\n- Second item', 'Title2\\n2008 Q3\\n- Another item']
Makes no other output or commentary.
Here is the topic of the infographic the user requested: {p}"""

@app.route('/ai/timeline', methods=['POST'])
def text_service():
    input = json.loads(request.data)
    prompt = input['prompt']
    print(prompt)

    payload = {
        "model": "mistral-7b-instruct-v0.2@perplexity-ai",
        "messages": [
            {
                "role": "user",
                "content": prompt_template.format(p=prompt)
            }],
        "stream": False
    }

    response = requests.post(url, json=payload, headers=headers, stream=False)
    ret_msg = response.json()['choices'][0]['message']['content']

    try:
        print(ret_msg)
        ret_msg = ret_msg.removeprefix("```json")
        ret_msg = ret_msg.removeprefix("```js")
        ret_msg = ret_msg.removeprefix("```")
        ret_msg = ret_msg.removesuffix("```\n")
        ret_msg = ret_msg.removesuffix("```")
        print(ret_msg)
        parsed = json.loads(ret_msg)
        return jsonify({"success": True, "milestones": parsed})
    except Exception as e:
        print(e)
        return jsonify({"success": False, "reason": "LLM result parse failure."})

app.run()
