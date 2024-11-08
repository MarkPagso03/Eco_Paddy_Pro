from flask import Flask, render_template, request, jsonify
import matplotlib.pyplot as plt
import io
import base64
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    input1 = float(data['input1'])
    input2 = float(data['input2'])
    result = input1 + input2

    # Generate plot
    img = io.BytesIO()
    x = np.array([input1, input2, result])
    y = np.array([1, 2, 3])
    plt.plot(y, x)
    plt.savefig(img, format='png')
    img.seek(0)
    graph_url = base64.b64encode(img.getvalue()).decode()

    return jsonify({'result': result, 'graph': graph_url})

if __name__ == '__main__':
    app.run(debug=True)
