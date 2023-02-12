const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

const ctx = canvas.getContext("2d");



window.addEventListener("resize",
    function(){

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }
)

function circle(x,y,vx,vy,t,radius,height,r,g,b,alpha){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.t = t;
	
	this.radius = radius;
	this.height = height;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y+Math.sin(this.t)*this.height*canvas.height/10,this.radius,0,Math.PI * 2,false);
        c.fillStyle = "rgba("+r+","+g+","+b+","+alpha+")"
        c.fill();
        c.strokeStyle = "red"
        c.stroke();
    }
    this.update = function(){
        // this.x += this.vx;
        this.t += this.vy;

        this.draw();
    }


}


var waveArr = [[],[],[],[]];
var circleArr = [[],[],[],[]];


function wavesetup(){
    for(var a=0; a < waveArr.length; a++){
        for(var i=0; i < 10; i++){
            var radius = 6; 
            
			var waveHeight = 0.6;
			
            var x = canvas.width/9;
            var y = canvas.height/2 ;

            var vx = (0.1) * 0.5; 
            var vy = (0.1) * 0.5; 
            
			
			
            waveArr[a].push({x: x*i, y: y, vx: vx, vy: vy,
							 t: y+i+a,ct: y+i+a, radius: radius,
							height: waveHeight});
        	if(i !== 9){
				circleArr[a].push(new circle(x*i,y,vx,vy,
											 y+i+a,radius, waveHeight));				
			}
        }
    }

}
wavesetup();

function init(){
    waveArr = [[],[],[],[]];    
    circleArr = [[],[],[],[]];
    wavesetup();
}

function createwave(wavenum,r,g,b,alpha){
     ctx.beginPath();

    let wave = waveArr[wavenum];
    let curve = wave[0];
    let prev = curve;
	ctx.moveTo(0, canvas.height/2);
	
	

    for(var i=1; i < wave.length; i++){
		curve = wave[i];
        const cx = (prev.x + curve.x) / 2;
        const cy = (prev.y + curve.y) / 2;
		const ct = (prev.t + curve.t) / 2;
		// 위의 t값은 계속해서 vy값을 더해줄 움직임 변수.
		// y좌표값에 직접 vy를 계속 더하면 포인트의 절대좌표가 움직여버린다.
		if(curve === wave[wave.length-1]){
        	ctx.quadraticCurveTo(cx,
			cy+Math.sin(ct)*curve.height*canvas.height/10,
            canvas.width,
            canvas.height/2);			
		}
		else{
		ctx.quadraticCurveTo(cx,
        	(cy+Math.sin(ct)*curve.height*canvas.height/10),
            curve.x,
            curve.y+Math.sin(curve.t)*curve.height*canvas.height/10);		
		}		
		
        curve.t += curve.vy;
		if(i === 1){
			wave[0].t += curve.vy;
		}
        // if(curve.y > canvas.height/2 + 30 || curve.y < canvas.height/2 -30){
        //     curve.vy = -curve.vy;
        // }
		prev = curve;
    }


	ctx.lineTo(canvas.width,canvas.height);
	ctx.lineTo(0,canvas.height);
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+alpha+")"
    ctx.fill();

    ctx.strokeStyle = "rgba("+r+","+g+","+b+","+255+")";
    ctx.stroke();


    
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
    for(var i=0; i < waveArr.length; i++){
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
ctx.fillText("곡선(wave)의 생성은 점들의 이전값, 현재값을 따로 저장하고",
                 100, 150);
ctx.fillText("그 중간값을 구해서 quadraticCurveTo 함수에 대입한다.", 100, 180);
ctx.fillText("비슷한 방식으로 각 중간점(circle)들도 생성해주면 wave 하나가 완성되는데", 100, 210);
ctx.fillText("비슷한 방식으로 각 중간점(circle)들도 생성해주면 wave 하나가 완성되는데", 100, 210);
ctx.fillText("이러한 wave를 다수 생성하는 방법은 각각 pointArr,circleArr 에 2차원 배열로", 100, 240);
ctx.fillText("저장하고 이를 loop문을 통해 x,y,vx .. 등의 값과 wave 생성을 순차적으로 진행해주면 된다.", 100, 270);

ctx.fillText("기존엔 vy값은 무한히 y에 더해지므로 wave가 점점 아래로가거나 위로 가는 단점이 있었는데", 100, 330);
ctx.fillText("이 문제를 매개변수 t로 대체하여 y좌표는 immutable해졌다.", 100, 360);
ctx.fillText("더이상 wave의 좌표가 변경되거나 왜곡되는 현상은 발생하지 않는다.", 100, 390);


}
animate();