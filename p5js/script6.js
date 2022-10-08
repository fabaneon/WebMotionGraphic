
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
    stroke(255, 255,255, 50)
    // r, g, b, [alpha]
    AB()
    CD()
  }
  else{
    stroke(255, 255,255, 0)
    // r, g, b, [alpha]
    AB()
    CD()
  }
}

var t= 0;
var t2=0;

function AB(){
  var x1,y1,x2,y2,x3,y3,x4,y4,x5,y5 = null;
  x1 = 300;
  y1 = 100;

  x2 = 500;
  y2 = 100;

  x3 = 500;
  y3 = 300;

  x4 = 500;
  y4 = 500;

  x5 = 300;
  y5 = 500;



  var length12 = (x2-x1)+(y2-y1);
  var length23 = (x3-x2)+(y3-y2);

  var z1 =(x1*(1-t)+(x2*t));
  var q1 =(y1*(1-t))+(y2*t);
  var z2 =(x2*(1-t)+(x3*t));
  var q2 =(y2*(1-t))+(y3*t);
  dot(x1,y1,"red")
  dot(x2,y2,"yellow")
  line(x1,y1,x2,y2);
  dot(x3,y3,"blue")
  line(x2,y2,x3,y3);
  dot(x4,y4,"white")
  line(x3,y3,x4,y4);
  dot(x5,y5,"grey")
  line(x4,y4,x5,y5);


  console.log(z1 + " / " + q1)

  var z3 =(x3*(1-t)+(x4*t));
  var q3 =(y3*(1-t))+(y4*t);
  var z4 =(x4*(1-t)+(x5*t));
  var q4 =(y4*(1-t))+(y5*t);

  // console.log((x2-x1)+(y2-y1))
// AB 선을 이동하는 초록색 점
  dot(z1,q1,"green");
  // BC 선을 이동하는 초록색 점

  dot(z2,q2,"skyblue");

  line(z1,q1,z2,q2);


  dot(z3,q3,"skyblue");
  dot(z4,q4,"green");
  line(z3,q3,z4,q4);

  var a1 = (z1*(1-t)+(z2*t));
  var b1 = (q1*(1-t)+(q2*t));
  var a2 = (z3*(1-t)+(z4*t));
  var b2 = (q3*(1-t)+(q4*t));

  dot(a1,b1,"violet")
  dot(a2,b2,"violet")
  line(a1,b1,a2,b2);

  dot ((a1*(1-t)+(a2*t)),(b1*(1-t)+(b2*t)),"purple")


}



function CD(){
  var x1,y1,x2,y2,x3,y3,x4,y4 = null;

  x1 = 300;
  y1 = 100;

  x2 = 100;
  y2 = 100;

  x3 = 100;
  y3 = 300;
  

  var length12 = (x2-x1)+(y2-y1);
  var length23 = (x3-x2)+(y3-y2);

  var z1 =(x1*(1-t)+(x2*t));
  var q1 =(y1*(1-t))+(y2*t);
  var z2 =(x2*(1-t)+(x3*t));
  var q2 =(y2*(1-t))+(y3*t);


  dot(x1,y1,"red")
  dot(x2,y2,"yellow")
  dot(x3,y3,"blue")
  console.log(z1 + " / " + q1)
  // console.log((x2-x1)+(y2-y1))


  // AD 선을 이동하는 초록색 점
  dot(z1,q1,"green");
  // DC 선을 이동하는 초록색 점

  dot(z2,q2,"skyblue");

  dot((z1*(1-t2)+(z2*t2)),(q1*(1-t2)+(q2*t2)),"violet")

  line(z1,q1,z2,q2);
  line(x1,y1,x2,y2);
  line(x2,y2,x3,y3);
}

function dot(x,y,mycolor){
  fill(mycolor);
  color(0,0,0,5)
  ellipse(x,y,8,8);

}
function mouseMoved(){
    t += 0.007;
    t2 = t*0.5;
    if(t > 1){
      t = 0;
          background(0)
    }
}
function mouseDragged(){
  t += 0.007;
  t2 = t*0.5;
  if(t > 1){
    t = 0;
        background(0)
  }
}
