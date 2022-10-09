var canvas = document.querySelector("#canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext("2d"), d = canvas.getContext("2d");


var mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener("mousemove", 
    function(event){

        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
        
    }
)
// 마우스의 움직임 관련 이벤트 읽어오기
// mouseevent의 메소드들로 screenX 등이 저장되어있음.

function Circle(x,y,vx,vy,radius){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    
    this.draw = function(){
        
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle= "rgba(0,0,255,255)";
        c.fillStyle = "rgba(255,255,255,0.5)"
        c.fill();
        c.stroke();
    } 
    this.update = function(){
        
        if(this.x + this.radius > innerWidth ||
             this.x - this.radius < 0 ){

            this.vx = -this.vx;
        }
        if(this.y + this.radius > innerWidth || 
            this.y - this.radius < 0 ){

            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;

        // 마우스의 위치와 원의 위치 상호작용
        if (mouse.x - this.x < 40 && 
            mouse.x - this.x > -40&&
            mouse.y - this.y < 40 &&
            mouse.y - this.y > -40){
            this.radius += 5;
        }
        else if (this.radius > 50){
            this.radius -= 6;
        }
     

        this.draw();
    }

}

let circleArr = [];
for(var i=0; i < 50; i++){
    radius = 50;
    var x = (Math.random(2,30) * (innerWidth - radius*2));
    var y = (Math.random(2,30) * (innerHeight - radius*2));
    
    var vx = (Math.random(2,30) - 0.5) * 2
    var vy = (Math.random(2,30) - 0.5) * 2

    circleArr.push(new Circle(x,y,vx,vy,radius));

}


function animate(){
    requestAnimationFrame(animate);
    // console.log(circleArr[1].x);


    c.clearRect(0,0,canvas.width,canvas.height);

    for(var i=0; i < circleArr.length;  i++){
        circleArr[i].update();
    }
    console.log(circleArr[1].x);

}

animate();
