var canvas = document.querySelector("canvas");

	canvas.width= window.innerWidth;
	canvas.height = window.innerHeight;

let mouse = {
	x: undefined,
	y: undefined,
	clicked: false,
	startx: undefined,
	starty: undefined,
	prevx: undefined,
	prevy: undefined,
	
	down: function(event) {
	event.preventDefault();
	mouse.clicked = true;
	
	mouse.startx = event.clientX - canvas.offsetLeft + window.scrollX;	
	mouse.starty = event.clientX - canvas.offsetLeft + window.scrollX;	
	mouse.prevx = 0;
	mouse.prevy = 0;
		
	console.log("mouse clicked  " + mouse.clicked);
	},
	
	up: function(event) {
	event.preventDefault();
	mouse.prevx = 0;
	mouse.prevy = 0;
	mouse.clicked = false;
	console.log("mouse clicked  " + mouse.clicked);
	}
}

canvas.onmousedown = mouse.down;
canvas.onmouseup = mouse.up;

window.addEventListener("mousemove",
    function(event){
				console.log(mouse.prevx +" / "+ mouse.prevy);
        mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
        mouse.y = event.clientY - canvas.offsetTop + window.scrollY;
		if(mouse.clicked){
			mouse.prevx = mouse.x - mouse.startx;
			mouse.prevy = mouse.y - mouse.starty;
			mouse.startx = mouse.x;
			mouse.starty = mouse.y;


			// console.log(mouse.startx + " / " + mouse.x);
		}
        // console.log(mouse.x +" / "+mouse.y);
    }
)

var ctx = canvas.getContext('2d');

function point(x,y) {
	this.x = x;
	this.y = y;
}

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
			console.log("mouse in "+r+"");
			if(mouse.clicked){
				console.log(mouse.prevx +" / "+ mouse.prevy);
				this.x += mouse.prevx;
				this.y += mouse.prevy;
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
	ctx.fillText("복습", 100,120);    

	ctx.font = "bold 12px Arial";
	ctx.fillText("시발 다 까먹은게 좆같네", 100,200);    

	ctx.fillText("자세한것은 F12 -> Source || 주석 확인",100,240);  
}

animate();
	
	
window.addEventListener("resize", 
	function(){
	canvas.width = window.innerWidth+300;
	canvas.height = window.innerHeight;
	init();
});