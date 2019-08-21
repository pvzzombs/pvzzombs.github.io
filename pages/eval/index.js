function compute(string){
  return Eval(string);
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
  }

  $("#loading").hide();
  $("#app").show();

  $('.modal').modal();
});