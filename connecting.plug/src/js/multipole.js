var types = 
	{
		generator:{
			g1: [1,0,0,0,1],
			g21: [1,1,0,0,1],
			g22: [1,0,1,0,1],
			g3: [1,1,0,1,1],
			g4: [1,1,1,1,1]
		},
		line:{
			l1: [1,0,1,0,0],
			l2: [1,2,1,2,0],
			l3: [1,1,1,0,0],
			l4: [1,1,1,1,0]
		},
		round:{
		 	r1 : [1,0,0,1,0],
			r2 : [1,2,2,1,0]
		},
		lamp:{ 
			l1:[1,0,0,0,0]
		}
	}
function Multipole(grid) {
	this.index = grid.index;
	this.angle = grid.angle;
	this.type = grid.type;
	this.color = grid.color;
	this.model = grid.model;
	this.volt = grid.volt;
	this.connectingTo = grid.connectingTo;
	this.rotated = 0;
	this.updated = false;
	this.goal = grid.goal;
	var self = this;
	init(this.type, this.model, this.volt);

	function init(type, model, volt) { 
		var a = types[type][model][0];
		var b = types[type][model][1];
		var c = types[type][model][2];
		var d = types[type][model][3];
		self.poles = 
				[{frequence:a,volt:volt},
				 {frequence:b,volt:volt},
				 {frequence:c,volt:volt},
				 {frequence:d,volt:volt}];
		self.shape =  new Shape(type,a,b,c,d);
	}
}
Multipole.prototype.draw = function(sketch) {
	var x = this.index.j*100;
	var y = this.index.i*100;
	if(this.rotated<0){
		this.rotated+=30;
		this.updated = this.rotated==0;
	}
	sketch.angleMode(sketch.DEGREES);
	sketch.push();
	sketch.fill(this.color);
	sketch.noStroke();
	sketch.rectMode(sketch.CENTER);
	sketch.translate(x+50, y+50);
	//stroke(255)
	sketch.rect(0, 0, 100, 100);
	sketch.rotate(this.angle*90+this.rotated);

	//rect(0, 0, 100, 100);
	//rotate(PI);
	/*fill(0);*/
	//rotate(PI/2*this.angle);
	
	this.shape.setPoles(this.poles,this.angle,this.volt,this.goal);
	this.shape.draw(100,sketch);

	sketch.pop();
	/*textSize(11)
	text(""+this.poles[0].frequence, x+50, y+10);
	text(""+this.poles[1].frequence, x+90, y+50);
	text(""+this.poles[2].frequence, x+50, y+100);
	text(""+this.poles[3].frequence, x, y+50);
	text(""+this.type, x+30, y+50);*/
};
Multipole.prototype.click = function() {
	this.rotation();
	this.angle++;
	if(this.angle>3){
		this.angle = 0;
	}
	this.rotated = -90;
};
Multipole.prototype.rotation = function() {
	var old = this.poles[3].frequence;
	for (var i = 3; i > 0; i--) {
		this.poles[i].frequence = this.poles[i-1].frequence;
	}
	this.poles[0].frequence = old;
};
Multipole.prototype.disconnect = function() {
	if(this.type == "generator"){
		return ;
	}
	for (var i = 0; i < this.poles.length; i++) {
		this.poles[i].volt = 0;
		this.goal = false;
	}
};
Multipole.prototype.connection = function(multipoles) {
	if(this.type == "generator"){
		var connectingTo = multipoles.getConnectingTo(this.connectingTo);
		for (var i = 0; i < 4; i++) {
			if(connectingTo[i] && this.poles[i].frequence>0){
				connectingTo[i].connect(getSide(i) , this.poles[i].volt, multipoles);
			}
		}
	}
};
Multipole.prototype.connect = function(side, volt, multipoles) {
	var frequence = this.poles[side].frequence;
	if(frequence==0 || this.type == "generator"){
		return ;
	}
	if(this.type == "lamp"){
		if(this.poles[side].frequence>0){
			this.goal = this.volt==volt;
		}
		return;
	}
	if(this.poles[side].volt != volt){
		var newVolt = getNewVolt(this.poles[side].volt, volt);
		var connectingTo = multipoles.getConnectingTo(this.connectingTo);
		for (var i = 0; i < 4; i++) {
			if(this.poles[i].frequence == frequence){
				this.poles[i].volt = newVolt;
				if(i!= side && connectingTo[i]){
					connectingTo[i].connect(getSide(i), newVolt, multipoles);
				}
			}
		}
	}
};
Multipole.prototype.isOff = function() {
	return this.type == "lamp" && !this.goal;
};
function getNewVolt(old, current) {
	var a = 0;
	var b = 0;
	var c = 0;
	if(old>=300){
		a = 300;
		old-=300;
	}
	if(current>=300){
		a = 300;
		current-=300;
	}
	if(old>=20){
		b = 20;
		old-=20;
	}
	if(current>=20){
		b = 20;
		current-=20;
	}
	if(old>=1){
		c = 1;
		old-=1;
	}
	if(current>=1){
		c = 1;
		current-=1;
	}
	return a+b+c;
}
function getSide(pole) {
	for (var i = 0; i < 2; i++) {
		pole++;
		if(pole>3) pole = 0;
	}
	return pole;
}
