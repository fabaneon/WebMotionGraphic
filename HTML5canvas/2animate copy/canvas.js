var canvas = document.querySelector("#canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext("2d"), d = canvas.getContext("2d");


var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;

// xy좌표

var vx = (Math.random(2,30) - 0.5) * 9;
var vy = (Math.random(2,30) - 0.5) * 9;

// Velocity XY

var radius = 30;
function animate(){
    requestAnimationFrame(animate);
    // 애니매이션을 위한 프레임카운트를 호출하는 함수.
    // 매개변수에는 해당 함수를 재귀함수형식으로 넣어준다.
    for(var i=0; i < canvas.width/2; i++){
        c.clearRect(0,0,canvas.width,canvas.height);
        // 사각형 영역만큼 지우기
        // 0,0 은 그냥 해두고 가로 너비 좌표 , 세로너비 좌표

        c.beginPath();
        c.arc(i/2+vx,Math.sin(x/50*0.3)*canvas.height/4+400,radius,0,Math.PI*2,false);
        var rgba = "rgba("+(i*x)+","+x+","+Math.random(0,255)+",255)";
        c.strokeStyle = rgba;
        c.stroke();
        
        c.beginPath();
        c.arc(i,Math.sin((y/100+10)*0.3)*canvas.height/4+400,radius,0,Math.PI*2,false);
        var rgba = "rgba("+(i*y)+","+y+","+Math.random(0,255)+",255)";
        c.strokeStyle = rgba;
        c.stroke();

        d.beginPath();
        d.arc(x,y,radius,0,Math.PI*2,false);
        // d.arc(x,y,radius,0,Math.PI*2,false);
        

        var rgba = "rgba("+(i*x)+","+x+","+255+",255)";

        d.strokeStyle = rgba;
        d.stroke();

        // 위아래로 반복운동하는 원

        // c.beginPath();
        // c.moveTo(x,Math.sin(x*0.1)*canvas.height/4+400);
        // c.lineTo(x+10,Math.sin(x*0.1)*canvas.height/4+400);
        // var rgba = "rgba("+(i*x)+","+125+","+Math.random(x,255)+",255)";
        // c.strokeStyle = rgba;
        // c.stroke();

        // p5js 에서 공부하던 sin 함수를 적용해보았다.

    }

    // c.clearRect(x,i,canvas.width,canvas.height);
    x += vx;
    y += vy;

    console.log("x" + (x));
    console.log("y" + y);

    // console.log(innerWidth)
    if(x + radius> innerWidth || x - radius < 0){
        vx = -vx;
    }
    if(y + radius> innerHeight || y - radius < 0 ){
        vy = -vy;
    }


}

animate();
