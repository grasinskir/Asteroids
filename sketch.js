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
  }

  makeShip(){
    push();
      translate(this.x1, this.y1);
      angleMode(DEGREES);
      rotate(this.heading);
      noFill();
      stroke(255);
      triangle(0, 0, -width/95, height/30, width/95, height/30);
    pop();
  }

  moveShip(){
    push();
      translate(this.x1, this.y1);
      angleMode(DEGREES);
      noFill();
      stroke(255);
      triangle(0, 0, -width/95, height/30, width/95, height/30);
      // let shipyVel = -height/500;
      // this.y1 += shipyVel;
      // this.y2 += shipyVel;
      // this.y3 += shipyVel;
      pop();
      this.y1 -= height/500;
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
