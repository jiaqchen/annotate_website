from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/annotateme', methods=['POST'])
def handle_data():
    # Get the text from the POST request. with headers and body
    text = request.get_json()

    # Log text in console
    print(text)

    # write text to a data json file
    with open('./data.json', 'a') as outfile:
        json.dump(text, outfile)
        outfile.write('\n')

    return('Success!')

if __name__ == '__main__':
    # Run server, print terminal
    app.run()

