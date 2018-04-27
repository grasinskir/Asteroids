let ship;
let moveForward;


class Spacecraft{
  constructor(){
    this.x1 = width/2;
    this.y1 = height/2;
    this.x2 = width/2 - width/95;
    this.y2 = height/2 + height/30;
    this.x3 = width/2 + width/95;
    this.y3 = height/2 + height/30;
    this.heading = 0;
    this.yVelocity = width/500*cos(this.heading);
    this.xVelocity = width/500*sin(this.heading);
    this.acceleration = width/500;
  }

  makeShip(){
    push();
      translate(this.x1, this.y1);
      angleMode(DEGREES);
      rotate(this.heading);
      noFill();
      stroke(255);
      triangle(0, 0, -width/110, height/25, width/110, height/25);
    pop();
  }

  moveShip(){
    push();
      translate(this.x1, this.y1);
      angleMode(DEGREES);
      rotate(this.heading);
      noFill();
      stroke(255);
      triangle(0, 0, -width/110, height/25, width/110, height/25);
      // let shipyVel = -height/500;
      // this.y1 += shipyVel;
      // this.y2 += shipyVel;
      // this.y3 += shipyVel;
      pop();
      angleMode(DEGREES);
      this.y1 -= this.yVelocity;
      this.x1 += this.xVelocity;
      this.yVelocity *= this.acceleration;
      this.xVelocity *= this.acceleration;
  }


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Spacecraft();
}

function draw() {
  background(100);
  // moveForward = createButton('Forward');
  // moveForward.position(width/3.5, height/1.5);
  // moveForward.mousePressed;

  ship.makeShip();
  if(mouseIsPressed && mouseX <= width/4){
    ship.heading -= 5;
  }
  if(keyCode === 65){
    ship.heading -= 5;
  }

  if(mouseIsPressed && mouseX >= width - width/4){
    ship.heading += 5;
  }
  if(keyCode === 68){
    ship.heading += 5;
  }
  if(mouseIsPressed && mouseX >= width/4 && mouseX <= width-width/4){
    ship.moveShip();
  }
}

function forwardShip(){
  let shipyVel = -height/500;
  ship.y1 += shipyVel;
  ship.y2 += shipyVel;
  ship.y3 += shipyVel;
}
