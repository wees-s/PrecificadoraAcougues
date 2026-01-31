from flask import Flask
import subprocess
import webbrowser
import threading

app = Flask(__name__, static_folder="static", static_url_path="")

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/calcular")
def calcular():
    # abre sua calculadora python
    subprocess.Popen(["python", "Calcdesossa.py"])
    return "Calculadora aberta"

def abrir_navegador():
    webbrowser.open("http://127.0.0.1:5000")

if __name__ == "__main__":
    threading.Timer(1, abrir_navegador).start()
    app.run()
