({
    doDoneRendering : function(component, event, helper) {
       
        helper.setColors(component)
       
    },
    
	doInit : function(component, event, helper) {
        var n = 0;
        if (component.get("v.section1")) {
            n=n+1;
        }
        if (component.get("v.section2")) {
            n=n+2;
        }
        if (component.get("v.section3")) {
            n=n+2;
        }
        if (component.get("v.section4")) {
            n=n+2;
        }
        component.set("v.num",n);
        
        var getTipos = component.get("c.getTipos");
        var Tparam = {
             "sObjectName" : component.get("v.sObjectName"),
            "field1" : component.get("v.field1"),
            "field2" : component.get("v.field2"),
            "field3" : component.get("v.field3"),
            "field4" : component.get("v.field4"),
            "field5" : component.get("v.field5"),
            "field6" : component.get("v.field6"),
            "field7" : component.get("v.field7")
        };
        getTipos.setParams(Tparam);
        getTipos.setCallback(this, function(a){
            var res = a.getReturnValue();
            console.log('Resultado de los tipos: '+res);
            component.set("v.types",res);
            if (component.get("v.field1")) {
	            component.set("v.field1_type", res[component.get("v.field1")])
            }
	        if (component.get("v.field2")) {
                component.set("v.field2_type", res[component.get("v.field2")])
            }
            if (component.get("v.field3")) {
                component.set("v.field3_type", res[component.get("v.field3")])
            }
            if (component.get("v.field4")) {
                component.set("v.field4_type", res[component.get("v.field4")])
            }
            if (component.get("v.field5")) {
                component.set("v.field5_type", res[component.get("v.field5")])
            }
            if (component.get("v.field6")) {
                component.set("v.field6_type", res[component.get("v.field6")])
            }
            if (component.get("v.field7")) {
                component.set("v.field7_type", res[component.get("v.field7")])
            }
           helper.getDatos(component);
        });
        
        $A.enqueueAction(getTipos);    
		
	}
})