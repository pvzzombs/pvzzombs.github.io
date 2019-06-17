//the world
var player;
var gravity = 0.3;
var flap = -5;
var friction = 0.99;
var speed = 2;
var bird;
var pipes;
var score = 0;
var highScore = 0;
var speedUp = false;
//the bird
function Bird(){
	this.src = "data:image/png;base64,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";
	this.x = 50;
	this.y = 5;
	this.dx = 0;
	this.dy = 0;
	this.width = this.height = 50;
	this.draw = function(){
		fill("red");
		image(player, this.x, this.y);
	}
	this.update = function(){
		bird.dy += gravity;
		bird.dy *= friction;
		bird.y += bird.dy;
		if(this.y + this.height >= 400){
			restartGame();
		}
		if(this.y + this.height <= 0){
			restartGame();
		}
	}
}
//the pipe
function Pipe(){
	this.scored = false;
	this.x = 0;
	this.y = 0;
	this.width = 50;
	this.height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
	this.hole = 150;
	this.draw = function(){
		fill("green");
		rect(this.x, this.y, this.width, this.height);
		rect(this.x, this.height+this.hole, this.width, 400 - this.height -this.hole)
	}
	this.update = function(){
		var isUpperCollided = collideRectRect(bird.x, bird.y, 50, 50, this.x, this.y, this.width, this.height);
		var isLowerCollided = collideRectRect(bird.x, bird.y, 50, 50, this.x, this.height+this.hole, this.width, 400 - this.height - this.hole);
		if(isUpperCollided || isLowerCollided){
			restartGame();
		}
		if(bird.x > this.x + this.width && !this.scored){
			score++;
			this.scored = true;
		}
		if(this.x+this.width<=0){
          this.x = 550;
		  this.height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
		  this.scored = false;
		}else{
		  this.x -= speed;
		}
	}
}
function setup(){
	createCanvas(300,400);
	bird = new Bird();
	pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
	var $pipe = 0;
	for(var i=0; i<pipes.length; i++){
		pipes[i].x = $pipe + 350;
		$pipe += 200;
	}
	player = loadImage(bird.src);
}
function draw(){
	clear();
	background(128,128,255);
	bird.draw()
    for(var i=0; i<pipes.length; i++){
		pipes[i].draw();
		pipes[i].update();
	}
	bird.update()
	if(score % 10 === 0 && score !== 0 && !speedUp){
		speed += 0.5;
		speedUp = true;
	}
	if(score % 5){
		speedUp = false;
	}
	fill(0);
    textSize(15);
    text("Score : " + score, 5, 20);
    text("High score : " + highScore, 5, 35);
	text("Speed : " + speed, 5, 50);
}
function keyTyped() {
  if (key === ' ') {
	bird.dy = flap;
  }
  return false;
}
function mousePressed() {
  bird.dy = flap;
  return false;
}
function restartGame(){
	highScore = (highScore < score) ? score : highScore;
	score = 0;
	speed = 2;
	bird = new Bird();
	pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
	var $pipe = 0;
	for(var i=0; i<pipes.length; i++){
		pipes[i].x = $pipe + 350;
		$pipe += 200;
	}
	
}