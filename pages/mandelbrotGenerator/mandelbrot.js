//Create the canvas, then collect the height and width
var a, b, c, canvas, rect;
//zoomon click
var zoomOnClick = true;
//flag to tell whether to use setInterval or not
var useInterval = true;
//Sizes of pixel
var pixelSizes = [8, 5, 1];
//Use to store setTimeout IDs for calling mandelbrot();
var mandelbrotCalls = new Array(pixelSizes.length);
//Store setInterval IDs
var drawColumnIDs = new Array(pixelSizes.length);
//to prevent error during loading, make sure that
//the canvas is loaded first before calling any methods
canvas = document.getElementById("paper");
c = canvas.getContext("2d");
a = canvas.width;
b = canvas.height;
//when canvas is clicked, call drawOnClick function
canvas.onclick = function(e) {
  /*setTimeout(function(){
	drawOnClick(e);
  }, 10)*/
  drawOnClick(e);
}
//changes the mandelbrot set based on mouse clicks
function drawOnClick(e) {
  rect = canvas.getBoundingClientRect()
  var mouseX = (e.clientX - rect.left);
  var mouseY = (e.clientY - rect.top);
  if(zoomOnClick) {
    var mx = panX + mouseX / zooms;
    var my = panY + mouseY / zooms;
    //console.log(mx, my);
    //var widthX = panX + a/zooms;
    //var heightY = panY + b/zooms;
    //console.log(a/zooms);
    //console.log(e.clientX, e.clientY);
    zooms *= zf;
    panX = mx - ((e.clientX - rect.left) / zooms);
    panY = my - ((e.clientY - rect.top) / zooms);
    /*panX = (mx * 2) - widthX;
    panY = (my * 2) - heightY;
    console.log("Selection x: " + mx + ", Selection y: " + my);
    console.log("Start x: " + panX + ", Start y: " + panY);
    console.log("Width x: " + widthX + ", Height y: " + heightY);
    console.log("End x: " + (panX + a/zooms));
    console.log("End y: " + (panY + b/zooms));*/
  } else {
    var mx = panX + mouseX / zooms;
    var my = panY + mouseY / zooms;
    zooms /= zf;
    panX = mx - ((e.clientX - rect.left) / zooms);
    panY = my - ((e.clientY - rect.top) / zooms);
  }
  pan = (panX + 2 / zooms) - (panX - 1 / zooms);
  document.getElementById("xa").value = panX;
  document.getElementById("ya").value = panY;
  document.getElementById("za").value = zooms;
  pallete.setNumberRange(0, maxI);
  /*if(0 < zooms && zooms < 50) {
    pallete.setNumberRange(0, 50);
    maxI = 50;
  } else if(50 < zooms && zooms < 100) {
    pallete.setNumberRange(0, 100);
    maxI = 100;
  } else if(100 < zooms && zooms < 1000) {
    pallete.setNumberRange(0, 255);
    maxI = 255;
  } else if(1000 < zooms && zooms < 10000) {
    pallete.setNumberRange(0, 500);
    maxI = 500;
  } else if(10000 < zooms && zooms < 100000) {
    pallete.setNumberRange(0, 750);
    maxI = 750;
  } else if(100000 < zooms && zooms < 1000000) {
    pallete.setNumberRange(0, 1000);
    maxI = 1000;
  } else if(1000000 < zooms && zooms < 10000000) {
    pallete.setNumberRange(0, 2500);
    maxI = 2500;
  }*/
  show();
  //requestAnimationFrame(abortRun);
  //requestAnimationFrame(startRun);
  abortRun();
  startRun();
}
//when + was clicked above the canvas
function plus() {
  zoomOnClick = true;
}
//same here
function minus() {
  zoomOnClick = false;
}
//aborts startRun
function abortRun() {
  for(var i=0; i<mandelbrotCalls.length; i++){
    clearTimeout(mandelbrotCalls[i]);
  }
  if(useInterval) {
    for(var i=0; i<drawColumnIDs.length; i++){
      clearInterval(drawColumnIDs[i]);
    }
  }else{
    for(var i=0; i<drawColumnIDs.length; i++){
      cancelAnimationFrame(drawColumnIDs[i]);
    }
  }
}
//starts calling mandelbrot
function startRun() {
  /*mdb1 = setTimeout(function(){mandelbrot(zooms, panX, panY, 8, 0, function(){
    mdb2 = setTimeout(function(){mandelbrot(zooms, panX, panY, 5, 1, function(){
      mdb3 = setTimeout(function(){mandelbrot(zooms, panX, panY, 1, 2, function(){
        console.log("Done...");
      })});
    })});
  })});*/
  /*mdb1 = setTimeout(function(){
    mandelbrot(zooms, panX, panY, 8, 0);
    mdb2 = setTimeout(function(){
      mandelbrot(zooms, panX, panY, 5, 1);
      mdb3 = setTimeout(function(){
        mandelbrot(zooms, panX, panY, 1, 2);
      });
    });
  });*/
  /*mdb1 = setTimeout(function() {
    mandelbrot(zooms, panX, panY, 8, 0)
  });
  mdb2 = setTimeout(function() {
    mandelbrot(zooms, panX, panY, 5, 1)
  });
  mdb3 = setTimeout(function() {
    mandelbrot(zooms, panX, panY, 1, 2)
  });*/
  
  function mandelbrotCallFactory(i){
    return function(){
      mandelbrot(zooms, panX, panY, pixelSizes[i], i);
    }
  }
  for(var i=0; i<pixelSizes.length; i++){
    mandelbrotCalls[i] = setTimeout(mandelbrotCallFactory(i));
    //console.log(i);
  }
  //mandelbrot(zooms, panX, panY, 8, 0)
  //mandelbrot(zooms, panX, panY, 5, 1)
  //mandelbrot(zooms, panX, panY, 1, 2)
}
//in the instance, create all thngs
//pan is the length of scroll
//zooms is the current number of zoom
//panX is the upper left Corner
//panY is the bottom left Corner
//zf is the increase factor in the zoom
//maxI is the total number of iteration
//per complex number
//create pallete to color mandelbrot by
//using rainbowvis.js
var pan, zooms, panX, panY, zf, maxI = 50,
  ticks, coloringType;
