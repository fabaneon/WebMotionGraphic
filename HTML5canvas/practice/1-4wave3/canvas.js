const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// 3-1. 텍스트 그리기(기본)



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
	this.height = height;
	
	this.radius = radius;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x,this.y+Math.sin(this.t)*this.height*canvas.height/10,this.radius,0,Math.PI * 2,false);
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+alpha+")"
        ctx.fill();
        ctx.strokeStyle = "red"
        ctx.stroke();
    }
    this.update = function(){
        // this.x += this.vx;
        this.t += this.vy;
		// this.height += this.vx;
		// if (this.height > 1 || this.height < 0.1){
		// 	this.vx = -this.vx;			
		// }
        this.draw();
    }


}


function dotcreate(x,y,vx,vy,t,radius,height,wavenum){
	
	console.log(dotlocationArr[wavenum]);
	
	var checkpoint = null;
	this.setup = function(){
		this.dotX = x;
		this.dotY = y;
		this.vx = vx;
		this.vy = vy;
		this.t = t;
		this.height = height;
		this.radius = radius;
		this.x1 = this.dotX;
		this.y1 = this.dotY;
		this.x2 = dotlocationArr[wavenum][1].x;
		this.y2 = dotlocationArr[wavenum][1].y;
		checkpoint = 0;
	}
	this.setup();
	this.draw = function(){
		
		ctx.beginPath();
		ctx.arc(this.dotX,
				// this.dotY+Math.sin(this.t)*this.height*canvas.height/10,
				this.dotY,
				this.radius,0,
				Math.PI*2,false);
		ctx.fillStyle = "pink";
		ctx.fill();	
		ctx.strokeStyle = "red";
		ctx.stroke();

	}
	this.update = function(){
		// this.dotX += dotlocationArr.length*this.vx*100;
		// this.t += this.vy;
		// console.log(this.dotY+Math.sin(this.t)*this.height*canvas.height/10);
	
		if(this.dotX > canvas.width){
			this.setup();
		}
		else if(this.dotX > this.x2){
				console.log(this.dotY);
				this.x1 = this.x2;
				this.x2 = dotlocationArr[wavenum][checkpoint].x;
				this.y1 = this.y2;
				this.y2 = dotlocationArr[wavenum][checkpoint].y;
				checkpoint += 1;
				this.t = 0;
				console.log("check!" + checkpoint);
				console.log(this.y1 + " / " + this.y2);
		}
		else{
			this.dotX = (this.x1*(1-this.t))+(this.x2*this.t);
			this.dotY = (this.y1*(1-this.t))+(this.y2*this.t);
			this.t += this.vx;		
		}
		this.draw();
	}
	
}




var waveArr = [[]];
var circleArr = [[]];
var dotArr = [];
var dotlocationArr = [[]];



function wavesetup(){
	
    for(var a=0; a < waveArr.length; a++){
		
		var density = 12;
		var space = canvas.width / density;

		var waveHeight = 0.6;
		// 파형의 높이 조절
		var pointnum = space;

		console.log("density : " + density);
        
		var radius = 6; 

		var x = 0;	
        var y = canvas.height/2 ;

        var vx = (0.1) * 0.5; 
        var vy = (0.1) * 0.5; 

		
		for(var i=0; x < canvas.width; i++, x+= space){
			
			waveArr[a].push({x: x, y: y, vx: vx, vy: vy,t:y+i+a,ct:y+i+a, radius: radius, height: waveHeight});
			circleArr[a].push(new circle(x,y,vx,vy,y+i+a,radius, waveHeight));				
			dotlocationArr[a].push({x: x, y:y});

		}
		circleArr[a].pop();				
		console.log("wave number : ");
		console.log(waveArr);

		console.log("circleNumber : ");
		console.log(circleArr);
		console.log("dotlocation : ");
		console.log(dotlocationArr);
	
		dotArr.push(new dotcreate(0,y,vx,vy,0,radius,waveHeight,a));
		console.log("dotNumber : ");
		console.log(dotArr);
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

    let wave = waveArr[wavenum];
    let curve = wave[0];
    let prev = curve;
	ctx.moveTo(0, canvas.height/2);
	let prevcpx = curve.x;
	let prevcpy = curve.y;
	
	dotlocationArr = [[]];
	dotlocationArr[wavenum].push({x: curve.x, y:curve.y});
	
	for(var i=1; i < wave.length; i++){
		curve = wave[i];
		const cx = (prev.x + curve.x) / 2;
		const cy = (prev.y + curve.y) / 2;
		const ct = (prev.t + curve.t) / 2;
		// 위의 t값은 계속해서 vy값을 더해줄 움직임 변수.
		// 기존 y값을 그대로 넣은것이 t값이다.
		// y좌표값에 직접 vy를 계속 더하면 포인트의 절대좌표가 움직여버린다.

		if(curve === wave[wave.length-1]){
		ctx.quadraticCurveTo(cx,
				cy+Math.sin(ct)*curve.height*canvas.height/10,
				canvas.width,
				canvas.height/2);			
				dotlocationArr[wavenum].push({x: canvas.width, 
					y: canvas.height/2});
		}	
		else{
			ctx.quadraticCurveTo(cx,
				(cy+Math.sin(ct)*curve.height*canvas.height/10),
				curve.x,
				curve.y+Math.sin(curve.t)*curve.height*canvas.height/10);
				
			dotlocationArr[wavenum].push({x: curve.x, 
				y: curve.y+Math.sin(curve.t)*curve.height*canvas.height/10});
			}		

		curve.t += curve.vy;
		if(i === 1){
			wave[0].t += curve.vy;
		}
		// curve.height += curve.vx;
		// if (curve.height > 1|| curve.height < 0.1){
		// 	curve.vx = -curve.vx;			
		// }
		prev = curve;
		prevcpx = cx;
		prevcpy = cy;
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


var r = 1 * Math.random()* 50;
var g = 1 * Math.random()* 100;
var b = 1 * Math.random()* 150;


function animate(){
    requestAnimationFrame(animate);
	
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.fill();
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(var i=0; i < waveArr.length; i++){
        createwave(i,  r,  g, b,0.4);
    }	// createwave(몇번째 wave인지,     r,  g,   b,   0.5);

	
	
	
	
	ctx.beginPath();
	ctx.moveTo(0,canvas.height/2);
	ctx.lineTo(canvas.width,canvas.height/2);
	ctx.strokeStyle = "red";
	ctx.stroke();

	dotArr.forEach((dot,index)=>{
		dot.update();
	});
	
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