function Map(level) {
	this.level = level;
	var map1 = getMap(level);
	this.size = map1.size;
	this.grid = map1.grid;


	function getMap(level) {
		var size = 5;
		var grid = [];
		var gray = false;
		var odd = size%2==0;		
		for (var i = 0; i < size; i++) {
				if(odd)gray=!gray;
			for (var j = 0; j < size; j++) {
				gray=!gray;
				m = maps[i*size+j];
				grid[i*size+j] ={
					index : {idx:i*size+j,i:i,j:j},
					size : size,
					color : gray?"gray":"white",
					type : m.type,
					model : m.model,
					volt : m.volt,
					angle : 0,
					goal:false,
					connectingTo : getNeighbors(i*size+j, size, true)
				}

			}
		}
		return {size:size,grid:grid};
	}
	function randomVolt() {
		var values = [0,1,20,300];
		return values[Math.floor(Math.random()*3)+1];
		//return 20;
	}
	function randomType() {
		var types = ["generator","line","round","lamp"];
			models = {generator:["g1","g21","g22","g3"],line:["l1","l2","l3","l4"],round:["r1","r2"],lamp:["l1"]}
		var index = Math.floor(Math.random() * types.length);
		var type = types[index];
		index = Math.floor(Math.random() * models[type].length);
		var model = models[type][index];
		return {type:type,model:model};
	}
	function getNeighbors(index, size, border) {
		var neighbors = {};
		if(index-size>=0){
			neighbors.up = index-size;
		}else{
			neighbors.up = border?-1:index+size*(size-1);
		}
		if((index+1)%size>0){
			neighbors.right = index+1;
		}else{
			neighbors.right = border?-1:index+1-size;
		}
		if(index+size<size*size){
			neighbors.down = index+size;
		}else{
			neighbors.down = border?-1:index%size;
		}
		if(index%size>0){
			neighbors.left = index-1;
		}else{
			neighbors.left = border?-1:index-1+size;
		}
		return neighbors;
	}

}
var maps = [
	{
		"poles":[
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":0},
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0}
		],
		"model":"l1",
		"type":"lamp",
		"volt":1,
		"angle":1
	},{
		"poles":[
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":1},
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":1}
		],
		"model":"l1",
		"type":"line",
		"volt":1,
		"angle":1
	},{
		"poles":[
			{"frequence":0,"volt":1},
			{"frequence":1,"volt":1},
			{"frequence":1,"volt":1},
			{"frequence":1,"volt":1}
		],
		"model":"g3",
		"type":"generator",
		"volt":1,
		"angle":2
	},{
		"poles":[
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":301},
			{"frequence":1,"volt":301},
			{"frequence":1,"volt":301}
		],
		"model":"l3",
		"type":"line",
		"volt":300,
		"angle":1
	},{
		"poles":[
			{"frequence":0,"volt":300},
			{"frequence":0,"volt":300},
			{"frequence":1,"volt":300},
			{"frequence":1,"volt":300}
		],
		"model":"g21",
		"type":"generator",
		"volt":300,
		"angle":2
	},{
		"poles":[
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":0},
			{"frequence":0,"volt":0}
		],
		"model":"l1",
		"type":"lamp",
		"volt":301,
		"angle":2
	},{
		"poles":[
			{"frequence":1,"volt":0},
			{"frequence":2,"volt":301},
			{"frequence":2,"volt":301},
			{"frequence":1,"volt":0}
			],
		"model":"r2",
		"type":"round",
		"volt":20,
		"angle":0
	},{
		"poles":[
			{"frequence":1,"volt":321},
			{"frequence":2,"volt":301},
			{"frequence":1,"volt":321},
			{"frequence":2,"volt":301}
			],
		"model":"l2",
		"type":"line",
		"volt":20,
		"angle":0
	},{
		"poles":[
			{"frequence":1,"volt":301},
			{"frequence":2,"volt":321},
			{"frequence":2,"volt":321},
			{"frequence":1,"volt":301}
		],
		"model":"r2",
		"type":"round",
		"volt":1,
		"angle":0
	},{
		"poles":[
			{"frequence":1,"volt":321},
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":321},
			{"frequence":1,"volt":321}
		],
		"model":"l3",
		"type":"line",
		"volt":20,
		"angle":2
	},{
		"poles":[
			{"frequence":1,"volt":301},
			{"frequence":1,"volt":301},
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0}
		],
		"model":"r1",
		"type":"round",
		"volt":1,
		"angle":1
	},{
		"poles":[
			{"frequence":1,"volt":301},
			{"frequence":2,"volt":321},
			{"frequence":2,"volt":321},
			{"frequence":1,"volt":301}
		],
		"model":"r2",
		"type":"round",
		"volt":300,
		"angle":0
	},{
		"poles":[
			{"frequence":1,"volt":321},
			{"frequence":1,"volt":321},
			{"frequence":1,"volt":321},
			{"frequence":1,"volt":321}
		],
		"model":"l4",
		"type":"line",
		"volt":1,
		"angle":0
	},{
		"poles":[
			{"frequence":1,"volt":321},
			{"frequence":2,"volt":0},
			{"frequence":2,"volt":0},
			{"frequence":1,"volt":321}
		],
		"model":"r2",
		"type":"round",
		"volt":1,
		"angle":0
	},{
		"poles":[
			{"frequence":1,"volt":0},
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0}
		],
		"model":"l1",
		"type":"lamp",
		"volt":321,
		"angle":0
	},{
		"poles":[
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":0},
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0}
		],
		"model":"l1",
		"type":"lamp",
		"volt":321,
		"angle":1
	},{
		"poles":[
			{"frequence":1,"volt":321},
			{"frequence":2,"volt":20},
			{"frequence":2,"volt":20},
			{"frequence":1,"volt":321}
		],
		"model":"r2",
		"type":"round",
		"volt":300,
		"angle":0
	},{
		"poles":[
			{"frequence":1,"volt":20},
			{"frequence":0,"volt":20},
			{"frequence":1,"volt":20},
			{"frequence":1,"volt":20}
		],
		"model":"g3",
		"type":"generator",
		"volt":20,
		"angle":3
	},{
		"poles":[
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":0},
			{"frequence":0,"volt":0}
		],
		"model":"l1",
		"type":"lamp",
		"volt":21,
		"angle":2
	},{
		"poles":[
			{"frequence":0,"volt":1},
			{"frequence":0,"volt":1},
			{"frequence":1,"volt":1},
			{"frequence":0,"volt":1}
		],
		"model":"g1",
		"type":"generator",
		"volt":1,
		"angle":2
	},{
		"poles":[
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":0},
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0}
		],
		"model":"l1",
		"type":"lamp",
		"volt":20,
		"angle":1
	},{
		"poles":[
			{"frequence":1,"volt":20},
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":20},
			{"frequence":1,"volt":20}
		],
		"model":"l3",
		"type":"line",
		"volt":20,
		"angle":2
	},{
		"poles":[
			{"frequence":1,"volt":21},
			{"frequence":1,"volt":21},
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0}
		],
		"model":"r1",
		"type":"round",
		"volt":1,
		"angle":1
	},{
		"poles":[
			{"frequence":1,"volt":21},
			{"frequence":1,"volt":21},
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":21}
		],
		"model":"l3",
		"type":"line",
		"volt":1,
		"angle":3
	},{
		"poles":[
			{"frequence":1,"volt":21},
			{"frequence":0,"volt":0},
			{"frequence":0,"volt":0},
			{"frequence":1,"volt":21}
		],
		"model":"r1",
		"type":"round",
		"volt":20,
		"angle":0
	}
];
