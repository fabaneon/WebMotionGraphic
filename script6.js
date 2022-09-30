
function setup(){
  createCanvas(windowWidth,windowHeight);
  let density = 20;
  var space = width/density;

  background(0);

  // for(var x = 0; x < width; x+=space){
  //   for(var y = 0; y < width; y+=space)
  //   ellipse(x,y,25,25);
  //
  // }
}
function draw(){
  if(mouseIsPressed === true){
    background(0)
    AB()
  }
  else{
    AB()
  }
}
  var t= 0;
  var t2=0;
  var x1,y1,x2,y2,x3,y3,x4,y4 = null;
  x1 = 100;
  y1 = 300;
  x2 = 350;
  y2 = 400;
  x3 = 450;
  y3 = 200;
  x4 = 550;
  y4 = 300;
  var length12 = (x2-x1)+(y2-y1);
  var length23 = (x3-x2)+(y3-y2);

  var z1 =(x1*(1-t)+(x2*t));
  var q1 =(y1*(1-t))+(y2*t);
  var z2 =(x2*(1-t)+(x3*t));
  var q2 =(y2*(1-t))+(y3*t);
function AB(){
  dot(x1,y1,"red")
  dot(x2,y2,"yellow")
  dot(x3,y3,"blue")

  var length12 = (x2-x1)+(y2-y1);
  var length23 = (x3-x2)+(y3-y2);

  var z1 =(x1*(1-t)+(x2*t));
  var q1 =(y1*(1-t))+(y2*t);
  var z2 =(x2*(1-t)+(x3*t));
  var q2 =(y2*(1-t))+(y3*t);



  console.log(z1 + " / " + q1)
  // console.log((x2-x1)+(y2-y1))
// AB 선을 이동하는 초록색 점
  dot(z1,q1,"green");
  // BC 선을 이동하는 초록색 점

  dot(z2,q2,"skyblue");



  dot((z1*(1-t2)+(z2*t2)),(q1*(1-t2)+(q2*t2)),"violet")

  // r, g, b, [alpha]
  line(z1,q1,z2,q2);
  line(x1,y1,x2,y2);
  stroke(255, 255,255, 50)
  line(x2,y2,x3,y3);
  move(z1,x2)
}

function dot(x,y,mycolor){
  fill(mycolor);
  color(0,0,0,10)
  ellipse(x,y,8,8);

}
function move(z1,x2){
    t += 0.005;
    t2 = t*1;
    if(z1 > x2){
      t = 0;
          background(0)
    }
}
