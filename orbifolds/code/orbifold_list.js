var orbifold_list = {
	  "yellow" : {
             "stamp" : "yellow.png",
             "translation_1" : [250,0],
             "translation_2" : [50,200],
             "equivalent_points" : function(x, y) {return [[0,0]];},
             "universal_cover": "plane",
             "euler_characteristic" : [0,1],
             "elliptic_point_orders" : [],
             "corner_reflector_orders" : [],
             "model" : ""
          }, 

	  "p1" : {
	     "stamp" : "p1.png",
	     "translation_1" : [250,0], 
	     "translation_2" : [50,200],
	     "equivalent_points" : function(x, y) {return [[x,y]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [],
	     "corner_reflector_orders" : [],
	     "model" : "p1.js"
	  },

	  "p2" : {
	     "stamp" : "p2.png",
	     "translation_1" : [250,0], 
	     "translation_2" : [50,200],
	     "equivalent_points" : function(x, y) {return [[x,y], [300-x,200-y]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [2,2,2,2],
	     "corner_reflector_orders" : [],
	     "model" : "p2.js"
	  },
	  
	  "p4m" : {
	     "stamp" : "p4m.png",
	     "translation_1" : [300,0], 
	     "translation_2" : [0,300],
	     "equivalent_points" : function(x, y) {return [[x,y], [y,x], [300-x,y], [y,300-x], [x,300-y], [300-y,x], [300-x,300-y], [300-y,300-x]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [],
	     "corner_reflector_orders" : [2,4,4],
	     "model" : "p4m.js"
	  },
	  
	   "p3" : {
	     "stamp" : "p3.png",
	     "translation_1" :[200, 0], 
	     "translation_2" : [100, 173.2051],
	     "equivalent_points" : function(x, y) {return [[x,y], [-0.5*(x-150)-0.86603*(y-86.603)+50,0.86603*(x-150)-0.5*(y-86.603)+86.603], [-0.5*(x-150)+0.86603*(y-86.603)+100,-0.86603*(x-150)-0.5*(y-86.603)]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [3,3,3],
	     "corner_reflector_orders" : [],
	     "model" : "p3.js"
	  },
	  
	  "cmm" : {
	     "stamp" : "cmm.png",
	     "translation_1" : [150,100], 
	     "translation_2" : [150,-100],
	     "equivalent_points" : function(x, y) {return [[x,y], [300-x,y], [x,200-y], [300-x,200-y]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [2],
	     "corner_reflector_orders" : [2,2],
	     "model" : "cmm.js"
	  },

	  "pm" : {
	     "stamp" : "pm.png",
	     "translation_1" : [300,0], 
	     "translation_2" : [0,200],
	     "equivalent_points" : function(x, y) {return [[x,y], [x,200-y]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [],
	     "corner_reflector_orders" : [],
	     "model" : "pm.js"
	  },

	  "p4" : {
	  	 "stamp" : "p4.png",
	  	 "translation_1" : [300,0], 
	     "translation_2" : [0,300],
	     "equivalent_points" : function(x, y) {return [[x,y], [300-y,x], [300-x,300-y], [y,300-x]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [2,4,4],
	     "corner_reflector_orders" : [],
	  	 "model" : "p4.js"
	  },

	  "pg" : {
	  	 "stamp" : "pg.png",
		 "translation_1" : [300,0], 
	     "translation_2" : [0,200],
	     "equivalent_points" : function(x, y) {return [[x,y], [150+x,200-y]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [],
	     "corner_reflector_orders" : [],
	  	 "model" : "pg.js"
	  },

      "pmm" : {
	  	 "stamp" : "pmm.png",
		 "translation_1" : [300,0], 
	     "translation_2" : [0,200],
	     "equivalent_points" : function(x, y) {return [[x,y], [300-x,y], [x,200-y], [300-x,200-y]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [2,2,2,2],
	     "corner_reflector_orders" : [],
	  	 "model" : "pmm.js"
	  },

      "pmg" : {
	  	 "stamp" : "pmg.png",
		 "translation_1" : [300,0], 
	     "translation_2" : [0,200],
	     "equivalent_points" : function(x, y) {return [[x,y], [x,200-y], [300-x,100-y], [300-x,y+100]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [2,2],
	     "corner_reflector_orders" : [],
	  	 "model" : "pmg.js"
	  },

	  "p6m" : {
	  	 "stamp" : "p6m.png",
	  	 "translation_1" : [200,0], 
	     "translation_2" : [100,173.204],
		 "equivalent_points" : function(x, y) {return [[x,y], [200-x,y], [300-x,173.204-y], [100+x,173.204-y],
		 	[0.5*x+0.86603*y,0.86603*x-0.5*y],[0.5*(200-x)+0.86603*y,0.86603*(200-x)-0.5*y],
		 	[0.5*(300-x)+0.86603*(173.204-y),0.86603*(300-x)-0.5*(173.204-y)],[0.5*(100+x)+0.86603*(173.204-y),0.86603*(100+x)-0.5*(173.204-y)],
		 	[-0.5*(x) - 0.86603*(y), 0.86603*(x) - 0.5*(y)], [-0.5*(200-x) - 0.86603*(y), 0.86603*(200-x) - 0.5*(y)],
		 	[-0.5*(300-x) - 0.86603*(173.204-y), 0.86603*(300-x) - 0.5*(173.204-y)], [-0.5*(100+x) - 0.86603*(173.204-y), 0.86603*(100+x) - 0.5*(173.204-y)]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [2,3,6],
	     "corner_reflector_orders" : [],
	  	 "model" : "p6m.js"
	  },

	  "p3m1" : {
	  	 "stamp" : "p3m1.png",
	  	 "translation_1" : [200,0], 
	     "translation_2" : [100,173.204],
		 "equivalent_points" : function(x, y) {return [[x,y], [200-x,y],
		 	[0.5*x + 0.86603*y, 0.86603*x - 0.5*y], [0.5*(200-x) + 0.86603*y, 0.86603*(200-x) - 0.5*y],
		 	[200-(0.5*(200-x) + 0.86603*y), 0.86603*(200-x) - 0.5*y],
		 	[0.5*(200-(0.5*(200-x) + 0.86603*y)) + 0.86603*(0.86603*(200-x) - 0.5*y), 0.86603*(200-(0.5*(200-x) + 0.86603*y)) - 0.5*(0.86603*(200-x) - 0.5*y)]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [],
	     "corner_reflector_orders" : [3,3,3],
	  	 "model" : "p3m1.js"
	  },

	  "p31m" : {
	  	 "stamp" : "p31m.png",
	  	 "translation_1" : [200,0], 
	     "translation_2" : [100,173.204],
		 "equivalent_points" : function(x, y) {return [[x,y], [100+x,173.204-y],
		 	[0.5*(200-x)+0.86603*y,0.86603*(200-x)-0.5*y],
		 	[0.5*(300-x)+0.86603*(173.204-y),0.86603*(300-x)-0.5*(173.204-y)],
		 	[-0.5*(x) - 0.86603*(y), 0.86603*(x) - 0.5*(y)], [-0.5*(100+x) - 0.86603*(173.204-y), 0.86603*(100+x) - 0.5*(173.204-y)]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [3],
	     "corner_reflector_orders" : [3],
	  	 "model" : "p31m.js"
	  },
	  
	  

	  "p6" : {
	  	 "stamp" : "p6.png",
	  	 "translation_1" : [200,0], 
	     "translation_2" : [100,173.204],
		 "equivalent_points" : function(x, y) {return [[x,y],[-0.5*x-0.86603*y+200,0.86603*x-0.5*y],
		 [-0.5*x+0.86603*y+100,-0.86603*x-0.5*y+173.205], [300-x, 173.205-y],
		 [0.5*x-0.86603*y+100, 0.86603*x+0.5*y-173.205],[0.5*x+0.86603*y+100, -0.86603*x+0.5*y+173.205]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [2,3,6],
	     "corner_reflector_orders" : [],
	  	 "model" : "p6.js"
	  },
	  
	   "p4g" : {
	     "stamp" : "p4g.png",
	     "translation_1" : [300,0], 
	     "translation_2" : [0,300],
	     "equivalent_points" : function(x, y) {return [[x,y], [150-x,y+150],
	     	[x+150,150-y], [-1*x,300-y],
	     	[300-y,x], [150-y,150-x],
	     	[150+y,x+150], [y,-1*x]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [4],
	     "corner_reflector_orders" : [2],
	     "model" : "p4g.js"
	  },
	  
	   "pgg" : {
	     "stamp" : "pgg.png",
	     "translation_1" : [300,0], 
	     "translation_2" : [0,200],
	     "equivalent_points" : function(x, y) {return [[x,y], [300-x,200-y],
	     	[x+150,100-y], [150-x,100+y]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [2,2],
	     "corner_reflector_orders" : [],
	     "model" : "pgg.js"
	  },
	  
	     "cm" : {
	     "stamp" : "cm.png",
	     "translation_1" : [150,100], 
	     "translation_2" : [150,-100],
	     "equivalent_points" : function(x, y) {return [[x,y], [x,200-y]];},
	     "universal_cover": "plane",
	     "euler_characteristic" : [0,1],
	     "elliptic_point_orders" : [],
	     "corner_reflector_orders" : [],
	     "model" : "cm.js"
	  },
};

