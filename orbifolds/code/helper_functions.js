
// old functions that need to be changed

/*
  function add_point(pos) {
  //console.log(pos, "Asdf");
  point = new THREE.Mesh(
  new THREE.SphereGeometry(1/20),
  new THREE.MeshPhongMaterial({color: 0xff0000, ambient: 0xff0000})
  );
  
  point.position = pos;
  points_displayed.push(point);
  scene_tiling.add(point);

  // do *not* call a render here
  // this will start a second rendering loop that runs parallel
  // with the one already running
  //render_tiling();
  
  objects.push(point);
  }
*/

function handle_mousemove_tiling(event) {
    //if no orbifold was chosen yet, ignore
    if(!current_orbifold)
        return;

    var offset = $("#tiling").offset();

    var mouseX = ((event.pageX-offset.left)/$("#tiling").innerWidth())*2 - 1;
    var mouseY = -((event.pageY-offset.top)/$("#tiling").innerHeight())*2 + 1;

    var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
    projector.unprojectVector(vector, camera_tiling);

    var raycaster = new THREE.Raycaster(camera_tiling.position, vector.sub(camera_tiling.position).normalize());
    // do not intersect with all the children of the scene
    // this would detect intersections with points (small spheres) in the scene
    // so that new points are placed on old points (which is not necessarily on the plane,
    // since the spheres have positive radius)
    // (this is why the points got 'stacked' in an earlier version of the code)
    var intersects = raycaster.intersectObject(mesh_tiling);
    
    if ( intersects.length > 0 ) {
        display_points(intersects[0].point);
        //var xypoint=[intersects[0].point.x, intersects[0].point.y];
        //find_uv_on_model(point_to_uv(xypoint));
    }
    else { //if cursor not on plane, make all points invisible
        hide_tiling_points();
        point_on_orbifold.visible = false;
    }
}

function hide_tiling_points() {
    for(var k=0; k<points_displayed.length; k++) 
        points_displayed[k].visible = false;
}

/*
function display_points_from_uv(uv) {
    var position_intersection = new THREE.Vector2(uv.x*image_width, uv.y*image_height); //now in pixels

    //this is in pixels
    var fundamental_set = current_orbifold["equivalent_points"](position_intersection.x, position_intersection.y);

    for(var k=0; k<points_displayed.length; k++) {
        points_displayed[k].position.x = fundamental_set[k][0];
        points_displayed[k].position.y = fundamental_set[k][1];
        points_displayed[k].position.z = 0;
        points_displayed[k].position = pixels_to_units(points_displayed[k].position);

        points_displayed[k].visible = true;
        
    }
}
*/

function display_points(position_intersection) {
    var position_intersection = units_to_pixels(position_intersection); //now in pixels

    //this is in pixels
    var fundamental_set = current_orbifold["equivalent_points"](position_intersection.x, position_intersection.y);

    for(var k=0; k<points_displayed.length; k++) {
        points_displayed[k].position.x = fundamental_set[k][0];
        points_displayed[k].position.y = fundamental_set[k][1];
        points_displayed[k].position.z = 0;
        points_displayed[k].position = pixels_to_units(points_displayed[k].position);

        points_displayed[k].visible = true;
        
    }
}

/*
function handle_mousemove_orbifold(event) {
    //if no orbifold was chosen yet, ignore
    
    if(!current_orbifold)
        return;
    
    var offset = $("#orbifold").offset();

    var mouseX = ((event.pageX-offset.left)/$("#orbifold").innerWidth())*2 - 1;
    var mouseY = -((event.pageY-offset.top)/$("#orbifold").innerHeight())*2 + 1;
    
    var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
    projector.unprojectVector(vector, camera_orbifold);

    var raycaster = new THREE.Raycaster(camera_orbifold.position, vector.sub(camera_orbifold.position).normalize());

    var intersects = raycaster.intersectObject(mesh_orbifold);
    
    if ( intersects.length > 0 ) {
        face_index = intersects[0].faceIndex;
        var position_intersection = intersects[0].point;
                
        var vids = [intersects[0].face.a, intersects[0].face.b, intersects[0].face.c];
        var vs = orbifold_geometry.vertices;
        
        point_on_orbifold.position.x = intersects[0].point.x;
        point_on_orbifold.position.y = intersects[0].point.y;
        point_on_orbifold.position.z = intersects[0].point.z;
        point_on_orbifold.visible = true;

        var bc = barycentric(position_intersection.clone(), vs[vids[0]].clone(), vs[vids[1]].clone(), vs[vids[2]].clone());
        var uv_coordinates = orbifold_geometry.faceVertexUvs[0][face_index][0].clone().multiplyScalar(bc[0]);
        uv_coordinates = uv_coordinates.add(orbifold_geometry.faceVertexUvs[0][face_index][1].clone().multiplyScalar(bc[1]));
        uv_coordinates = uv_coordinates.add(orbifold_geometry.faceVertexUvs[0][face_index][2].clone().multiplyScalar(bc[2]));
        //console.log(uv_coordinates);
        display_points_from_uv(uv_coordinates);
    }
    else { //if cursor not on orbifold, make point invisible
        point_on_orbifold.visible = false;
        hide_tiling_points();
    }
}
*/

