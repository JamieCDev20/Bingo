from flask import Flask, render_template as rt, request
import requests
import os

template_dir = os.path.abspath('./Bin.go/bin-go')

app = Flask(__name__, template_folder='./Bin.go/bin-go/dist/', static_folder='./Bin.go/bin-go/dist/assets')
app.secret_key = "LolVerdantComedyNight"

dir = "/data/Bin.go/bin-go/"

@app.route('/')
def BingoPage():
    return rt("index.html")
