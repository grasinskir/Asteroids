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
    this.yVelocity = 0;
    this.xVelocity = 0;
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
      pop();
      angleMode(DEGREES);
      this.yacceleration = width/5000*cos(this.heading);
      this.xacceleration = width/5000*sin(this.heading);
      this.y1 -= this.yVelocity;
      this.x1 += this.xVelocity;
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
  ship.moveShip();
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
    ship.yVelocity += ship.yacceleration;
    ship.xVelocity += ship.xacceleration;
  }

  if(ship.yVelocity < 0 && !mouseIsPressed){
    ship.yVelocity += ship.yacceleration;

    ship.yVelocity = 0;
    // if(ship.yVelocity < 0 && ship.yVelocity > ship.yacceleration && !mouseIsPressed){
    //   ship.yVelocity = 0;
    //   ship.yacceleration = 0;
    // }
  }
  if(ship.yVelocity > 0 && !mouseIsPressed){

    ship.yVelocity -= ship.yacceleration;

    ship.yVelocity = 0;
    // if(ship.yVelocity > 0 && ship.yVelocity < ship.yacceleration && !mouseIsPressed){
    //   ship.yVelocity = 0;
    //   ship.yacceleration = 0;
    // }
  }
  if(ship.xVelocity > 0 && !mouseIsPressed){

    ship.xVelocity -= ship.xacceleration;

    ship.xVelocity = 0;
    // if(ship.xVelocity > 0 && ship.xVelocity < ship.xacceleration && !mouseIsPressed){
    //   ship.xVelocity = 0;
    //   ship.xacceleration = 0;
    // }
  }
  if(ship.xVelocity < 0 && !mouseIsPressed){

    ship.xVelocity += ship.xacceleration;
    
    ship.xVelocity = 0;
    // if(ship.xVelocity < 0 && ship.xVelocity > ship.xacceleration && !mouseIsPressed){
    //   ship.xVelocity = 0;
    //   ship.xacceleration = 0;
    // }
  }
}
