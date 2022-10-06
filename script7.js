var t = 0;
var t2 = 0;
var char = "t<-200";
var char2 = "t2=0"
var x = 200, y = 500 ; 
var mycolor = 50;

function setup(){
  createCanvas(1200,800);
}

function draw(){
  if( mouseIsPressed === true){
    MakeWave();  
  }
  else{
    background(0,128,255);
    MakeWave();
  }
}
function Wavedot(x,y,mycolor){
  fill(mycolor)
  ellipse(x,y,25,25)
}

function MakeWave(){
  if(char === "t>200"){
    t -= 1;
    if(t < -200){
      char = "t<-200";
    }
  }
  else{
    t += 1;
    if(t>200){
      char = "t>200";
    }
  }
  // ---==
  if(char2 === "t2=0"){
    t2 += 0.01;
    if(t2 > 1){
      char2 = "t2=1"
    }
  }
  else{
    t2 -= 0.01;
    if(t2 < 0){
      char2 = "t2=0"
    }

  }


  console.log(t2);
  for(var i=1; i < 11; i++){
    if(i%2 !== 0){
      stroke(0,10,130,255);

      Wavedot(x*i,y+(-t),mycolor*i);
      line(x*(i-1),y+t,x*i,y-t);
      // 홀수 점 계산식
      var calcX1 = (((x*(i-1))*(1-t2))+(x*i*t2));
      var calcY1 = (((y+t)*(1-t2)) + ((y-t)*t2));
      Wavedot(calcX1,calcY1,"yellow");
      // Wavedot(calcX1/2,calcY1/2,"yellow");  
  
    }
    else{
      stroke(0,10,130,50);
      Wavedot(x*i,y+t,mycolor*i);      
      if(i !==0){
        line(x*i,y+t,x*(i-1),y-t);  
      }
      var calcX2 = (((x*(i-1))*(1-t2))+(x*i*(t2)));
      var calcY2 = (((y-t)*(1-t2)) + ((y+t)*(t2)));
      Wavedot(calcX2,calcY2,"yellow");
      // Wavedot(calcX2/2,calcY2/2,"yellow");
    }
    stroke("white");
    line(calcX1,calcY1,calcX2,calcY2);
    // if(i !==0){
    //   Wavedot((calcX1*(t2)+calcX2*(1-t2)),(calcY1*(t2)+calcY2*(1-t2)),"white")

    // }
    // else{
    //   Wavedot((calcX1*(1-t2)+calcX2*t2),(calcY1*(1-t2)+calcY2*t2),"white")

    // }
  }
}