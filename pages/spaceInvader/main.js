var dt,now,last,pft,imagesLength=5,currentImageLoadedLength=0,back={img:"img/galaxy.jpeg",loaded:null,x:0,y:0,width:300,height:400},player={img:"img/player.gif",loaded:null,x:150,y:350,width:32,height:32,cropHeight:18,life:3,maxLife:3},enemy={img:"img/enemy.png",loaded:null,x:0,y:25,width:90,height:90,cropHeight:45,life:1e3,maxLife:1e3},bullet={img:"img/bullet.png",loaded:null,x:player.x+8,y:345-player.height,width:16,height:16},bomb={img:"img/bomb.png",loaded:null,x:enemy.x+8,y:15+enemy.height,width:16,height:16},score=0,temp=2,wait=0,shouldDisplay=!1;function loadingText(){var e=document.getElementById("loadingText");e&&(e.innerText="Loaded "+ ++currentImageLoadedLength+"/"+imagesLength),currentImageLoadedLength===imagesLength&&(e.style.display="none",shouldDisplay=!0)}function loadingError(e){Swal.fire({icon:"error",title:"Error",text:"An error occured while loading the image. Please refresh this page or try again later."})}function preload(){back.loaded=new JSSprite(back.img,0,0,183,275),player.loaded=new JSSprite(player.img,0,0,264,270),enemy.loaded=new JSAnimatedSprite(enemy.img,36,5,288,348),bullet.loaded=new JSSprite(bullet.img,0,0,16,16),bomb.loaded=new JSSprite(bomb.img,0,0,16,16),back.loaded.loadP5Image(loadingText,loadingError),player.loaded.loadP5Image(loadingText,loadingError),enemy.loaded.loadP5Image(loadingText,loadingError),bullet.loaded.loadP5Image(loadingText,loadingError),bomb.loaded.loadP5Image(loadingText,loadingError)}function setup(){createCanvas(300,400).parent("canvas"),last=(new Date).getTime()}function draw(){mainGame()}function mainGame(){var e,l;shouldDisplay&&(pft=frameRate()/1e3,now=(new Date).getTime(),dt=now-last,dt*=pft,last=now,back.loaded.drawP5Image(back.x,back.y,back.width,back.height),player.loaded.drawP5Image(player.x,player.y,player.width,player.height),enemy.loaded.drawP5Image(enemy.x,enemy.y,enemy.width,enemy.height),bullet.loaded.drawP5Image(bullet.x,bullet.y),bomb.loaded.drawP5Image(bomb.x,bomb.y),bullet.y<0&&(bullet.x=player.x+8,bullet.y=345-player.height),400<bomb.y&&(bomb.x=enemy.x+8,bomb.y=15+enemy.height),enemy.x<0&&(temp=2),enemy.x>back.width-enemy.width&&(temp=-2),enemy.x+=temp*dt,bullet.y-=10*dt,bomb.y+=4*dt,e=collideRectRect(bullet.x,bullet.y,bullet.width,bullet.height,enemy.x,enemy.y,enemy.width,enemy.cropHeight),l=collideRectRect(bomb.x,bomb.y,bomb.width,bomb.height,player.x,player.y,player.width,player.cropHeight),e&&(bullet.x=player.x+8,bullet.y=345-player.height,0<enemy.life&&(enemy.life-=5),0===enemy.life)&&(fill("green"),textSize(25),text("You win!",60,250),noLoop()),l&&(bomb.x=enemy.x+8,bomb.y=15+enemy.height,0<player.life&&player.life--,0===player.life)&&(fill("red"),textSize(20),text("Game over",60,250),noLoop()),fill(255),textSize(16),text("Enemy: "+enemy.life,0,12),text("Player: "+player.life,0,24),fill("red"),rect(200,0,enemy.life/enemy.maxLife*100,10),fill("green"),rect(200,11,player.life/player.maxLife*100,10))}function mousePressed(){mouseX<150&&0<player.x&&(player.x-=30),150<=mouseX&&back.width-player.width>player.x&&(player.x+=30)}function touchStarted(){var e=touches[0];e.x<150&&0<player.x&&(player.x-=30),150<=e.x&&back.width-player.width>player.x&&(player.x+=30)}function keyPressed(){keyCode===LEFT_ARROW?0<player.x&&(player.x-=30):keyCode===RIGHT_ARROW&&back.width-player.width>player.x&&(player.x+=30)}p5.disableFriendlyErrors=!0;