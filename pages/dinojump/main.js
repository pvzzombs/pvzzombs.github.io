var prev,curr,dt,mfps=60,dinoSprites=[],dinoCurrentSprite=0,dinoSpritesCount=3,dinoSpriteSpeed=12/mfps,cactusSprite=null;function preload(){for(var e=0;e<dinoSpritesCount;e++)dinoSprites.push(loadImage("img/Velociraptor/"+e+".png"));cactusSprite=loadImage("img/cactus2.png")}function setup(){createCanvas(400,300).parent("canvas"),noSmooth(),frameRate(mfps),prev=Date.now()}var rects=[],w=50,h=50,lastX=200,m=.01,playerHeight=100,playerWidth=100,playerY=300-playerHeight,vel=0,g=.5,score=0,highScore=0,currentScene="main",shouldReset=!1;function drawDino(){image(dinoSprites[Math.floor(dinoCurrentSprite)],10,playerY+10,playerWidth,playerHeight,0,0,500,500),dinoSpritesCount<=(dinoCurrentSprite+=dinoSpriteSpeed*dt)&&(dinoCurrentSprite=0)}function draw(){switch(currentScene){case"main":main();break;case"retry":shouldReset=!0,retry()}}function retry(){curr=Date.now(),dt=(curr-prev)*mfps/1e3,prev=Date.now(),shouldReset&&(rects=[],lastX=200,playerY=300-playerHeight,vel=0,highScore=Math.max(score,highScore),score=0,shouldReset=!1),background(220),textSize(20),text("Press any key or click to restart",0,20),text("Highscore: "+Math.floor(highScore),0,40)}function main(){curr=Date.now(),dt=(curr-prev)*mfps/1e3,prev=Date.now(),background(220);var e=noise(m);m+=.01,lastX<=200&&e<.5&&rects.push({x:450});for(var r=0;r<rects.length;r++)rects[r].x-=5*dt;for(;rects.length&&rects[0].x<0-w;)rects.shift();lastX=rects.length?rects[rects.length-1].x:200;for(r=0;r<rects.length;r++)image(cactusSprite,rects[r].x,300-h,w,h,0,0,32,32);300-playerHeight<=playerY?(playerY=300-playerHeight,vel=0):playerY+=(vel+=g*dt)*dt;for(r=0;r<rects.length;r++)collideRectRect(45,playerY+20,playerWidth-60,playerHeight-20,rects[r].x+5,300-h,w-10,h)&&(console.log("Game Over"),currentScene="retry");drawDino(),score+=.2*dt,textSize(20),text("Score: "+Math.floor(score),0,20)}function keyPressed(){switch(currentScene){case"main":" "===key&&300-playerHeight<=playerY&&(playerY+=(vel=-10)*dt);break;case"retry":currentScene="main"}}function touchStarted(){switch(currentScene){case"main":300-playerHeight<=playerY&&(playerY+=(vel=-10)*dt);break;case"retry":currentScene="main"}}function mousePressed(){switch(currentScene){case"main":300-playerHeight<=playerY&&(playerY+=(vel=-10)*dt);break;case"retry":currentScene="main"}}