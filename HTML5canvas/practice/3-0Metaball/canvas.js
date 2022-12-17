const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");



function distance(x0, y0, x1, y1, m){
	
	return m/Math.sqrt((x0-x1)**2+(y0-y1)**2)**2 	
}

var metaballs = [];
for (var i = 0; i < 100; i++) {
	metaballs.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height,
	m: 2875*(Math.random())+2425, xvel: 6*(Math.random()-0.5), yvel: 6*(Math.random()-0.5), vx: 1*(Math.random())+0.5, vy:1*(Math.random())+0.5});
}
var constant = 10;



function render(metaballs) {
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < imageData.data.length; i+=100) {
		imageData.data[i] = 255*(constant > sumMetaballs((i/4)%canvas.width, ~~((i/4)/canvas.width), metaballs));
		imageData.data[i+1] = 255*(constant > sumMetaballs((i/4)%canvas.width, ~~((i/4)/canvas.width), metaballs));
		imageData.data[i+2] = 255*(constant > sumMetaballs((i/4)%canvas.width, ~~((i/4)/canvas.width), metaballs));
		imageData.data[i+3] = 255;
	}
	ctx.putImageData(imageData, 0, 0);
	
	metaballs.forEach((ball,index)=>{
		if(ball.x > canvas.width || ball.x < 0){
			ball.vx = ball.vx*(-1);
		}
		if(ball.y > canvas.height || ball.y < 0){
			ball.vy = ball.vy*(-1);
		}
		ball.x += ball.vx;
		ball.y += ball.vy;
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
	
	ctx.fillText("MetaBall 기법", 100,100);

	ctx.font = "bold 16px Arial";

	ctx.fillText("구와 구 사이의 거리를 기본값으로", 100,140);

	ctx.fillText("두 구 사이의 도형을 Merging 해주는 기법이다.", 100,180);
	
	ctx.fillText("MetaBall의 구현방법중 기존 그래픽 구현방식과의 명확한 차이는", 100,240);
	
	ctx.fillText("메타볼은 픽셀과 도형값을 다르게 저장한다는 것이다.", 100,260);
	ctx.fillText("화면을 보면 알 수 있듯 미세하게 작은 점의 색상을 바꿔주는것으로 도형을 포현하며", 100,300);
	ctx.fillText("그 도형 표현을 위한 상세값들은 배열에 저장되어있어 이를 읽어온 후 ", 100,320);
	ctx.fillText("도형 내 좌표에 해당되는 점 색상을 바꿔주는 방식인듯 하다.", 100,340);
}
console.log(metaballs);

	animate();


