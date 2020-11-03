({
		handleClick : function (cmp, event, helper) {
			alert("You clicked: " + event.getSource().get("v.label"));
			helper.handleClick(cmp,event,helper);
		},

		doInit: function (cmp, event, helper){
			helper.handleSA(cmp,event,helper);
		}
	
})