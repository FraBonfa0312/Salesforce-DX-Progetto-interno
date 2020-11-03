({
	doInit : function(component, event, helper) {
        var percentage = component.get("v.percentage");
        if (percentage > 75){
            component.set("v.color", "#44c173");
       	}else if(percentage <= 75 && percentage > 50){
            component.set("v.color", "#21A0Df");
        }else if(percentage <= 50 && percentage > 25){
            component.set("v.color", "#FAD201");
        }else if(percentage <= 25){
            component.set("v.color", "#FF1A1A");
        }
	}
})