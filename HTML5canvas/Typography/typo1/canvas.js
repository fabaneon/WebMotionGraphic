const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');


let mouse = {
    x:null,
    y:null,
    radius:30
    
    
}

var show = null;
var voke = null;
function Text(str,density,stageX,stageY) {
	
	this.fontSize = 600;
	
	this.stageWidth = stageX;
	this.stageHeight = stageY;
    this.density = density;
    
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.cx = 0;
    
		ctx.font = 'bold '+this.fontSize+'px verdun';
		ctx.fillStyle = 'rgba(255,0,0,1)';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'start';
		const fontPos = ctx.measureText(str);
		const fontTop = fontPos.actualBoundingBoxAscent;
		const fontBtm = fontPos.actualBoundingBoxDescent;
		const fontWidth = fontPos.width;
		const fontX = (this.stageWidth - fontWidth)/2;
		const fontY = (this.stageHeight - this.fontSize)/2+fontTop+fontBtm;

        const AdX = fontX;
        const AdY = fontY-fontTop;
		ctx.fillText(str,fontX,fontY);
		const imageData = ctx.getImageData(fontX,
								   fontY-fontTop,
									   fontX+fontWidth,
									   fontY+fontBtm);
    
    
        const particles = [];
        var pixel;
        var i = 0;
        for( var y = 0; y < canvas.width; y += this.density){
            for( var x = 0; x < canvas.height; x+= this.density){
                
                pixel = imageData.data[(y*4* imageData.width) + (x*4) + 3];
                if(pixel > 0){
                    particles.push({
                        x: x + AdX,
                        y: y + AdY
                        
                    })
                }
            }
        }   
    
        const lineDotArr = [];

        for (var i = 0; i < particles.length; i++){
            if(lineDotArr[i] && lineDotArr[i].x2 === particles[i].x){
                console.log('break');
            }
            else if(!lineDotArr[i]){
                lineDotArr[i] = { x1: particles[i].x, y1: particles[i].y};
            }
            for (var a = 0; a < particles.length; a++){
                if(Math.round(particles[a].x) === Math.round(lineDotArr[i].x1)){
                    lineDotArr[i] = { x1: particles[i].x, y1: particles[i].y,
                                    x2: particles[a].x,y2: particles[a].y};
                }   
            }
        }    
        console.log(lineDotArr);
    

	
	this.draw = function() {

		ctx.clearRect(0,0,canvas.width,canvas.height);


        
		ctx.font = 'bold '+this.fontSize+'px verdun';
		ctx.fillStyle = 'rgba(255,0,0,0.3)';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'start';
		ctx.fillText(str,fontX,fontY);

        show = lineDotArr;
        
        ctx.fontWidth = 0.1;
		ctx.strokeStyle = 'rgba(0,100,200,1)';
		
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.arc(fontX,fontY-fontTop,5,0,Math.PI*2,false);
		ctx.stroke()


            for(var i = 0,color = 0; i < lineDotArr.length; i++, color+=(255/lineDotArr.length)){
                    var r = '200';
                    var g = '50';
                    var b = '90';
                    var a = '1';
                    this.x1 = lineDotArr[i].x1;
                    this.y1 = lineDotArr[i].y1;
                    this.x2 = lineDotArr[i].x2;
                    this.y2 = lineDotArr[i].y2;
                    this.cx = this.x1;
                
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba('+color+','+g+','+b+','+a+')';
                    ctx.strokeStyle = 'rgba('+color+','+g+','+b+','+a+')';
                    ctx.arc(lineDotArr[i].x1,lineDotArr[i].y1,1,0,Math.PI*2,false); 
                    ctx.fill();
                    ctx.stroke()
                    ctx.closePath();                

                
                    ctx.beginPath();                
                    ctx.arc(lineDotArr[i].x2,lineDotArr[i].y2,1,0,Math.PI*2,false);
                    ctx.fill();
                    ctx.stroke()
                    ctx.closePath();                

            //         ctx.beginPath();
            //         ctx.moveTo(this.x1,this.y1);
            //         ctx.quadraticCurveTo(this.cx,this.y2,this.x2,this.y2);
            //         ctx.fill();
            //         ctx.stroke()
            //         ctx.closePath();                
                    

                
            }

		
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.arc(fontX,fontY,5,0,Math.PI*2,false);
		ctx.stroke()

        ctx.beginPath();
		ctx.strokeStyle = 'blue';
		ctx.arc(fontX,fontY+fontBtm,5,0,Math.PI*2,false);
		ctx.stroke()

    }
        
}

const drawing = new Text('M',10,
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
            mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
            mouse.y = event.clientY - canvas.offsetTop + window.scrollY;
            //console.log(show);
            //console.log(mouse.x +' / '+ mouse.y)
})