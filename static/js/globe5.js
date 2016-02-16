/*global sharedObject, d3*/
Cesium.BingMapsApi.defaultKey='AtY1kYr6lhh9xdzGagEbKz8-yBzMO4YcHXQ6u22ViKjhf3mTCsqcF7vfEJ4ZzVh3';
(function() {
    "use strict";
    var yearPerSec = 86400;
    var gregorianDate = new Cesium.GregorianDate();
    var cartesian3Scratch = new Cesium.Cartesian3();

    var RadiationDataSource = function() {
        // private declarations
        this._name = "Health and Wealth";
        this._entityCollection = new Cesium.EntityCollection();
        this._clock = new Cesium.DataSourceClock();
        this._clock.startTime = Cesium.JulianDate.fromIso8601("2015-10-12");
        this._clock.stopTime = Cesium.JulianDate.fromIso8601("2015-10-16");
        this._clock.currentTime = Cesium.JulianDate.fromIso8601("2015-10-12");
        this._clock.clockRange = Cesium.ClockRange.LOOP_STOP;
        this._clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
        this._clock.multiplier = yearPerSec/5;
        this._changed = new Cesium.Event();
        this._error = new Cesium.Event();
        this._isLoading = false;
        this._loading = new Cesium.Event();
        this._year = Cesium.JulianDate.fromIso8601("2015-10-12T00:00:00Z");
/* 
        this._radioScale = d3.scale.linear().domain([0, 5e8]).range([0, 10000000.0]); */
        this._colorScale = d3.scale.linear().domain([0,0.1]).range(['blue', 'beige', 'red']);
        this._selectedEntity = undefined;
    };

    Object.defineProperties(RadiationDataSource.prototype, {
        name : {
            get : function() {
                return this._name;
            }
        },
        clock : {
            get : function() {
                return this._clock;
            }
        },
        entities : {
            get : function() {
                return this._entityCollection;
            }
        },
        selectedEntity : {
            get : function() {
                return this._selectedEntity;
            },
            set : function(e) {
                if (Cesium.defined(this._selectedEntity)) {
                    var entity = this._selectedEntity;
                    //entity.polyline.material.color = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(this._colorScale(entity.radio)));
					
					entity.polyline.material.color = new Cesium.ConstantProperty(new Cesium.Color.fromCssColorString("#ffc44d"));
                }
                if (Cesium.defined(e)) {
                    e.polyline.material.color = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString('#00ff00'));
                }
                this._selectedEntity = e;
            }
        },
        /**
         * Gets a value indicating if the data source is currently loading data.
         * @memberof RadiationDataSource.prototype
         * @type {Boolean}
         */
        isLoading : {
            get : function() {
                return this._isLoading;
            }
        },
        /**
         * Gets an event that will be raised when the underlying data changes.
         * @memberof RadiationDataSource.prototype
         * @type {Event}
         */
        changedEvent : {
            get : function() {
                return this._changed;
            }
        },
        /**
         * Gets an event that will be raised if an error is encountered during
         * processing.
         * @memberof RadiationDataSource.prototype
         * @type {Event}
         */
        errorEvent : {
            get : function() {
                return this._error;
            }
        },
        /**
         * Gets an event that will be raised when the data source either starts or
         * stops loading.
         * @memberof RadiationDataSource.prototype
         * @type {Event}
         */
        loadingEvent : {
            get : function() {
                return this._loading;
            }
        }
    });

    RadiationDataSource.prototype.loadUrl = function(url) {
        if (!Cesium.defined(url)) {
            throw new Cesium.DeveloperError("url must be defined.");
        }

        var that = this;
        return Cesium.when(Cesium.loadJson(url), function(json) {
            return that.load(json);
        }).otherwise(function(error) {
            this._setLoading(false);
            that._error.raiseEvent(that, error);
            return Cesium.when.reject(error);
        });
    };

	
    RadiationDataSource.prototype.load = function(data) {
        if (!Cesium.defined(data)) {
            throw new Cesium.DeveloperError("data must be defined.");
        }
        var ellipsoid = viewer.scene.globe.ellipsoid;

        this._setLoading(true);
        var entities = this._entityCollection;
        //It's a good idea to suspend events when making changes to a 
        //large amount of entities.  This will cause events to be batched up
        //into the minimal amount of function calls and all take place at the
        //end of processing (when resumeEvents is called).
        entities.suspendEvents();
        entities.removeAll();

        // for each station defined in stations_geo, create a polyline at that lat, lon
        for (var i = 0; i < data.length; i++){
            var station = data[i];
            var surfacePosition = Cesium.Cartesian3.fromDegrees(station.lon, station.lat, 0.0);


            // Construct Population related Properties
			var radiation1 = new Cesium.SampledPositionProperty();
            var sampledRadiation = new Cesium.SampledProperty(Number);
			
			var colorPolyline = new Cesium.SampledProperty(Number);
			
			var heightPosition = Cesium.Cartesian3.fromDegrees(station.lon, station.lat, station.radio[0][1]*1000000);

			radiation1.addSample(Cesium.JulianDate.fromIso8601("2015"), heightPosition);
            sampledRadiation.addSample(Cesium.JulianDate.fromIso8601("2015"), radio);
			
            var radio = 0.0;
            for (var j = 0; j < station.radio.length; j++) {
                var year = station.radio[j][0];
                radio = station.radio[j][1];
				heightPosition = Cesium.Cartesian3.fromDegrees(station.lon, station.lat, radio*1000000);
				
                radiation1.addSample(Cesium.JulianDate.fromIso8601(year), heightPosition);
                //Add the data radiation into the Sample
				sampledRadiation.addSample(Cesium.JulianDate.fromIso8601(year), radio);
				
							
				
            }
			
			
			
			radiation1.addSample(Cesium.JulianDate.fromIso8601("2015"), heightPosition);
            sampledRadiation.addSample(Cesium.JulianDate.fromIso8601("2015"), radio);


            var polyline = new Cesium.PolylineGraphics();
            polyline.show = new Cesium.ConstantProperty(true);
			
			// Change of color
			
			
			
			
            var outlineMaterial = new Cesium.PolylineOutlineMaterialProperty();
			//with getValue we get the value interpolated
            //outlineMaterial.color = Cesium.Color.fromCssColorString(this._colorScale(sampledRadiation.getValue(Cesium.JulianDate.fromIso8601(year))));
			
			//console.log(sampledRadiation.getValue(Cesium.JulianDate.fromIso8601(year)));
			outlineMaterial.color = new Cesium.ConstantProperty(new Cesium.Color.fromCssColorString("#ffc44d"));
            outlineMaterial.outlineColor = new Cesium.ConstantProperty(new Cesium.Color(0.0, 0.0, 0.0, 1.0));
            outlineMaterial.outlineWidth = new Cesium.ConstantProperty(3.0);
            polyline.material = outlineMaterial;
            polyline.width = 10.0;
            polyline.followSurface = new Cesium.ConstantProperty(false);

            var entity = new Cesium.Entity(station.name);
            entity.polyline = polyline;
            polyline.positions = new Cesium.PositionPropertyArray([new Cesium.ConstantPositionProperty(surfacePosition), radiation1]);

			
			
            // Add data properties to entity


            entity.addProperty('surfacePosition');
            entity.surfacePosition = surfacePosition;
            entity.addProperty('stationData'); 
            entity.stationData = station;
            entity.addProperty('radio');
            entity.radio = sampledRadiation;


            //Add the entity to the collection.
            entities.add(entity);
        }

        //Once all data is processed, call resumeEvents and raise the changed event.
        entities.resumeEvents();
        this._changed.raiseEvent(this);
        this._setLoading(false);
    };

    RadiationDataSource.prototype._setLoading = function(isLoading) {
        if (this._isLoading !== isLoading) {
            this._isLoading = isLoading;
            this._loading.raiseEvent(this, isLoading);
        }
    };
	

	// We create the table that will appear each time that will be different to 2015-10-12T01:00:00Z

    RadiationDataSource.prototype._setInfoDialog = function(time) {
		
		if (Cesium.defined(this._selectedEntity)) {
            var radio = this._selectedEntity.radio.getValue(time);
			
            $("#info table").remove();
            $("#info").append("<table> \
            <tr><td>Radiation:</td><td>" +parseFloat(radio).toFixed(5)+"</td></tr>\
            </table>\
            ");
            $("#info table").css("font-size", "10px");
            $("#info").dialog({
                title : this._selectedEntity.stationData.name,
                width: 300,
                height: 100,
                modal: false,
                position: {my: "right center", at: "right center", of: "canvas"},
                show: "slow",
                beforeClose: function(event, ui) {
                    $("#info").data("dataSource").selectedEntity = undefined;
                }
            });
            $("#info").data("dataSource", this);
        }
    };

	//We update the table if the time is different to the initial time
	
	RadiationDataSource.prototype.update = function(time) {

		// The time of cesium always is the Julian, it was predefined at the variable _year
		
		
        if (time !== this._year ){
            this._setInfoDialog(time);
        }
        return true;
    };
	
	
	
	
	
    $("body").css("background-color", "black");
	



    var viewer = new Cesium.Viewer('cesiumContainer', 
            {
                fullscreenElement : document.body,
                infoBox : false
            });

    var stamenTonerImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[8];
    viewer.baseLayerPicker.viewModel.selectedImagery = stamenTonerImagery;


    viewer.scene.skyBox.show = false;
    viewer.scene.sun.show = false;
    viewer.scene.moon.show = false;
	
	
	
	//Home button functionality
	viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo){
	
		FlyTogermany()
		//Cancel other functionality of the home button
		commandInfo.cancel = true;
	});
	
	
	FlyTogermany();
	
	// Create the function flytogermany. Put aprrox coordinates to your data

	function FlyTogermany (){
		viewer.camera.flyTo({
			destination : Cesium.Cartesian3.fromDegrees(10.2, 43.6, 1000000.0),
			orientation : {
				heading : Cesium.Math.toRadians(0.0),
				pitch : Cesium.Math.toRadians(-55.0),
				roll : 0.0
			}
		});
	};


    var RadiationVar = new RadiationDataSource();
	console.log("hola6")
    RadiationVar.loadUrl('../static/radiologic.json');
    viewer.dataSources.add(RadiationVar);

	
	//Selecc the map provider
	var stamenTonerImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[0];
    viewer.baseLayerPicker.viewModel.selectedImagery = stamenTonerImagery;
	
	
    // If the mouse is over the billboard, change its scale and color
    var highlightBarHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    highlightBarHandler.setInputAction(
        function (movement) {
            var pickedObject = viewer.scene.pick(movement.endPosition);
            if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
                if (Cesium.defined(pickedObject.id.stationData)) {
                    sharedObject.dispatch.nationMouseover(pickedObject.id.stationData, pickedObject);
                    RadiationVar.selectedEntity = pickedObject.id;
                }
            }
        },
        Cesium.ScreenSpaceEventType.MOUSE_MOVE
    );

    var flyToHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    flyToHandler.setInputAction(
        function (movement) {
            var pickedObject = viewer.scene.pick(movement.position);

            if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
                sharedObject.flyTo(pickedObject.id.stationData);
            }
        },
        Cesium.ScreenSpaceEventType.LEFT_CLICK
    );

	  
	 
    // define functionality for flying to a station
    // this callback is triggered when a station is clicked
    sharedObject.flyTo = function(stationData) {
        var ellipsoid = viewer.scene.globe.ellipsoid;

        var destination = Cesium.Cartographic.fromDegrees(stationData.lon, stationData.lat-0.5, 100000.0);
        var destCartesian = ellipsoid.cartographicToCartesian(destination);
        destination = ellipsoid.cartesianToCartographic(destCartesian);

        // only fly there if it is not the camera's current position
        if (!ellipsoid
                   .cartographicToCartesian(destination)
                   .equalsEpsilon(viewer.scene.camera.positionWC, Cesium.Math.EPSILON6)) {

            viewer.scene.camera.flyTo({
                destination: destCartesian,
				orientation : {
					heading : Cesium.Math.toRadians(0.0),
					pitch : Cesium.Math.toRadians(-55.0),
					roll : 0.0
				}
            });
        }
    };

})();
