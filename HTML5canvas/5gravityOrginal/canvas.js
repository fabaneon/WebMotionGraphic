var canvas = document.querySelector("#canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth -30;


var c = canvas.getContext("2d"), ctx = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove",
    function(event){
        mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
        mouse.y = event.clientY - canvas.offsetTop + window.scrollY;
        // console.log(mouse.x +" / "+mouse.y);

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
function Circle(x,y,vx,vy,radius,r,g,b){
    this.radius = radius;
    this.mass =this.radius;
    // this.angle = angle;

    this.x = x;
    this.y = y;
    this.vx = Math.cos(vx);
    this.vy = Math.sin(vy);
    this.r = r;
    this.g = g;
    this.b = b;
    
    this.gravity = 0.05;
    this.elasticity = 0.78 - this.mass/100;
    this.friction = 0.008;
	
    this.draw = function(){
        
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle= "rgba(0,0,255,255)";
        c.fillStyle = "rgba("+this.r+","+this.g+","+this.b+",255)"
        c.fill();
        c.stroke();
    } 
    this.move = function(){
        if(this.y + this.radius < canvas.height){
            this.vy += this.gravity;
        }
        this.vx = this.vx - (this.vx*this.friction);
        
        this.x += this.vx;
        this.y += this.vy;
    }
    this.wallHit = function(){
        if(this.y - this.radius > canvas.height+this.radius*3){
            this.y = canvas.height - this.radius;
        }
        else if(this.y + this.radius > canvas.height||this.y - this.radius < 0){
            this.vy = (this.vy*this.elasticity);
            this.vy *= -1;
        }
        if(this.x + this.radius > canvas.width||this.x - this.radius < 0){
            this.vx *= -1;
        }
    }

    this.update = function(){
       
        
        this.move();
        this.wallHit();
        this.draw();   
    }

}
// 공 생성 함수 패키지
let circleArr = [];


function init(){
    for(var i=0; i < 10; i++){
        radius = Math.random()*30+ 1;
        //radius = 30;
        var x = mouse.x;
        var y = mouse.y;
        
        // var x = 100;
        // var y = 100;
        var r = Math.random()*255;
        var g = Math.random()*255;
        var b = Math.random()*255;

        
        var vx = -1 * Math.random() * 10;
        var vy = -1 * Math.random() * 10;
    
        circleArr.push(new Circle(x,y,vx,vy,radius,r,g,b));
    
    }   
}
let ballcreate =true;
canvas.addEventListener("click", function(){
    if(ballcreate){

    
    console.log("===== start =====");
    console.log(mouse.x +" / "+ mouse.y)
        
        init();
        console.log("ball fire!");

        ballcreate =false;
        console.log("ball created & turn false!");
    	console.log("okay checked");
			
        

        setTimeout(()=>{
            // c.clearRect(0,0,canvas.width,canvas.height);    
            ballcreate = true;
            console.log("ball turn true!");
            console.log("===== End =====");
        }, 500)
        

    }

})


animate();

// c.fillStyle = "rgba(30,30,30,1)";
// c.fillRect(0,0,canvas.width,canvas.height);    

function animate(){
    requestAnimationFrame(animate);
    // console.log(circleArr[1].x);
    c.clearRect(0,0,canvas.width,canvas.height);
    circleArr.forEach((circle,index)=>{
        circle.update();
        // circle.
    }
    // 이야 forEach 이거 객체지향의 정수같다.
    // 변수를 동시에 다룰 수 있는건 여지껏 처음본다.. 
    );
    // c.beginPath();
    // c.arc(mouse.x,mouse.y,30,0,Math.PI * 2,false);
    // c.strokeStyle= "rgba(0,0,255,255)";
    // c.fillStyle = "white";
    // c.fill();
    // c.stroke();

    ctx.fillStyle = "skyblue"

    ctx.font = "bold 48px Arial";
    ctx.fillText("중력 완결",100,120);    

    ctx.font = "bold 24px Arial";
    ctx.fillText("아직 시도중이다.",100,200);    

    ctx.fillText("자세한것은 F12 -> Source || 주석 확인",100,240);    

}
