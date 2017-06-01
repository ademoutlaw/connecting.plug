function ConnectingBoard(level){
	var data = new Map(level);
	this.size = data.size;
	this.multipoles = [];
	this.updated = false;
	this.MultipoleClicked = 0;
	var self = this;
	init();
	function init() {
		for (var i = 0; i < data.grid.length; i++) {
			self.multipoles[i] = new Multipole(data.grid[i]);
		}
	}
}
ConnectingBoard.prototype.draw = function(sketch) {
	if(this.updated){
		return;
	}
	for (var i = 0; i < this.multipoles.length; i++) {
		this.multipoles[i].draw(sketch);
	}
	this.updated = this.multipoles[this.MultipoleClicked].updated;
};
ConnectingBoard.prototype.click = function(x, y) {
	var j = Math.floor(x / 100);
	var i = Math.floor(y / 100);
	if(i<0||i>=this.size||j<0||j>=this.size){
		return false;
	}
	this.MultipoleClicked = i*this.size+j;
	this.multipoles[i*this.size+j].click();
	if(this.simulate()){
		alert("you win");
	}
};
ConnectingBoard.prototype.simulate = function() {
	for (var i = 0; i < this.multipoles.length; i++) {
		this.multipoles[i].disconnect();
	}
	for (var i = 0; i < this.multipoles.length; i++) {
		this.multipoles[i].connection(this);
	}
	this.updated = false;
	for (var i = 0; i < this.multipoles.length; i++) {
		if(this.multipoles[i].isOff()){
			return false;
		}
	}
	return true;
};
ConnectingBoard.prototype.getConnectingTo = function(conToArray) {
	var connectingTo = [];
	var i = 0;
	for (var k in conToArray) {
		var idx = conToArray[k];
		if(idx>=0){
			connectingTo[i] = this.multipoles[idx];
		}else{
			connectingTo[i] = null;
		}
		i++;
	}
	return connectingTo;
};
