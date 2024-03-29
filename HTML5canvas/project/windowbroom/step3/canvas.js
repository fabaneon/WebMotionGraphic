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




	function createupperWater(x,y,radius,v,t,max,i){
		this.x = x;
		this.y = y;
		this.radius = radius/2;
		this.v = v/2;
		this.t = t;
		
		
		this.drop = false;
		
		this.waterradius = 10;
		this.waterX = x;
		this.waterY = (y + radius);
		this.waterAlpha = 0;
		this.waterV = v;
		
		console.log(v);
		
		let setRdadius = radius;
		
		this.draw = function (){
			ctx.fillStyle = "rgba(20,0,200,1)"
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
			ctx.fill();
			
		}
		this.waterdrop = function(){
			ctx.fillStyle = "rgba(60,70,250,1)"
			ctx.beginPath()
			ctx.arc(this.waterX,this.waterY,this.waterradius,0,Math.PI*2,false);
			ctx.fill();
			
		}
		
		this.update = function(){
			if(this.radius > radius){
				this.v = (v+radius/100)*(-1);
				this.drop = true;
			}
			else if(this.radius < radius/2){
				this.radius = radius/2;
				this.v = v;
			}
			
			this.radius += this.v*5;

			if(this.waterY > canvas.height || 
			   (	this.waterX > mouse.x-30 - this.waterradius && 
				  this.waterX < mouse.x+30 + this.waterradius&&
				  this.waterY > mouse.y-15 - this.waterradius&&
				  this.waterY < mouse.y+50 + this.waterradius&&
			   	  mouse.sponge
			   )
			  ){
				this.drop = false;
				this.waterY = y + radius;
				this.waterV = v;
			}
			
			if(this.drop){
				this.waterY += this.waterV;
				this.waterV += this.waterV/10;
				this.waterdrop();
			}
			
			
			
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
	const max = 20;
	var radius = max;
	
	const density = canvas.width/radius;
	const space = canvas.width/density;

	blankArr = [];
	upperWaterArr = [];
	fogArr = [];

	for(var x=0, i=0; x < canvas.width;i++, x+=space){
		var velocity = v;
		var radiussize = (Math.random()*max)+radius;
	
		upperWaterArr.push(new createupperWater(x ,0 , radiussize, velocity,y,radius,max,i));
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
	upperWaterArr.forEach((water,index)=>{
		water.update();
	})
		
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
	ctx.fillText("Step.3 사실적인 물표현", 100,120);    

	ctx.font = "bold 12px Arial";
	ctx.fillText("이번엔 MetaBall 효과를 구현해볼것이다.", 100,200);    
	ctx.fillText("액체끼리 맞붙었을때 끈적한듯 점성이 있는 모습을 표현하는 기법이다..", 100,240);    

	ctx.fillText("결론부터 말하자면 반은 접목 불가, 반은 가능이다.",100,280);  
	ctx.fillText("애초에 메타볼 기법은 현재 Shape들을 구현하는 방식과 완전히 다른 방법으로 구현된다.",100,320);  
	ctx.fillText("따라서 waterdrop만 메타볼 기법을 적용하여 구현해보려 하는데",100,360);
	ctx.fillText("하지만 이럴경우 창문에 끼는 서리 역시 생성 방식을 바꿔야함으로 메타볼 기법은 Step 5. 로 미루겠다.",100,380);  
	ctx.fillText("자세한건 메타볼 기법 연습 카테고리에서 확인, 이 단계는 WebGL 학습 이후 다뤄야겠다.",100,400); 
	
	Contentsdraw();
	
	SpongeBox();
	

}
animate();