//pallete for escapeTime
var pallete = new Rainbow();
pallete.setSpectrum("#000764", "#206bcb", "#edffff", "#ffaa00", "#000200");
pallete.setNumberRange(0, maxI);
//pallete for smoothColoring
var _pallete = ["#000764", "#206bcb", "#edffff", "#ffaa00", "#000200"];
// mandelbrot helper function
function mdbl(px, py, x, y, zm, panX, panY, scale) {
  for(py = 0; py < b; py += scale) {
    //zoom factors
    x0 = panX + px / zm;
    y0 = panY + py / zm;
    var x = 0;
    var y = 0;
    var i = 0;
    var xtemp;
    while(x * x + y * y <= 4 && i < maxI) {
      //ticks++
      xtemp = x * x - y * y + x0
      y = 2 * x * y + y0
      x = xtemp
      i = i + 1
    }
    //coloring
    if("smoothColoring" === coloringType) {
      if(i < maxI) {
        log_zn = Math.log(x * x + y * y) / 2
        nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
        i = i + 1 - nu;
        c.fillStyle = color(i / maxI * (_pallete.length - 1));
        c.fillRect(px, py, scale, scale);
        //c.stroke();
      } else {
        c.fillStyle = "black";
        c.fillRect(px, py, scale, scale);
        //c.stroke();
      }
    } else {
      c.fillStyle = color(i);
      c.fillRect(px, py, scale, scale);
      //c.stroke();
    }
    //console.log(px  + ", " + py);
  }
  //console.log(c.fillStyle);
  //c.fillStyle = "#ff0000";
  //c.fillRect(0,0,400,400);
}
//function that draws the mandelbrot set
// based on current zoom, panX, panY and scale
/***********************MANDELBROT*********************************/
/******************************************************************/
function mandelbrot(zm, panX, panY, scale, arrayIndex) {
  //console.log("arrayIndex is " + arrayIndex);
  //cancel run in some case
  scale = scale || 1;
  //reset ticks
  ticks = 0;
  //func = func || (function() {});
  //px - Canvas x
  //py - canvas y
  //x - real x
  //y - imaginary y
  var px, py, x, y;
  //loop from y's, then loop all x's
  /*for(px = 0; px < a; px+=scale){
    animID = requestAnimationFrame(function(){
      mdbl(px, py, x, y, zm, panX, panY, scale);
    });
  }*/
  //clearInterval(iID);
  px = 0;
  if(useInterval){
    drawColumnIDs[arrayIndex] = setInterval(function(){
      if(px < a){
        mdbl(px, py, x, y, zm, panX, panY, scale);
        px += scale;
      }else{
        clearInterval(drawColumnIDs[arrayIndex]);
        //func();
      }
    });
    //console.log("Called here " + arrayIndex);
  }else{
    function drawStep() {
      if(px < a) {
        mdbl(px, py, x, y, zm, panX, panY, scale);
        px += scale;
        drawColumnIDs[arrayIndex] = requestAnimationFrame(drawStep);
      } else {
        cancelAnimationFrame(drawColumnIDs[arrayIndex]);
        //func();
      }
    }
    drawColumnIDs[arrayIndex] = requestAnimationFrame(drawStep);
  }
  /*iIDs[arrayIndex] = setInterval(function(){
    if(px < a){
      mdbl(px, py, x, y, zm, panX, panY, scale);
      px += scale;
    }else{
      clearInterval(iIDs[arrayIndex]);
      func();
    }
  });*/
  //cancelAnimationFrame(animID);
  //console.log("Total ticks: " + ticks + ", based on scale " + scale);
}
/******************************************************************/
/******************************************************************/
function color(num, x, y) {
  switch(coloringType) {
    case "escapeTime":
      var selection = pallete.colourAt(num);
      return "#" + selection;
      break;
    case "smoothColoring":
      return interpolation(num);
      break;
    default:
      var selection = pallete.colourAt(num);
      return "#" + selection;
  }
}

