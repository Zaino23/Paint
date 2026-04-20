const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const box = document.getElementById('box');
const brush = document.getElementById('brush');
const erasor = document.getElementById('erasor');
const colorPicker = document.getElementById('colorPicker');
const size = document.getElementById('size');
let color = colorPicker.value;
let onOff = false;
let erasorMode = false;
let holding = false;


let lastCords = {x: undefined, y:undefined};
let currCords = {x:undefined, y:undefined};

canvas.width = box.clientWidth;
canvas.height = box.clientHeight;

ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = size.value;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

colorPicker.addEventListener('input', () => {
  color = colorPicker.value;
  ctx.strokeStyle = color;
});

size.addEventListener('input', () => {
  ctx.lineWidth = size.value;
})

window.addEventListener('resize', () => {
  canvas.width = box.clientWidth;
  canvas.height = box.clientHeight;

  ctx.lineWidth = size.value;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
});

canvas.addEventListener('pointerdown', e => {
  holding = true;
  lastCords.x = e.offsetX;
  lastCords.y = e.offsetY;
})

canvas.addEventListener('pointermove', e => {
  if(!holding) return;
  currCords.x = e.offsetX;
  currCords.y = e.offsetY;
  drawing();
  lastCords.x = currCords.x;
  lastCords.y = currCords.y;
})

document.addEventListener('pointerup', e => holding = false);

function drawing() {
  if(holding  && (onOff || erasorMode)) {
    ctx.beginPath();
    ctx.moveTo(lastCords.x, lastCords.y);
    ctx.lineTo(currCords.x, currCords.y);
    ctx.stroke();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
}


function brushOnoffpro() {
  if (brush.classList.contains('active')) {
    onOff = false;
    brush.classList.remove('active');
    size.style.display = 'none';
    colorPicker.style.display = 'none';
    return;
  }

  onOff = true;
  erasorMode = false;
  color = 'black';
  erasor.classList.remove('active');
  brush.classList.add('active');
  ctx.globalCompositeOperation = 'source-over';
  size.style.display = 'block';
  colorPicker.style.display = 'block';
}

function clean() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function manualErase() {
  if(erasor.classList.contains('active')) {
    erasor.classList.remove('active');
    erasorMode = false;
    size.style.display = 'none';
    return;
  }
  
  onOff = false;
  erasorMode = true;
  ctx.globalCompositeOperation = 'destination-out';
  ctx.strokeStyle = 'rgba(0,0,0,1)';
  ctx.lineWidth = size.value;
  brush.classList.remove('active');
  erasor.classList.add('active');
  size.style.display = 'block';
  colorPicker.style.display = 'none';
}