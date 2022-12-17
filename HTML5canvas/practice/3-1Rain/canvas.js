const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");



function distance(x0, y0, x1, y1, m){
	
	return m/Math.sqrt((x0-x1)**2+(y0-y1)**2)**2 	
}
var density = 60;
// 밀도!!!!!!!!!! 물방울 갯수와 화면 픽셀수는 비례하기끔 설정해둠.
var space = canvas.width/density;
var metaballs = [];
for (var i = 0; i < canvas.width; i+=space) {
	metaballs.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height,
	m: 2075*(Math.random())+565, xvel: 6*(Math.random()-0.5), yvel: 6*(Math.random()-0.5), vx: 1*(Math.random())+0.5, vy:1*(Math.random())+0.5});
}
var constant = 10;



function render(metaballs) {
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < imageData.data.length; i+=density) {
		imageData.data[i] = 255*(constant > sumMetaballs((i/4)%canvas.width, ~~((i/4)/canvas.width), metaballs));
		imageData.data[i+1] = 255*(constant > sumMetaballs((i/4)%canvas.width, ~~((i/4)/canvas.width), metaballs));
		imageData.data[i+2] = 15*(constant > sumMetaballs((i/4)%canvas.width, ~~((i/4)/canvas.width), metaballs));
		imageData.data[i+3] = 255;
	}
	ctx.putImageData(imageData, 0, 0);
	
	metaballs.forEach((ball,index)=>{
		if(ball.x > canvas.width || ball.x < 0){
			ball.vx = ball.vx*(-1);
		}
		if(ball.y > canvas.height || ball.y < 0){
			ball.y = 1+Math.random()*canvas.height/1.5;
			ball.vy = 1*(Math.random())+0.5;
		}
		ball.x += 1*(Math.random())-0.5;
		ball.y += ball.vy;
		ball.vy += ball.vy/30;
	}) 
	
}
function sumMetaballs(x, y, metaballs) {
	var sum = 0;
	for (var i = 0; i < metaballs.length; i++) {
		sum += distance(x, y, metaballs[i].x, metaballs[i].y, metaballs[i].m);
	}
	return sum;
}

function animate(){
	requestAnimationFrame(animate);
	
	render(metaballs);
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


