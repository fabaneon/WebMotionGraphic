const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let mouse = {
	x: 0,
	y: 0,
	click: false,
	drag: false,
	
};

window.addEventListener("mousemove",function(){
	mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
	mouse.y = event.clientY - canvas.offsetTop + window.scrollY;

});



function distance(x0, y0, x1, y1, m){
	
	return m/Math.sqrt((x0-x1)**2+(y0-y1)**2)**2 	
}
var density = 60;
// 밀도!!!!!!!!!! 물방울 갯수와 화면 픽셀수는 비례하기끔 설정해둠.
var space = canvas.width/density;
var metaballs = [];
for (var i = 0; i < canvas.width; i+=space) {
	
	var scale = 4005*(Math.random())+365;
	
	metaballs.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height,
	m: scale,mt: scale, xvel: 6*(Math.random()-0.5), yvel: 6*(Math.random()-0.5), vx: 1*(Math.random())+0.5, vy:1*(Math.random())+0.5,
	sponge: false			   
				   });
	

}
var constant = 20;



function render(metaballs) {
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < imageData.data.length; i+=density) {
		imageData.data[i] = 255*(constant > sumMetaballs((i/4)%canvas.width, ~~((i/4)/canvas.width), metaballs));
					// 여기부터 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 끝까지 부등호를 대었을때 참이라면 1 아니면 0을 이용한것. 
					// 이걸로 각 픽셀점의 색상을 변형시키는것.
					
		
		imageData.data[i+1] = 255*(constant > sumMetaballs((i/4)%canvas.width, ~~((i/4)/canvas.width), metaballs));
		imageData.data[i+2] = 15*(constant > sumMetaballs((i/4)%canvas.width, ~~((i/4)/canvas.width), metaballs));
		imageData.data[i+3] = 255;
	}
	ctx.putImageData(imageData, 0, 0);
	
	var controller = metaballs[metaballs.length-1];
	
	metaballs.forEach((ball,index)=>{

		if(ball === controller){
			ball.x = mouse.x;
			ball.y = mouse.y;
			ball.m = 6000;
			
		}
		
		else{
			if(ball.x < controller.x+30 && ball.x > controller.x-30 &&
			  	ball.y < controller.y +30 && ball.y > controller.y -30){
				ball.vy = 0;
				ball.vy = 1*(Math.random())+2.5;
			}

			else{
				if(ball.m < ball.mt){
					ball.vy = 0;
					ball.m += 0.1;
					ball.vy = 1*(Math.random())+0.5;
				}
				else{  
					ball.x += ((-1*Math.random())+0.5)*1.5;
					ball.y += ball.vy;
					ball.vy += ball.vy/50;

				}
				
				if(ball.x > canvas.width || ball.x < 0){
					ball.vx = ball.vx*(-1);
				}
				if(ball.y > canvas.height || ball.y < 0){
					ball.y = 1+Math.random()*canvas.height/1.5;
					ball.vy = 1*(Math.random())+0.5;
				}
			}
		}
		
		
	}) 
	
}
function sumMetaballs(x, y, metaballs) {
	var sum = 0;
	for (var i = 0; i < metaballs.length; i++) {
		sum += distance(x, y, metaballs[i].x, metaballs[i].y, metaballs[i].m);
	}
	return sum;
}

function makeArc(){
	ctx.beginPath();
	ctx.arc(mouse.x,mouse.y,30,0,Math.PI*2,false);
	ctx.strokeStyle = "rgba(255,255,30,1)";
	ctx.stroke();
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	render(metaballs);
	
	makeArc();
	ctx.fillStyle= "white";
	
	ctx.font = "bold 24px Arial";
	
	ctx.fillText("사실적인 빗물", 100,100);

	ctx.font = "bold 16px Arial";

	ctx.fillText("windowBroom 프로젝트에 사용하기위해 활용방법을 숙달중이다.", 100,140);

	ctx.fillText("Metaball 거리 관련 기본 공식", 100,160);
	
		ctx.font = "normal 14px Arial";
	
	ctx.fillText("function distance(x0, y0, x1, y1, m) 일때", 100,200);
	
	ctx.fillText("distance = (  m/ [제곱근] Math.sqrt((x0-x1)∧2+(y0-y1)∧2)∧2  )", 100,240);
	
}
console.log(metaballs);

	animate();


