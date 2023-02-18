const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const viewXCenter = canvas.width/7
const viewYCenter = canvas.height/5*0.8
function Text(str,x,y,density) {
	
	this.fontWidth = canvas.width/2;
	this.fontSize = this.fontWidth*1.2;
	
	this.stageWidth = canvas.width/2;
	this.stageHeight = canvas.height/2;

	
	this.draw = function() {

		ctx.clearRect(x,y,canvas.width,canvas.height);
		
		ctx.font = 'bold '+100+'px aria';
		ctx.fillStyle = 'rgba(0,0,0,0.3)';
		ctx.textBaseline = 'middle';
		const fontPos = ctx.measureText(str);
		ctx.fillText(str,this.stageWidth,this.stageHeight);
		const fontTop = fontPos.actualBoundingBoxAscent;
		const fontBtm = fontPos.actualBoundingBoxDescent;
		const fontSize = fontPos.width;
		//ctx.textAlign = 'center';
		for (var i = this.stageWidth; i < this.stageWidth+fontSize; i+=15){
			ctx.fontWidth = 0.1;
			ctx.moveTo(i,this.stageHeight);
			ctx.lineTo(i,this.stageHeight+this.fontSize);
			ctx.strokeStyle = 'rgba(0,100,200,0.01)';
			ctx.stroke();
			//console.log(i);
		}
			
	}
}

const drawing = new Text('F',viewXCenter,viewYCenter,50);

function draw(){
	requestAnimationFrame(draw);
	
	drawing.draw();
}
draw();