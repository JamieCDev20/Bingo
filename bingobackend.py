from flask import Flask, render_template
from flask_socketio import SocketIO
import json

app = Flask(__name__, template_folder='./Bin.go/bin-go/dist/', static_folder='./Bin.go/bin-go/dist/assets')
socketio = SocketIO(app, cors_allowed_origins="*")

message = 'message'
data_response = 'data_response'

data = {
    "items": [
    ]
}

for i in range(9):
    data["items"].append({
        "title": f"bingo card {i+1}",
        "complete": False
    })

# Default route to serve index.html
@app.route('/')
def index():
    return render_template('index.html')

# WebSocket events
@socketio.on('connect')
def handle_connect():
    print("Client connected")
    socketio.emit(message, {'data': 'Connected!'})

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

@socketio.on('clicked')
def handle_click(dat):
    print("CLICKED ", dat)
    data['items'][dat["data"]]['complete'] = True
    socketio.emit(data_response, data)

@socketio.on('get_data')
def handle_get_data():
    socketio.emit(data_response, data)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=True)
