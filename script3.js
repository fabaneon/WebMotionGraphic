var list = [];

var r1 = null;
var r2 = null;
var g1 = null;
var g2 = null;
var b1 = null;
var b2 = null;



function setup(){
  createCanvas(windowWidth, windowWidth);

  stroke(255, 0 ,255);

}

function draw() {
    background(122 , 5 , 132);
  var density = 10;
  var space = width / density

  var p = null;

  var i = 0;

  for(var x = 0; x < width; x+=space){
    for(var y = 0; y < height; y += space){


      ellipse(mouseX, mouseY, 10, 10)
      var v1 = createVector(mouseX-x, mouseY-y);
      var v2 = createVector(x, y);
      list.push(v2);
      var r = map(list[i].x, 0, width, r1, r2)
      var g = map(list[i].y, 0, height, g1, g2)
      var b = map(list[i].x, 0, width, b1, b2)

      drawArrow(list[i], v1.limit(100), r,g,b);

      i++;
    }

  }


}
function drawArrow(base, vec, r,g,b){
 push();
 stroke(255);
 strokeWeight(1);
 fill(r,g,b);
 translate(base.x, base.y);
 line(0, 0, vec.x, vec.y);
 rotate(vec.heading());
 let arrowSize = 30;
 translate(vec.mag() - arrowSize, 0);

 triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
 pop();
}
function mouseMoved(){

  r1 = random(255);
  r2 = random(255);
  g1 = random(255);
  g2 = random(255);
  b1 = random(255);
  b2 = random(255);


}
function mouseDragged(){

  var r1 = random(255);
  var r2 = random(255);
  var g1 = random(255);
  var g2 = random(255);
  var b1 = random(255);
  var b2 = random(255);

}
