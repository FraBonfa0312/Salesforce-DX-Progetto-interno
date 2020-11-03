({
	handleClick : function(cmp, event,helper){
		var action= cmp.get("c.changeStatus");
		action.setParams({
			"ServiceAppointmentId": cmp.get("v.recordId"),
			"CancellationReason": cmp.get("v.CancellationReason")
	});
	action.setCallback(this, function (response) {
		var state = response.getState();
		if (state === "SUCCESS") {
			alert("Service appointment succesfully cancelled!");
			close();		
			}
		 else {
			//MANAGE SHOW TOAST ERROR
			this.showToast('ERROR', 'Servizio momentaneamente non disponibile - booleano is null or undefined', 'error');
		}
	});
	$A.enqueueAction(action);
},	
	handleSA : function(cmp, event,helper) {
		var action= cmp.get("c.isStatusCanceled");
		action.setParams({
            "ServiceAppointmentId": cmp.get("v.recordId")
	});
	action.setCallback(this, function (response) {
		var state = response.getState();
		if (state === "SUCCESS") {
			var booleano = response.getReturnValue();
			if (booleano != null && booleano != undefined) {
				cmp.set('v.truthy', booleano);					
			}
		} else {
			//MANAGE SHOW TOAST ERROR
			this.showToast('ERROR', 'Servizio momentaneamente non disponibile - booleano is null or undefined', 'error');
		}	
	});
	$A.enqueueAction(action);
},
})