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
        mouse.x = event.x;
        mouse.y = event.y;
        // console.log(mouse.x +" / "+mouse.y);

    }

)

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

    var velocityAccel = 1;
    // this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.draw = function(){
        
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle= "rgba(0,0,255,255)";
        c.fillStyle = "white";
        c.fill();
        c.stroke();
    } 
    this.update = function(){
        
        // if(this.x + this.radius > innerWidth ||
        //      this.x - this.radius < 0 ){

        //     this.vx = -this.vx;
        // }
        // if(this.y + this.radius > innerWidth){

        //     this.vy = -this.vy;
        // }
        // else{
            
        // }        
        // this.x += this.vx;
        // this.y += this.vy;

        // if(this.y + this.radius > innerHeight){
        //     this.y += this.vy;
        // }
        if(this.y + this.radius*2 < innerHeight){

            velocityAccel += this.vy;

            this.y += velocityAccel;
        }
        else if( this.y + this.radius*2 > innerHeight){

            // velocityAccel = -velocityAccel/2;
            if( this.y < innerHeight){
                this.y += velocityAccel;
            }
        }
        // if(Math.abs(-velocityAccel*velocityAccel).toFixed(0) === Math.abs(velocityAccel).toFixed(0) 
        // && this.y + this.radius*2 === innerHeight){
        //     console.log("fin!");
        // }

        // 공이 멈췄을때의 조건을 걸기위해 시도중이다.

        if( this.y + this.radius*2 > innerHeight){
            velocityAccel = -velocityAccel/1.1112
        }
        // if ( mouse.x - this.x > 30 &&
        //     mouse.x - this.x < -30 &&
        //     mouse.y - this.y > 30 &&
        //     mouse.y - this.y < -30 ){
        //         velocityAccel += 30;
        //         this.radius += 2;
        //     }

        // console.log(" || velocityAccel / "+ ((velocityAccel).toFixed(0)
        //     ) +" || this.y / "+ (this.y+this.radius*2).toFixed(0)+" || height : " + innerHeight);
        // console.log(Math.abs(-velocityAccel*velocityAccel).toFixed(0)
        //  + " / " + (Math.abs(velocityAccel).toFixed(0)
        //  + " / " + (this.y + this.radius*2).toFixed(0)
        //  + " / " + innerHeight

        //  ));
        
        this.draw();   
    }

}
let circleArr = [];
for(var i=0; i < 100; i++){
    radius = Math.random()*30+ 1;
    // radius = 30;

    var x = (Math.random(2,30) * (innerWidth - radius*2));
    var y = (Math.random(2,30) * (innerHeight - radius*2));
    // var x = 100;
    // var y = 100;
    
    var vx = 0.2;
    var vy = 0.2;

    circleArr.push(new Circle(x,y,vx,vy,radius));

}
function init(){
    circleArr = [];
    for(var i=0; i < 100; i++){
        radius = Math.random()*30+ 1;
        //radius = 30;
        var x = (Math.random(2,30) * (innerWidth - radius*2));
        var y = (Math.random(2,30) * (innerHeight - radius*2));
        
        // var x = 100;
        // var y = 100;
        
        var vx = 0.2;
        var vy = 0.2;
    
        circleArr.push(new Circle(x,y,vx,vy,radius));
    
    }
    
}



function animate(){
    requestAnimationFrame(animate);
    // console.log(circleArr[1].x);



    c.fillStyle = "rgba(30,30,30,0.8)";
    c.fillRect(0,0,canvas.width,canvas.height);


    for(var i=0; i < circleArr.length;  i++){
        circleArr[i].update();
    }
    ctx.fillStyle = "skyblue"

    ctx.font = "bold 48px Arial";
    ctx.fillText("중력",100,120);    

    ctx.font = "bold 24px Arial";
    ctx.fillText("아직 시도중이다.",100,200);    

    ctx.fillText("자세한것은 F12 -> Source || 주석 확인",100,240);    


}

animate();