/*
$("#orbifold").mouseleave(function() {
    point_on_orbifold.visible = false;
    hide_tiling_points();
});
*/

$("#tiling").mouseleave(function() {
    hide_tiling_points();
    point_on_orbifold.visible = false;
});

/*
  function handle_mousemove_tiling(event) {
  //if no orbifold was chosen yet, ignore
  if(!current_orbifold)
  return;

  var offset = $("#tiling").offset();

  var mouseX = ((event.pageX-offset.left)/$("#tiling").innerWidth())*2 - 1;
  var mouseY = -((event.pageY-offset.top)/$("#tiling").innerHeight())*2 + 1;

  var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
  projector.unprojectVector(vector, camera_tiling);

  var raycaster = new THREE.Raycaster(camera_tiling.position, vector.sub(camera_tiling.position).normalize());
  // do not intersect with all the children of the scene
  // this would detect intersections with points (small spheres) in the scene
  // so that new points are placed on old points (which is not necessarily on the plane,
  // since the spheres have positive radius)
  // (this is why the points got 'stacked' in an earlier version of the code)
  var intersects = raycaster.intersectObject(mesh_tiling);
  
  if ( intersects.length > 0 ) {
  var translation_1 = new THREE.Vector2();
  var translation_2 = new THREE.Vector2();
  translation_1.fromArray(current_orbifold["translation_1"]);
  translation_2.fromArray(current_orbifold["translation_2"]);

  var position_intersection = intersects[0].point;
  var position_intersection = units_to_pixels(position_intersection); //now in pixels

  //this is in pixels
  var fundamental_set = current_orbifold["equivalent_points"](position_intersection.x, position_intersection.y);

  For(var i=0; i<points_displayed.length; i++) {
  for(var j=0; j<points_displayed[i].length; j++) {
  var t1 = new THREE.Vector2();
  var t2 = new THREE.Vector2();
  t1.copy(translation_1);
  t2.copy(translation_2);
  var location = t1.multiplyScalar(i-10).add(t2.multiplyScalar(j-10));
  location = new THREE.Vector3(location.x,location.y,0);
  for(var k=0; k<points_displayed[i][j].length; k++) {
  var position = new THREE.Vector3();
  position.fromArray([fundamental_set[k][0], fundamental_set[k][1], 0]);
  position.add(location);
  position = pixels_to_units(position);
  points_displayed[i][j][k].position = position;
  if(position.x <= 5 && position.x >= -5 && position.y <= 5 && position.y >= -5) {
  points_displayed[i][j][k].visible = true;
  } else {
  points_displayed[i][j][k].visible = false;
  }
  }
  }
  }
  } else { //if cursor not on plane, make all points invisible
  for(var i=0; i<points_displayed.length; i++) {
  for(var j=0; j<points_displayed[i].length; j++) {
  for(var k=0; k<points_displayed[i][j].length; k++) {
  points_displayed[i][j][k].visible = false;
  }
  }
  }
  }
  } */


/*
  function find_click(event) {
  event.preventDefault();
  if(event.target == renderer_tiling.domElement)
  {
  var offset = $("#tiling").offset();

  var mouseX = ((event.pageX-offset.left)/$("#tiling").innerWidth())*2 - 1;
  var mouseY = -((event.pageY-offset.top)/$("#tiling").innerHeight())*2 + 1;

  var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
  projector.unprojectVector(vector, camera_tiling);

  var raycaster = new THREE.Raycaster(camera_tiling.position, vector.sub(camera_tiling.position).normalize());
  // do not intersect with all the children of the scene
  // this would detect intersections with points (small spheres) in the scene
  // so that new points are placed on old points (which is not necessarily on the plane,
  // since the spheres have positive radius)
  // (this is why the points got 'stacked' in an earlier version of the code)
  var intersects = raycaster.intersectObject(mesh_tiling);
  
  if ( intersects.length > 0 ) {
  console.log(intersects[0].point);
  add_point(intersects[0].point);
  }
  }
  // var vector = new THREE.Vector3(
  //         (event.clientX / window$(#tiling).innerWidth ) * 2 - 1,
  //             - (event.clientY / window.innerHeight ) * 2 + 1,
  //         0.5 );
  
  //     var dir = vector.sub( camera_tiling.position ).normalize();
  //     var distance = - camera_tiling.position.z / dir.z;
  //     var pos = camera_tiling.position.clone().add( dir.multiplyScalar( distance ) );

  //     add_point(pos);
  //     console.log(pos);    
  }
*/

