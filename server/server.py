from flask import Flask, request, send_from_directory
from flask_cors import CORS
import json
import os
import random

app = Flask(__name__)
CORS(app)

@app.route('/handledata', methods=['POST'])
def handle_data():
    # Get the text from the POST request. with headers and body
    text = request.get_json()

    # Log text in console
    print(text)

    # write text to a data json file
    try:
        with open('./data.json', 'a') as outfile:
            print("Writing to data.json")
            json.dump(text, outfile)
            outfile.write('\n')
    except:
        print("Error writing to data.json")

    return('Success!')

@app.route('/getimage', methods=['GET'])
def get_image():
    print("Getting image")
    # Get image from /data
    scans = os.listdir(app.static_folder)

    # Randomly select a scan
    scan = random.choice(scans)

    # Access GIFs inside scan
    gifs = os.listdir(os.path.join(app.static_folder, scan))

    # Randomly select a GIF
    gif = random.choice(gifs)

    print(gif)

    # Return the gif to client POST request
    return send_from_directory(os.path.join(app.static_folder, scan), gif)

if __name__ == '__main__':
    # Run server, print terminal
    # app.run(host='129.132.245.9', port=5000)
    # app.run()
	# app.run(ssl_context=('eduCBAcert.pem', 'eduCBAkey.pem'))
    app.run(ssl_context='adhoc')

