from flask import Flask, render_template as rt, request
from flask_socketio import SocketIO, emit
# from flask_cors import CORS
import os
import threading
import asyncio
from websockets.server import serve

template_dir = os.path.abspath('./Bin.go/bin-go')

app = Flask(__name__, template_folder='./Bin.go/bin-go/dist/', static_folder='./Bin.go/bin-go/dist/assets')
app.secret_key = "LolVerdantComedyNight"

socket = SocketIO(app)

# async def echo(websocket):
#     async for message in websocket:
#         await websocket.send(message)

# async def main():
#     async with serve(echo, "ws://localhost", 5001):
#         await asyncio.get_running_loop().create_future()

@socket.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect",{"data":f"id: {request.sid} is connected"})

@socket.on('data')
def handle_message(data):
    """event listener when client types a message"""
    print("data from the front end: ",str(data))
    emit("data",{'data':data,'id':request.sid},broadcast=True)


@app.route('/')
def BingoPage():
    return rt("index.html")

if __name__ == "__main__":
    # app.run()
    socket.run(app, debug=True, port=5000)