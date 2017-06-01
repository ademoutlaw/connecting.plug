var shapes = {
	I: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
	J: [[2,0,0,0], [2,2,2,0], [0,0,0,0], [0,0,0,0]],
	L: [[0,0,3,0], [3,3,3,0], [0,0,0,0], [0,0,0,0]],
	O: [[4,4,0,0], [4,4,0,0], [0,0,0,0], [0,0,0,0]],
	S: [[0,5,5,0], [5,5,0,0], [0,0,0,0], [0,0,0,0]],
	T: [[0,6,0,0], [6,6,6,0], [0,0,0,0], [0,0,0,0]],
	Z: [[7,7,0,0], [0,7,7,0], [0,0,0,0], [0,0,0,0]]
};
var FPS = 55;
var colors = ["F92338", "C973FF", "1C76BC", "FEE356", "53D504", "36E0FF", "F8931D"];
function randomKey() {
	var keys =["I","J","L","O","S","T","Z"];
	return keys[Math.floor(Math.random()*7)];
}
function Shape(x, y,key) {
	this.x = x;
	this.y = y;
	this.shape = (function (key) {
		if(!key){
			key = randomKey();
		}
		return shapes[key];
	})();
}
Shape.prototype.moveLeft = function() {
	this.saveShape();
	this.x--;	
};
Shape.prototype.moveRight = function() {
	this.saveShape();
	this.x++;
};
Shape.prototype.rotate = function() {
		this.saveShape();
		var newArray = [];
		for (var i=0; i < 4; i++) {
			newArray[i]=[];
			for (var j = 3; j >= 0; j--) {
				newArray[i].push(this.shape[j][i]);
			}
		}
		this.shape = newArray;
};
Shape.prototype.moveDown = function() {
	this.saveShape();
	this.y++;
};
Shape.prototype.saveShape = function() {
	this.oldShape = this.shape.slice(0);
	this.oldX = this.x;
	this.oldY = this.y;
};
Shape.prototype.undoUpdate = function() {
	this.y--;
	return this.y>=0;
};
Shape.prototype.update = function(first_argument) {
	this.y++;
};
Shape.prototype.undoMove = function() {
	if(this.oldShape){
		this.shape = this.oldShape.slice(0);
		this.x = this.oldX;
		this.y = this.oldY;
		return true;
	}
	return false;
};
Shape.prototype.draw = function(inBag) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(inBag){
				var y = i*20 + 50;
				var x = j*20+ 300;
				fill("red")
				if(this.shape[i][j]!=0){
					rect(x,y,20,20);
				}
			}else{				
				var y = this.y+i;
				var x = this.x+j;
				fill("yellow")
				if(x<10&&y<20&&this.shape[i][j]!=0){
					rect(x*20,y*20,20,20);
				}
			}

		}
	}
	// body...
};
//****************************************************************************
function Board() {
	this.grid = [
		[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
		];
	this.rowsToClear = [];
	this.showClearsRows = true;
	this.frameNbr = 0;
}
Board.prototype.applyShape = function(shape) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var y = shape.y+i;
			var x = shape.x+j;
			if(x<10&&y<20&& shape.shape[i][j]!=0){
				this.grid[y][x] = shape.shape[i][j];
			}
		}
	}
	this.prepareRowsToClear();
};
Board.prototype.update = function() {
	this.showClearsRows = this.frameNbr%3==0;
	this.frameNbr++;
	if(this.frameNbr>FPS+FPS/4){
		this.frameNbr=0;
		this.clearRows();
	}
};
Board.prototype.tryShape = function(shape) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(shape.shape[i][j]!=0 ){
				var y = shape.y+i;
				var x = shape.x+j;
				if(x>=10||y>=20 || this.grid[y][x]!=0){
					return false;
				}
			}			
		}
	}
	return true;
};
Board.prototype.prepareRowsToClear = function(shape) {
	this.rowsToClear = [];
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			if(this.grid[i][j]==0){
				break;
			}else if(j==9){
				this.rowsToClear.push(i);
			}
		}
	}
};
Board.prototype.clearRows = function() {
	for (var i = 0; i < this.rowsToClear.length; i++) {
		this.grid.splice(this.rowsToClear[i],1);
	}
	for (var i = 0; i < this.rowsToClear.length; i++) {
		this.grid.unshift([0,0,0,0,0,0,0,0,0,0]);
	}
	this.rowsToClear = [];
	
};
Board.prototype.draw = function() {
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			fill("#"+colors[this.grid[i][j]]);
			
			rect(j*20,i*20,20,20);
		}
	}
	if(this.showClearsRows){
		for (var i = 0; i < this.rowsToClear.length; i++) {
			for (var j = 0; j < 10; j++) {
				var x = this.rowsToClear[i];
				fill("#"+colors[0]);
				stroke("#"+colors[this.grid[x][j]])
				
				rect(j*20,x*20,20,20);
			}
		}
		stroke(0)
	}
};
//****************************************************************************
function Tetris(argument) {
	this.board = new Board();
	this.shape = new Shape(0,0);
	this.nextShape = new Shape(0,0);
	this.frameNbr = 100;
}
Tetris.prototype.update = function() {
	if(this.frameNbr>=FPS){		
		this.moveDown();
		if(this.board.tryShape(this.shape)){
		}else{
			if(this.shape.undoUpdate()){
				this.getNextShape();
			}else{
				this.gameOver();
			}
		}
		this.frameNbr = 0;
		//this.frameNbr = this.frameNbr>FPS?0:this.frameNbr;
	}
	this.frameNbr++;
};
Tetris.prototype.draw = function() {
	background(0)
	this.board.update();
	this.board.draw();
	this.shape.draw();
	this.nextShape.draw(true);
};
Tetris.prototype.gameOver = function() {
	console.log("gameOver")
	noLoop();
};
Tetris.prototype.getNextShape = function() {
	this.board.applyShape(this.shape)
	this.shape = this.nextShape;
	this.nextShape = new Shape(0,0);
	this.accepted = false;
	this.frameNbr = 100;
	// body...
};
Tetris.prototype.moveDown = function() {
	//this.board.romoveShape(this.shape);
	if(this.accepted){
		this.shape.update();
	}
	this.accepted = true;
};

Tetris.prototype.move = function(key) {
	console.log(key)
	if(this.accepted){
		switch(key){
			case 38:
				this.shape.rotate();
			break;
			case 39:
				this.shape.moveRight();
			break;
			case 37:
				this.shape.moveLeft();
			break;
			case 40:
				this.shape.moveDown();
			break;
			default:
				return false;
		}
		if(this.board.tryShape(this.shape)){
			if(key==40){
				this.move(key);
			}

		}else{
			this.shape.undoMove();
		}
	}
};