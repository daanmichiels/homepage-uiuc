function load_orbifold_model() {
	  var orbifold = current_orbifold;

	  var loader = new THREE.JSONLoader(true);
	  var add_orbifold_to_scene = function(geometry) {
		    //make the mesh
        orbifold_geometry = geometry;
		    var texture = THREE.ImageUtils.loadTexture("stamps/" + orbifold.stamp);
		    var material = new THREE.MeshPhongMaterial({map: texture});
        
        if(current_orbifold.stamp == "pg.png"){
            
            material = new THREE.MeshPhongMaterial({map: texture, transparent: true, opacity: 0.75 });
        }
		    material.shininess = 0; //less than the default 30
		    material.side = THREE.DoubleSide; //render front and back of triangles
		    var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0,0,0);

		    //replace the orbifold mesh
		    scene_orbifold.remove(mesh_orbifold);
		    mesh_orbifold = mesh;
		    scene_orbifold.add(mesh_orbifold);
	  };
    
    var geometry_sphere = new THREE.SphereGeometry(1/20);
    var material = new THREE.MeshPhongMaterial({color: 0x000000, ambient: 0x000000});
    point_on_orbifold = new THREE.Mesh(geometry_sphere, material);        
	  scene_orbifold.add(point_on_orbifold);
    point_on_orbifold.visible = false;

    var model_url = "models/" + orbifold.model;
	  loader.load(model_url, add_orbifold_to_scene);
}

function create_points_displayed() {
	  //first remove the old ones from the scene
    for(var k=0; k<points_displayed.length; k++) {
        scene_tiling.remove(points_displayed[k]);
    }

	  var translation_1 = new THREE.Vector2();
	  var translation_2 = new THREE.Vector2();
	  translation_1.fromArray(current_orbifold["translation_1"]);
	  translation_2.fromArray(current_orbifold["translation_2"]);

	  points_displayed = [];

	  //this is in pixels
	  var fundamental_set = current_orbifold["equivalent_points"](units_to_pixels([0,0]));

	  //reuse geometry and material
	  //big performance gain
	  var geometry_sphere = new THREE.SphereGeometry(1/20);
	  var material = new THREE.MeshPhongMaterial({color: 0x000000, ambient: 0x000000});

	  //create the geometry that has 20*20 spheres in it
	  var geometry = new THREE.Geometry();
    
    spheres = []
	  for(var i = 0; i<20; i++) {
		    for(var j = 0; j<20; j++) {
			      var point = new THREE.Mesh(geometry_sphere);
			      point.position = pixels_to_units(new THREE.Vector3((i-10)*translation_1.x + (j-10)*translation_2.x, (i-10)*translation_1.y + (j-10)*translation_2.y, 0));
            THREE.GeometryUtils.merge(geometry, point);
		    }
	  }

	  //make meshes and add them to the scene
	  for(var k=0; k<fundamental_set.length; k++) {
		    points_displayed[k] = new THREE.Mesh(geometry, material);
        points_displayed[k].visible = false;
		    scene_tiling.add(points_displayed[k]);
	  }

    //u,v mapping
    point_to_uv(fundamental_set[0]);
}

function create_tiling() {
    var translation_1 = new THREE.Vector2();
	  var translation_2 = new THREE.Vector2();
	  translation_1.fromArray(current_orbifold["translation_1"]);
	  translation_2.fromArray(current_orbifold["translation_2"]);
    
	  var image = new Image();
	  image.onload = function() {
	  	  canvas_context = canvas_tiling.getContext("2d");

		    // how many rows and columns do we need?
		    // let's just say a fixed number each (which is inelegant)
		    for(var i = -20; i<20; i++) {
			      for(var j = -20; j<20; j++) {
				        //because multiplyScalar and add work *in place*, we need to make fresh copies
				        var t1 = new THREE.Vector2();
				        var t2 = new THREE.Vector2();
				        t1.copy(translation_1);
				        t2.copy(translation_2);
				        var location = t1.multiplyScalar(i).add(t2.multiplyScalar(j));



				        //drawing bitmaps: y-axis down
				        //3d coordinates:  y-axis up
				        //we have to compensate for this

				        //first flip in the vertical direction
				        location.y = -location.y;
				        //subtract the height from the y-coordinate to get the image in the correct place
				        //(because of the flipped y-axis)
				        canvas_context.drawImage(image, 1000 + location.x, 1000 + location.y - image.height, image.width, image.height);

				        //save for later
				        image_width = image.width;
				        image_height = image.height;
			      }
		    }
		    texture_tiling.needsUpdate = true;
	  }
	  image.src = "stamps/" + current_orbifold["stamp"];
	  
}

//called when a different orbifold is picked
//the parameter passed is the name of the orbifold (eg 'p2')
function pick_orbifold(orbifold_name) {
    current_orbifold = orbifold_list[orbifold_name];
    create_tiling();
    load_orbifold_model();
	  
    if(orbifold_name != "yellow") {
        create_points_displayed(); 
    }
}

//called when rendering the tiling
function render_tiling() {
	  requestAnimationFrame(render_tiling);
	  controls_tiling.update();
	  renderer_tiling.render(scene_tiling, camera_tiling);
}

//called when rendering the orbifold
function render_orbifold() {
	  requestAnimationFrame(render_orbifold);
	  controls_orbifold.update();
	  renderer_orbifold.render(scene_orbifold, camera_orbifold);
}


//--------------------------------------------

//the code below is run when the page is loaded
set_up_stamps();
set_up_threejs();

//make sure everything scales nicely when the window is resized
window.addEventListener( 'resize', resize_window, false );
resize_window();

//render
render_orbifold();
render_tiling();
