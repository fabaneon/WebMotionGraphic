var canvas = document.querySelector("canvas");

	canvas.width= window.innerWidth;
	canvas.height = window.innerHeight;

let mouse = {
	x: null,
	y: null,
	clicked: false,
	startx: null,
	starty: null,
	movedx: null,
	movedy: null,
	
	down: function(event) {
		event.preventDefault();
		mouse.movedx = 0;
		mouse.movedy = 0;
		mouse.clicked = true;
		console.log("mouse clicked  " + mouse.clicked);
	},
	
	up: function(event) {
		event.preventDefault();
		mouse.movedx = 0;
		mouse.movedy = 0;
		mouse.clicked = false;
		console.log("mouse clicked  " + mouse.clicked);
	},
	
	
	
}

canvas.onmousedown = mouse.down;
canvas.onmouseup = mouse.up;

window.addEventListener("mousemove",
    function(event){
        mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
        mouse.y = event.clientY - canvas.offsetTop + window.scrollY;
		mouse.movedx = mouse.x - mouse.startx;
		mouse.movedy = mouse.y - mouse.starty;
		mouse.startx = mouse.x;
		mouse.starty = mouse.y;
		if(mouse.clicked){
			console.log(mouse.x +" / "+ mouse.movedx +" / "+ mouse.movedy+" / "+ mouse.y);
		}
    }
)

var ctx = canvas.getContext('2d');

function point(x,y) {
	this.x = x;
	this.y = y;
}
/** 사각형 객체를 생성,갱신하는 묶음 함수 */
function CreateRect(x,y,vx,vy,size,r,g,b){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.size = size;
	
	
	this.draw = function(){
		ctx.beginPath();
		
		ctx.moveTo(this.x-this.size,this.y+this.size);
		
		ctx.lineTo(this.x+this.size,this.y+this.size);
		ctx.lineTo(this.x+this.size,this.y-this.size);
		ctx.lineTo(this.x-this.size,this.y-this.size);
		ctx.lineTo(this.x-this.size,this.y+this.size);

		ctx.lineWidth = 1.5;
		ctx.strokeStyle = "rgba("+r+","+g+","+b+",0.9)"
		ctx.stroke();
		ctx.fillStyle = "rgba("+r+","+g+","+b+",0.5)"
		ctx.fill();
	}

	this.update = function(){
		if (mouse.x > this.x-this.size && mouse.x < this.x + this.size &&
			mouse.y > this.y-this.size && mouse.y < this.y + this.size){
			// console.log("mouse in "+r+"");
			if(mouse.clicked){
					this.x += mouse.movedx;
					this.y += mouse.movedy;
					console.log(this.x + "/"+ this.y);
			}
		}
		
		
		this.draw();
	}
}

let RectArr = [];

function init(){
	RectArr = [];
	for(var i=0; i < 2; i++){
		var size = 50; 
		console.log(canvas.width +" / "+ canvas.height);
		var x = Math.floor(Math.random() * (window.innerWidth - size*2));
		var y = Math.floor(Math.random() * (window.innerHeight - size*2));
		
		var vx = (Math.random() * 0.5) * 0.8;
		var vy = (Math.random() * 0.5) * 0.8;
		
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		
		RectArr.push(new CreateRect(x,y,vx,vy,size,r,g,b));
	}
}
init();

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);

	RectArr.forEach((Rect,index)=>{
		Rect.update();
	})
	
	ctx.fillStyle = "skyblue"

	ctx.font = "bold 24px Arial";
	ctx.fillText("드래그 모션", 100,120);    

	ctx.font = "bold 12px Arial";
	ctx.fillText("Shape객체를 마우스로 드래그하여 이동시키는 기본 예제이다", 100,200);    
	ctx.fillText("아직 마우스의 속도를 완벽히 따라가진 못하지만 드래그앤드롭은 충분히 된다.", 100,240);    

	ctx.fillText("상시 업데이트되는 마우스의 현재값과 이전값의 차를 구하여",100,280);  
	ctx.fillText("객체 범위 안에 들어가있을 경우 해당 값을 중앙xy 좌표에 더해준다.",100,320);  
	ctx.fillText("자세한것은 F12 -> Source || 주석 확인",100,360);  

}

animate();
	
	
window.addEventListener("resize", 
	function(){
	canvas.width = window.innerWidth+300;
	canvas.height = window.innerHeight;
	init();
});