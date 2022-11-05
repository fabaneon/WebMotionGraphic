
const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height/2;

let t = y;

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
	ctx.arc(x,
            y+1+Math.sin(t)*0.5*canvas.height/100,
		   5,
		   0,
		   Math.PI*2,
		   false);
	t += 0.05;
	ctx.arc(x-100,
            y+Math.sin(t)*0.5*canvas.height/100,
		   5,
		   0,
		   Math.PI*2,
		   false);

	ctx.storkeStyle = "red";
	ctx.stroke();
	t += 0.05;
	console.log(y);
	
	ctx.textAlign="center";
	ctx.fillStyle = "red";
	ctx.font = "italic bold 24px Arial";
	ctx.fillText("자세한건 F12 SOURCE에서 canvas.js 확인.", canvas.width/2,canvas.height/3);
}
animate();