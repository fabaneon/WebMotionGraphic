const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let mouse = {
	x: canvas.width/2,
	y: canvas.height/2,
	click: false,
	drag: false,
	
	sponge: false,
	spongeAlpha: 0,
	spongeStartX: 0,
	spongeStartY: 0,
	spongeEndX: 0,
	spongeEndY: 0
	
	
}

window.addEventListener("mousedown",function(){
	mouse.click = true;
})
window.addEventListener("mouseup",function(){
	mouse.drag = false;
	mouse.click = false;
	
})

window.addEventListener("mousemove", function(){
	mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
    mouse.y = event.clientY - canvas.offsetTop + window.scrollY;
	mouse.spongeStartX = mouse.x-30;
	mouse.spongeStartY = mouse.y-30;
	mouse.spongeEndX = 60;
	mouse.spongeEndY = 60;
	
	if(mouse.click){
		mouse.drag = true;
	}
})


window.addEventListener("resize", function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;	
	contextSetup();
	})




	function createupperWater(x,y,radius,v,t,max,number){
		this.x = x;
		this.y = y;
		this.radius = radius/2;

		this.v = v/2;
		this.t = t;
		this.bottomPoint = this.y + this.radius;
		
		
		this.drop = false;
		
		this.waterradius = 15;
		this.waterX = x;
		this.waterY = (y + radius);
		this.waterAlpha = 0;
		this.waterV = v;
		this.watertop = this.waterY - this.waterradius;
		this.waterbottom = this.waterY + this.waterradius;
		this.waterleft = this.waterX - this.waterradius;
		this.waterright = this.waterX + this.waterradius;
		
		this.number = number;
		
		
		console.log(v);
		
		let setRdadius = radius;
		
		this.draw = function (){
			ctx.fillStyle = "rgba(30,50,90,0.1)"
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
			ctx.fill();

			ctx.fillStyle = "red";
			ctx.beginPath();
			ctx.arc(this.x,this.bottomPoint,4,0,Math.PI*2,false);
			ctx.fill();
		}
		this.waterdrop = function(){
			ctx.fillStyle = "rgba(60,70,250,1)"
			ctx.beginPath()
			ctx.arc(this.waterX,this.waterY,this.waterradius,0,Math.PI*2,false);
			ctx.fill();
			
			
			ctx.fillStyle = "brown";
			ctx.beginPath();
			ctx.arc(this.waterX,this.waterbottom,2,0,Math.PI*2,false);
			ctx.fill();
			
			ctx.fillStyle = "brown";
			ctx.beginPath();
			ctx.arc(this.waterleft,this.waterY,2,0,Math.PI*2,false);
			ctx.fill();
			
			ctx.fillStyle = "brown";
			ctx.beginPath();
			ctx.arc(this.waterright,this.waterY,2,0,Math.PI*2,false);
			ctx.fill();


			ctx.fillStyle = "red";
			ctx.beginPath();
			ctx.arc(this.waterX+this.waterradius/2,this.watertop,2,0,Math.PI*2,false);
			ctx.arc(this.waterX-this.waterradius/2,this.watertop,2,0,Math.PI*2,false);
			ctx.fill();
			
		}

		this.prevpoint = upperWaterArr[number-1];
		this. prev
		
		
		this.waterline = function(){
			ctx.strokeStyle="black";
			ctx.fillStyle = "rgba(60,70,250,1)";
			ctx.beginPath();
			ctx.moveTo(this.x,this.bottomPoint);
			ctx.lineTo(this.waterX+this.waterradius/2,this.watertop);
			ctx.lineTo(this.waterX-this.waterradius/2,this.watertop);
			ctx.fill();
			ctx.stroke();
		}
		
		this.update = function(){
			

			if(number%2 === 0){ 
				if(this.radius > radius){
					this.v = (v+radius/100)*(-1);
					this.drop = true;
					
				}
				else if(this.radius < radius/2){
					this.radius = radius/2;
					this.v = v;
					this.waterY = this.radius + this.y;
				}
						
					this.radius += this.v*5;
				
			}
			
			if(this.waterY > canvas.height || 
			   (	this.waterX > mouse.x-30 - this.waterradius && 
				  this.waterX < mouse.x+30 + this.waterradius&&
				  this.waterY > mouse.y-15 - this.waterradius&&
				  this.waterY < mouse.y+50 + this.waterradius&&
			   	  mouse.sponge
			   )
			  ){
				this.drop = false;
				this.waterV = v;
			}
			
			if(this.drop && number%2 === 0 && number !== 0 & number !== upperWaterArr.length-1){
				this.waterY += this.waterV;
				this.waterV += this.waterV/10;
				
				this.watertop = this.waterY - this.waterradius;
				this.waterbottom = this.waterY + this.waterradius;
				this.waterleft = this.waterX - this.waterradius;
				this.waterright = this.waterX + this.waterradius;
				if(this.waterY < canvas.height/3){
					this.waterline();
				};
				this.waterdrop();
			}
			
			this.bottomPoint = this.y + this.radius;
			this.draw();
			
		}
	}

	console.log("All EventListener Complete!");

	function createfog(x,y,radius,alpha){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.alpha = alpha;
		this.removeV = 0.5;
		this.recreate = 0.001;	
	
		this.draw = function(){
			ctx.fillStyle = "rgba(50,120,200,"+this.alpha+")";
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
			ctx.strokeStyle =  "rgba(50,120,200,"+this.alpha+")";
			ctx.stroke();
			ctx.fill();

			
		}
		
		this.update = function(){
			if(mouse.sponge){
				
				if(this.x > mouse.x-30 - this.radius && 
				  this.x < mouse.x+30 + this.radius&&
				  this.y > mouse.y-15 - this.radius&&
				  this.y < mouse.y+50 + this.radius){
					if(this.alpha <= 0){
						this.alpha = 0;
					}
					else{
						this.alpha -= this.removeV;
					}
				}
				else{
					if(this.alpha >= 0.7){
						this.alpha = 0.7;
					}
					else{
						this.alpha += this.recreate;
					}

				}
			}
			
			else{
					if(this.alpha >= 0.7){
						this.alpha = 0.7;
					}
					else{
						this.alpha += this.recreate;
					}
			}
			this.draw();
		}
		
	}



	console.log("All shapeCreateFunc Complete!");



