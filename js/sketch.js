let X_START=0;
const Y_START=0;
let xoff=0,yoff=0,zoff=0;
let particles=[],flowfield=[];
let canvas;
let nrow, ncol, rectWidth, rectHeight;
let xIncre, yIncre, zIncre, partSlide, opacitySlide, strokeCP, backgroundColorPicker;

function makeControls()
{

  let controlWrapper = createDiv().id("control-wrap");
  let controlHeader = createDiv("<p>Controls</p>");
  controlHeader.parent(controlWrapper);
  nrowSlider = Slider("<span>Vertical Anchors</span>", minVal = 2, maxVal = 50, value = 30, step = 1, parent = controlWrapper, clearContent);
  ncolSlider = Slider("<span>Horizontal Anchors</span>", minVal = 2, maxVal = 50, value = 30, step = 1, parent = controlWrapper, clearContent);
  xIncre = Slider("<span>Horizontal Smoothness</span>", minVal = .0001, maxVal = .3, value = .05, step = .0001, parent = controlWrapper, clearContent);
  yIncre = Slider("<span>Vertical Smoothness</span>", minVal = .0001, maxVal = .3, value = .05, step = .0001, parent = controlWrapper, clearContent);
  zIncre = Slider("<span>Fluctuations in Forces</span>", minVal = 0, maxVal = .3, value = .01, step = .0001, parent = controlWrapper, clearContent);
  partSlide = Slider("<span>Number of Particles</span>", minVal = 10, maxVal = 10000, value = 2000, step = 10, parent = controlWrapper, clearContent);
  opacitySlide = Slider("<span>Line Opacity</span>", minVal = 0, maxVal = 1, value = .1, step = .01, parent = controlWrapper);
  strokeCP = Colorpicker("<span>Line Color</span>", startColor = "rgb(96, 158, 162)", parent = controlWrapper);
  backgroundColorPicker = Colorpicker("<span>Background Color</span>", startColor = "black", parent = controlWrapper, (d) => setBackgroundColor(d));

  // Buttons
  Button("Pause", controlWrapper, noLoop);
  Button("Resume", controlWrapper, loop);
  Button("Clear&nbsp;&nbsp;", controlWrapper, clearContent);
  Button("Download", controlWrapper, download);
  Button("GitHub", controlWrapper, () => {
    window.open("https://github.com/AK3847/Flow-Field", "_blank");
  });
  return controlWrapper;

}

function download() {
  noLoop(); // pause
  let link = document.createElement('a');
  link.download = 'flow_field.png';
  link.href = document.querySelector('canvas').toDataURL()
  link.click();
  loop();
}



function setBackgroundColor() {
  // Avoids clearing the content
  canvas.style("background-color", backgroundColorPicker.value())
}
// Create particles
function createEmptyParticles() {
  particles = [];
  for (let i = 0; i < partSlide.value(); i++) {
    particles[i] = new Particle(rectWidth, rectHeight);
  }
}

function clearContent() {
  clear();  
  createEmptyParticles();
  flowfield = [];  
  xoff = X_START = random(100);
  yoff = random(100);
  zoff = random(100);
}

function setup()
{
    let container=createDiv().id("main-container");
    let controls=makeControls();
    controls.parent(container);
    let canvasContainer=createDiv();
    canvas=createCanvas((windowWidth-20)*0.8,(windowHeight-180)*0.8).id("canvas-container");
    setBackgroundColor();
    canvas.parent(canvasContainer);
    canvasContainer.parent(container);

    colorMode(RGB,100);

    getSize();
    createEmptyParticles();
}

function getSize() {
  // Construct a grid of rectangles (rows/columns)
  nrow = nrowSlider.value();
  ncol = ncolSlider.value();
  rectWidth = width / ncol;
  rectHeight = height / nrow;
}

function draw() {  
  getSize();  
  // Iterate through grid and set vector forces
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

  // Position particles given field of vector forces
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  zoff += zIncre.value(); // think of this as time!
}