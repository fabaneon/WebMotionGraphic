var canvas = document.querySelector("canvas");

	canvas.width= window.innerWidth;
	canvas.height = window.innerHeight;

let mouse = {
	x: null,
	y: null,
	drag: false,
	
	
	down: function(event) {
		event.preventDefault();
		mouse.drag = true;
		console.log("mouse drag  " + mouse.drag);
	},
	
	up: function(event) {
		event.preventDefault();
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
		console.log(mouse.x +" / " + mouse.y + ' / ' + mouse.drag);

	// 이 부분에서 shape를 움직여야 한다. 그래야 클릭중에 움직이지 않는 상태를 shape가 인지할 수 있다. 
	}
)

var ctx = canvas.getContext('2d');


/** 사각형 객체범위에서 마우스포인터가 클릭한 지점을 표시 */
function point(x,y,radius,cx,cy) {
	this.radius = radius
	this.x = x;
	this.y = y;
	this.cx = x;
	this.cy = y;
	
	
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		ctx.strokeStyle = "red";
		ctx.stroke();
	}
	this.update = function(){
		this.x = this.cx;
		this.y = this.cy;
		this.draw();
	}
}
/** 사각형 객체를 생성,갱신하는 묶음 함수 */
function CreateRect(x,y,vx,vy,size,r,g,b){
	this.x = x;
	this.y = y;
	this.cx = this.x;
	this.cy = this.y;
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
			else{
				this.cx = this.x - mouse.x;
				this.cy = this.y - mouse.y;
			}
		}
		if(!mouse.drag){
			this.contact = false;
		}
		if(this.contact){
					
					// point.cx = mouse.x + this.cx; 
					// point.cy = mouse.y + this.cy ;
		
					
				
					this.x = mouse.x + this.cx;
					this.y = mouse.y + this.cy;
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
	ctx.fillText("이제 상대위치에서도 자연스럽게 움직이는 드래그 모션을 만들었다.",100,420); 
	ctx.fillText("마우스가 움직이는 정도를 계속 더하는것보다",100,440); 
	ctx.fillText("그냥 클릭했을때 객체 X,Y 기준 마우스 좌표값의 거리를 저장하여",100,460); 
	ctx.fillText("차이를 두면 될것을 왜 어렵게 생각했을까 ㅋㅋ",100,480); 
	ctx.fillText("코드 하단에 주석으로 참고 레퍼런스를 첨부해두었다.",100,500);  
	ctx.fillText("자세한것은 F12 -> Source || 주석 확인",100,520);  
	
	//https://ko.javascript.info/mouse-drag-and-drop


}

animate();
	
	
window.addEventListener("resize", 
	function(){
	canvas.width = window.innerWidth+300;
	canvas.height = window.innerHeight;
	init();
});