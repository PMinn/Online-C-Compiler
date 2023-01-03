from ctypes import *
import os
import time
import random
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import math

app = Flask(__name__)
CORS(app, resources={
    r"/": {
        "origins": '*'
    },
    r"/*": {
        "origins": ['http://127.0.0.1:5500', 'https://pminn.github.io']
    }
})


@app.route("/", methods=['GET', 'HEAD'])
def index():
    return ""


@app.route("/upload", methods=['POST'])
def upload():
    filename = f'ccode{int(time.time())}'
    with open(f'{filename}.c', 'w') as file:
        file.write(request.form['code'])
    return jsonify({'filename': filename})


@app.route("/compile", methods=['POST'])
def toSo():
    filename = request.form['filename']
    cmd = f"g++ -o {filename} {filename}.c"
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    output, error = p.communicate()
    if p.returncode != 0:
        return jsonify({'success': 0, 'error': error.decode('utf-8')}), 400
    else:
        return jsonify({'success': 1})


@app.route("/execute", methods=['POST'])
def execute():
    cmd = f"./{request.form['filename']}"
    inputValue = request.form['input']
    startTime = time.time()
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    try:
        res = p.communicate(timeout=3, input=inputValue.encode('utf-8'))
    except subprocess.TimeoutExpired:
        p.kill()
        return jsonify({'returncode': p.returncode, 'error': '執行超過3秒'}), 400
    if p.returncode != 0:
        return jsonify({
            'returncode': p.returncode,
            'error': res[1].decode('utf-8')
        }), 400
    else:
        return jsonify({
            'returncode': p.returncode,
            'result': res[0].decode('utf-8'),
            'spend': math.ceil(1000 * (time.time() - startTime))
        })


@app.route("/clear", methods=['GET'])
def clear():
    for filename in os.listdir("./"):
        if filename[:5] == 'ccode':
            os.remove(f"./{filename}")
    return ''


app.run(host='0.0.0.0', port=random.randint(2000, 9999))