function hexToRGBObject(hex) {
  hex = (hex + "").replace("#", "");
  return {
    r: parseInt(hex.charAt(0) + hex.charAt(1), 16),
    g: parseInt(hex.charAt(2) + hex.charAt(3), 16),
    b: parseInt(hex.charAt(4) + hex.charAt(5), 16)
  }
}

function linear_interpolate(color1, color2, ratio) {
  var r = Math.floor((color2.r - color1.r) * ratio + color1.r);
  var g = Math.floor((color2.g - color1.g) * ratio + color1.g);
  var b = Math.floor((color2.b - color1.b) * ratio + color1.b);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function interpolation(iteration) {
  var color1 = hexToRGBObject(_pallete[Math.floor(iteration)]);
  var color2 = hexToRGBObject(_pallete[Math.floor(iteration) + 1]);
  return linear_interpolate(color1, color2, iteration % 1);
}
//reset
function work() {
  document.getElementById("xa").value = -2.5;
  document.getElementById("ya").value = -2;
  document.getElementById("za").value = a / 4;
  pan = 0.1;
  zooms = a / 4;
  panX = -2.5;
  panY = -2.0;
  zf = 1.5;
  maxI = 50;
  pallete.setSpectrum("#000764", "#206bcb", "#edffff", "#ffaa00", "#000200");
  pallete.setNumberRange(0, maxI);
  _pallete = ["#000764", "#206bcb", "#edffff", "#ffaa00", "#000200"];
  coloringType = "smoothColoring";
  document.getElementById("clrt").value = coloringType;
  show();
  abortRun();
  startRun();
}
//left to right scroll adjustment
function xScroll(n) {
  var temp = n ? parseFloat(document.getElementById("xa").value) + pan : parseFloat(document.getElementById("xa").value) - pan;
  document.getElementById("xa").value = temp;
  panX = temp;
  show();
  abortRun();
  startRun();
}
//top to bottom scroll adjustment
function yScroll(n) {
  var temp = n ? parseFloat(document.getElementById("ya").value) + pan : parseFloat(document.getElementById("ya").value) - pan;
  document.getElementById("ya").value = temp;
  panY = temp;
  show();
  abortRun();
  startRun();
}
//draw again
function drawAgain() {
  panX = parseFloat(document.getElementById("xa").value);
  panY = parseFloat(document.getElementById("ya").value);
  zooms = parseFloat(document.getElementById("za").value);
  show();
  abortRun();
  startRun();
}
//the change zoom function
function zoom() {
  //NOT YET
  /*var rect = canvas.getBoundingClientRect();
    var mx = panX + (panX - rect.left) / zooms;
    var my = panY + (panY - rect.top) / zooms;
    zooms = document.getElementById("za");
    panX = mx - ((panX - rect.left) / zooms);
    panY = my - ((panY - rect.top) / zooms);
  */
  zooms = document.getElementById("za").value;
  mx = ((panX + (a - 1) / zooms) - panX) / 2;
  panX -= mx;
  my = ((panY + (b - 1) / zooms) - panY) / 2;
  panY -= mx;
  show();
  abortRun();
  startRun();
}
//zoom in function
function zoomIn() {
  zooms = zooms + zf;
  pan = (panX + 2 / zooms) - (panX - 1 / zooms);
  document.getElementById("za").value = zooms;
  /*if(0 < zooms && zooms < 100) {
    pallete.setNumberRange(0, 100);
    maxI = 100;
  } else if(100 < zooms && zooms < 1000) {
    pallete.setNumberRange(0, 255);
    maxI = 255;
  } else if(1000 < zooms && zooms < 10000) {
    pallete.setNumberRange(0, 500);
    maxI = 500;
  }*/
  show();
  abortRun();
  startRun();
}
//zoom out function
function zoomOut() {
  zooms = zooms - zf;
  pan = (panX + 2 / zooms) - (panX - 1 / zooms)
  document.getElementById("za").value = zooms;
  /*if(zooms < 100) {
    pallete.setNumberRange(0, 50);
    maxI = 50;
  } else if(zooms > 100 && zooms < 1000) {
    pallete.setNumberRange(0, 100);
    maxI = 100;
  } else if(zooms > 1000 && zooms < 10000) {
    pallete.setNumberRange(0, 255);
    maxI = 255;
  }*/
  show();
  abortRun();
  startRun();
}
//adjust zoomfactor
function zoomFactor() {
  var temp = document.getElementById("zf").value;
  zf = parseFloat(temp);
  show();
}
//adjust maxI
function changeMaxI() {
  var temp = document.getElementById("mi").value;
  maxI = parseInt(temp);
  pallete.setNumberRange(0, maxI);
  show();
  abortRun();
  startRun();
}
//changes coloringType
function changeColoringType() {
  var temp;
  switch(coloringType) {
    case "smoothColoring":
      temp = "escapeTime";
      break;
    case "escapeTime":
      temp = "smoothColoring";
      break;
  }
  coloringType = temp;
  document.getElementById("clrt").value = temp;
  show();
  abortRun();
  startRun();
}
//adjust pallete
function changePallete() {
  var temp = (document.getElementById("plt").value).split(" ");
  if(temp.length < 3) {
    alert(" Please enter more colors ");
    return
  }
  pallete.setSpectrumByArray(temp);
  show();
  abortRun();
  startRun();
}
//updateCoords
function changeCoords() {
  var temp = (document.getElementById("crd").value).split(" ");
  if(temp.length < 4) {
    alert(" Please enter complete details");
    return
  }
  panX = parseFloat(temp[0]);
  panY = parseFloat(temp[1]);
  zooms = parseFloat(temp[2]);
  maxI = parseFloat(temp[3]);
  zf = 1.5;
  pallete.setNumberRange(0, maxI);
  document.getElementById("xa").value = panX;
  document.getElementById("ya").value = panY;
  document.getElementById("za").value = zooms;
  document.getElementById("mi").value = maxI;
  document.getElementById("zf").value = zf;
  show();
  abortRun();
  startRun();
}
//resize canvas
function resize() {
  a = canvas.width = parseInt(prompt("Please enter canvas width in pixels", 200)) || 200;
  b = canvas.height = parseInt(prompt("Please enter canvas height in pixels", 200)) || 200;
  work();
}
//show details
function show() {
  var temp = "Scroll: " + pan + "<br /> Current zoom: " + zooms + "<br /> topLeftX: " + panX + "<br /> topRightY: " + panY + "<br /> zoom factor: " + zf + "<br /> max iterations of loop: " + maxI + "<br /> uses " + coloringType + " algorithm for coloring";
  document.getElementById("dtls").innerHTML = temp;
}
/*favorable zoom
-0.7253464660778749
0.2520240908085526
18892488895.231102

-0.373346235978374
-0.6582261932152258
7000

-0.3618206208864465
-0.6453957620586814
155300315925100
*/
//about function
function about() {
  alert("A mandelbrot set generator in javascript created by pvzzombs")
  console.log("A mandelbrot set generator in javascript created by pvzzombs");
}