//this contains code to setup the page

//add lights to both scenes
function set_up_lights() {

	  //add some ambient light
	  scene_tiling.add(new THREE.AmbientLight(0x404040));
	  scene_orbifold.add(new THREE.AmbientLight(0x808080));

	  //add a point light to the tiling scene
	  var point_light_tiling = new THREE.PointLight( 0xffffff, 1.0, 50);
    var point_light_tiling_below = new THREE.PointLight( 0xffffff, 1.0, 50);
	  point_light_tiling.position.set(0,0,4);
    point_light_tiling_below.position.set(0,0,-4);
	  scene_tiling.add(point_light_tiling);
    scene_tiling.add(point_light_tiling_below);

	  //add several point lights to the orbifold scene
	  positions = [[4,4,4],[4,-4,-4],[-4,4,-4],[-4,-6,4]];
	  for(i=0; i<positions.length; i++) {
		    var point_light_orbifold = new THREE.PointLight( 0xffffff, 0.5, 50);
		    point_light_orbifold.position.set(positions[i][0], positions[i][1], positions[i][2]);
		    scene_orbifold.add(point_light_orbifold);
	  }
}

function set_up_cameras() {
	  //create camera with correct aspect ratio and clipping planes
	  camera_tiling   = new THREE.PerspectiveCamera(55, div_tiling.clientWidth   / div_tiling.clientHeight  , 0.1, 1000);
	  camera_orbifold = new THREE.PerspectiveCamera(55, div_orbifold.clientWidth / div_orbifold.clientHeight, 0.1, 1000);

	  //set camera position and look at origins
	  camera_tiling.position.set(  0,0,5);
	  camera_orbifold.position.set(1,2,4);
	  camera_tiling.lookAt(  new THREE.Vector3(0,0,0));
	  camera_orbifold.lookAt(new THREE.Vector3(0,0,0));
}

function set_up_controls() {
	  //add camera controls
	  controls_tiling   = new THREE.TrackballControls(camera_tiling,   div_tiling);
	  controls_orbifold = new THREE.TrackballControls(camera_orbifold, div_orbifold);
    
	  controls_tiling.noPan   = true;
	  controls_orbifold.noPan = true;

	  $("#tiling").mousemove(handle_mousemove_tiling);
    //$("#orbifold").mousemove(handle_mousemove_orbifold);
}

//set up scenes, lights, cameras, renderers
function set_up_threejs(orbifold_name) {
	  scene_tiling   = new THREE.Scene();
	  scene_orbifold = new THREE.Scene();

	  set_up_lights();
	  set_up_cameras();
	  set_up_controls();

	  //also set up a canvas to draw the texture on, and a texture
	  canvas_tiling = document.createElement("canvas");
	  canvas_tiling.width  = 2000;
	  canvas_tiling.height = 2000;
	  texture_tiling = new THREE.Texture(canvas_tiling);

	  //add plane for tiling
	  //since canvas size is 2000x2000, the resolution is 200 pixels
	  //per unit length
    mesh_tiling_geometry = new THREE.PlaneGeometry(10, 10);
	  var mesh_tiling_material = new THREE.MeshPhongMaterial({side:THREE.DoubleSide, map: texture_tiling});
	  mesh_tiling_material.shininess = 5; //less than the default 30
	  mesh_tiling = new THREE.Mesh(mesh_tiling_geometry, mesh_tiling_material);
    
	  scene_tiling.add(mesh_tiling);

	  //create renderers, antialias
	  renderer_tiling   = new THREE.WebGLRenderer({antialias: true});
	  renderer_orbifold = new THREE.WebGLRenderer({antialias: true});

	  //set background color of our scene to white
	  renderer_tiling.setClearColor(0x000000, 1);
    //renderer_tiling.sortObjects = false;
	  renderer_orbifold.setClearColor(0xffffff, 1);

	  //add renderers to div
	  div_tiling.appendChild(renderer_tiling.domElement);
	  div_orbifold.appendChild(renderer_orbifold.domElement);

    pick_orbifold("yellow");
}

function set_up_stamps() {
 	  for(orbifold_name in orbifold_list) {
        if (orbifold_name == "yellow")
            continue;
        orbifold = orbifold_list[orbifold_name];
        var image = new Image();
        image.src = "stamps/" + orbifold["stamp"];
        image.height = 100;
        image.onclick = (function() {
        	  pick_orbifold(this);
        }).bind(orbifold_name);
        
        var new_list_item = document.createElement("li");
        new_list_item.appendChild(image);
        new_list_item.setAttribute("title", orbifold["stamp"].split(".")[0]);
        $("#stamps .jcarousel-wrapper .jcarousel ul").append(new_list_item);
 	  }
}


//when the window is resized, update the controls, cameras and renderers
function resize_window() {
	  controls_tiling.handleResize();
	  controls_orbifold.handleResize();

	  camera_tiling.aspect =   div_tiling.clientWidth   / div_tiling.clientHeight;
	  camera_orbifold.aspect = div_orbifold.clientWidth / div_orbifold.clientHeight;

	  camera_tiling.updateProjectionMatrix();
	  camera_orbifold.updateProjectionMatrix();

	  renderer_tiling.setSize(   div_tiling.clientWidth,   div_tiling.clientHeight   );
	  renderer_orbifold.setSize( div_orbifold.clientWidth, div_orbifold.clientHeight);
}

