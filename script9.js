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
  translate(400, height/2);
  for(var i=0; i< windowWidth; i++){
    stroke(sin(frameCount)*i,cos(frameCount/4)*i,tan(frameCount/2)+i,0+(i*i));

    push();
    // fill(0,125,230,10)
    if(mouseIsPressed === true){
      ellipse(i,sin(frameCount + i * 0.5 ) * windowHeight/4,50,50)
      ellipse(-i,sin(frameCount + i * 0.5 ) * windowHeight/4,50,50)

    }
    else{
      line(i, sin(frameCount + i * 0.5 ) * windowHeight/4,i,  500)
      line(-i, sin(frameCount + i * 0.5 ) * windowHeight/4, -i,  500)

    }


    // 색 입히는건 카피임.
    // var g = map(cos(frameCount /2), -1, 1, 50, 255);
    // var b = map(tan(frameCount /4), -1, 1, 50, 255);
    //
    // var r = sin(frameCount), -1, 1, 50, 255);

    // rect(0 ,0 ,600-i*3 ,600-i*3 , 200-i);

    pop();
  }
  }
