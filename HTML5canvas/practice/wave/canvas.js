const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");
const ctx = canvas.getContext("2d");


// window.addEventListener("resize",
//     function(){
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     }

// )

window.addEventListener("resize",
    function(){

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }
)

function circle(x,y,vx,vy,radius){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;

    this.draw = function(){
        // c.beginPath();
        c.arc(this.x,this.y+Math.sin(this.y)*0.6*canvas.height/5,this.radius,0,Math.PI * 2,false);

        c.strokeStyle = "white"
        // c.stroke();
    }
    this.update = function(){
        // this.x += this.vx;
        this.y += this.vy;

        this.draw();
    }


}

var circleArr = [];

function wave(){
    for(var i=0; i < 10; i++){
        var radius = 20; 
        
        var x = 100;
        var y = 300;
        
        var vx = (0.6- 0.5) * 1; 
        var vy = (0.6- 0.5) * 1; 
        
        circleArr.push(new circle(x*i,y+i,vx,vy,radius));
        }

}
wave();

function init(){
    circleArr = [];    
    wave();
}
function animate(){
    requestAnimationFrame(animate);
    // c.clearRect(0,0,canvas.width,canvas.height);
    c.fillStyle = "rgba(30,30,30,0.5)"
    c.fill();
    c.fillRect(0,0,canvas.width,canvas.height);
    c.beginPath();
    circleArr[0].x = 100;
    circleArr[0].y = 400;
    circleArr[0].update();

    for(var i=2; i < circleArr.length-1; i++){

        circleArr[i].update();
        // if(i > 1){
            // var beforeX = circleArr[i-1].x;
            // var beforeY = circleArr[i-1].y;

            // var nowX = circleArr[i].x;
            // var nowY = circleArr[i].y;
            // var cpX = nowX - beforeX;
            // var cpY = nowY - beforeY;
            // // c.quadraticCurveTo(beforeX,beforeY,cpX,cpY);
            
            // c.quadraticCurveTo(cpX,cpY,nowX,nowY);

        // }

    }
    // console.log(circleArr[1]);
    circleArr[9].x = 900;
    circleArr[9].y = 400;
    circleArr[9].update();
    c.stroke();

    ctx.fillStyle = "white";
    ctx.font = "italic bold 48px Arial"; //Arial 적용
    ctx.fillText("Wave 만들기 심화", 100, 60);
    
    ctx.font = "italic bold 18px Arial"; //Arial 적용
    
    ctx.fillText("우선은 점들을 for문을 이용해서 각기 다른 vy값으로 움직이게끔 만들었다.", 100, 90);
    ctx.fillText("이제 해당 점들의 이전값, 현재값을 따로 저장하고 그 중간값을 구해서",
                     100, 150);
    ctx.fillText(" curve 함수에 대입해 진짜 파형을 만들어봐야겠다.", 100, 180);
    ctx.fillText("자세한것은 F12 -> Source에서 소스파일 주석참고", 100, 210);


}
animate();