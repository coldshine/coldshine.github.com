var draw = {}
draw.doubleArc = function(arParams) {

	var frame = timeline.getFrameData(arParams);					
	if(!frame) return;

	if(timeline.debug) 
		dbg.draw({"frame": frame});
					
	var angle = {};
	angle.start = arParams.angle.start; //starting angle
	angle.end = arParams.angle.end - arParams.angle.start > 0 ? arParams.angle.end : arParams.angle.end + 360; //if final angle less then start angle
	angle.diff = angle.end - angle.start; //angles difference
	angle.perFrame = angle.diff/frame.diff; //how much angles we should add per frame
	
	if(timeline.debug) 
		dbg.draw({"angle": angle});
	
	//if is first frame
	if(frame.current.local==0)
		angle.current = angle.start + frame.current.local;
	else		
		angle.current = angle.start + angle.perFrame * frame.current.local;        

		
	//if over last frame
	if(angle.current > angle.end){ 
		angle.current = angle.end;
	}
	
	if(typeof(point)!="object"){
		arParams.point = {x:timeline.center_point.x, y:timeline.center_point.y}
	}
		
	//Draw first arc
	ctx.beginPath();  
	ctx.arc(arParams.point.x,arParams.point.y, arParams.radius,(Math.PI/180)*angle.start, (Math.PI/180)*angle.current, false); 
	ctx.stroke();  	
	
	//Draw second arc
	ctx.beginPath();  
	ctx.arc(arParams.point.x,arParams.point.y, arParams.radius-3,(Math.PI/180)*angle.start, (Math.PI/180)*angle.current, false); 
	ctx.stroke();

}		

draw.text = function(arParams){
	
	var frame = timeline.getFrameData(arParams);							
	if(!frame) return;

	ctx.save();
	if(typeof(arParams.rotate)=="number")
		ctx.rotate(deg2rad(arParams.rotate));
	ctx.fillStyle = "0,0,0,0.5";  
	ctx.fillText(arParams.text, arParams.point.x, arParams.point.y);
	ctx.restore();

}

draw.moveCenterPointX = function(arParams){
	var frame = timeline.getFrameData(arParams);							
	if(!frame) return;

	var point = {};
	point.start = 175;
	point.end = arParams.point.x;
	point.diff = point.end - point.start; //points difference
	point.perFrame = point.diff/frame.diff; //how much points we should add per frame
	
	if(timeline.debug)
		dbg.draw({"point":point});

	//if is first frame
	if(frame.current.local==0)
		point.current = point.start + frame.current.local;
	else		
		point.current = point.start + point.perFrame * frame.current.local;        	
	
	//if over last frame
	if(point.current > arParams.point.x){ 
		point.current = arParams.point.x;
	}

	timeline.center_point = {x:point.current ,y:timeline.center_point.y};
}
