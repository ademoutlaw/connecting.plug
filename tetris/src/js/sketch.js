var tall = 500;
function setup() {
  	tetris = new Tetris();
	createCanvas(tall,tall);
  	background(0);
  	frameRate(100)
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