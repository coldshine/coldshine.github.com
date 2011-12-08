var tools = {}

//converting degrees to radians
function deg2rad(number) {
    return number * Math.PI / 180;
};

//converting associative array to string
function obj2str(data, class_name, str){
	
	if(typeof(str)=="undefined"){
		str = "";
	}
	
	if(typeof(class_name)=="undefined"){
		class_name = "";
	}
	
	for(key in data){
		if(typeof(data[key])=="object"){
			str += obj2str(data[key], class_name+key+".", str);
		}
		else{
			str += class_name+key+" = "+data[key]+"; ";
		}
	}   
	
	return str;
}                    
