function contextSetup(){
	
	const radius = 30;
	const x = 0;
	const y = 0 + radius;
	
	const density = 10;
	const space = canvas.width/density;
	
	function upperWaterSetup(){
		var upperWaterArr = [];
		this.x = x;
		for(var i=0; this.x < canvas.width;i++, this.x+=space){
			upperWaterArr.push({x: this.x,y: y, radius: radius});
		}
	}	
	console.log("contextSetup Complete!");
	
}

export default contextSetup;