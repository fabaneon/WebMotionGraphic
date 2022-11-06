
const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height/2;

let t = y;

function dotcreate(x,y,vx,vy,t,radius,height){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.t = t;
	this.height = height;
	this.radius = radius;

	this.draw = function(){
		
		ctx.beginPath();
		ctx.arc(this.x,
				this.y+Math.sin(this.t)*this.height*canvas.height/10,
				this.radius,0,Math.PI*2,false);
		ctx.fillStyle = "pink";
		ctx.fill();	
		ctx.strokeStyle = "black";
		ctx.stroke();
		console.log(this.x +" / "+ this.y);

	}
	this.update = function(){
		this.x += canvas.width/50*10*this.vx;
		this.t += this.vy;
		
		
		
		if(this.x < 0 || this.x > canvas.width){
			this.vx = this.vx * (-1);
		}
		if(this.x > canvas.width){
			this.x = canvas.width;
			console.log("over");
		}
		else if(this.x < 0){
			this.x = 0;
			console.log("down");
		}
		this.draw();
	}
	
}


var dot = new dotcreate(0,y,0.05,0.05,y,6,0.6);
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.beginPath();
	ctx.arc(x+ 100,
            y+Math.sin(t)*0.5*canvas.height/100,
		   5,
		   0,
		   Math.PI*2,
		   false);
	t += 0.05;
	
	ctx.storkeStyle = "red";
	ctx.stroke();
	t += 0.05;

	dot.update();
	
	
	ctx.textAlign="center";
	ctx.fillStyle = "red";
	ctx.font = "italic bold 24px Arial";
	ctx.fillText("자세한건 F12 SOURCE에서 canvas.js 확인.", canvas.width/2,canvas.height/3);
}
animate();