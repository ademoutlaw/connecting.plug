var tall = 500;
var tetris;

function setup() {
	var w = window.windowHeight< window.windowWidth?window.windowHeight:window.windowWidth;
  	tetris = new Tetris();
	var canvas = createCanvas(w,w);
	canvas.parent("canvas");

  	background(0);
  	//frameRate(100)
  	//noLoop();
}
function mouseClicked(){
	//tetris.getNextShape();
	draw();

}
function keyPressed(key) {
	tetris.move(key.keyCode)
	// body...
}
function draw() {
	tetris.draw();
	tetris.update();
}
function move(key){
	tetris.move(key)
}
