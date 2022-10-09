var canvas = document.querySelector("#canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth -30;


var c = canvas.getContext("2d"), d = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove",
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse.y);

    }

)

window.addEventListener("resize", 
    function(){
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth -30;
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
    // this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.draw = function(){
        
        c.beginPath();
        c.arc(mouse.x,mouse.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle= "rgba(0,0,255,255)";
        c.fillStyle = "white";
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

        this.draw();
    }

}
let circleArr = [];
for(var i=0; i < 100; i++){
    radius = Math.random()*10+ 1;
    var x = (Math.random(2,30) * (innerWidth - radius*2));
    var y = (Math.random(2,30) * (innerHeight - radius*2));
    
    var vx = (Math.random(2,30) - 0.5) * 2
    var vy = (Math.random(2,30) - 0.5) * 2

    circleArr.push(new Circle(x,y,vx,vy,radius));

}




function animate(){
    requestAnimationFrame(animate);
    // console.log(circleArr[1].x);



    c.fillStyle = "rgba(30,30,30,0.2)";
    c.fillRect(0,0,canvas.width,canvas.height);


    for(var i=0; i < circleArr.length;  i++){
        circleArr[i].update();
    }

}

animate();
