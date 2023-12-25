let particles=[];
let partnum=5000;
let noisescale=0.008;
let traillength=10;
function setup()
{
  createCanvas(windowWidth,windowHeight*0.66);
  for(let i=0;i<partnum;i++)
    {
      particles.push(createVector(random(width),random(height)));
    }
  stroke(255);
  
}
function draw()
{
  background(0,traillength);
  for(let i=0;i<partnum;i++)
    {
      let p=particles[i];
      point(p.x,p.y);
      let n=noise(p.x*noisescale,p.y*noisescale);
      let a=TWO_PI*n;
      p.x+=cos(a);
      p.y+=sin(a);
      if(!screenchk(p)){
        p.x=random(width);
        p.y=random(height);
      }
    }

    // text(frameCount,50,windowHeight*0.66);
}
function screenchk(v){
  return v.x>=0 && v.x<=width && v.y>=0 && v.y<=height;
}
function mouseReleased()
{
  noiseSeed(randomSeed(10));
}