// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const p = document.createElement('p');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

document.querySelector('h1').append(p);
// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}



//Shape
class Shape{
 constructor(x, y, velX, velY,exist){
  this.x=x;
  this.y=y;
  this.velX=velX;
  this.velY=velY;
  this.exist=exist;
 } 
}
//#region Balls 
class Ball extends Shape{

  constructor(x, y, velX, velY, color, size,exist){
    super(x,y, velX, velY,exist)
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
      this.velX=-this.velX;
    }
    if((this.x-this.size)<=0){
      this.velX=-this.velX;
    }
    if((this.y+this.size)>=height){
      this.velY=-this.velY;
    }
    if((this.y+this.size)<=0){
      this.velY=-this.velY;
    }
    this.x+=this.velX;
    this.y+=this.velY;
  }
  collisionDetect(){
    for(let j=0;j<balls.length;j++){
      if(!(this===balls[j])&&balls[j].exist){
        const dx=this.x-balls[j].x;
        const dy=this.y-balls[j].y;
        const distance = Math.sqrt(dx*dx+dy*dy);
        if(distance<this.size+balls[j].size){
          balls[j].color=`rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
        }
      }
    }
  }
}
//#endregion
//#region EvilBalls
class EvilBalls extends Shape{
  constructor(x,y,exist,velX=20,velY=20,color='black',size=10){
    super(x,y,velX,velY,exist)
    this.color=color;
    this.size=size;
  }
  draw(){
    ctx.beginPath();
    ctx.lineWidth=4;
    ctx.strokeStyle=this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.stroke();
  }
  checkBounds(){
    if((this.x+this.size)>=width){
      this.x-=0.5*(this.size);
    }
    if((this.x-this.size)<=0){
      this.x+=0.5*(this.size);
    }
    if((this.y+this.size)>=height){
      this.y-=0.5*(this.size);
    }
    if((this.y+this.size)<=0){
      this.y+=0.5*(this.size);
    }   
  }
  setControls(){
    let _this=this;
    window.onkeydown=function(e){
      if(e.key=="a"){
        _this.x-=_this.velX;
      }
      if(e.key=="d"){
        _this.x+=_this.velX;
      }
      if(e.key=="w"){
        _this.y-=_this.velY;
      }
      if(e.key=="s"){
        _this.y+=_this.velY;
      }
    }

  }
  collisionDetect(){
    for(let j=0;j<balls.length;j++){
      if(balls[j].exist){
        const dx=this.x-balls[j].x;
        const dy=this.y-balls[j].y;
        const distance = Math.sqrt(dx*dx+dy*dy);
        if(distance<this.size+balls[j].size){
          balls[j].exist=false;
          //balls.splice(j,1);
          counts--;
          document.querySelector('p').textContent="Ball Counts :"+counts;
        }
      }
    }
  }
}
//#endregion

//let testBall = new Ball(300,100,7,7,'red',10);
//testBall.draw();


let initialCounts=40;
let counts=0;
let getcount=document.querySelector('p');
let balls = [];

while(balls.length<initialCounts){
let size=random(10,20);
let ball = new Ball(
  random(0+size,width-size),
  random(0+size,height-size),
  random(-7,7),
  random(-7,7),
  `rgba(${random(0,255)},${random(0,255)},${random(0,255)})`,
  size,
  true
)
balls.push(ball);
counts++;
document.querySelector('p').textContent="Ball Counts :"+counts;
}

function loop(){
  //background color
  ctx.fillStyle='rgba(235,112,119,0.3)';
  ctx.fillRect(0,0,width,height);
  for(let i=0;i<balls.length;i++){
    if(balls[i].exist){
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }   
  }
  //restart the game
  if(counts==0){
    counts=initialCounts;
    balls.map(x=>x.exist=true);    
  }
  requestAnimationFrame(loop);
}

//x,y,velX=20,velY=20,color='white',size=10,exist
let EvilBall = new EvilBalls(
  100,500,true
)
function EvilBallMove(){
  EvilBall.draw();
  EvilBall.setControls();
  EvilBall.checkBounds();
  EvilBall.collisionDetect();
  requestAnimationFrame(EvilBallMove);
}

loop();
EvilBallMove();





