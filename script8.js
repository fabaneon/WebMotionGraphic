
// function setup(){
//   createCanvas(windowWidth, windowHeight);
//   background(255)
//   frameRate(12)
// }

function setup() {
  createCanvas(1000,1000);
  angleMode(DEGREES);
  rectMode(CENTER);
}
function draw(){
  background (10,20,30);
  noFill();
  stroke(0,128,230,50);
  translate(width / 2, height/2);

  for(var i=0; i< 200; i++){
    push();

    rotate(sin(frameCount + i * 3 ) * 50);
    // line(i, sin(frameCount + i * 3 ) * 50, i,  500)
    // 색 입히는건 카피임.
    var r = map(sin(frameCount), -1, 1, 50, 255);
    var g = map(cos(frameCount /2), -1, 1, 50, 255);
    var b = map(tan(frameCount /4), -1, 1, 50, 255);

    stroke(r,g,b);

    rect(0 ,0 ,600-i*3 ,600-i*3 , 200-i);

    pop();
  }
}
