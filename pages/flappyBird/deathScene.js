function deathScene(){var i,p,t;this.setup=function(){t=!1,(i=new Bird).x=birdPos.x,i.y=birdPos.y,i.dy+=flap,p=[new Pipe,new Pipe,new Pipe];for(var e=0;e<3;e++)p[e].x=pipesPos[e].x,p[e].y=pipesPos[e].y,p[e].height=pipesPos[e].height;lastTime=(new Date).getTime()},this.draw=function(){fpm=frameRate()/1e3,nowTime=(new Date).getTime(),dt=nowTime-lastTime,dt*=fpm,lastTime=nowTime,speed=0,t&&this.setup(),clear(),backgroundSprite.drawP5Image(0,0,300,400),p[0].draw(pipesSprites),p[1].draw(pipesSprites),p[2].draw(pipesSprites),i.draw(playerSprite),i.updateMove(dt),400<=i.y&&(sfx_die.play(),t=!0,mgr.showScene(mainScene))}}