#!C:\python27\ArcGIS10.1\python.exe -u
# -*- coding: utf-8 -*-

from flask import Flask
# from flask.ext.sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, url_for
from sqlalchemy import select
from sqlalchemy import *
from sqlalchemy.orm import *
import geojson
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import psycopg2
import cgi


engine = create_engine('postgresql://postgres:postgres@localhost/postgres')

app = Flask(__name__)
# app.config.from_pyfile('config.py')
# db = SQLAlchemy(app)

metadata = MetaData(engine)
Session = sessionmaker(bind=engine)
session = Session()


# Base = declarative_base(metadata=metadata)

# class hska_exp(Base):
    # __tablename__ = "hska_exp"
    # ID= Column(Numeric, primary_key=True)
    # Name= Column(Text(120))
    # Lon= Column(Numeric(20))
    # Lat= Column(Numeric(20))
    # Date= Column(Text(10))
    # Hour= Column(Text(10))
    # ODL= Column(Numeric)

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

# Set "homepage" to index.html
@app.route('/')
def index():
    return render_template('index.html')



if __name__ == '__main__':
    app.debug = False
    app.run(host='0.0.0.0')