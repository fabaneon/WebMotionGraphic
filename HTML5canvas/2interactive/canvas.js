var canvas = document.querySelector("#canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth -30;


var c = canvas.getContext("2d"), d = canvas.getContext("2d");

var maxRadius = 50;
var minRadius = 5;
//공통 비례 적용 최대,최소 값

var colorArr = [
    "#937DC2",
    "#C689C6",
    "#FFABE1",
    "#FFABE1",
    "#FFE6F7",

];

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

window.addEventListener("resize", 
    function(){
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth -30;
        init();
    }
)
// 브라우저 크기를 캔버스에 실시간으로 반영함.

// 중간 정리 ----
// 이벤트리스너 함수는 requestAnimationframe 함수와 동일하게
// 프레임 카운트가 들어가있는것으로 이해됨.
function Circle(x,y,vx,vy,radius){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.draw = function(){
        
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle= "rgba(0,0,255,255)";
        c.fillStyle = this.color;
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
        if (mouse.x - this.x < maxRadius && 
            mouse.x - this.x > -maxRadius&&
            mouse.y - this.y < maxRadius &&
            mouse.y - this.y > -maxRadius &&
            this.radius < maxRadius){
            this.radius += 2;
        }
        else if (this.radius > minRadius){
            this.radius -= 2;
        }
     

        this.draw();
    }

}
let circleArr = [];
for(var i=0; i < 1000; i++){
    radius = Math.random()*10+ 1;
    var x = (Math.random(2,30) * (innerWidth - radius*2));
    var y = (Math.random(2,30) * (innerHeight - radius*2));
    
    var vx = (Math.random(2,30) - 0.5) * 2
    var vy = (Math.random(2,30) - 0.5) * 2

    circleArr.push(new Circle(x,y,vx,vy,radius));

}


function init(){

    circleArr = [];
    for(var i=0; i < 1000; i++){
        radius = Math.random()*10+ 1;
        var x = (Math.random(2,30) * (innerWidth - radius*2));
        var y = (Math.random(2,30) * (innerHeight - radius*2));
        
        var vx = (Math.random(2,30) - 0.5) * 2
        var vy = (Math.random(2,30) - 0.5) * 2
    
        circleArr.push(new Circle(x,y,vx,vy,radius));
    
    }
    
    
}
// resize를 하는 함수에서 브라우저 사이즈가 재정의될때마다 색깔원들을 재생성하기위한 init 함수


function animate(){
    requestAnimationFrame(animate);
    // console.log(circleArr[1].x);

    c.beginPath();
    c.arc(mouse.x,mouse.y,maxRadius,0,Math.PI * 2 ,false);
    c.strokeStyle = "green";
    c.stroke();


    c.fillStyle = "rgba(30,30,30,0.2)";
    c.fillRect(0,0,canvas.width,canvas.height);


    for(var i=0; i < circleArr.length;  i++){
        circleArr[i].update();
    }

}

animate();
