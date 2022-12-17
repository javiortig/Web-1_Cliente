
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("ranas.html")

@app.route('/formularioajax')
def formulario_ajax():
    return render_template("formularioajax.html")

@app.route('/proceso', methods=['POST'])
def proceso():
    email = request.form['email']
    name = request.form['name']
    if name and email:
        newName = name[::-1] #Resersing the string name.
        return jsonify({'name':newName})
    return jsonify({'error':'Missing Data!'})

emails = ['javi@gmail.com']

@app.route('/compruebaemail', methods=['GET','POST'])
def compruebaemail():
    try:
        email = request.form['email'] # POST
    except:
        email = request.args['email'] # GET
    if email in emails:
        return(jsonify({'error':'email ya existe'}))
    else:
        return(jsonify({'ok':'formulario Ok!'}))
