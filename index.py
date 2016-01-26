# -*- coding: utf-8 -*-

from flask import Flask
# from flask.ext.sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, url_for
from sqlalchemy import select
from sqlalchemy import *
from sqlalchemy.orm import *
import geojson
import json
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import psycopg2
import cgi

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

engine = create_engine('postgresql://postgres:postgres@localhost/postgres')

app = Flask(__name__)
# app.config.from_pyfile('config.py')
# db = SQLAlchemy(app)

metadata = MetaData(engine)
Session = sessionmaker(bind=engine)
session = Session()


Base = declarative_base(metadata=metadata)
#
# class hska_exp(Base):
#     __tablename__ = "hska_exp"
#     ID= Column(Numeric, primary_key=True)
#     Name= Column(Text(120))
#     Lon= Column(Numeric(20))
#     Lat= Column(Numeric(20))
#     Date= Column(Text(10))
#     Hour= Column(Text(10))
#     ODL= Column(Numeric)

class hska_exp2(Base):
    __tablename__ = "hska_exp2"
    ID= Column(Numeric, primary_key=True)
    Name= Column(Text(120))
    Lon= Column(Numeric(20))
    Lat= Column(Numeric(20))
    Date= Column(Text(10))
    Hour= Column(Text(10))
    ODL= Column(Numeric)


#geocoll = session.query(hska_exp).all()
# i=0

# namef='tralari'
# file=open('radiologic.json', 'w')
# file.write('[{\n\t')
# for hska_exp in session.query(hska_exp).order_by(asc(hska_exp.ID)).all():
    # namei=hska_exp.Name
    # if namei!=namef and i==0:
        # file.write('"name": "'+ hska_exp.Name+'",\n\t"lon": '+str(hska_exp.Lon)+',\n\t"lat": '+str(hska_exp.Lat)+',\n\t"radio": [["'+hska_exp.Date+'T'+hska_exp.Hour+'Z",\n\t'+str(hska_exp.ODL)+']')
    # if namei!=namef and i!=0:
        # file.write(']\n},\n{\n\t"name": "'+ hska_exp.Name+'",\n\t"lon": '+str(hska_exp.Lon)+',\n\t"lat": '+str(hska_exp.Lat)+',\n\t"radio": [["'+hska_exp.Date+'T'+hska_exp.Hour+'Z",\n\t'+str(hska_exp.ODL)+']')
    # if namei==namef:
        # file.write(',\n\t["'+hska_exp.Date+'T'+hska_exp.Hour+'Z",\n\t'+str(hska_exp.ODL)+']')
    # namef=hska_exp.Name
    # i=i+1
# file.write(']\n}]')
# file.close()

# Base = declarative_base(metadata=metadata)
#
# class hska_exp(Base):
#     __tablename__ = "hska_exp"
#     ID= Column(Numeric, primary_key=True)
#     Name= Column(Text(120))
#     Lon= Column(Numeric(20))
#     Lat= Column(Numeric(20))
#     Date= Column(Text(10))
#     Hour= Column(Text(10))
#     ODL= Column(Numeric)



i=0

namef='tralari'
file=open(r'static\radiologic.json', 'w')
file.write('[{\n\t')
for hska_exp2 in session.query(hska_exp2).order_by(asc(hska_exp2.ID)).all():
    namei=hska_exp2.Name
    if namei!=namef and i==0:
        file.write('"name": "'+ hska_exp2.Name+'",\n\t"lon": '+str(hska_exp2.Lon)+',\n\t"lat": '+str(hska_exp2.Lat)+',\n\t"radio": [["'+hska_exp2.Date+'T'+hska_exp2.Hour+'Z",\n\t'+str(hska_exp2.ODL)+']')
    if namei!=namef and i!=0:
        file.write(']\n},\n{\n\t"name": "'+ hska_exp2.Name+'",\n\t"lon": '+str(hska_exp2.Lon)+',\n\t"lat": '+str(hska_exp2.Lat)+',\n\t"radio": [["'+hska_exp2.Date+'T'+hska_exp2.Hour+'Z",\n\t'+str(hska_exp2.ODL)+']')
    if namei==namef:
        file.write(',\n\t["'+hska_exp2.Date+'T'+hska_exp2.Hour+'Z",\n\t'+str(hska_exp2.ODL)+']')
    namef=hska_exp2.Name
    i=i+1
file.write(']\n}]')
file.close()

# Set "homepage" to index.html
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def index2():
    return render_template('index.html')

@app.route('/html/ar.html')
def ar():
    return render_template('ar.html')

@app.route('/html/cesium.html')
def cesium():
    return render_template ('cesium.html')

@app.route('/html/radiologic.json',methods=['GET'])
def cesium2():
    return json.dumps(geocoll)

# @app.route('/html/cesium.html', methods=['GET'])
# def areas_get():
#     return geojson.dumps(geocoll)

@app.route('/html/be.html')
def be():
    return render_template('be.html')

@app.route('/html/es.html')
def es():
    return render_template('es.html')

@app.route('/html/information.html')
def information():
    return render_template('information.html')

@app.route('/html/jp.html')
def js():
    return render_template('jp.html')

@app.route('/html/vid.html')
def vid():
    return render_template('vid.html')
with app.test_request_context():
    url_for('static', filename='radiologic.json')

@app.route('/shutdown', methods=['POST'])
def shutdown():
    shutdown_server()
    return 'Server shutting down...'


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')