var list = [];

function setup(){
  createCanvas(windowWidth, windowWidth);
  background(150);
  stroke(255, 0 ,255);
}

function draw() {
  var density = 10;
  var space = width / density

  var p = null;




  for(var x = 0; x < width; x+=space){
    for(var y = 0; y < height; y += space){
      console.log(x + " : " + y);
      ellipse(mouseX, mouseY, 50, 50)
      var v1 = createVector(mouseX-x, mouseY-y);
      var v2 = createVector(x, y);
      drawArrow(v2, v1.limit(160), 'blue');
    }
  }


}
function drawArrow(base, vec, myColor){
 push();
 stroke(myColor);
 strokeWeight(3);
 fill(myColor);
 translate(base.x, base.y);
 line(0, 0, vec.x, vec.y);
 rotate(vec.heading());
 let arrowSize = 28;
 translate(vec.mag() - arrowSize, 0);
 triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
 pop();
}
function mouseMoved(){
  clear
  background(150)
}
