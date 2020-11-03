({
	doneRendering : function(component, event, helper) {
		var a = component.get('c.advanceDemo');
		var b = component.get('c.reverseDemo');

		jQuery("body").keydown(function(e) {
			switch (e.which) {
				case 37: // left
					$A.enqueueAction(b);
					break;

				case 38: // up
					$A.enqueueAction(b);
					break;

				case 39: // right
					$A.enqueueAction(a);
					break;

				case 40: // down
					$A.enqueueAction(a);
					break;

				default:
					return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		});

	},

	advanceDemo : function(component, event, helper) {


		if(event != null && event.type == 'click') {
			event.preventDefault();
		}


		var counter = component.get("v.counter");

		if(counter == 13){
			var spinner = component.find('spinner');
			$A.util.toggleClass(spinner, "hide-element");

			var action = component.get("c.createBankAccount");
			action.setParams({ 
                "oppId" : helper.getParameterByName(component, event, 'oppId'),
                "accId" : component.get('v.rachelAdamsId'), // this is actually the External_Id__c field on Account (better for Trialforce)
                "namePrefix" : component.get('v.namePrefix'),
    			"theProduct" : component.get('v.theProduct'),
    			"fundingMethod" : component.get('v.fundingMethod'),
                "finAcctType" : component.get('v.finAcctType')
            });
			action.setCallback(this, function(response){
				if (response.getState() === "SUCCESS"){
					window.location.href = '/one/one.app#/sObject/' + response.getReturnValue() + '/view';
				}
			});
			$A.enqueueAction(action);
		}




		var currentImg = component.find("image" + counter);
		counter++;
		component.set("v.counter", counter);
		var nextImg = component.find("image" + counter);
		$A.util.toggleClass(currentImg, "hide-element");
		$A.util.toggleClass(nextImg, "hide-element");

	},
	
	reverseDemo : function(component, event, helper) {

		var counter = component.get("v.counter");
		var currentImg = component.find("image" + counter);
		if(counter != 1) counter--;
		component.set("v.counter", counter);
		var nextImg = component.find("image" + counter);
		$A.util.toggleClass(currentImg, "hide-element");
		$A.util.toggleClass(nextImg, "hide-element");
	},

	highlightClick : function(component, event, helper) {
		var hotspot = event.target.nextSibling;
		jQuery(hotspot).css("background-color", "rgba(49,151,255,0.25)");
		jQuery(hotspot).removeClass().addClass('fadeOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			jQuery(hotspot).removeClass();
			jQuery(hotspot).css("background-color", "");
		});
	},

	pauseAdvanceDemo : function(component, event, helper) {
		var a = component.get('c.advanceDemo');
		setTimeout($A.enqueueAction(a), 2000);
	}

})