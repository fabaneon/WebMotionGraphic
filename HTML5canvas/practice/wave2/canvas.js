const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

const ctx = canvas.getContext("2d");

// 3-1. 텍스트 그리기(기본)

출처: https://curryyou.tistory.com/331 [카레유:티스토리]
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

function circle(x,y,vx,vy,radius,r,g,b,alpha){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y+Math.sin(this.y)*0.6*canvas.height/10,this.radius,0,Math.PI * 2,false);
        c.fillStyle = "rgba("+r+","+g+","+b+","+alpha+")"
        c.fill();
        c.strokeStyle = "red"
        c.stroke();
    }
    this.update = function(){
        // this.x += this.vx;
        this.y += this.vy;

        if(this.y > canvas.height/2 + 30 || this.y < canvas.height/2 -30){
            this.vy = -this.vy;
        }
        // vy를 계속 더하다보니 wave가 자꾸 아래로 간다.
        // 그래서 넣어준 구문.

        this.draw();
    }


}


var pointArr = [[],[],[],[]];
var circleArr = [[],[],[],[]];


function wavesetup(){
    for(var a=0; a < pointArr.length; a++){
        for(var i=0; i < 10; i++){
            var radius = 6; 
            
            var x = canvas.width/10;
            var y = canvas.height/2 ;

            var vx = (0.1) * 0.5; 
            var vy = (0.1) * 0.5; 
            
            pointArr[a].push({x: x*i, y: y+i+a, vx: vx, vy: vy, radius: radius});
            circleArr[a].push(new circle(x*i,y+i+a,vx,vy,radius))
        }
    }

}
wavesetup();

function init(){
    pointArr = [[],[],[],[]];    
    circleArr = [[],[],[],[]];
    wavesetup();
}

function createwave(wavenum,r,g,b,alpha){
    c.beginPath();
    c.moveTo(canvas.width,canvas.height/2);
    c.lineTo(canvas.width,canvas.height);
    c.lineTo(0,canvas.height);
    c.lineTo(0,canvas.height/2);



    for(var i=0; i < pointArr[wavenum].length; i++){
        pointArr[wavenum][i].y;
        var x = pointArr[wavenum][i].x;
        var y = pointArr[wavenum][i].y;
        
        if(i > 0){
            var cpx = (pointArr[wavenum][i-1].x+(x - pointArr[wavenum][i-1].x)/2);
            var cpy = (pointArr[wavenum][i-1].y+(y - pointArr[wavenum][i-1].y)/2);
            // c.lineTo(pointArr[wavenum][i-1].x, 
            //     pointArr[wavenum][i-1].y+Math.sin(pointArr[wavenum][i-1].y)*0.6*canvas.height/10,
            //     x,
            //     y);
            c.quadraticCurveTo((cpx),
            (cpy+Math.sin(cpy)*0.6*canvas.height/10),
            x,
            y+Math.sin(y)*0.6*canvas.height/10);

        }
        
        // pointArr[wavenum][i].x += pointArr[wavenum][i].vx;
        pointArr[wavenum][i].y += pointArr[wavenum][i].vy;

        if(pointArr[wavenum][i].y > canvas.height/2 + 30 || pointArr[wavenum][i].y < canvas.height/2 -30){
            pointArr[wavenum][i].vy = -pointArr[wavenum][i].vy;
        }
                // vy를 계속 더하다보니 wave가 자꾸 아래로 간다.
        // 그래서 넣어준 구문.


        
        // (x1+(x2-x1)/2)+(100);
        // quadraticCurveTo 공부 단원에서 알아낸 수식.
    }

    c.lineTo(canvas.width,canvas.height/2);
    c.fillStyle = "rgba("+r+","+g+","+b+","+alpha+")"
    c.fill();

    c.strokeStyle = "rgba("+r+","+g+","+b+","+255+")";
    c.stroke();


    console.log(circleArr[0]);
    
    for(var i=1; i < circleArr[wavenum].length; i++){
    circleArr[wavenum][i].update();
    }
    // 점을 없애보고 싶다면 위 loop를 주석처리하자.

}


var r = Math.random()* 30;
var g = Math.random()* 60;
var b = Math.random()* 90;




function animate(){
    requestAnimationFrame(animate);
    // c.clearRect(0,0,canvas.width,canvas.height);
    c.fillStyle = "rgba(255,255,255,0.5)"
    c.fill();
    c.fillRect(0,0,canvas.width,canvas.height);
    for(var i=0; i < pointArr.length; i++){
        createwave(i,  r*i,  g-i, b/i,0.4);
    }
    // createwave(몇번째 wave인지,     r,  g,   b,   0.5);

    // c.beginPath();
    // c.moveTo(0,canvas.height/2);
    // c.lineTo(canvas.width,canvas.height/2);
    // c.strokeStyle = "red";
    // c.stroke();
// 그냥 화면 중앙을 표시하는 빨간줄.


// 3-2. 텍스트 그리기(최대 너비 지정)
// ctx.fillText("2. 캔버스에 텍스트를 씁니다.", 100, 30, 50);

// 3-3. 텍스트 폰트 설정
ctx.fillStyle = "black";
ctx.font = "italic bold 48px Arial"; //Arial 적용
ctx.fillText("Wave 만들기 완결", 100, 60);

ctx.font = "italic bold 18px Arial"; //Arial 적용

ctx.fillText("기본 구성은 wave1 과 동일하다", 100, 90);
ctx.fillText("곡선(point)의 생성은 점들의 이전값, 현재값을 따로 저장하고",
                 100, 150);
ctx.fillText("그 중간값을 구해서 quadraticCurveTo 함수에 대입한다.", 100, 180);
ctx.fillText("비슷한 방식으로 각 중간점(circle)들도 생성해주면 wave 하나가 완성되는데", 100, 210);
ctx.fillText("비슷한 방식으로 각 중간점(circle)들도 생성해주면 wave 하나가 완성되는데", 100, 210);
ctx.fillText("이러한 wave를 다수 생성하는 방법은 각각 pointArr,circleArr 에 2차원 배열로", 100, 240);
ctx.fillText("저장하고 이를 loop문을 통해 x,y,vx .. 등의 값과 wave 생성을 순차적으로 진행해주면 된다.", 100, 270);

ctx.fillText("그이외 vy값은 무한히 y에 더해지므로 wave가 점점 아래로가거나 위로 가는데", 100, 330);
ctx.fillText("이때문에 vy값을 반전시켜주는 구문을 추가해서 중간에 뚝 끊기며", 100, 360);
ctx.fillText("잠시동안 wave가 왜곡되는 단점이 있다", 100, 390);


}
animate();