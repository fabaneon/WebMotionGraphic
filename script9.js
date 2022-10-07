var t = 0
var char = "t>25"
function setup() {
  createCanvas(1000,1000);
  // angleMode(DEGREES);
  rectMode(CENTER);
}
function draw(){
  background(0,125,230)

  if(char === "t>25"){
    t -= 0.1;
    if(t < 0){
      char = "t<0";
    }
  }
  else{
    t += 0.1;
    if(t>25){
      char = "t>25";
    }
  }
  // t = random(0,50);

  console.log(t);
  //
  let a = 0.0;
  let inc = TWO_PI / 25.0;
  for (let i = 0; i < windowWidth; i++) {
    push()
    line(i * 3, windowHeight/2, i * 3, windowHeight/2 + sin(a) * 1.0*i*t/10);
    a = a + inc;
    pop()
  }
    // let a = 0.0;
    // let inc = TWO_PI / 25.0;
    //   line(t * 10, 50, t * 4, 50 + sin(a) * 40.0);
      // line(t * 10, 50, t * 4, 50 + cos(a) * 40.0);
      // line(t * 10, 50, t * 4, 50 + sin(a) * 40.0);
      a = a + inc;
  }
