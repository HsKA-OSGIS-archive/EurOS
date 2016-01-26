function startup(Cesium) {
    "use strict";
//Sandcastle_Begin
var viewer = new Cesium.Viewer('cesiumContainer', {showRenderLoopErrors : false});

var videoElement = document.getElementById('trailer');

var sphere = viewer.entities.add({
    position : Cesium.Cartesian3.fromDegrees(-79, 35, 5000),
    ellipsoid : {
        radii : new Cesium.Cartesian3(15000, 15000, 15000),
        material : videoElement
    }
});

	//Le damos funcionalidad al boton home
		viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo){
	//Si se pulsa hacemos un flyto
		FlyTo()
		//Le decimos al botón que no haga nada mas
		commandInfo.cancel = true;
	});
	
	
	FlyTo();
	
	
	//Creamos la funcion flytogermany q nos llevara a alemania. Colocamos unas coordenadas aproximadas a nuestros datos
	function FlyTo (){
		viewer.camera.flyTo({
			destination : Cesium.Cartesian3.fromDegrees(-79, 34.7, 40000),
			orientation : {
				heading : Cesium.Math.toRadians(0.0),
				pitch : Cesium.Math.toRadians(-50.0),
				roll : 0.0
			}
		});
	};


// Since it's just an image material, we can modify the number
// of times the video repeats in each direction..
var isRepeating = true;
Sandcastle.addToolbarButton('Toggle Image Repeat', function() {
    isRepeating = !isRepeating;
});

sphere.ellipsoid.material.repeat = new Cesium.CallbackProperty(function(time, result) {
    if (!Cesium.defined(result)) {
        result = new Cesium.Cartesian2();
    }
    if (isRepeating) {
        result.x = 8;
        result.y = 8;
    } else {
        result.x = 1;
        result.y = 1;
    }
    return result;
}, false);

// Like Image, the video element doesn't have to be part of the DOM or
// otherwise on the screen to be used as a texture.
Sandcastle.addToolbarButton('Toggle Video Overlay', function() {
    if(videoElement.style.display === 'none'){
        videoElement.style.display = '';
        return;
    }
    videoElement.style.display = 'none';
});

// Older browsers do not support WebGL video textures,
// put up a friendly error message indicating such.
viewer.scene.renderError.addEventListener(function() {
    if(!videoElement.paused){
        videoElement.pause();
    }
    viewer.cesiumWidget.showErrorPanel('This browser does not support cross-origin WebGL video textures.', '', '');
});

//Sandcastle_End
    Sandcastle.finishedLoading();
}
if (typeof Cesium !== "undefined") {
    startup(Cesium);
} else if (typeof require === "function") {
    require(["Cesium"], startup);
}