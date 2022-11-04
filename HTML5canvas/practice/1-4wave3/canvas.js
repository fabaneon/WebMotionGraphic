const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        ctx.beginPath();
        ctx.arc(this.x,this.y+Math.sin(this.y)*0.6*canvas.height/10,this.radius,0,Math.PI * 2,false);
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+alpha+")"
        ctx.fill();
        ctx.strokeStyle = "red"
        ctx.stroke();
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

function dotcreate(x,y,vx,vy,radius){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius;

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y+Math.sin(this.y)*0.6*canvas.height/10,this.radius,0,Math.PI*2,false);
		ctx.fillStyle = "pink";
		ctx.fill();	
		ctx.strokeStyle = "black";
		ctx.stroke();

	}
	this.update = function(){
		this.x += 10*this.vx;
		this.y += this.vy;
		if(this.x < 0 || this.x > x * 10){
			this.vx = this.vx * (-1);
		}
		if(this.x > x * 10){
			this.x = x * 10;
			console.log("over");
		}
		else if(this.x < 0){
			this.x = 0;
			console.log("down");
		}
		// console.log(Math.floor(this.y));
		this.draw();
	}
	
}



var waveArr = [[],[]];
var circleArr = [[],[]];
var dotArr = [];


function wavesetup(){
    for(var a=0; a < waveArr.length; a++){
        for(var i=0; i < 12; i++){
            var radius = 6; 
            
            var x = canvas.width/11;
            var y = canvas.height/2 ;

            var vx = (0.1) * 0.5; 
            var vy = (0.1) * 0.5; 
            
            waveArr[a].push({x: x*i, y: y+i+a, vx: vx, vy: vy, radius: radius});
            circleArr[a].push(new circle(x*i,y+i+a,vx,vy,radius));
        }
		dotArr.push(new dotcreate(x,y,vx,vy,radius));
    }

}
wavesetup();

function init(){
    waveArr = [[]];    
    circleArr = [[]];
	dotArr = [];
    wavesetup();
}

function createwave(wavenum,r,g,b,alpha){
    ctx.beginPath();
    // ctx.moveTo(canvas.width,canvas.height/2);
    // ctx.lineTo(canvas.width,canvas.height);
    // ctx.lineTo(0,canvas.height);
    // ctx.lineTo(0,canvas.height/2);

    let wave = waveArr[wavenum];
    let curve = wave[0];
    let prev = curve;
	
	ctx.moveTo(curve.x, curve.y);

	let prevcpx = curve.x;
	let prevcpy = curve.y;
	
    for(var i=1; i < wave.length; i++){
		curve = wave[i];
		
        const cx = (prev.x + curve.x) / 2;
        const cy = (prev.y + curve.y) / 2;
		if(curve === wave[wave.length-1]){
        	ctx.quadraticCurveTo(cx,
			cy+Math.sin(cy)*0.6*canvas.height/10,
            canvas.width,
            canvas.height/2);			
		}
		else{
		ctx.quadraticCurveTo(cx,
        	(cy+Math.sin(cy)*0.6*canvas.height/10),
            curve.x,
            curve.y+Math.sin(curve.y)*0.6*canvas.height/10);		
		}		
            // ctx.lineTo(wave[i-1].x, 
            //     wave[i-1].y+Math.sin(wave[i-1].y)*0.6*canvas.height/10,
            //     x,
            //     y);
        // wave[i].x += wave[i].vx;
        wave[i].y += wave[i].vy;

        if(wave[i].y > canvas.height/2 + 30 || wave[i].y < canvas.height/2 -30){
            wave[i].vy = -wave[i].vy;
        }
		prev = curve;
		prevcpx = cx;
		prevcpy = cy;
                // vy를 계속 더하다보니 wave가 자꾸 아래로 간다.
        // 그래서 넣어준 구문.
   
        // (x1+(x2-x1)/2)+(100);
        // quadraticCurveTo 공부 단원에서 알아낸 수식.
    }

	// ctx.lineTo(canvas.width,canvas.height/2);
	// ctx.lineTo(canvas.width,canvas.height);
	// ctx.lineTo(0,canvas.height);
	// ctx.lineTo(wave[0].x,wave[0].y);
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+alpha+")"
    ctx.fill();

    ctx.strokeStyle = "rgba("+r+","+g+","+b+","+255+")";
    ctx.stroke();


    
    for(var i=1; i < circleArr[wavenum].length; i++){
   	 circleArr[wavenum][i].update();
    }

	// 점을 없애보고 싶다면 위 loop를 주석처리하자.

}


var r = 1 * Math.random()* 30;
var g = 1 * Math.random()* 60;
var b = 1 * Math.random()* 90;


function animate(){
    requestAnimationFrame(animate);
	
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.fill();
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(var i=0; i < waveArr.length; i++){
        createwave(i,  r*i+30,  g-i+30, b/i+30,0.4);
    }
	
	for(var i=1; i < dotArr.length; i++){
    	dotArr[i].update();
		// console.log(dotArr[0]);
    }
	dotArr[0].update();
	// ctx.beginPath();
	// ctx.arc(waveArr[1][0].x,waveArr[1][0].y,6,0,Math.PI*2,false);
	// ctx.arc(waveArr[1][1].x,waveArr[1][1].y,6,0,Math.PI*2,false);


	// ctx.stroke();
    // createwave(몇번째 wave인지,     r,  g,   b,   0.5);

ctx.fillStyle = "black";
ctx.font = "italic bold 48px Arial"; //Arial 적용
ctx.fillText("Wave 활용", 100, 60);

ctx.font = "italic bold 18px Arial"; //Arial 적용

ctx.fillText("wave 생성 로직을 살짝 바꿨다", 100, 90);
ctx.fillText("아무튼 이번 예제의 목적은 기존 wave 생성 로직에서 필요값들을 추출해",
                 100, 150);
ctx.fillText("그 wave 위에서 움직이는 점을 만드는것이다.", 100, 180);
//ctx.fillText("비슷한 방식으로 각 중간점(circle)들도 생성해주면 wave 하나가 완성되는데", 100, 210);
//ctx.fillText("비슷한 방식으로 각 중간점(circle)들도 생성해주면 wave 하나가 완성되는데", 100, 210);
//ctx.fillText("이러한 wave를 다수 생성하는 방법은 각각 pointArr,circleArr 에 2차원 배열로", 100, 240);
//ctx.fillText("저장하고 이를 loop문을 통해 x,y,vx .. 등의 값과 wave 생성을 순차적으로 진행해주면 된다.", 100, 270);

//ctx.fillText("그이외 vy값은 무한히 y에 더해지므로 wave가 점점 아래로가거나 위로 가는데", 100, 330);
//ctx.fillText("이때문에 vy값을 반전시켜주는 구문을 추가해서 중간에 뚝 끊기며", 100, 360);
//ctx.fillText("잠시동안 wave가 왜곡되는 단점이 있다", 100, 390);


}
animate();