global with sharing class INS_RegoCheckCountryPicklistOptions extends VisualEditor.DynamicPickList  {
    global class Country {
        global String label;
        global String value;
    }

    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('', '');
        return defaultValue;
    }
    global override VisualEditor.DynamicPickListRows getValues() {
        VisualEditor.DynamicPickListRows myValues = new VisualEditor.DynamicPickListRows();

        myValues.addRow(new VisualEditor.DataRow('Demo', 'Demo'));
        myValues.addRow(new VisualEditor.DataRow('Australia', 'CheckAustralia'));
        myValues.addRow(new VisualEditor.DataRow('France', 'CheckFrance'));
        myValues.addRow(new VisualEditor.DataRow('New Zealand', 'CheckNewZealand'));
        myValues.addRow(new VisualEditor.DataRow('United Kingdom', 'Check'));
        myValues.addRow(new VisualEditor.DataRow('United States of America', 'CheckUSA'));
    
        return myValues;
    }
}