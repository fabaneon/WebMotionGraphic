const canvas = document.getElementById('canvas');

canvas.width = 800;
canvas.height = 800;

const ctx = canvas.getContext('2d');


var wave = [];

var x = 0;
var y = canvas.height/2;
var radius = 20;

const space = canvas.width/radius;

for(var i = 0; x < canvas.width; i++,x+=space){
	wave.push({ x:x, y:y, t:y+i});
	//x+=radius;
}

var prev = wave[0];
var now = null;

console.log(wave);

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	
	
	
	ctx.beginPath();
	ctx.moveTo(0,canvas.height/2);
	
	for(var g=1; g<wave.length;g++){
		
		now = wave[g];
		
		cx = (now.x + prev.x)/2;
		cy = (now.y + prev.y)/2;
		ct = (now.t + prev.t)/2;
		if(g === 1){
			cx = (now.x-prev.t)/2;
			
		}
		
		if(g === wave.length-1){
			ctx.quadraticCurveTo(now.x,now.y,canvas.width,canvas.height/2);	
		}
		else{
		
		ctx.quadraticCurveTo(cx,
							 cy+Math.sin(ct)*canvas.height/10,
							 
							 now.x,
							 
							 now.y+Math.sin(now.t)*canvas.height/10);
		}
		now.t += 0.05;
		if(g === 1){
			wave[0].t+=0.05;
			
		}
		prev = now;
	}
	
	
	ctx.strokeStyle = 'red';
	ctx.stroke();
	
}
animate();