/*
  function get_equivalent_points(x, y, orbifold) {
  var equivalent_points = new Array();
  fundamental_set = orbifold["equivalent_points"](200*x, 200*y);
  for(var k = 0; k < fundamental_set.length; k++) {
  fundamental_set[k][0] = fundamental_set[k][0] / 200;
  fundamental_set[k][1] = fundamental_set[k][1] / 200;
  }

  var translation_1 = new THREE.Vector2();
	var translation_2 = new THREE.Vector2();
	translation_1.fromArray(orbifold["translation_1"]);
	translation_2.fromArray(orbifold["translation_2"]);

  for(var i = -10; i < 10; i++) {
  for(var j = -10; j < 10; j++) {
  var t1 = new THREE.Vector2();
  var t2 = new THREE.Vector2();
  t1.copy(translation_1);
  t2.copy(translation_2);
  var location = t1.multiplyScalar(i).add(t2.multiplyScalar(j));

  for(var k = 0; k < fundamental_set.length; k++) {
  point = new THREE.Vector3(location.x / 200, location.y / 200, 0);
  point.x += fundamental_set[k][0];
  point.y += fundamental_set[k][1];
  equivalent_points.push(point);
  }
  }
  }
  
  return equivalent_points;
  }
*/

/*
  function add_equivalent_points(points_list) {
  for(var i=0; i<points_list.length; i++) {
  add_point(points_list[i]);
  }

  // this is not how for...in works
  for(point in points_list) {
  add_point(point);
  }
  }
*/

/* map between 'units' (I couldn't come up with a better name; they are
   the units used in 3d-space) and pixels
   essentially, it is determined by the size of the canvas (2000x2000)
   for texturing the tiling plane (10x10) */
function pixels_to_units(position) {
    newpos = new THREE.Vector3();
    newpos.x = position.x / 200;
    newpos.y = position.y / 200;
    newpos.z = position.z / 200;
    return newpos;
}
/* conversion in the other direction */
function units_to_pixels(position) {
    newpos = new THREE.Vector3();
    newpos.x = position.x * 200;
    newpos.y = position.y * 200;
    newpos.z = position.z * 200;
    return newpos;
}

/*
function point_to_uv(position) {
    var normal = new THREE.Vector3(0, 0, 1);
    var u = new THREE.Vector3(normal.y, -normal.a, 0);
    var v = new THREE.Vector3(); v.crossVectors(normal, u);
    var u_coord = u.dot(position)
    var v_coord = v.dot(position)
    return [u_coord, v_coord];
}
*/

/*
function barycentric(p, A, B, C) {
    // Compute vectors        
    //console.log(C);
    C.sub(A);
    B.sub(A);
    p.sub(A);
    
    // Compute dot products
    var dot00 = C.dot(C);
    var dot01 = C.dot(B);
    var dot02 = C.dot(p);
    var dot11 = B.dot(B);
    var dot12 = B.dot(p);

    // Compute barycentric coordinates
    var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    return [u, v, 1.0-u-v];
}
*/

/*
function load_js_file(filename){    
    var fileref=document.createElement('orbifold_model');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", "models/" + filename);
}
*/

/*
function find_uv_on_model(position) {

    //temporary, just to have a point on the orbifold
    var faceVertexUvs = orbifold_geometry.faceVertexUvs[0];
    var vid = Math.floor(Math.random()*orbifold_geometry.vertices.length);

    point_on_orbifold.position.x = orbifold_geometry.vertices[vid].x;
    point_on_orbifold.position.y = orbifold_geometry.vertices[vid].y;
    point_on_orbifold.position.z = orbifold_geometry.vertices[vid].z;
    point_on_orbifold.visible = true;

    for(var i = 0; i < faceVertexUvs.length; i++) {
        var A = faceVertexUvs[i][0];
        var B = faceVertexUvs[i][1];
        var C = faceVertexUvs[i][2];
        var p = new THREE.Vector3(position); //search for p in vertices, 
        //convert p to uv: no way to find uv correspondinf to xyz (vertices is just an array)
        if(check_if_uv_on_triangle(p, A, B, C)) {
            //put point at position    
            break;
        }
    }
}
*/


function check_if_uv_on_triangle(p, A, B, C) {
    // Compute vectors
    p.sub(A);
    B.sub(A);
    C.sub(A);
    var v0 = p.dot(A);
    var v1 = p.dot(B);
    if((v0 > 0 && v1 > 0) || v0 < 0 && v1 < 0)
        return false;
    
    if(p.lengthSq() < B.lengthSq() && p.lengthSq() < A.lengthSq())
        return true;

    return false;
}

