var player,platforms,platformTest,leftKeyPressed=!1,rightKeyPressed=!1;function loadingText(){var e=document.getElementById("loadingText");e&&(e.innerText="Loaded "+ ++currentImageLoadedLength+"/"+imagesLength),currentImageLoadedLength===imagesLength&&(e.style.display="none",shouldDisplay=!0)}function loadingError(e){Swal.fire({icon:"error",title:"Error",text:"An error occured while loading the image. Please refresh this page or try again later."})}function preload(){}function setup(){createCanvas(400,300).parent("canvas"),player=new Player,platforms=[],(platformTest=new Platform).y=250,platformTest.x=150}function draw(){mainGame()}function mainGame(){background(128),300<=player.y+player.height+player.dy?(player.dy=0,player.y=300-player.height):player.dy+=player.gravity,player.dx=0,leftKeyPressed?player.dx=-1:rightKeyPressed&&(player.dx=1),platformTest.update(),player.update(),platformTest.draw(),player.draw()}function mousePressed(){}function touchStarted(){}function keyPressed(){switch(key){case" ":0===player.dy&&(player.dy=-15);break;case"s":case"S":player.dy+=player.gravity;break;case"a":case"A":leftKeyPressed=!0;break;case"d":case"D":rightKeyPressed=!0}player.update(),player.draw()}function keyReleased(){switch(key){case"a":case"A":leftKeyPressed=!1;break;case"d":case"D":rightKeyPressed=!1}player.update(),player.draw()}p5.disableFriendlyErrors=!0;