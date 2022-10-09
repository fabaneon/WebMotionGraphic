var canvas = document.querySelector("#canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext("2d"), d = canvas.getContext("2d");



function Circle(x,y,vx,vy,radius){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy
    this.radius = radius;

    this.draw = function(){
        d.beginPath();
        d.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        // d.arc(x,y,radius,0,Math.PI*2,false);
        var rgba = "rgba("+vx+","+y+","+x+",255)";
        d.strokeStyle = rgba;
        d.stroke();
        
    }
    this.update = function(){

    
        // console.log("x" + (x));
        // console.log("y" + y);
    
        // console.log(innerWidth)
        if(this.x + this.radius> innerWidth || this.x - this.radius < 0){
            this.vx = -this.vx;
        }
        if(this.y + this.radius> innerHeight || this.y - this.radius < 0 ){
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;

        this.draw();
    }
}


// var radius = 30;
var x = 50;
var y = 50;

// xy좌표

var vx = (Math.random() - 0.5) * 0.01;
var vy = (Math.random() - 0.5) * 0.01;

// Velocity XY

var circle = new Circle(x,y,vx,vy,radius);

var circleArr = [];
for (var i = 0; i < 200; i++){
    var radius = 30;
    var x = Math.random(2,30) * (innerWidth - radius*2);
    var y = Math.random(2,30) * (innerHeight - radius*2);

    // xy좌표

    var vx = (Math.random(2,30) - 0.5) * 2;
    var vy = (Math.random(2,30) - 0.5) * 2;

    // Velocity XY
    circleArr.push(new Circle(x,y,vx,vy,radius));
}

function animate(){
    requestAnimationFrame(animate);
    // 애니매이션을 위한 프레임카운트를 호출하는 함수.
    // 매개변수에는 해당 함수를 재귀함수형식으로 넣어준다.
    // circleArr[1].update();
    
    // c.fillStyle = "rgba(255," + 255 + ",255,0)";
    // c.clearRect(0,0,canvas.width,canvas.height);
        c.fillStyle = "rgba(0,0,0,200)";
        c.fillRect(200,200,canvas.width-400,canvas.height-400);      


    for(var i = 0; i < circleArr.length; i++){
        // console.log(y)
        
        circleArr[i].update();
        
        // circle.update();
    }
    
    // for(var i=0; i < canvas.width/2; i++){
    //     c.clearRect(0,0,canvas.width,canvas.height);
        //9번째 줄의 원을 그리는 함수

        // 사각형 영역만큼 지우기
        // 0,0 은 그냥 해두고 가로 너비 좌표 , 세로너비 좌표
        
        // c.beginPath();
        // c.arc(i/2+vx,Math.sin(x/50*0.3)*canvas.height/4+400,radius,0,Math.PI*2,false);
        // var rgba = "rgba("+(i*x)+","+x+","+Math.random(0,255)+",255)";
        // c.strokeStyle = rgba;
        // c.stroke();
        
        // c.beginPath();
        // c.arc(i,Math.sin((y/100+10)*0.3)*canvas.height/4+400,radius,0,Math.PI*2,false);
        // var rgba = "rgba("+(i*y)+","+y+","+Math.random(0,255)+",255)";
        // c.strokeStyle = rgba;
        // c.stroke();
        
        // 위아래로 반복운동하는 원

        // c.beginPath();
        // c.moveTo(x,Math.sin(x*0.1)*canvas.height/4+400);
        // c.lineTo(x+10,Math.sin(x*0.1)*canvas.height/4+400);
        // var rgba = "rgba("+(i*x)+","+125+","+Math.random(x,255)+",255)";
        // c.strokeStyle = rgba;
        // c.stroke();

        // p5js 에서 공부하던 sin 함수를 적용해보았다.


    
    // }

    x += vx;
    y += vy;

    // console.log("x" + (x));
    // console.log("y" + y);

    // console.log(innerWidth)
    if(x + radius> innerWidth || x - radius < 0){
        vx = -vx;
    }
    if(y + radius> innerHeight || y - radius < 0 ){
        vy = -vy;
    }

    // 위 주석처리된 반복문과 아래 조건문 함수는 별도의 함수 생성을 하지않고 도형생서을 할때 사용했던 내용이다.

}

animate();
