from flask import Flask
# from flask.ext.sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request
from sqlalchemy import select
from sqlalchemy import *
from sqlalchemy.orm import *
import geojson
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import psycopg2

engine = create_engine('postgresql://postgres:postgres@localhost/postgres')

app = Flask(__name__)
# app.config.from_pyfile('config.py')
# db = SQLAlchemy(app)

metadata = MetaData(engine)
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base(metadata=metadata)

# class User(Base):
#     __tablename__ = "users"
#     id = Column(Integer, primary_key=True)
#     email = Column(String(120), unique=True)
#
#     def __init__(self, email):
#         self.email = email
#
#     def __repr__(self):
#         return '<E-mail %r>' % self.email
#
#
class hska_exp(Base):
    __tablename__ = "hska_exp"
    ID= Column(Numeric, primary_key=True)
    Name= Column(Text(120))
    Lon= Column(Numeric(20))
    Lat= Column(Numeric(20))
    Date= Column(Text(10))
    Hour= Column(Text(10))
    ODL= Column(Numeric)

    # def __init__(self, ODL, Name):
    #     self.ODL = ODL
    #     self.Name = Name
    # # def __init__(self, Hour):
    # #     self.Hour = Hour
    # #
    # def __repr__(self):
    #     return '<ODL %r>' % self.ODL, '<Name %r>' % self.Name
    # # def __repr__(self):
    # #     return '<Hour %r>' % self.Hour

# for User in session.query(User).filter_by(id='1'):
#      print User

name_list=[]
lon_list=[]
lat_list=[]
date_list=[]
hour_list=[]
odl_list=[]

cont=0
# for hska_exp in session.query(hska_exp).filter_by(Hour="0:00:00"):
# for hska_exp in session.query(hska_exp).all():
#     name_list.append(hska_exp.Name)
#     lon_list.append(hska_exp.Lon)
#     lat_list.append(hska_exp.Lat)
#     date_list.append(hska_exp.Date)
#     hour_list.append(hska_exp.Hour)
#     odl_list.append(hska_exp.ODL)
#     cont=cont+1
# print cont
# print len(name_list)
# print len(lon_list)
# print len(lat_list)
# print len(date_list)
# print len(hour_list)
# print len(odl_list)

i=0

namef='tralari'
file=open('radiologic.json', 'w')
file.write('[{\n\t')
for hska_exp in session.query(hska_exp).all():
    namei=hska_exp.Name
    if namei!=namef and i==0:
        file.write('"name": "'+ hska_exp.Name+'",\n\t"lon": '+str(hska_exp.Lon)+',\n\t"lat": '+str(hska_exp.Lat)+',\n\t"radio": [["'+hska_exp.Date+'T'+hska_exp.Hour+'Z",\n\t'+str(hska_exp.ODL)+']')
    if namei!=namef and i!=0:
        file.write(']\n},\n{\n\t"name": "'+ hska_exp.Name+'",\n\t"lon": '+str(hska_exp.Lon)+',\n\t"lat": '+str(hska_exp.Lat)+',\n\t"radio": [["'+hska_exp.Date+'T'+hska_exp.Hour+'Z",\n\t'+str(hska_exp.ODL)+']')
    if namei==namef:
        file.write(',\n\t["'+hska_exp.Date+'T'+hska_exp.Hour+'Z",\n\t'+str(hska_exp.ODL)+']')
    namef=hska_exp.Name
    i=i+1
file.write(']\n}]')
file.close()

# namef='tralari'
# file=open('radiologic.json', 'w')
# file.write('[{\n\t')
# for i in xrange(0,cont):
#     namei=name_list[i]
#     if namei!=namef and i==0:
#         file.write('"name": "'+ name_list[i]+'",\n\t"lon": '+str(lon_list[i])+',\n\t"lat": '+str(lat_list[i])+',\n\t"radio": [["'+date_list[i]+'T'+hour_list[i]+'Z",\n\t'+str(odl_list[i])+']')
#     if namei!=namef and i!=0:
#         file.write(']\n},\n{\n\t"name": "'+ name_list[i]+'",\n\t"lon": '+str(lon_list[i])+',\n\t"lat": '+str(lat_list[i])+',\n\t"radio": [["'+date_list[i]+'T'+hour_list[i]+'Z",\n\t'+str(odl_list[i])+']')
#     if namei==namef:
#         file.write(',\n\t["'+date_list[i]+'T'+hour_list[i]+'Z",\n\t'+str(odl_list[i])+']')
#     namef=name_list[i]
# file.write(']\n}]')
# file.close()
#
# json=geojson.dumps(hska_exp)

# geocoll=session.query(hska_exp).filter_by(Hour='00:00:00')
# print geocoll
# json=geojson.dumps(geocoll)
# print json

# odlC = hska_exp.query.filter_by(Hour='00:00:00').first()
# print odlC.Name, odlC.Date, odlC.ODL

# Set "homepage" to index.html
@app.route('/')
def index():
    return render_template('index.html')
#
# # Save e-mail to database and send to success page
# @app.route('/prereg', methods=['POST'])
# def prereg():
#     email = None
#     if request.method == 'POST':
#         email = request.form['email']
#         # Check that email does not already exist (not a great query, but works)
#         if not db.session.query(User).filter(User.email == email).count():
#             reg = User(email)
#             db.session.add(reg)
#             db.session.commit()
#             return render_template('success.html')
#     return render_template('index.html')


if __name__ == '__main__':
    app.debug = True
    app.run()