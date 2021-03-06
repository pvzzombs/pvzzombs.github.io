function compute(string){
  document.getElementById('history').innerText += "\n >>> " + string;
  var ans = Eval(string);
  document.getElementById('history').innerText += " = " + ans;
  return ans;
  M.textareaAutoResize($("#display"));
}

function calcBt(val){
  if(val === 'C'){
    document.calculator.display.value = "";
  }else{
    document.calculator.display.value += val;
  }
  M.textareaAutoResize($("#display"));
}

function backspace(){
  var temp = document.calculator.display.value;
  document.calculator.display.value = temp.substr(0, temp.length -1);
  M.textareaAutoResize($("#display"));
}
$("document").ready(function(){
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  var u = (getParameterByName("display"));
  if(u !== null && u !== "") {
    document.calculator.display.value = compute(u);
    M.textareaAutoResize($("#display"));
  }

  $("#loading").hide();
  $("#app").show();

  $('.modal').modal();

  var a = ["" , ""];
  $("#display").on("input", function(){
  	var b = m.getKey($("#display").val(), a);
  	var tmp = $("#display").val().replace(/\n/,"");

    try{
        if(b[0] === "\n"){
          var ot = compute(tmp);
          $("#display").val(ot);
          M.textareaAutoResize($("#display"));
        }
    }catch(e){
    	$("#display").val(e);
      M.textareaAutoResize($("#display"));
    }
  });
});
