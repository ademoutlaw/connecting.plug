var connBoard;
function setup() {
  	connBoard = new ConnectingBoard();
  	var tall = connBoard.size*100;
	createCanvas(tall,tall);
  	background(0);
  	
}
function mouseClicked(){
	connBoard.click(mouseX,mouseY);
}
function draw() {
	connBoard.draw(this);
}