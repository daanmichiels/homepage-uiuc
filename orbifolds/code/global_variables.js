//we first declare the global variables

//the div elements in the DOM that we'll need
var div_stamps   = document.getElementById("stamps");
var div_tiling   = document.getElementById("tiling");
var div_orbifold = document.getElementById("orbifold");

//scene, camera and renderer for the tiling and the orbifold column
//also the controls for those
//and a variable that holds the mesh that's currently shown in those two columns
//and the texture for the tiling
var scene_tiling, scene_orbifold;
var camera_tiling, camera_orbifold;
var renderer_tiling, renderer_orbifold;
var controls_tiling, controls_orbifold;
var mesh_tiling, mesh_orbifold;
var texture_tiling = new THREE.Texture(), canvas_tiling;

//the current orbifold (as it is stored as an object in orbifold_list.js)
var current_orbifold;

//testing a few things out - interactivity
//var objects = []; //what is this used for?
var projector = new THREE.Projector();
//var mouseX, mouseY; //what are these used for?
var points_displayed = [];
var point_on_orbifold = {};
var orbifold_geometry, mesh_tiling_geometry;

var image_width;
var image_height;
