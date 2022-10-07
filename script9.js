function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}
function draw(){
  // background(0,125,230)

  background (10,20,30);
  noFill();
  stroke(0,128,230,50);
  translate(width/2, height/2);
  for(var i=0; i< windowWidth; i++){
    stroke(sin(frameCount)*i,cos(frameCount/4)*i,tan(frameCount/2)+i,0+(i*i));

    push();
    // fill(0,125,230,10)
    if(mouseIsPressed === true){
      line(i, sin(frameCount + i * 0.5 ) * windowHeight/4,i,  500)
      line(-i, sin(frameCount + i * 0.5 ) * windowHeight/4, -i,  500)

    }
    else{
      ellipse(i,sin(frameCount + i * 0.5 ) * windowHeight/4,50,50)
      ellipse(-i,sin(frameCount + i * 0.5 ) * windowHeight/4,50,50)

    }
    pop();
  }
  }
