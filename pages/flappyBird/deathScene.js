function deathScene(){var i,p,s=!0;this.setup=function(){(i=new Bird).x=birdPos.x,i.y=birdPos.y,i.dy+=flap,p=[new Pipe,new Pipe,new Pipe];for(var e=0;e<3;e++)p[e].x=pipesPos[e].x,p[e].y=pipesPos[e].y,p[e].height=pipesPos[e].height;s=!1},this.draw=function(){if(fpm=frameRate()/1e3,nowTime=(new Date).getTime(),dt=nowTime-lastTime,dt*=fpm,lastTime=nowTime,speed=0,s){s=!1,(i=new Bird).x=birdPos.x,i.y=birdPos.y,i.dy+=flap,p=[new Pipe,new Pipe,new Pipe];for(var e=0;e<3;e++)p[e].x=pipesPos[e].x,p[e].y=pipesPos[e].y,p[e].height=pipesPos[e].height}clear(),backgroundSprite.drawP5Image(0,0,300,400),p[0].draw(pipesSprites),p[1].draw(pipesSprites),p[2].draw(pipesSprites),i.draw(playerSprite),i.updateMove(dt),400<=i.y&&(sfx_die.play(),s=!0,mgr.showScene(mainScene))}}