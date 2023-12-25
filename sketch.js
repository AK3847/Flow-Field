let particles = [];
let partnum = 5000;
let noisescale = 0.008;
let traillength = 10;
var parts, nsc, tl, ang;
let angle;
function setup() {
  createCanvas(windowWidth, windowHeight * 0.66);
  for (let i = 0; i < partnum; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  button = createButton("Number of Particles");
  parts = createSlider(100, 5000, 100);
  createP("");
  button = createButton("Noise Scale");
  nsc = createSlider(0, 100, 1);
  createP("");
  button = createButton("Trail Length");
  tl = createSlider(1, 100, 10);
  createP("");
  button = createButton("Angle");
  ang = createSlider(0, 360, 0);
  createP("");
  angle = TWO_PI;
  // button=createButton("Number of Particles");
  // parts=createSlider(100,5000,100);

  stroke(255);
}
function draw() {
  partnum = parts.value();
  traillength = 50 - tl.value();
  angle = ang.value();
  noisescale = nsc.value() / 100;
  background(0, traillength);
  for (let i = 0; i < partnum; i++) {
    let p = particles[i];
    point(p.x, p.y);
    let n = noise(p.x * noisescale, p.y * noisescale);
    let a = angle * n;
    p.x += cos(a);
    p.y += sin(a);
    if (!screenchk(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }

  // text(frameCount,50,windowHeight*0.66);
}
function screenchk(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
// function mouseClicked()
// {
//     // if(mouseX>=0 && mouseX<=width && mouseY>=0 && mousey<=height)
//     // {
//     // }
//     noiseSeed(randomSeed(500));
// }
