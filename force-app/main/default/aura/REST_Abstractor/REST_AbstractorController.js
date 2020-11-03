({
	myAction : function(component, event, helper) {        
        
        var myCustomTemplate = component.get("v.custom_template");
        
        if(myCustomTemplate != null){
            
            
            var action00 = component.get("c.getExternalLabelsCont");
            action00.setParams({
                "custom_template": component.get("v.custom_template")
            });
            
            action00.setCallback(this, function(data) {
                component.set("v.myOutputLabelsCont", JSON.parse( data.getReturnValue() ));
                var mappedOutputLabelsCont = component.get("v.myOutputLabelsCont");
                component.set("v.column1_link", mappedOutputLabelsCont['our_column1_link']);
            });
            $A.enqueueAction(action00);
            
            var action000 = component.get("c.getTemplateColumns");
            action000.setParams({
                "custom_template": component.get("v.custom_template")
            });
            
            action000.setCallback(this, function(data) {
                component.set("v.myMapID", data.getReturnValue());
                var myMapInfo = component.get("v.myMapID");
                if(myMapInfo[1] != null){
                    component.set("v.column1_ID", myMapInfo[1]);
                } else {
                    
                }

                if(myMapInfo[2] != null){
                    component.set("v.column2_ID", myMapInfo[2]);
                } else {
                    
                }
                
                if(myMapInfo[3] != null){
                    component.set("v.column3_ID", myMapInfo[3]);
                } else {
                    
                }
                
                if(myMapInfo[4] != null){
                    component.set("v.column4_ID", myMapInfo[4]);
                } else {
                    
                }
                
                if(myMapInfo[5] != null){
                    component.set("v.column5_ID", myMapInfo[5]);
                } else {
                    
                }

            });
            $A.enqueueAction(action000);
            
            var action0 = component.get("c.getExternalLabels");
            action0.setParams({
                "custom_template": component.get("v.custom_template")
            });
                
            action0.setCallback(this, function(data) {
                component.set("v.myOutputLabels", JSON.parse( data.getReturnValue() ));
                var mappedOutputLabels = component.get("v.myOutputLabels");
                component.set("v.title", mappedOutputLabels['our_title']);                
                component.set("v.icon", mappedOutputLabels['our_icon']);                
                component.set("v.column1_label", mappedOutputLabels['our_column1_label']);                
                component.set("v.column2_label", mappedOutputLabels['our_column2_label']);
                component.set("v.column3_label", mappedOutputLabels['our_column3_label']);
                component.set("v.column4_label", mappedOutputLabels['our_column4_label']);
                component.set("v.column5_label", mappedOutputLabels['our_column5_label']);                
                component.set("v.column1_type", mappedOutputLabels['our_column1_type']);
                component.set("v.column2_type", mappedOutputLabels['our_column2_type']);
                component.set("v.column3_type", mappedOutputLabels['our_column3_type']);
                component.set("v.column4_type", mappedOutputLabels['our_column4_type']);
                component.set("v.column5_type", mappedOutputLabels['our_column5_type']);
                component.set("v.column1_prior", mappedOutputLabels['our_column1_prior']);
                component.set("v.column2_prior", mappedOutputLabels['our_column2_prior']);
                component.set("v.column3_prior", mappedOutputLabels['our_column3_prior']);
                component.set("v.column4_prior", mappedOutputLabels['our_column4_prior']);
                component.set("v.column5_prior", mappedOutputLabels['our_column5_prior']);
                component.set("v.column1_after", mappedOutputLabels['our_column1_after']);
                component.set("v.column2_after", mappedOutputLabels['our_column2_after']);
                component.set("v.column3_after", mappedOutputLabels['our_column3_after']);
                component.set("v.column4_after", mappedOutputLabels['our_column4_after']);
                component.set("v.column5_after", mappedOutputLabels['our_column5_after']);
                component.set("v.column1_prior_space", mappedOutputLabels['our_column1_prior_space']);
                component.set("v.column2_prior_space", mappedOutputLabels['our_column2_prior_space']);
                component.set("v.column3_prior_space", mappedOutputLabels['our_column3_prior_space']);
                component.set("v.column4_prior_space", mappedOutputLabels['our_column4_prior_space']);
                component.set("v.column5_prior_space", mappedOutputLabels['our_column5_prior_space']);
                component.set("v.column1_after_space", mappedOutputLabels['our_column1_after_space']);
                component.set("v.column2_after_space", mappedOutputLabels['our_column2_after_space']);
                component.set("v.column3_after_space", mappedOutputLabels['our_column3_after_space']);
                component.set("v.column4_after_space", mappedOutputLabels['our_column4_after_space']);
                component.set("v.column5_after_space", mappedOutputLabels['our_column5_after_space']);

                
            });
            
            $A.enqueueAction(action0);            

            
        } else {
            
        }        
        
        var action = component.get("c.getExternalData");
        action.setParams({
            "ourRecordId": component.get("v.recordId"),
            "custom_template": component.get("v.custom_template"),
            "externalField": component.get("v.externalField"),
            "endpointURL": component.get("v.endpointURL"),
            "column1_ID": component.get("v.column1_ID"),
            "column2_ID": component.get("v.column2_ID"),
            "column3_ID": component.get("v.column3_ID"),
            "column4_ID": component.get("v.column4_ID"),
            "column5_ID": component.get("v.column5_ID")
        });
        action.setCallback(this, function(data) {
            component.set("v.myOutputs", data.getReturnValue());
        });
        $A.enqueueAction(action);
	}
})