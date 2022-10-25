var canvas = document.querySelector("#canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth -30;

var ctx = canvas.getContext("2d");

addEventListener("resize", function(){
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	
	init();
})

function Circle(x,y,radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
	
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = "rgba(255,255,255,1)";
		ctx.stroke();
	}	
	this.update = function(){
		this.draw();
	}
}

let circleArr = [];

for(var i=0; i < 10; i++){
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	var radius = Math.floor(Math.random() * 30);
	
	circleArr.push(new Circle(x,y,radius));
}

function init(){
circleArr = [];

for(var i=0; i < 10; i++){
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	var radius = Math.floor(Math.random() * 30);
	
	circleArr.push(new Circle(x,y,radius));
}
	
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	circleArr.forEach((circle,index)=>{
		circle.update();
	})
}
