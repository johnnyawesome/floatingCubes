
let cubes = [];
let gridSize = 25;
let rotation = 0;

function setup() {
  createCanvas(800, 800, WEBGL);
  generateCubes();
}

function draw() {
  background(0);

  //Lets the mouse move the camera
  let camX = map(mouseX, 0, width, -1000, 1000);
  let camY = map(mouseY, 0, height, -1200, 100);
  //camera(camX, camY, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);
  camera(camX, camY, - 2000 - (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);

  //Moves and displays the cubes
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      cubes[i][j].move();
      cubes[i][j].display();
    }
  }
}

//Generates the cube objects
function generateCubes() {
  let xCube = -700;
  let zCube = 0;
  let noiseOffsetY = 0;
  for (let i = 0; i <= gridSize; i++) {
    let noiseOffsetX = 0;
    cubes[i] = [];
    for (let j = 0; j <= gridSize; j++) {
      cubes[i][j] = new Cube(xCube, 300, zCube, 50, noiseOffsetX, noiseOffsetY);
      xCube += 60;
      noiseOffsetX += 0.1;
    }
    xCube = -700;
    zCube -= 80;
    noiseOffsetY += 0.1;
  }
}

//Cubeclass
class Cube {
  constructor(_x, _y, _z, _cubeSize, _noiseOffsetX, _noiseOffsetY) {
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.cubeSize = _cubeSize;
    this.noiseOffsetX = _noiseOffsetX;
    this.noiseOffsetY = _noiseOffsetY;
  }

  display() {

    noStroke(0);
    //fill('rgba(0,0,0, 0.25)');
    //ambientLight(0, 255, 0);
    //pointLight(255, 255, 255, 100, -300, 100);
    pointLight(255, 255, 255, 50, 0, 50);
    //ambientMaterial(255, 255, 255, 0.5);
    specularMaterial(250, 250, 250);
    push();
    translate(this.x, this.y, this.z);
    box(this.cubeSize, this.cubeSize, this.cubeSize);
    pop();
  }

  move() {
    this.y = map(noise(this.noiseOffsetX, this.noiseOffsetY), 0, 1, 500, 100);
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
  }

  logParams() {
    console.log("X: ", this.x, "Y: ", this.y, "Y: ", this.z, "Size: ", this.cubeSize);
  }
}