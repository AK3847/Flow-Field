let particles = [];
let partnum = 5000;
let noisescale = 0.008;
let traillength = 50;
var parts, nsc, tl, ang;
let mxtraillength = 500;
let angle;
let randomcolor=false;
let seed=500;
let speedMultiplier=1;
let colors=[[0, 173, 181],[184, 59, 94],[184, 59, 94],[254, 252, 243]]
function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight * 0.66);
  for (let i = 0; i < partnum; i++) {
    particles.push(createVector(random(width), random(height)));
  }
//   textFont(font);    
  button = createButton("Number of Particles");
  parts = createSlider(25, 5000, 2500);
  createP("");
  button = createButton("Noise Scale");
  nsc = createSlider(100, 2000, 500, 100);
  createP("");
  button = createButton("Trail Length");
  tl = createSlider(10, 200, 50, 10);
  createP("");
  button = createButton("Angle");
  ang = createSlider(0, 360, 60);
  createP("");
  button = createButton("Noise Strength");
  sd = createSlider(0, 1000, 100);
  createP("");
  angle = TWO_PI;
  stroke(255);
}
function draw() {
  partnum = parts.value();
  traillength = 100 - tl.value();
  angle = ang.value();
  noisescale = nsc.value();
  seed=sd.value();
  background(0, traillength);
  for (let i = 0; i < partnum; i++) {
      let p = particles[i];
      let particlecolor = colors[int(random(colors.length))];
      let n = noise(p.x / noisescale, p.y / noisescale);
      let a = angle * n;
      point(p.x, p.y);
      p.x += cos(a) * speedMultiplier;
      p.y += sin(a) * speedMultiplier;
      if (!screenchk(p)) {
        p.x = random(width);
        p.y = random(height);
      }
    //   stroke(0);
    }
  }
function randomfill(Randomfill)
{
    var r,g,b;
    if(Randomfill){
        r=map(sin(angle),-1,1,100,200);
        g=map(sin(angle),-1,1,100,200);
        b=map(sin(angle),-1,1,100,200);
    }
    r=0,g=0,b=0;
    return [r,g,b];
}
function screenchk(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
// noiseSeed(randomSeed(seed));
// function mouseClicked()
// {
//     // if(mouseX>=0 && mouseX<=width && mouseY>=0 && mousey<=height)
//     // {
//     // }
//     noiseSeed(randomSeed(seed));
// }
