var running,program=[],pc=0,pointer=0,error=!1,speed=50,color="#7CFF89",status="idle",boxCount=30;function id(e){return document.getElementById(e)}function right(){var e;null==id("box"+(pointer+2))&&((e=document.createElement("div")).className="box",e.id="box"+(pointer+2),id("wrapper").appendChild(e),boxCount++),id("box"+(pointer+1)).style.background="",id("box"+(pointer+2)).style.background=color}function left(){null==id("box"+pointer)?(id("output").value+="\nError : Overflow!!! Stopped at memory "+pointer+" on program id "+pc,error=!0):(id("box"+(pointer+1)).style.background="",id("box"+pointer).style.background=color)}function parse(){status="ready",id("status").innerText=status,pc=pointer=0,error=!(program=[]),clearInterval(running);for(var e=1;e<=boxCount;e++)id("box"+e).innerText=0,id("box"+e).style.background="";id("output").value="",id("box1").style.background="#7CFF89",program=bf(id("code").value)}function ok(){if("idle"===status)Swal.fire({type:"error",title:"Error",text:"Parse first!"}),clearInterval(running);else if(error)clearInterval(running);else{var e=program[pc];if(e){var t="box"+(pointer+1);switch(pc+=1,e.cmd){case"+":case"-":id(t).innerText=e.mem,pointer=e.pnt;break;case">":if(right(),null==id("box"+(pointer+2)))return id("output").value+="\nError : Cannot Write!!! Stopped at memory "+pointer+" on program id "+pc,void(error=!0);id("box"+(pointer+2)).innerText=e.mem,pointer=e.pnt;break;case"<":if(left(),null==id("box"+pointer))return id("output").value+="\nError : Cannot Write!!! Stopped at memory "+pointer+" on program id "+pc,void(error=!0);id("box"+pointer).innerText=e.mem,pointer=e.pnt;break;case".":id("output").value+=e.code,id(t).innerText=e.mem,pointer=e.pnt;break;case",":id(t).innerText=e.mem,pointer=e.pnt;break;case"[":id(t).innerText=e.mem,pointer=e.pnt;case"]":id(t).innerText=e.mem,pointer=e.pnt}}else Swal.fire({type:"success",title:"Success",text:"Compiler finished!"}),status="idle",id("status").innerText=status,program=[],pc=pointer=0,clearInterval(running)}}function run(){"idle"===status?Swal.fire({type:"error",title:"Error",text:"Parse first!"}):"running"===status?Swal.fire({type:"info",title:"Info",text:"Already running!"}):(status="running",id("status").innerText=status,running=setInterval(ok,speed))}function pause(){"running"===status?(status="paused",id("status").innerText=status,clearInterval(running)):"paused"===status?Swal.fire({type:"info",title:"Info",text:"Already paused!"}):Swal.fire({type:"info",title:"Info",text:"Not yet running!"})}function changeSpeed(){Swal.fire({title:"Info",input:"text",text:"Change execution speed in milliseconds",inputValue:50,inputPlaceholder:"50"}).then(function(e){e=parseInt(e.value);Number.isNaN(e)?Swal.fire({type:"error",title:"Error",text:"Invalid number!"}):e<0?Swal.fire({type:"error",title:"Error",text:"Lowest allowed number is 0"}):1e4<e?Swal.fire({type:"error",title:"Error",text:"Highest allowed number is 10000"}):speed=e})}