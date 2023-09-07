const boundry = document.getElementById('animationBoundry');
const canvas = boundry.getContext('2d');


boundry.width = window.innerWidth;
boundry.height = window.innerHeight;


class Dot {
  constructor(x, y, radius, movex, movey) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = movex;
    this.dy = movey;
  }

  draw(){
    canvas.beginPath();
    canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    canvas.fillStyle = dotColor;
    canvas.fill();
  }

  update(){
    //bounce off the border
    if(this.x + this.radius > boundry.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if(this.y + this.radius > boundry.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

}

//dot modifiers
const dots = [];
const numDots = 50;
const radius = 5;
const speed = 2;
const dotColor = 'rgba(0, 255, 100, 1)';

//line modifiers
const lineColor = 'rgba(0, 255, 100, 0.5)'
const lineWidth = 2;
const lineRange = 150;

createDot(numDots)

function createDot(numDots){
  for (let i = 0; i < numDots; i++) {
    const x = Math.random() * (boundry.width - radius * 2) + radius;
    const y = Math.random() * (boundry.height - radius * 2) + radius;

    const movex = (Math.random() - 0.5) * speed;
    const movey = (Math.random() - 0.5) * speed;

    dots.push(new Dot(x, y, radius, movex, movey));
  }
}

function animate(){
  requestAnimationFrame(animate); //better solution to a timeout

  boundry.width = window.innerWidth;
  boundry.height = window.innerHeight;

  canvas.clearRect(0, 0, boundry.width, boundry.height);

  for (let i = 0; i < numDots; i++) {
    dots[i].update();
  }

  //draw lines between dots
  canvas.strokeStyle = lineColor;
  canvas.lineWidth = lineWidth;

  //first iterate through each pair of dots
  for (let i = 0; i < numDots; i++){
    for (let j = i + 1; j < numDots; j++){

      //pythagorean theorem
      const distance = Math.sqrt(
        (dots[i].x - dots[j].x) ** 2 + (dots[i].y - dots[j].y) ** 2
      );

      if (distance < lineRange){
        canvas.beginPath();
        canvas.moveTo(dots[i].x, dots[i].y);
        canvas.lineTo(dots[j].x, dots[j].y);
        canvas.stroke();
      }
    }
  }
}

animate();


boundry.addEventListener('click', (event) => {
  const rect = boundry.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  alert('Cursor position:', clickX, clickY);
  createDot(1);
});
