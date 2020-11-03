global with sharing class INS_RestAbstractorTemplates extends VisualEditor.DynamicPickList {
    
    global class Template {
        global String label;
        global String value;
    }
    
    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('None', 'none');
        return defaultValue;
    }
    global override VisualEditor.DynamicPickListRows getValues() {
        VisualEditor.DynamicPickListRows myValues = new VisualEditor.DynamicPickListRows();
        
        myvalues.addRow(new VisualEditor.DataRow('None', 'none'));
        
        
        List<API_Template__mdt> myTemplateList = [SELECT Label, DeveloperName
                                                  FROM API_Template__mdt 
                                                 ];
        
        for(API_Template__mdt myTemplate : myTemplateList) {
            myValues.addRow(new VisualEditor.DataRow(myTemplate.Label, myTemplate.DeveloperName));
        }
        
        
    
        return myValues;
    }

    

    
}