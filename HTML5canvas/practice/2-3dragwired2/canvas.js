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


function Createbox(x,y,size,vx,vy,r,g,b){
	this.x = x;
	this.y = y;
	this.size = size;
	this.vx = vx;
	this.vy = vy;
	this.cx = this.x - this.x;
	this.cy = this.y - this.y;
	this.select = false;
	
	this.xp = mouse.x;
	this.yp = mouse.y;
	
	this.draw = function(){
		ctx.beginPath();
		
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x+this.size,this.y);
		ctx.lineTo(this.x+this.size,this.y+this.size);
		ctx.lineTo(this.x,this.y+this.size);
		ctx.lineTo(this.x,this.y);
		

		ctx.fillStyle = 'rgba('+r+','+g+','+b+',0.6)';
		ctx.fill();
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = 'rgba(255,255,255,1)';
		ctx.stroke();
	}
	
	this.linedraw = function(){
		
		ctx.beginPath();
		ctx.moveTo(this.xp,this.yp);
		ctx.lineTo(mouse.x,mouse.y);
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'rgba('+255+','+g+','+r+',1)';
		ctx.stroke();	
		
	}
	
	this.update = function(){		
		
		if( this.x+this.size-5 > mouse.x && this.x+5 < mouse.x &&
		  	this.y + this.size-5 > mouse.y && this.y+5 < mouse.y ){
			if(!mouse.drag){
				this.cx = mouse.x - this.x;
				this.cy = mouse.y - this.y;
			}
			else{
				this.select = true;				
			}
			
		}
		if(!mouse.drag){
			this.select = false;
		}
		if(this.select){
			this.xp = this.x + this.cx;
			this.yp = this.y + this.cy;
//			console.log(Math.round(this.x) + " / " + Math.round(this.y) + " / ")
//			console.log(Math.round(this.xp) + " / " + Math.round(mouse.x) + "\n" 
//						+ (disY) + " / " + Math.round(mouse.y));	

			var disX = mouse.x;
			var disY = (-1)*(mouse.y - this.yp);

			this.x += (mouse.x-this.xp)*0.05;
			this.xp += (mouse.x-this.xp)*0.05;				

			
			if(disY > 200){
				this.vy = 0.05;
				this.y += (mouse.y-this.y)*0.05;
				this.yp += (mouse.y-this.y)*0.05;
			}
			else if(disY < 0){
				this.y += (mouse.y-this.y)*0.05;
				this.yp += (mouse.y-this.y)*0.05;
				
			}
			else{
				this.y -= 0.05;
				this.yp -= 0.05;

			}
			this.linedraw();
			console.log(disY);
		}

		// if(this.y+size > canvas.height){
		// 	this.vy = 0.05;
		// 	this.y = canvas.height-size;	
		// }
		// else{
		// 	this.y += this.vy;
		// 	this.vy += this.vy/10;
		// }
		
		
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
	
	for (var i=0; i < 10; i++){
		
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		
		x = Math.floor(Math.random() * (window.innerWidth - size*2));
		y = Math.floor(Math.random() * (window.innerHeight - size*2));
		
		boxArr.push(new Createbox(x,y,size,vx,vy,r,g,b));
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
	
	ctx.fillStyle = "skyblue"

	ctx.font = "bold 24px Arial";
	ctx.fillText("드래그 와이어2", 100,120);    

	ctx.font = "bold 12px Arial";
	ctx.fillText("목표는 이전 실습물과 동일.", 100,200);    
	ctx.fillText("커서로 상자마다 줄을 연결하여 드래그로 끌고다니는 형식이다", 100,240);    

	ctx.fillText("일단 와이어 생성 및 끌고다니기 까진 완료되었다.",100,280);  
	ctx.fillText("다만, 예전에 배웠던 중력계수를 넣지는 않아서 조금 부자연스럽다.",100,320);  
	ctx.fillText("임의의 gravity 변수를 만들고 disY의 길이가 충족되지 못했을땐 gravity를 증가시키고",100,360);
	ctx.fillText("disY의 길이가 충족되었을땐 gravity를 증가시키지 않는다.",100,380);
	ctx.fillText("여기서 이 gravity 변수에 / (mouse.y - yp) 한 값으로 ... 일단 그렇다.",100,400); 
	ctx.fillText("현재 작업중. 머리 아프넹",100,420); 

	
	
};

animate();
window.addEventListener('resize',function(){
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
	
})