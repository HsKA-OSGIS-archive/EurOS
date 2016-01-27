<p align="center">
<a href="https://github.com/HsKA-OSGIS/EurOS/blob/master/static/img/Logo.png?raw=true"><img src="https://github.com/HsKA-OSGIS/EurOS/blob/master/static/img/Logo.png?raw=true" height="150" /></a>&nbsp;
</p>
# EurOS

WebGIS-Application with animated radiologic data (4D) using Cesium

# About the Application

Our aim is show the radiologic data in the web of the country of Germany taking the data in a database using Flask to connect the database and the web. 

# Authors

	Behrouz Hasanzadeh - (habe1015@hs-karlsruhe.de)
	David Arenas Serrano - (daarser@upv.es)
	David Montalvá España - (damones2@upv.es)
	Juan Pedro Carbonell Rivera - (juacarri@upv.es)

# Images 

<p align="center">
<a href="http://i.imgur.com/24LcMNB.jpg"><img src="http://i.imgur.com/24LcMNB.jpg" height="150" /></a>&nbsp;
<a href="http://i.imgur.com/5vmuzew.jpg"><img src="http://i.imgur.com/5vmuzew.jpg" height="150" /></a>&nbsp;
</p>
	
# Data and data sources

The data used in this project are provided by GDR Germany - Federal Office for Radiation Protection. The data consists of all originally measured
values from about 1800 sensors in a time interval of between 2015-10-12 00:00:00 and 2015-10-16 00:00:00, measurements are made each ten minutes. The file format is CSV. 
http://odlinfo.bfs.de/


# Software Used

	- Notepad++ 6.8.8
	- Pycharm 4.0.1
	- Apache 2.2.22
	- QGIS 2.12.3 'Lyon'
	- PgAdminIII with Postgres 1.22.0
	
Note: If you are using OSGEO-Live 9.0 the three last programs are pre-installed.

# Languages Used

	- Python 2.7
	- JavaScript 1.8
	- HTML5
	- CSS3

# External Libraries

	- Flask 0.10.1 (Python) http://flask.pocoo.org/
	- sqlalchemy 1.0.11 (Python) http://www.sqlalchemy.org/
	- pyscogp2 2.6.1 (Python) https://pypi.python.org/pypi/psycopg2
	- Cesium 1.17
	- jQuery UI 1.10.3
	- D3 v3.0
	
#Structure of folders

|Folder name | Description |
|:------------|:-------------|
|static |contains the static part to WSGI Web site|
|/3rdParty|contains js libraries (Cesium, D3 and JQuery)|
|/css|contains style sheet language|
|/fonts|contains leters types|
|/img|contains all necessary image-files|
|/js|contains all necessary javascript-files|
|templates|contains all html files|

# Installation Steps:
	
1. In pgAdminIII create a table named hska_exp in the postgres database. To make work easier is provided a SQL query in the repository, you can change the default database by your own database.

2. Import the data from the CSV file in the created table. The parameters to import the Radiation.CSV file into the table are:
		Format: CSV		
		Encoding: ISO _8859_5
		Delimiter: ";"

3. Install the Python libraries. You can use the links provided in the External libraries chapter.

4. Download <a href='https://github.com/AnalyticalGraphicsInc/cesium.git'>Cesium</a> repository and put it in:
	
		static/3rdParty/cesium

5. In the index.py file edit the line 17 with your own user and password (if you create the hska_exp table in a different database you must change in this step): 

		engine = create_engine('postgresql://name:password@localhost/databasename')

Note: You need to adapt your server to use wsgi. 

Copyright (c) 2016, EurOpenSource Company.

see <a href='https://github.com/HsKA-OSGIS/EurOS/blob/master/License'>LICENSE.txt</a>
