({
	nextDiv : function(component, event, helper) {
        var id = event.currentTarget.getAttribute("data-id");
        console.log("id--"+id);
        
        if(id == 1) {
            var curr = component.find("2");
            var prev = component.find("1");
            $A.util.addClass(curr, 'showDiv');
            $A.util.removeClass(curr, 'hideDiv');
            $A.util.addClass(prev, 'hideDiv');
            $A.util.removeClass(prev, 'showDiv');
        }
        else if(id == 2) {
            var curr = component.find("3");
            var prev = component.find("2");
            $A.util.addClass(curr, 'showDiv');
            $A.util.removeClass(curr, 'hideDiv');
            $A.util.addClass(prev, 'hideDiv');
            $A.util.removeClass(prev, 'showDiv');
        }
            else if(id == 3) {
                var curr = component.find("1");
                var prev = component.find("3");
                $A.util.addClass(curr, 'showDiv');
                $A.util.removeClass(curr, 'hideDiv');
                $A.util.addClass(prev, 'hideDiv');
                $A.util.removeClass(prev, 'showDiv');
            }  
                else if(id == 4){
                    var curr = component.find("5");
                    var prev = component.find("4");
                    $A.util.addClass(curr, 'showDiv');
                    $A.util.removeClass(curr, 'hideDiv');
                    $A.util.addClass(prev, 'hideDiv');
                    $A.util.removeClass(prev, 'showDiv');
                }
    }
})