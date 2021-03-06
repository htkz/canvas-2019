const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');
const lastPoint = {
  'x': 0,
  'y': 0
};
const backGroundColor = 'white';

let mouseDown = false;
// enum Tool = ['pen', 'eraser'];
let curTool = 'pen';


// setBgColor = (color) => {
//   let tmpColor = ctx.fillStyle;
//   ctx.fillStyle = color;
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = tmpColor;
// }


bindEvents = () => {
  if (isMobile()) {
    bindTouchEvents();
    $('#accustomColor').hide();
  } else {
    bindMouseEvents();
  }


  $('#eraser').click((event) => {
    if (curTool != 'eraser') curTool = 'eraser';
    $('#eraser').addClass('selected');
    $('#pen').removeClass('selected');
  });
  $('#pen').click((event) => {
    if (curTool != 'pen') curTool = 'pen';
    $('#pen').addClass('selected');
    $('#eraser').removeClass('selected');
  });

  $('#clear').click((event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // setBgColor(backGroundColor);
  });

  $('#download').click((event) => {
    let $a = $('#downloadLink');
    $a.attr('href', canvas.toDataURL("image/jpg"));
    $a[0].click();
    // setBgColor(backGroundColor);
  });



  // 初始化color
  $('.color').children('li').each((index, color) => {
    $(color).css('background', $(color).attr('color'));
  });

  $('.color').children('li').each((index, color) => {
    $(color).click((event) => {
      $(color).addClass('selected');
      ctx.strokeStyle = $(color).attr('color');
      ctx.fillStyle = $(color).attr('color');
      $(color).siblings().each((index, otherColor) => {
        $(otherColor).removeClass('selected');
      });
    });
  });

  let $varColor = $('li[color="white"]');
  let colorSelector = $('li[color="white"] input');
  $varColor.click((event) => {
    colorSelector[0].click();
  });
  colorSelector.on('change', (event) => {
    let newColor = event.target.value;
    $varColor.attr('color', newColor);

    $varColor.addClass('selected');
    ctx.strokeStyle = $varColor.attr('color');
    ctx.fillStyle = $varColor.attr('color');
    $varColor.siblings().each((index, otherColor) => {
      $(otherColor).removeClass('selected');
    });
    $varColor.css('background', newColor);

  });

  $(window).resize((event) => accustomCanvas());
};

bindMouseEvents = () => {
  $(canvas).on('mousedown', (event) => {
    x = event.clientX;
    y = event.clientY;
    mouseDown = true;
    if (curTool === 'eraser') {
      ctx.clearRect(x, y, 10, 10);
    } else if (curTool === 'pen'){
      // drawPoint(x, y);
      setLastPoint(x, y);
    }
  });

  $(canvas).on('mousemove', (event) => {
    if (!mouseDown) return;
    x = event.clientX;
    y = event.clientY;
    if (curTool === 'eraser') {
      ctx.clearRect(x, y, 10, 10);
    } else if (curTool === 'pen') {
      drawLine(x, y, lastPoint.x, lastPoint.y);
      setLastPoint(x, y);
    }
  });

  $(canvas).on('mouseup', (event) => {
    mouseDown = false;
  });

  $(canvas).on('mouseenter', (event) => {
    setLastPoint(event.clientX, event.clientY);
  });
};

bindTouchEvents = () => {
  $('body').on('touchstart', (event) => {
    event.preventDefault();
  });

  $(canvas).on('touchstart', (event) => {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    mouseDown = true;
    if (curTool === 'eraser') {
      ctx.clearRect(x, y, 10, 10);
    } else if (curTool === 'pen'){
      // drawPoint(x, y);
      setLastPoint(x, y);
    }
  });

  $(canvas).on('touchmove', (event) => {
    event.preventDefault();
    if (!mouseDown) return;
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    if (curTool === 'eraser') {
      ctx.clearRect(x, y, 10, 10);
    } else if (curTool === 'pen') {
      drawLine(x, y, lastPoint.x, lastPoint.y);
      setLastPoint(x, y);
    }
  });

  $(canvas).on('touched', (event) => {
    mouseDown = false;
  });
};


// 用户调整屏幕大小的时候，使canvas适用其大小
accustomCanvas = () => {
  $(canvas).attr('width', $(window).width());
  $(canvas).attr('height', $(window).height());
}

drawPoint = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
  ctx.fill();
};

drawLine = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

setLastPoint = (x, y) => {
  lastPoint.x = x;
  lastPoint.y = y;
};

isMobile = () => {
  return ('ontouchstart' in document.documentElement);
};

accustomCanvas();
bindEvents();
accustomCanvas();
// setBgColor(backGroundColor);
