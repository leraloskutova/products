function zoom() {
  document.getElementById('zoom-result').addEventListener("mouseout", zoomOut);
  document.getElementById('zoom-lens').addEventListener("mouseout", zoomOut);
}

function zoomOut() {
  document.getElementById('zoom-result').style.visibility = 'hidden';
  document.getElementById('zoom-lens').style.visibility = 'hidden';
}

function zoomIn() {
  const result = document.getElementById('zoom-result');
  const img = document.getElementById('zoom');
  const lens = document.getElementById('zoom-lens');
  result.style.visibility = 'visible';
  lens.style.visibility = 'visible';

  /*вычисление соотношения между результатом и линзой*/
  const cx = result.offsetWidth / lens.offsetWidth;
  const cy = result.offsetHeight / lens.offsetHeight;
  /*свойства фона для результата (увеличенного изображения)*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /*выполнение функции при перемещении курсора на изображение или линзу*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*для сенсорных экранов*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);

  function moveLens(e) {
    let pos, x, y;
    /*предотвращение любых других действий, которые могут произойти при перемещении по изображению*/
    e.preventDefault();
    /*получение позиции курсора "x" и "y"*/
    pos = getCursorPos(e);
    /*рассчет положения линзы*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*предотвращение расположения линзы вне изображения*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*установка положения линзы*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }

  function getCursorPos(e) {
    let imgPos, x, y;
    e = e || window.event;
    /*получение "x" и "y" позиции изображения*/
    imgPos = img.getBoundingClientRect();
    /*вычисление координаты курсора "x" и "y" относительно изображения*/
    x = e.pageX - imgPos.left;
    y = e.pageY - imgPos.top;
    /*учитывая любую прокрутку страницы*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}
