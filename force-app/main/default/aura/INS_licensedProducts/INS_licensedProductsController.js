({
	onMouseMove : function(component, event) {
        //var cmpTarget = cmp.find('changeIt');
        //$A.util.addClass(cmpTarget, 'changeMe');
	},
    
    doClick : function(component, event, helper) {
        //update this whole function to be a slightly delayed mouseover event. Meaning, onmouseon, delay a second or two then execute the .js code to unhide the cmp
        var collapsed = component.get("v.collapsed");	
        if ( collapsed == true){
            component.set("v.collapsed", false);
        }else{
            component.set("v.collapsed", true);
        };
        
    },
    
  
    
})