function Shape(type,up,right,down,left) {
	this.shapes = [];
	this.poles = {up:"",right:""};
	//up
	this.type = type;
	this.shapes.push(poleUp);
	//right
	if(right){
		this.shapes.push(poleRight)
	}
	//down
	if (down) {
		this.shapes.push(poleDown)
	}
	//left
	if(left){
		this.shapes.push(poleLeft)
	}
	//centre
	if(type.search(/generator/)>=0){
		this.shapes.push(generator)
	}else if(type.search(/line/)>=0){
		if(right){
			if(right==up){
				if(left){
					this.shapes.push(plusCable);
				}else{
					this.shapes.push(tCable);
				}
			}else{
				this.shapes.push(bridgeCable);
			}
		}else{
			this.shapes.push(simpleCable);
		}
	}else if(type.search(/round/)>=0){
		this.shapes.push(simpleRoundCable);
		if(right){
			this.shapes.push(doubleRoundCable);
		}
	}else{
		this.shapes = [];
		this.shapes.push(lamp);
	}
	function poleUp(size,poles,sketch) {
		try{

		sketch.fill(poles.up);
		}catch(err){
			console.err(poles.up)
		}
		sketch.rect(0,-size/2+5/2,20,5);
		sketch.rect(0,-size/2+size/6,10,size/3);	
	}
	function poleRight(size,poles,sketch) {
		sketch.fill(poles.right);
		sketch.rect(size/2-5/2,0,5,20);
		sketch.rect(size/2-size/6,0,size/3,10);
	}
	function poleDown(size,poles,sketch) {
		sketch.fill(poles.down);
		sketch.rect(0,size/2-5/2,20,5);
		sketch.rect(0,size/2-size/6,10,size/3);
	}
	function poleLeft(size,poles,sketch) {
		sketch.fill(poles.left);
		sketch.rect(-size/2+5/2,0,5,20);
		sketch.rect(-size/2+size/6,0,size/3,10);
	}
	function generator(size,poles,sketch) {
		sketch.fill(poles.up);
		sketch.rect(0,0,size/3,size/3);
		sketch.stroke("black")
		sketch.fill("white")
		sketch.textSize(26);
		sketch.textFont("FontAwesome");
		sketch.text('\uf0e7',-6,7)
	}
	function simpleCable(size,poles,sketch) {
		sketch.fill(poles.up);
		sketch.rect(0,0,10,size/3);
	}
	function plusCable(size,poles,sketch) {
		sketch.fill(poles.up);
		sketch.rect(0,0,10,size/3);
		sketch.rect(0,0,size/3,10);
	}
	function bridgeCable(size,poles,sketch) {
		sketch.fill(poles.up);
		sketch.rect(0,0,10,size/3);
		sketch.fill(poles.right);
		sketch.rect(-size/2+size/3+5,0,10,10);
		sketch.rect(0,-5,size/3,10);
		sketch.rect(size/2-size/3-5,0,10,10);
	}
	function tCable(size,poles,sketch) {
		sketch.fill(poles.up);
		sketch.rect(0,0,10,size/3);
		sketch.rect(size/6-size/12,0,size/6,10);
	}
	function simpleRoundCable(size,poles,sketch) {
		sketch.fill(poles.up)
		sketch.beginShape();
		for (var i = 0; i < 90; i++) {
			var x = (size/3-5) * sketch.cos(i);    
		    var y = (size/3-5) * sketch.sin(i);
			sketch.vertex(x-size/3+10,y-size/3+10);
		}
		for (var i = 90; i >0; i--) {
			var x = (size/3-15) * sketch.cos(i);    
		    var y = (size/3-15) * sketch.sin(i);
			sketch.vertex(x-size/3+10,y-size/3+10);
		}
		sketch.endShape();
	}
	function doubleRoundCable(size,poles,sketch) {
		sketch.fill(poles.right)
		sketch.beginShape();
		for (var i = 180; i < 270; i++) {
			var x = (size/3-5) * sketch.cos(i);    
		    var y = (size/3-5) * sketch.sin(i);
			sketch.vertex(x+size/3-10,y+size/3-10);
		}
		for (var i = 270; i >180; i--) {
			var x = (size/3-15) * sketch.cos(i);    
		    var y = (size/3-15) * sketch.sin(i);
			sketch.vertex(x+size/3-10,y+size/3-10);
		}
		sketch.endShape();
	}
	function lamp(size,poles,sketch) {
		if(poles.goal){
			light(poles.corp,sketch)
		}
		sketch.fill(poles.corp);
		sketch.ellipse(0,0,size/3,size/2);
		sketch.noStroke()
		sketch.rect(0,-size/2+5/2,20,5);
		sketch.rect(0,-size/2+size/6,10,size/3);
		/*line(0,0,-40,0);
		line(0,0,0,-40);*/
	}
	function light(c,sketch) {
		c = sketch.color(c);
		c.levels[3] = 100;
		sketch.stroke(c.levels);
		sketch.strokeWeight(3)
		sketch.line(0,0,30,30);
		sketch.line(0,0,0,40);
		sketch.line(0,0,-30,30);
		sketch.line(0,0,-40,0);
		sketch.line(0,0,-30,-30);
		sketch.line(0,0,30, -30);
		sketch.line(0,0,40, 0);
	}
}
Shape.prototype.draw = function(size,sketch) {
	for (var i = 0; i < this.shapes.length; i++) {
		this.shapes[i](size,this.poles,sketch);

	}
};
Shape.prototype.setPoles = function(poles,angle,volt,goal){
	var colors = {color0:"#bdb8b8",color1:"blue",color20:"yellow",color300:"red",
				  color21:"green",color320:"orange",color301:"violet",color321:"pink"};
	var colorsLight = {blue:"#393979",green:"#397139",red:"#c11b1b",
				  yellow:"#cece20",orange:"#bf8822",violet:"#a276a2",pink:"#daa1ab"};
				  //console.log(poles)
	this.poles.up = colors["color"+poles[angle].volt];
	this.poles.right = colors["color"+poles[angle+1>3?angle+1-4:angle+1].volt];
	this.poles.down = colors["color"+poles[angle+2>3?angle+2-4:angle+2].volt];
	this.poles.left = colors["color"+poles[angle+3>3?angle+3-4:angle+3].volt];
	//console.log(this.poles);
	if(goal){	
		this.poles.corp = colors["color"+volt];
	}else{
		this.poles.corp = colorsLight[colors["color"+volt]];		
	}
	this.poles.goal = goal;
	/*if(this.type.search(/round2/)>=0){
		console.log(angle)
		console.log(angle+1>3?angle+1-4:angle+1)
		console.log(angle+2>3?angle+2-4:angle+2)
		console.log(angle+3>3?angle+3-4:angle+3)
		console.log(this.poles)
	}*/
	//console.log(this.poles)
	/*this.poles.up="aqua";	
	this.poles.right="aqua"	;*/
};
