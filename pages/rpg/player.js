function Player(){this.x=0,this.y=0,this.vx=0,this.vy=0,this.width=24,this.height=32}Player.prototype={draw:function(t,i){t=this.x+t,i=this.y+i;playerSprite.drawP5Image(t,i,this.width,this.height,0,0,96,128)}};