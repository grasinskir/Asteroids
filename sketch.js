let ship;


class Spacecraft{
  constructor(){
    this.x1 = width/2;
    this.y1 = height/2;
    this.x2 = width/2 - width/95;
    this.y2 = height/2 + height/30;
    this.x3 = width/2 + width/95;
    this.y3 = height/2 + height/30;
  }

  makeShip(){
    noFill();
    stroke(255);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  moveShip(){
    let shipxVel = width/500;
    this.x1 += shipxVel;
    this.x2 += shipxVel;
    this.x3 += shipxVel;
    let shipyVel = height/500;
    this.y1 += shipyVel;
    this.y2 += shipyVel;
    this.y3 += shipyVel;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Spacecraft();
}

function draw() {
  background(100);
  ship.makeShip();
  if(mouseIsPressed && mouseX >= 0 && mouseX >= width/2){
    // angleMode(DEGREES);
    // rotate(180);
    // triangle(ship.x1, ship.y1, ship.x2, ship.y2, ship.x3, ship.y3);
    ship.moveShip();
  }
}