let blankArr = [];
let upperWaterArr = [];
let fogArr = [];

function contextSetup(){
	
	let y = 0;
	const v = (0.1) * 0.5;
	const max = 40;
	var radius = max;
	
	const density = canvas.width/radius;
	const space = canvas.width/density;

	blankArr = [];
	upperWaterArr = [];
	fogArr = [];

	for(var x=0, i=0; x < canvas.width;i++, x+=space){
		var velocity = v;
		var radiussize = (Math.random()*max)+radius;
		console.log(i);
		upperWaterArr.push(new createupperWater(x ,0 , radiussize, velocity,y,max,i));
	}
	
	for(var x=0; x < canvas.width; x+=space){
		for(y=0; y < canvas.height; y+=space){
			fogArr.push(new createfog(x,y,radius,1))
		}
	}
	

	console.log("BackgroundEntity Complete!");
	
	console.log("All Setup Complete!");
}
contextSetup();
console.log(upperWaterArr);




function Contentsdraw(){
	
		for(var i=0; i < fogArr.length; i++){
			fogArr[i].update();		
		}

//		for(var i=0; i< upperWaterArr.length; i++){
//			upperWaterArr[i].update();
//		}
	
	upperWaterArr.forEach((water,index)=>{		
			water.update();
		})
	
	var prev = upperWaterArr[0];
	var now = null;
	var cpx, cpy = null;	
	
	ctx.fillStyle = "rgba(30,50,90,0.1)";
	ctx.moveTo(0,0);
	ctx.lineTo(prev.x,prev.y+20);
	
		
		
		for(var i=1; i<upperWaterArr.length;i+=2){
			now = upperWaterArr[i];
			

			cpx = (prev.x + now.x) /2;
			cpy = (prev.bottomPoint + now.bottomPoint) /2;
			
			ctx.quadraticCurveTo(cpx,cpy,now.x,now.bottomPoint);
			//ctx.lineTo(now.x,now.bottomPoint);
			prev =  upperWaterArr[i+1];
			
		}
		ctx.lineTo(canvas.width,upperWaterArr[0].bottomPoint);
		ctx.lineTo(canvas.width,0);
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.fill();

	}


function SpongeBox(){
		
		this.draw = function(){
			ctx.fillStyle = "rgba(0,120,50,"+mouse.spongeAlpha+")";
			ctx.beginPath();
			ctx.fillRect(mouse.spongeStartX,mouse.spongeStartY,
						 mouse.spongeEndX,mouse.spongeEndY)
			ctx.fill();

		}
		this.update = function(){
			
			this.x =  mouse.x;
			this.y =  mouse.y;

			if(mouse.click){
				if(mouse.drag){
					mouse.sponge = true;					
				}
				
				if(mouse.spongeAlpha > 1){
					mouse.spongeAlpha = 1;
				}
				else{
					mouse.spongeAlpha += 0.05;
				}	
			}
			else{
				mouse.sponge = false;
				if(mouse.spongeAlpha < 0){
					mouse.spongeAlpha = 0;
				}
				else{
					mouse.spongeAlpha -= 0.05;
				}
			}
			this.draw();
		}
	this.update();
}


function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	ctx.fillStyle = "black"

	ctx.font = "bold 24px Arial";
	ctx.fillText("Step.4 Shape 표현 구체화", 100,120);    

	ctx.font = "bold 12px Arial";
	ctx.fillText("기존 도형에 포인트를 몇개 더 추가하여 모양을 다듬어보자.", 100,200);    
	ctx.fillText("너무 둥글둥글한 원만 있으니 이게 뭔지를 도통 알아보기가 힘들다.", 100,240);    

	ctx.fillText("아직 제작중이지만 모양을 조금 더 추가하는건 생각보다 복잡하다.",100,280);  
	ctx.fillText("더 자연스러운 모션을 가지려면 실시간으로 변하는도형의 버텍스 좌표값을",100,320);  
	ctx.fillText("고려해야하는데 여기서 어떻게 엄청나게 자연스러운 커브를 그릴 수 있을까...",100,360);
	ctx.fillText("우선 이 프로젝트는 잠정 보류. 현재 내 실력이 턱없이 부족하다.",100,380);
	Contentsdraw();
	
	SpongeBox();
	

}

console.log(0%2)
animate();