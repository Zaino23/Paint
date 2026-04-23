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
  let brushSize = Number(size.value);
  if(erasor.classList.contains('active')) {
      brushSize += 10;
      ctx.lineWidth = brushSize;
      return;
    }
    ctx.lineWidth = brushSize;
})

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
  erasor.classList.remove('active');
  brush.classList.add('active');
  ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = colorPicker.value;
  size.style.display = 'block';
  colorPicker.style.display = 'block';
  ctx.lineWidth = Number(size.value);
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
    ctx.strokeStyle = color;
    ctx.globalCompositeOperation= 'source-over';
    ctx.lineWidth = Number(size.value);
    return;
  }
  
  onOff = false;
  erasorMode = true;
  ctx.globalCompositeOperation = 'destination-out';
  ctx.strokeStyle = 'rgba(0,0,0,1)';
  brush.classList.remove('active');
  ctx.lineWidth = Number(size.value) + 10;
  erasor.classList.add('active');
  size.style.display = 'block';
  colorPicker.style.display = 'none';
}