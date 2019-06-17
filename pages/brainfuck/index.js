function bf(str, input){

var array = str.replace(/(\w|\t|\s)/g,"").split("");

var memory = new Uint8Array(20);

var pointer = 0;

var result = [];

var open = [];

var max = 0;

var blocks = [];
for(var i = 0; i < array.length; i++){
  ++max;
  
  if(max == 1024*1024){
    throw "Error: Maximum iteration exceeded!";
  }

  if(array[i] == ">"){

    ++pointer;
    
	blocks.push({cmd : ">", mem : memory[pointer], pnt : pointer});

  }else if(array[i] == "<"){

    if(pointer > 0){

     --pointer;
     
     	blocks.push({cmd : "<", mem : memory[pointer], pnt : pointer});

    }else{

     pointer = memory.length - 1;
     
     blocks.push({cmd : "<", mem : memory[pointer], pnt : pointer});

    }

  }else if(array[i] == "+"){

      ++memory[pointer];
      
      	blocks.push({cmd : "+", mem : memory[pointer], pnt : pointer});

  }else if(array[i] == "-"){

      --memory[pointer];
      
      	blocks.push({cmd : "-", mem : memory[pointer], pnt : pointer});

  }else if(array[i] == "."){

    var cd = String.fromCharCode(memory[pointer]);
    
    result.push(cd);

	blocks.push({cmd : ".", mem : memory[pointer], pnt : pointer, code : cd});
  
  }else if(array[i] == ","){

    memory[pointer] = input.shift().charCodeAt(0);

	blocks.push({cmd : ",", mem : memory[pointer], pnt : pointer});

  }else if(array[i] == "["){

    if(open.length){

      if(open[open.length-1] != i){

        open.push(i);

      	blocks.push({cmd : "[", mem : memory[pointer], pnt : pointer});
      }

    }else{

      open.push(i);

    	blocks.push({cmd : "[", mem : memory[pointer], pnt : pointer});
    }

  }else if(array[i] == "]"){

    if(open.length){

      if(memory[pointer]){

        i = open[open.length - 1];

      	blocks.push({cmd : "]", mem : memory[pointer], pnt : pointer});
      }else{

        open.pop();

      	blocks.push({cmd : "]", mem : memory[pointer], pnt : pointer});
      }

    }

  }

}

return blocks;

}