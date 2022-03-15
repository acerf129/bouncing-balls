// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
class Ball{
  constructor(x,y,velX,velY,color,size){
    this.x=x;
    this.y=y;
    this.velX=velX;
    this.velY=velY;
    this.color=color;
    this.size=size;
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.fill();
  }
  update(){
    if((this.x+this.size)>=width){
      this.velX= -(this.velX);
    }
    if((this.x-this.size)<=0){
      this.velX= -(this.velX);
    }
    if((this.y+this.size)>=height){
      this.velY= -(this.velY);
    }
    if((this.y-this.size)<=0){
      this.velY= -(this.velY);
    }
    this.x+=this.velX;
    this.y+=this.velY;
  }
}
let testBall = new Ball(50,100,4,4,'blue',10);
//testBall.draw()

let balls =[];
//Insert Balls
while(balls.length<30){
  let size=random(10,20);
  let ball = new Ball(
    random(0+size,width-size),
    random(0+size,height-size),
    random(-7,7),
    random(-7,7),
    `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`,
    size
    );
    balls.push(ball);
}
//Loop
function loop(){
  ctx.fillStyle='rgba(77,77,77,7)';
  ctx.fillRect(0,0,width,height);
    for(let i=0;i<balls.length;i++){
      balls[i].draw();
      balls[i].update();
    }
    requestAnimationFrame(loop);
}
loop();