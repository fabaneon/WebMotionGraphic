const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const viewXCenter = canvas.width/7
const viewYCenter = canvas.height/5*0.8
function Text(str,x,y,density) {
	
	this.fontWidth = canvas.width/2;
	this.fontSize = 400;
	
	this.stageWidth = canvas.width;
	this.stageHeight = canvas.height;
	this.dotPos = function(fontX,fontY,fontTop,fontBtm,fontWidth){
			const imageData = ctx.getImageData(fontX,
								   fontY-fontTop,
									   fontX+fontWidth,
									   fontY+fontBtm).data;
		const particles = [];
		let i =0;
		let width = 0;
		let pixel;
		for(let height = 0; height < this.stageHeight; height += density){
			++i;
			const slide = (i%2) ==0;
			width = 0;
			if(slide == 1){
				width +=6;
			}
			for(width; width < this.stageWidth; width+= density){
				pixel = imageData[((width +(height * this.stageWidth))*4)-1];
				if(pixel !=0 && width > 0 && width < this.stageWidth && height > 0  && height< this.stageHeight){
					particles.push({
						x: width,
						y: height,
					});
				}
			}
		}
		return particles;
	}
	
	this.draw = function() {

		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		ctx.font = 'bold '+this.fontSize+'px aria';
		ctx.fillStyle = 'rgba(0,0,0,0.3)';
		ctx.textBaseline = 'middle';
		const fontPos = ctx.measureText(str);
		const fontTop = fontPos.actualBoundingBoxAscent;
		const fontBtm = fontPos.actualBoundingBoxDescent;
		const fontWidth = fontPos.width;
		const fontX = (this.stageWidth - fontPos.width)/2;
		const fontY = (this.stageHeight - this.fontSize)/2+fontTop+fontBtm;
		ctx.textAlign = 'start';
		ctx.fillText(str,fontX, fontY);

		var dotPoint = this.dotPos(fontX,fontY,fontTop,fontBtm,fontWidth);
		// ctx.fontWidth = 0.1;
		// ctx.strokeStyle = 'rgba(0,100,200,1)';

		// for (var i = fontX; i < fontX+fontWidth; i+=density){
		// ctx.beginPath();
		// ctx.arc(i,fontY-fontTop,5,0,Math.PI*2,false);
		// ctx.arc(i,fontY+fontBtm,5,0,Math.PI*2,false);
		// ctx.stroke();
		// }
		
		// ctx.beginPath();
		// ctx.strokeStyle = 'black';
		// ctx.arc(fontX,fontY-fontTop,5,0,Math.PI*2,false);
		// ctx.stroke()

		for(var check = 0; check < dotPoint.length; check++){
				var dotX = dotPoint[check].x;
				var dotY = dotPoint[check].y;
				
				ctx.beginPath();
				ctx.strokeStyle = 'red';
				ctx.arc(dotX,dotY,5,0,Math.PI*2,false);
				ctx.stroke()
		}

		
		// ctx.beginPath();
		// ctx.strokeStyle = 'pink';
		// ctx.arc(fontX,fontY+fontBtm,5,0,Math.PI*2,false);
		// ctx.stroke()
	}
}

const drawing = new Text('g',viewXCenter,viewYCenter,50);

function draw(){
	requestAnimationFrame(draw);
	
	drawing.draw();
}
draw();