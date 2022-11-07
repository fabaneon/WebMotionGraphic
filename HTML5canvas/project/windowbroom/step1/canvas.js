const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

window.addEventListener("resize", function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;	
	contextSetup();
	})


	function createupperWater(x,y,radius,v,t,max,plus){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.v = v;
		this.t = t;
		
		console.log(v);
		
		let setRdadius = radius;
		
		this.draw = function (){
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
			ctx.strokeStyle = "rbga(30,50,90,1)"
			ctx.stroke();
		}
		
		this.update = function(){

			if(this.radius < max || this.radius > max+plus){
				this.v = this.v * (-1);
			}
			this.radius += this.v;
			console.log(this.radius + "/"+ this.v+ "/" + max + "/" + plus);	
			setRadius = this.radius+Math.sin(this.t)*radius;
					
			this.draw();
			
		}
	}
	console.log("All shapeCreateFunc Complete!");

const blankArr = [];

let upperWaterArr = blankArr;

function contextSetup(){
	
	const x = 0;
	const y = 0 ;
	const v = (0.1) * 0.5;
	const max = 5;
	var radius = 30;

	
	const density = 20;
	const space = canvas.width/density;


	upperWaterArr = blankArr;
	
	function upperWaterSetup(){
		this.x = x;
		for(var i=0; x < canvas.width; i++, this.x+=space){
				var velocity = v;
			var radiussize = Math.round((Math.random()*max)+radius);

			if(radius < max){
				velocity *= (-1);
			}
			upperWaterArr.push(new createupperWater(this.x ,y , radiussize, velocity,y,radius,max));
		}
	}	
	upperWaterSetup();
	console.log("contextSetup Complete!");
	
	
	console.log("All Setup Complete!");
}
contextSetup();

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	upperWaterArr.forEach((water,index)=>{
		water.update();
	})
	
	
	
}
animate();