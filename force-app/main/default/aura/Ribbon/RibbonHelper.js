({
     getStyle : function(color) {
    
            var style =""
        if (color==="White") {
            style="slds-theme--default"
        } else if (color==="Grey") {
            style="slds-theme--shade"
        } else if (color==="Dark Blue") {
            style="slds-theme--inverse"
        } else if (color==="Blue") {
            style="slds-theme--alt-inverse"
        } else if (color==="Light Blue") {
            style="slds-theme--info"
        } else if (color==="Green") {
            style="slds-theme--success"
        } else if (color==="Yellow") {
            style="slds-theme--warning"
        } else if (color==="Red") {
            style="slds-theme--error"
        } else if (color==="Salesforce Blue") {
            style="slds-theme--info sf-blue"
        } else if (color==="Dark") {
            style="slds-theme--offline"
        }
		return style
    
},
     getDatos : function(component) {
    
          var getValores = component.get("c.getValores");
        
        var params = {
            "recordId" : component.get("v.recordId"),
            "tipos" : component.get("v.types"),
            "sObjectName" : component.get("v.sObjectName"),
            "field1" : component.get("v.field1"),
            "field2" : component.get("v.field2"),
            "field3" : component.get("v.field3"),
            "field4" : component.get("v.field4"),
            "field5" : component.get("v.field5"),
            "field6" : component.get("v.field6"),
            "field7" : component.get("v.field7")
          
        };
        getValores.setParams(params);
        getValores.setCallback(this, function(a){
            
            var res = a.getReturnValue();
            component.set("v.data",res);
            
            if (component.get("v.field1")) {
                if (component.get("v.field1_type")=="Decimal") {
	            component.set("v.field1_data", res[component.get("v.field1")])
                } else if (component.get("v.field1_type")=="Currency") {
	            component.set("v.field1_data", res[component.get("v.field1")])
                } else if (component.get("v.field1_type")=="Date") {
	            component.set("v.field1_data_dt", res[component.get("v.field1")])
                } else if (component.get("v.field1_type")=="String") {
	            component.set("v.field1_data_st", res[component.get("v.field1")])
                } 
             
            }
	        if (component.get("v.field2")) {
                 if (component.get("v.field2_type")=="Decimal") {
	            component.set("v.field2_data", res[component.get("v.field2")])
                } else if (component.get("v.field2_type")=="Currency") {
	            component.set("v.field2_data", res[component.get("v.field2")])
                } else if (component.get("v.field2_type")=="Date") {
	            component.set("v.field2_data_dt", res[component.get("v.field2")])
                } else if (component.get("v.field2_type")=="String") {
	            component.set("v.field2_data_st", res[component.get("v.field2")])
                } 
            }
            if (component.get("v.field3")) {
                if (component.get("v.field3_type")=="Decimal") {
	            component.set("v.field3_data", res[component.get("v.field3")])
                } else if (component.get("v.field3_type")=="Currency") {
	            component.set("v.field3_data", res[component.get("v.field3")])
                } else if (component.get("v.field3_type")=="Date") {
	            component.set("v.field3_data_dt", res[component.get("v.field3")])
                } else if (component.get("v.field3_type")=="String") {
	            component.set("v.field3_data_st", res[component.get("v.field3")])
                } 
            }
            if (component.get("v.field4")) {
               if (component.get("v.field4_type")=="Decimal") {
	            component.set("v.field4_data", res[component.get("v.field4")])
                } else if (component.get("v.field4_type")=="Currency") {
	            component.set("v.field4_data", res[component.get("v.field4")])
                } else if (component.get("v.field4_type")=="Date") {
	            component.set("v.field4_data_dt", res[component.get("v.field4")])
                } else if (component.get("v.field4_type")=="String") {
	            component.set("v.field4_data_st", res[component.get("v.field4")])
                } 
            }
            if (component.get("v.field5")) {
                if (component.get("v.field5_type")=="Decimal") {
	            component.set("v.field5_data", res[component.get("v.field5")])
                } else if (component.get("v.field5_type")=="Currency") {
	            component.set("v.field5_data", res[component.get("v.field5")])
                } else if (component.get("v.field5_type")=="Date") {
	            component.set("v.field5_data_dt", res[component.get("v.field5")])
                } else if (component.get("v.field5_type")=="String") {
	            component.set("v.field5_data_st", res[component.get("v.field5")])
                } 
            }
            if (component.get("v.field6")) {
                if (component.get("v.field6_type")=="Decimal") {
	            component.set("v.field6_data", res[component.get("v.field6")])
                } else if (component.get("v.field6_type")=="Currency") {
	            component.set("v.field6_data", res[component.get("v.field6")])
                } else if (component.get("v.field6_type")=="Date") {
	            component.set("v.field6_data_dt", res[component.get("v.field6")])
                } else if (component.get("v.field6_type")=="String") {
	            component.set("v.field6_data_st", res[component.get("v.field6")])
                } 
            }
            if (component.get("v.field7")) {
                if (component.get("v.field7_type")=="Decimal") {
	            component.set("v.field7_data", res[component.get("v.field7")])
                } else if (component.get("v.field7_type")=="Currency") {
	            component.set("v.field7_data", res[component.get("v.field7")])
                } else if (component.get("v.field7_type")=="Date") {
	            component.set("v.field7_data_dt", res[component.get("v.field7")])
                } else if (component.get("v.field7_type")=="String") {
	            component.set("v.field7_data_st", res[component.get("v.field7")])
                } 
     
            }
          // console.log("Los valores son: "+component.get("v.field1_data_st"));    
        });
        $A.enqueueAction(getValores);
    
},
	setColors : function(component) {
		var color1 = component.get("v.color1")
        var color2 = component.get("v.color2")
        var color3 = component.get("v.color3")
        var color4 = component.get("v.color4")
        var striped1 = component.get("v.striped1")
        var striped2 = component.get("v.striped2")
        var striped3 = component.get("v.striped3")
        var striped4 = component.get("v.striped4")
        
		var style1 = this.getStyle(color1)
        var style2 = this.getStyle(color2)
        var style3 = this.getStyle(color3)
        var style4 = this.getStyle(color4)

        if (component) {
        	var section1 = component.find("section1");
            var section2 = component.find("section2");
            var section3 = component.find("section3");
            var section4 = component.find("section4");
            
        	$A.util.addClass(section1,style1);
            $A.util.addClass(section2,style2);
            $A.util.addClass(section3,style3);
            $A.util.addClass(section4,style4);
            if (striped1) {
                $A.util.addClass(section1,"slds-theme--alert-texture");
            }
            if (striped2) {
                $A.util.addClass(section2,"slds-theme--alert-texture");
            }
            if (striped3) {
                $A.util.addClass(section3,"slds-theme--alert-texture");
            }
            if (striped4) {
                $A.util.addClass(section4,"slds-theme--alert-texture");
            }
            
        	//console.log("Estilo:" + style1)
        	//console.log("Seccion: "+section1)
        }        
	}
    
   
})