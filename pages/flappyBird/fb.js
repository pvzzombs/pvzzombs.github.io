var player,pipesSprites,backgroundSprite,bird,pipes,gravity=.3,flap=-6,friction=.99,speed=2,score=0,highScore=0,speedUp=!1;function Bird(){this.x=50,this.y=5,this.dx=0,this.dy=0,this.width=this.height=50,this.draw=function(e){e.drawP5Image(this.x,this.y,this.width,this.height)},this.update=function(){bird.dy+=gravity,bird.dy*=friction,bird.y+=bird.dy,400<=this.y+this.height&&restartGame(),this.y+this.height<=0&&restartGame()}}function Pipe(){this.scored=!1,this.x=0,this.y=0,this.width=50,this.height=Math.floor(151*Math.random()+50),this.hole=150,this.draw=function(e){var i=this.height,t=400-this.height-this.hole;return e.drawP5Image(this.x,this.y,this.width,i,0,80-80*i/200,32,80*i/200),e.drawP5Image(this.x,this.height+this.hole,this.width,t,0,0,32,80*t/200),this.x},this.update=function(e){var i=collideRectRect(e.x,e.y,50,50,this.x,this.y,this.width,this.height),t=collideRectRect(e.x,e.y,50,50,this.x,this.height+this.hole,this.width,400-this.height-this.hole);return(i||t)&&restartGame(),e.x>this.x+this.width&&!this.scored&&(score++,this.scored=!0),this.x+this.width<=0||(this.x-=speed,!1)}}function preload(){bird=new Bird,pipes=[new Pipe,new Pipe,new Pipe];for(var e=0,i=0;i<pipes.length;i++)pipes[i].x=e+350,e+=200;player=new JSAnimatedSprite("img/bird.png",4,5,16,16),pipesSprites=new JSSpriteSheet("img/pipes.png"),backgroundSprite=new JSSprite("img/background.png",0,0,256,256),player.loadP5Image(),pipesSprites.loadP5Image(),backgroundSprite.loadP5Image()}function setup(){createCanvas(300,400).parent("canvas"),noSmooth()}function draw(){var e,i;clear(),backgroundSprite.drawP5Image(0,0,300,400),bird.draw(player),pipes[0].draw(pipesSprites),pipes[1].draw(pipesSprites),e=pipes[2].draw(pipesSprites),bird.update(),i=pipes[0].update(bird),pipes[1].update(bird),pipes[2].update(bird),i&&(i=pipes[0],pipes[0]=pipes[1],pipes[1]=pipes[2],pipes[2]=i,pipes[2].x=e+200,pipes[2].height=Math.floor(151*Math.random()+50),pipes[2].scored=!1),score%10!=0||0===score||speedUp||(speed+=.5,speedUp=!0),score%5&&(speedUp=!1),fill(0),textSize(15),text("Score : "+score,5,20),text("High score : "+highScore,5,35),text("Speed : "+speed,5,50)}function keyTyped(){return" "===key&&(bird.dy=flap),!1}function mousePressed(){return bird.dy=flap,!1}function touchStarted(){return bird.dy=flap,!1}function restartGame(){highScore=highScore<score?score:highScore,score=0,speed=2,(bird=new Bird).sprite=player,pipes=[new Pipe,new Pipe,new Pipe];for(var e=0,i=0;i<pipes.length;i++)pipes[i].x=e+350,e+=200}p5.disableFriendlyErrors=!0;