let X_START = 0;
// const Y_START = 0;
//variables to control the offsets in x,y,z direction
let xoff = 0,
  yoff = 0,
  zoff = 0;
//vectors to store particles and flowfields
let particles = [],
  flowfield = [];

let canvas; //variable to contain the main canvas

let nrow, ncol, rectWidth, rectHeight; //variables to store number of rows and cols and rectangle-cell width & height

let xIncre, yIncre, zIncre; //variables to store increments in x,y,z direction

let particles_num, opacitySlide, strokeCP, backgroundColorPicker;


//function to make individual slide bars and buttons to control the flowfields
function makeControls() {
  let controlWrap = createDiv().id("control-wrap");
  let controlHead = createDiv("<p>Tools</p>");
  controlHead.parent(controlWrap);
  particles_num = Slider(
    "<span>Number of Particles</span>",
    (minVal = 100),
    (maxVal = 8000),
    (value = 800),
    (step = 50),
    (parent = controlWrap),
    clearCanvas
  );
  zIncre = Slider(
    "<span>Change in Force</span>",
    (minVal = 0),
    (maxVal = 1),
    (value = randn_bm()),
    (step = 0.1),
    (parent = controlWrap),
    clearCanvas
  );
  nrowSlider = Slider(
    "<span>Vertical Drift</span>",
    (minVal = 2),
    (maxVal = 50),
    (value = 30),
    (step = 1),
    (parent = controlWrap),
    clearCanvas
  );
  ncolSlider = Slider(
    "<span>Horizontal Drift</span>",
    (minVal = 2),
    (maxVal = 50),
    (value = 30),
    (step = 1),
    (parent = controlWrap),
    clearCanvas
  );
  xIncre = Slider(
    "<span>Horizontal Flow Intensity</span>",
    (minVal = 0.0001),
    (maxVal = 0.3),
    (value = 0.05),
    (step = 0.0001),
    (parent = controlWrap),
    clearCanvas
  );
  yIncre = Slider(
    "<span>Vertical Flow Intenstiy</span>",
    (minVal = 0.0001),
    (maxVal = 0.3),
    (value = 0.05),
    (step = 0.0001),
    (parent = controlWrap),
    clearCanvas
  );
  opacitySlide = Slider(
    "<span>Line Opacity</span>",
    (minVal = 0),
    (maxVal = 1),
    (value = 0.1),
    (step = 0.01),
    (parent = controlWrap)
  );
  strokeCP = Colorpicker(
    "<span>Line Color</span>",
    (startColor = "#A362A0"),
    (parent = controlWrap)
  );
  // backgroundColorPicker = Colorpicker("<span>Background Color</span>", startColor = "black", parent = controlWrap, (d) => setBackgroundColor(d));

  // Buttons
  Button("&nbsp;&nbsp;Pause&nbsp;&nbsp;", controlWrap, noLoop);
  Button("&nbsp;Resume", controlWrap, loop);
  Button(
    "&nbsp;&nbsp;&nbsp;Clear&nbsp;&nbsp;&nbsp;&nbsp;",
    controlWrap,
    clearCanvas
  );
  Button("Download", controlWrap, download);
  Button("&nbsp;&nbsp;GitHub&nbsp;&nbsp;", controlWrap, () => {
    window.open("https://github.com/AK3847/Flow-Field", "_blank");
  });
  return controlWrap;
}

// function to get random value for z-increment i.e noise
function randn_bm() {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  num = num / 10.0 + 0.5;
  if (num > 1 || num < 0) return randn_bm() 
  return num
}

//function to let the user download the canvas
function download() {
  noLoop();
  let link = document.createElement("a");
  link.download = "flow_field.png";
  link.href = document.querySelector("canvas").toDataURL();
  link.click();
  loop();
}

//function to update the background color - not working as of now will be fixing in future commits!!
function setBackgroundColor() {
  // canvas.style("background-color", backgroundColorPicker.value())
  canvas.style("background-color", "#000000");
}


//function to create initial particles
function createEmptyParticles() {
  particles = [];
  for (let i = 0; i < particles_num.value(); i++) {
    particles[i] = new Particle(rectWidth, rectHeight);
  }
}

//funcion to clear canvas and restart
function clearCanvas() {
  clear();
  createEmptyParticles();
  flowfield = [];
  xoff = X_START = random(100);
  yoff = random(100);
  zoff = random(100);
}

//initial setup function
function setup() {
  let container = createDiv().id("main-container");
  let controls = makeControls();
  controls.parent(container);
  let canvasContainer = createDiv();
  canvas = createCanvas(windowWidth * 0.85, (windowHeight - 120) * 0.8).id(
    "canvas-container"
  );
  setBackgroundColor();
  canvas.parent(canvasContainer);
  canvasContainer.parent(container);

  colorMode(RGB, 255); //chaning colormode to RGB mapped to 255 units

  getSize();
  createEmptyParticles();
}

//function to get size of each cell 
function getSize() {
  nrow = nrowSlider.value();
  ncol = ncolSlider.value();
  rectWidth = width / ncol;
  rectHeight = height / nrow;
}


// draw canvas function
function draw() {
  getSize();
  for (let row = 0; row < nrow; row++) {
    for (let col = 0; col < ncol; col++) {
      let angle = noise(xoff, yoff, zoff) * 4 * PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield.push([v.x, v.y]);
      xoff += xIncre.value();
    }
    xoff = X_START;
    yoff += yIncre.value();
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  zoff += zIncre.value() * 2;
}
