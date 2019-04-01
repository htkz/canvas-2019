const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');
const lastPoint = {
  'x': 0,
  'y': 0
};

let mouseDown = false;
// enum Tool = ['pen', 'eraser'];
let curTool = 'pen';



bindEvents = () => {
  $(canvas).on('mousedown', (event) => {
    x = event.clientX;
    y = event.clientY;
    mouseDown = true;
    if (curTool === 'eraser') {
      ctx.clearRect(x, y, 10, 10);
    } else if (curTool === 'pen'){
      drawPoint(x, y);
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

  $('#eraser').click((event) => {
    if (curTool != 'eraser') curTool = 'eraser';
  });
  $('#pen').click((event) => {
    if (curTool != 'pen') curTool = 'pen';
  });

  $(window).resize((event) => accustomCanvas());
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

bindEvents();
accustomCanvas();

console.log(x);
var x = 1;
console.log(x);