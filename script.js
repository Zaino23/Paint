const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const box = document.getElementById('box');
const brush = document.getElementById('brush');
const erasor = document.getElementById('erasor');
let onOff = false;

canvas.width = box.clientWidth;
canvas.height = box.clientHeight;

const mouse = {
  x: undefined,
  y: undefined,
}

let holding = false;

let color = 'black';

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
})

canvas.addEventListener('mousedown', function () {
    holding = true;
    animate();
})

document.addEventListener('mouseup', function() {
  holding = false;
})

function drawCircle() {
  if (holding === true && onOff === true || color === 'white') { 
  ctx.fillStyle = `${color}`;
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
  ctx.fill();
}
}
function animate() {
  if (!holding) return;
    drawCircle();
    requestAnimationFrame(animate);
  }
/*
function brushOnOff() {
  if (onOff === false) {
    color = 'black';
    onOff = true;
    erasor.classList.remove('active');
    brush.classList.add('active');
  } else {
    !onOff;
    brush.classList.remove('active')
  }
};
*/

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function manualErase() {
  if (color === 'black') {
  onOff = false
  brush.classList.remove('active');
  erasor.classList.add('active');
  holding = false;
  color = 'white';
  drawCircle();
  } else {
    erasor.classList.remove('active');
    color = 'black';
  }
}