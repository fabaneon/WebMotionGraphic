const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

var show = null;
var voke = null;
function Text(str,density,stageX,stageY) {
	
	this.fontWidth = 200;
	this.fontSize = 300;
	
	this.stageWidth = stageX;
	this.stageHeight = stageY;
    this.density = density;
	this.dotPos = function(fontX,fontY,fontTop,fontBtm,fontWidth){
            
			const imageData = ctx.getImageData(fontX,
								   fontY-fontTop,
									   fontWidth,
									   fontTop+fontBtm).data;
        voke = imageData;

        
        
        
        const particles = [];
        var pixel;
        var i = 0;
        for( var y = fontY-fontTop; y < fontY+fontBtm; y += this.density){
            for( var x = fontX; x < fontX+fontWidth; x+= this.density){
                i += 4;
                pixel = imageData[(x+y)*4];
                
               //console.log(pixel);
                if((pixel === 255)&&
                  x > fontX && x < fontX+fontWidth &&
                  y > fontY-fontTop && y < fontY-fontBtm){
                    particles.push({
                        x: x,
                        y: y
                        
                    })
                }
            }
        }   
        
        
//         let width = 0;
//         let i = 0;
//         let pixel;
        
        
//         for(let height = fontY-fontTop; height < fontY+fontBtm; height += density){
//             ++i;
//             const slide = (i%2) == 0;
//             width = fontX;
//             if(slide ==1){
//                 width +=6;
//             }
            
//             for(width; width < fontX+fontWidth; width+= density){
//                 pixel = imageData[(width + (height * fontX+fontWidth) *4)-1];
//                 if((pixel === 255) &&
//                   width > fontX &&
//                   width < fontX+fontWidth &&
//                   height > fontY-fontTop &&
//                   height < fontY+fontBtm){
//                     particles.push({
//                         x: width,
//                         y: height
                        
//                     })
//                 }
                    
                
//             }
            
            
            
//         }
        
        return particles;
        
		
	}
	
	this.draw = function() {

		ctx.clearRect(0,0,canvas.width,canvas.height);


        
		ctx.font = 'bold '+this.fontSize+'px aria';
		ctx.fillStyle = 'red';
		const fontPos = ctx.measureText(str);
		const fontTop = fontPos.actualBoundingBoxAscent;
		const fontBtm = fontPos.actualBoundingBoxDescent;
		const fontWidth = fontPos.width;
		const fontX = (this.stageWidth - fontPos.width)/2;
		const fontY = (this.stageHeight - this.fontSize)/2+fontTop+fontBtm;

        ctx.textBaseline = 'middle';
        ctx.textAlign = 'start';
		ctx.fillText(str,(this.stageWidth - fontPos.width) /2, 
                     fontPos.actualBoundingBoxAscent + 
                    fontPos.actualBoundingBoxDescent +
                    ((this.stageHeight - this.fontSize) /2));

        
        //ctx.fillRect(200,200,350,350);
        var dotPoint = this.dotPos(fontX,fontY,fontTop,fontBtm,fontWidth);
        show = fontTop;
        
        // ctx.fontWidth = 0.1;
		// ctx.strokeStyle = 'rgba(0,100,200,1)';

		// for (var i = fontX; i < fontX+fontWidth; i+=density){
		// ctx.beginPath();
		// ctx.arc(i,fontY-fontTop,5,0,Math.PI*2,false);
		// ctx.arc(i,fontY+fontBtm,5,0,Math.PI*2,false);
		// ctx.stroke();
		// }
		
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.arc(fontX,fontY-fontTop,5,0,Math.PI*2,false);
		ctx.stroke()
            for(var i = 0; i < dotPoint.length; i++){
                    var r = '200';
                    var g = '200';
                    var b = '200';
                    var a = '1';

                    
                
                    ctx.beginPath();
                    ctx.fillStyle = 'blue';
                    ctx.strokeStyle = 'rgba('+r+','+g+','+b+','+a+')';
                    ctx.arc(dotPoint[i].x,dotPoint[i].y,2,0,Math.PI*2,false);
                    ctx.fill();
                    ctx.stroke()
            }

		
		// ctx.beginPath();
		// ctx.strokeStyle = 'pink';
		// ctx.arc(fontX,fontY+fontBtm,5,0,Math.PI*2,false);
		// ctx.stroke()
	}
}

const drawing = new Text('M',2,
                        document.body.clientWidth,
                        document.body.clientHeight);

function draw(){
	requestAnimationFrame(draw);
	
	drawing.draw();
}
draw();
window.addEventListener('mousemove',
                       function(event){
            event.preventDefault();
            console.log(show);
            console.log(voke);

})