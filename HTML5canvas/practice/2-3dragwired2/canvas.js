const canvas = document.querySelector("canvas");
	canvas.width= window.innerWidth;
	canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let mouse = {
	
	x: null,
	y: null,
	drag: false,
	
	up: function(event){
		event.preventDefault();
		mouse.drag = false;
		console.log('mouse is not drag');
	},
	
	down: function(event){
		event.preventDefault();
		mouse.drag = true;
		console.log('mouse is drag');
	}	
};


canvas.onmousedown = mouse.down;
canvas.onmouseup = mouse.up;

window.addEventListener("mousemove", 
		function(event){
			mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
			mouse.y = event.clientY - canvas.offsetTop + window.scrollY;
			
			//console.log(mouse.x +" / " + mouse.y + ' / ' + mouse.drag);
		})


function Createbox(x,y,size,vx,vy){
	this.x = x;
	this.y = y;
	this.size = size;
	this.vx = vx;
	this.vy = vy;
	this.cx = x;
	this.cy = y;
	this.select = false;
	
	this.xp = 0;
	this.yp = 0;
	
	this.draw = function(){
		ctx.beginPath();
		
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x+this.size,this.y);
		ctx.lineTo(this.x+this.size,this.y+this.size);
		ctx.lineTo(this.x,this.y+this.size);
		ctx.lineTo(this.x,this.y);
		

		
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = 'rgba(255,0,50,1)';
		ctx.stroke();
	}
	
	this.linedraw = function(){
		
		ctx.beginPath();
		ctx.moveTo(this.xp,this.yp);
		ctx.lineTo(mouse.x,mouse.y);
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.stroke();	
		
	}
	
	this.update = function(){		
		if( this.x+this.size > mouse.x && this.x < mouse.x &&
		  	this.y + this.size > mouse.y && this.y < mouse.y){
			if(mouse.drag){
				this.select = true;

			}
			else{
				this.cx = mouse.x - this.x;
				this.cy = mouse.y - this.y;
				
			}
			
		}
		if(!mouse.drag){
			this.select = false;
		}
		if(this.select){
			this.xp = this.x + this.cx;
			this.yp = this.y + this.cy;
			var disX = Math.abs(mouse.x - this.xp);
			var disY = Math.abs(mouse.x - this.yp);
			
			if(disX > 30 || disY > 30){
				this.vy = 0.05;
				this.x += (mouse.x-this.x)*0.05;
				this.xp += (mouse.x-this.x)*0.05;				
				this.y += (mouse.y-this.y)*0.05;
				this.yp += (mouse.y-this.y)*0.05;

			}
			console.log(disX +"/"+ disY);			
			this.linedraw();
		}
		if(this.y+size > canvas.height){
			this.y = canvas.height-size;	
		}
		else{
			this.y += this.vy;
			this.vy += this.vy/10;
		}
		
		
		this.draw();
		//console.log(this.xp +' / '+ this.x);

	}
}

let boxArr = [];

function init(){
	boxArr = [];
	let x = 0;
	let y = x;
	const size = 50;
	const vx = 0.05;
	const vy = vx;
	
	for (var i=0; i < 1; i++){
		x = Math.floor(Math.random() * (window.innerWidth - size*2));
		y = Math.floor(Math.random() * (window.innerHeight - size*2));
		
		boxArr.push(new Createbox(x,y,size,vx,vy));
	}
	console.log(boxArr);
	console.log(canvas.width);
}
init();




function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	

	boxArr.forEach((box,index)=>{
		box.update();
	})
	
	
};

animate();
window.addEventListener('resize',function(){
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
	
})