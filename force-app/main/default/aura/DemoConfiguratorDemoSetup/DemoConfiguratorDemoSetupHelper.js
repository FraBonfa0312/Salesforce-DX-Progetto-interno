({
	ToastNotification : function(Title,Message,Type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
        	title : Title,
            message: Message,
            duration:' 5000',
            type: Type,
            mode: 'pester'
        });
        toastEvent.fire(); 
    },
    HandleEventFiring : function(component, event, helper,whichone) { 
        if(whichone == 'Required_Setup_Settings'){
            component.set("v.SpinnerOnOff",true);
            helper.RequiredSetup(component, event, helper);	
        }else{
            helper.ToastNotification('No Method Found', 'Have you setup your methods?', 'error');
        }
    },
    /** 1. Run Required Setup **/
    RequiredSetup  : function(component, event, helper,whichone) { 
        helper.StartDataFlow(component, event, helper);
    },

    /** Update Demo Setting to enabled **/
    UpdateEnabledField  : function(component, event, helper,whichone) { 
       var action = component.get("c.UpdateDemoSetting");
        action.setParams({
            WhichSetting: whichone,
        });
		action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set("v.DemoSettings",response.getReturnValue());
            }
        });
		$A.enqueueAction(action);
    },
    StartDataFlow : function(component, event, helper){ 
        window.setTimeout(
            $A.getCallback(function() {
                var iframe = document.createElement('iframe');
                var base = component.get("v.BaseURL");
                iframe.src = base + '/apex/DemoSetupWaveAcc';
                document.getElementById('iframe_dataflow').appendChild(iframe);
        	}), 500
        );
        helper.UpdateEnabledField(component, event, helper, component.get("v.whichone"));
        component.set("v.SpinnerOnOff",false);
    },



})