var dbg = {};		


//there will be stored draw method's counters, settings etc
dbg.draw_helper = {
	default_x_pos: 10, 		//position of first debug message (if not set)
	default_y_pos: 300,		//position of first debug message (if not set) 
	call_counter: 0,		//how much draw method is called
	mess_y_offset: 15,		//Y-offset between debug messages
	prev_frame: 0,			//previous frame
	current_frame: 0
};

//draw updated data in canvas data.draw(data, x, y)
//@param string|object - data - object or text to draw
//@param int - x,y - coord where text or object will be placed inside the canvas
dbg.draw = function(data, x, y){
	if(typeof(data)=="undefined" || !data) return;
	
	this.current_frame = timeline.currentFrame;
	
	//auto coords setting
	if(typeof(x)!="number" || typeof(y)!="number"){
		x = this.draw_helper.default_x_pos; 
		if(this.isFrameChanged()) 	//if new frame - start print from beginning Y-position
			y = this.draw_helper.default_y_pos;
		else 						//increment Y-position
			y = this.draw_helper.default_y_pos +  (this.draw_helper.mess_y_offset * this.draw_helper.call_counter);
			
		this.draw_helper.call_counter++;
	}
	
	ctx.save();
	ctx.fillStyle = "0,0,0,0.5";  
	switch(typeof(data)){		
		case "string":
			ctx.fillText(data, x+1, y+1);
			break;
		
		case "object":
			var str = obj2str(data);                    
			ctx.fillText(str, x+1, y+1);
			break;
	}
	ctx.restore();
}

//checks is frame are changed
dbg.isFrameChanged = function(){
	if(this.current_frame!=this.prev_frame){
		this.prev_frame = this.current_frame;
		this.draw_helper.call_counter = 0;
		return true;
	}
	return false;
}