const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const box = document.getElementById('box');
const brush = document.getElementById('brush');
const erasor = document.getElementById('erasor');
let onOff = false;
let erasing = false;
let last = {x: 0, y:0 };
let holding = false;
let color = 'black';


canvas.width = box.clientWidth;
canvas.height = box.clientHeight;


window.addEventListener('resize', e =>{
  canvas.width = box.clientWidth;
  canvas.height = box.clientHeight;
})

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function getPos(e) {
  const rect = canvas.getBoundingClientRect();

  if(e.touches) {
    const t = e.touches[0];
    return {
      x: t.clientX - rect.left,
      y: t.clientY - rect.top,
    };
  }

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

canvas.addEventListener('touchstart', e =>{
  holding = true;
  last = getPos(e);
})

canvas.addEventListener('touchmove', e =>{
  const pos = getPos(e);
  drawing(last, pos);
  last = pos;
})

document.addEventListener('touchend', () => holding = false);

canvas.addEventListener('mousedown', e => {
    holding = true;
    last = getPos(e);
})

canvas.addEventListener('mousemove', e => {
  if(!holding) return;
  const pos = getPos(e);
  drawing(last, pos);
  last = pos;
});

document.addEventListener('mouseup', () => holding= false);

function drawing(last, pos) {
  if(onOff === true && holding === true) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  } else if (erasing === true && onOff === false ) {
      ctx.strokeStyle = `${color}`;
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
  }
}


function brushOnoffpro() {
  if (brush.classList.contains('active')) {
    onOff = false;
    brush.classList.remove('active');
    return;
  }

  onOff = true;
  color = 'black';
  erasor.classList.remove('active');
  brush.classList.add('active');
}

function clean() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function manualErase() {
  if (color === 'black') {
  onOff = false
  erasing = true;
  brush.classList.remove('active');
  erasor.classList.add('active');
  holding = false;
  color = 'white';
  } else {
    erasor.classList.remove('active');
    color = 'black';
  }
}