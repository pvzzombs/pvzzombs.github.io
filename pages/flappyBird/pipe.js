function Pipe(){this.scored=!1,this.x=0,this.y=0,this.width=50,this.height=Math.floor(151*Math.random()+50),this.hole=150,this.draw=function(h){var t=this.height,i=400-this.height-this.hole;return h.drawP5Image(this.x,this.y,this.width,t,0,80-80*t/200,32,80*t/200),h.drawP5Image(this.x,this.height+this.hole,this.width,i,0,0,32,80*i/200),this.x},this.update=function(h,t){var i=collideRectRect(h.x+h.hitbox.x,h.y+h.hitbox.y,h.hitbox.width,h.hitbox.height,this.x,this.y,this.width,this.height),s=collideRectRect(h.x+h.hitbox.x,h.y+h.hitbox.y,h.hitbox.width,h.hitbox.height,this.x,this.height+this.hole,this.width,400-this.height-this.hole);return(i||s)&&restartGame(),h.x>this.x+this.width&&!this.scored&&(score++,speedUp++,this.scored=!0),this.x+this.width<=0||(this.x-=speed*t,!1)}}