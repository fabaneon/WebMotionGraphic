var canvas = document.querySelector("canvas");

	canvas.width= window.innerWidth;
	canvas.height = window.innerHeight;

let mouse = {
	x: null,
	y: null,
	drag: false,
	startx: null,
	starty: null,
	movedx: null,
	movedy: null,
	
	
	down: function(event) {
		event.preventDefault();
		mouse.movedx = 0;
		mouse.movedy = 0;
		mouse.drag = true;
		console.log("mouse drag  " + mouse.drag);
	},
	
	up: function(event) {
		event.preventDefault();
		mouse.movedx = 0;
		mouse.movedy = 0;
		mouse.drag = false;
		console.log("mouse drag  " + mouse.drag);
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
	// 이 부분에서 shape를 움직여야 한다. 그래야 클릭중에 움직이지 않는 상태를 shape가 인지할 수 있다. 
		mouse.startx = mouse.x;
		mouse.starty = mouse.y;
	}
)

var ctx = canvas.getContext('2d');


/** 사각형 객체범위에서 마우스포인터가 클릭한 지점을 표시 */
function point(x,y,radius) {
	this.radius = radius
	this.x = x;
	this.y = y;
	
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		ctx.strokeStyle = "red";
		ctx.stroke();
	}
	this.update = function(){
							
		this.x += mouse.movedx + mouse.movedx/3;
		this.y += mouse.movedy + mouse.movedy/3;
		this.draw();
	}
}
/** 사각형 객체를 생성,갱신하는 묶음 함수 */
function CreateRect(x,y,vx,vy,size,r,g,b){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.size = size;
	this.contact = false;
	
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
			if(mouse.drag){
				this.contact = true;	
			}
		}
		if(!mouse.drag){
			this.contact = false;
		}
		if(this.contact){
					
					this.x += mouse.movedx + mouse.movedx/3;
					this.y += mouse.movedy + mouse.movedy/3;
					// this.x = mouse.x;
					// this.y = mouse.y;
					// 이러면 참 편하겠지만.. 이건 퍼포먼스가 전혀 없다.
			// console.log(Math.floor(this.x) + "/"+ Math.floor(this.y));
			}
		
		
		this.draw();
	}
}

let RectArr = [];

function init(){
	RectArr = [];
	for(var i=0; i < 10; i++){
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
	ctx.fillText("드래그 와이어", 100,120);    

	ctx.font = "bold 12px Arial";
	ctx.fillText("목표는 다음과 같다.", 100,200);    
	ctx.fillText("커서로 상자마다 줄을 연결하여 드래그로 끌고다니는 형식", 100,240);    

	ctx.fillText("기존 shape 범위 내 있을때만 드래그가 적용되었다면",100,280);  
	ctx.fillText("지금은 contact라는 bolean값을 추가하여 범위를 벗어나도 드래그가 유지된다.",100,320);  
	ctx.fillText("하지만 커서가 멈췄을때 movedXY값이 여전히 상수로 남아있어 shape가 계속 움직인다.",100,360);
	ctx.fillText("이를 해결하기위해 여전히 작업중...",100,380);  
	ctx.fillText("자세한것은 F12 -> Source || 주석 확인",100,400);  


}

animate();
	
	
window.addEventListener("resize", 
	function(){
	canvas.width = window.innerWidth+300;
	canvas.height = window.innerHeight;
	init();
});