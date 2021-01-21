function zoomIn(event) {
  var pre = document.getElementById("preview");
  pre.style.visibility = "visible";
  if ($('#zoom').is(':hover')) {
    const img = document.getElementById("zoom");
  }

  var posX = event.offsetX;
  var posY = event.offsetY;
  pre.style.backgroundPosition=(-posX*0.5)+"px "+(-posY*1.5)+"px";
}

function zoomOut() {
  var pre = document.getElementById("preview");
  pre.style.visibility = "hidden";
}
