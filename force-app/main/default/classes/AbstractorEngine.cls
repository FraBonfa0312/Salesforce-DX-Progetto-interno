public class AbstractorEngine {
    
    @AuraEnabled
    public static Map<Integer, String> getTemplateColumns(String custom_template){
        
        Map<Integer,String> myMap = new Map<Integer,String>();
        
        if((custom_template != '') && (custom_template != null) ){
            API_Template__mdt myTemplate = AbstractorEngine.templateGetter(custom_template);
            if(myTemplate != null){
                //update all values here                
                if((myTemplate.column1_ID__c == '') && (myTemplate.column1_ID__c != null) ){
                    myMap.put(1, myTemplate.column1_ID__c);
                }

                if((myTemplate.column2_ID__c != '') && (myTemplate.column2_ID__c != null) ){
                    myMap.put(2, myTemplate.column2_ID__c);
                }
                
                if((myTemplate.column3_ID__c != '') && (myTemplate.column3_ID__c != null) ){
                    myMap.put(3, myTemplate.column3_ID__c);
                }
                
                if((myTemplate.column4_ID__c != '') && (myTemplate.column4_ID__c != null) ){
                    myMap.put(4, myTemplate.column4_ID__c);
                }
                
                if((myTemplate.column5_ID__c != '') && (myTemplate.column5_ID__c != null) ){
                    myMap.put(5, myTemplate.column5_ID__c);                
                }

            }
        }
            

        return myMap;        
        
    }
    
    @AuraEnabled
    public static List<Temp_Memory_Object__c> getExternalData(Id ourRecordId, String externalField, String custom_template, String endpointURL, String column1_ID, String column2_ID, String column3_ID, String column4_ID, String column5_ID){
        
        List<Temp_Memory_Object__c> finalOutputList = new List<Temp_Memory_Object__c>();
        Map<String, Object> ourRecords;
        List<Object> outputList;
        
        if(Test.isRunningTest()){
        } else {
            
        
        // Does a template exist - if so, override all values here
        if((custom_template != '') && (custom_template != null) ){
            API_Template__mdt myTemplate = AbstractorEngine.templateGetter(custom_template);
            if(myTemplate != null){
                //update all values here
                
                endpointURL = myTemplate.endpointURL__c;
                
                if((myTemplate.column1_ID__c != '') && (myTemplate.column1_ID__c != null) ){
                    column1_ID = myTemplate.column1_ID__c;
                } else {
                    column1_ID = null;
                }
                
                if((myTemplate.column2_ID__c != '') && (myTemplate.column2_ID__c != null) ){
                    column2_ID = myTemplate.column2_ID__c;
                } else {
                    column2_ID = null;
                }
                
                if((myTemplate.column3_ID__c != '') && (myTemplate.column3_ID__c != null) ){
                    column3_ID = myTemplate.column3_ID__c;
                } else {
                    column3_ID = null;
                }
                
                if((myTemplate.column4_ID__c != '') && (myTemplate.column4_ID__c != null) ){
                    column4_ID = myTemplate.column4_ID__c;
                } else {
                    column4_ID = null;
                }
                
                if((myTemplate.column5_ID__c != '') && (myTemplate.column5_ID__c != null) ){
                    column5_ID = myTemplate.column5_ID__c;
                } else {
                    column5_ID = null;
                }
                
            }
        }			
        
        /**
		 * These next set of lines just do schema/etc methods to find external value for your External Field  
		 * That field is the one you put into the App Builder under "External Field (API name)" 
		 */ 
        
        //---------- Schema methods wizardry begins ----------
        String objectInScope = ourRecordId.getSObjectType().getDescribe().getName();
        String ourQuery = 'SELECT Id, ' + externalField + ' FROM ' + objectInScope + ' WHERE Id = ' + '\'' + ourRecordId + '\'' + ' LIMIT 1';
        SObject ourExtInfo = Database.query(ourQuery);        
        Map<String,Object> myMap = ourExtInfo.getPopulatedFieldsAsMap();        
        String ourDerivedExternalField = String.valueOf(myMap.get(externalField));
        //---------- Schema methods wizardry ends ------------
                
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpointURL);
        request.setMethod('GET');
        HttpResponse response = http.send(request);                                

        if (response.getStatusCode() == 200) {
            
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());            
            
            ourRecords = (Map<String, Object>)results.get(ourDerivedExternalField);
            
            outputList = ourRecords.values();
            
        }
        
        
        for(Integer i = 0; i < outputList.size(); i++){
            
            Object o = outputList.get(i);
            Map<String, Object> castedObject = (Map<String, Object>)o;            
            
            Temp_Memory_Object__c myTempObj = new Temp_Memory_Object__c();
            
            
            if((column1_ID != '') && (column1_ID != null) ){
                myTempObj.Field1__c = String.valueOf(castedObject.get(column1_ID));
            }
            
            if((column2_ID != '') && (column2_ID != null) ){
                myTempObj.Field2__c = String.valueOf(castedObject.get(column2_ID)); 
            }
            
            if((column3_ID != '') && (column3_ID != null) ){
                myTempObj.Field3__c = String.valueOf(castedObject.get(column3_ID));
            }            
            
            
            if((column4_ID != '') && (column4_ID != null) ){
                myTempObj.Field4__c = String.valueOf(castedObject.get(column4_ID));
            }
            
            if((column5_ID != '') && (column5_ID != null) ){
                myTempObj.Field5__c = String.valueOf(castedObject.get(column5_ID));
            }
            
            
            finalOutputList.add(myTempObj);
        }
            
        }
        return finalOutputList;
    }
    
    @AuraEnabled
    public static Object getExternalLabels(String custom_template){
        
        LabelWrapper myLabels;
        
        String this_our_title = '';
        String this_our_icon = '';
        String this_our_column1_label = '';
        String this_our_column2_label = '';
        String this_our_column3_label = '';
        String this_our_column4_label = '';
        String this_our_column5_label = '';
        String this_our_column1_type = '';
        String this_our_column2_type = '';
        String this_our_column3_type = '';
        String this_our_column4_type = '';
        String this_our_column5_type = '';
        String this_our_column1_prior = '';
        String this_our_column2_prior = '';
        String this_our_column3_prior = '';
        String this_our_column4_prior = '';
        String this_our_column5_prior = '';
        String this_our_column1_after = '';
        String this_our_column2_after = '';
        String this_our_column3_after = '';
        String this_our_column4_after = '';
        String this_our_column5_after = '';
        Boolean this_our_column1_prior_space;
        Boolean this_our_column2_prior_space;
        Boolean this_our_column3_prior_space;
        Boolean this_our_column4_prior_space;
        Boolean this_our_column5_prior_space;
        Boolean this_our_column1_after_space;
        Boolean this_our_column2_after_space;
        Boolean this_our_column3_after_space;
        Boolean this_our_column4_after_space;
        Boolean this_our_column5_after_space;
        
        // Does a template exist - if so, override all labels here
        if((custom_template != '') && (custom_template != null) ){
            API_Template__mdt myTemplate = AbstractorEngine.templateGetter(custom_template);
            if(myTemplate != null){                
                
                if(myTemplate.title__c != null){
                    this_our_title = myTemplate.title__c;   
                }
                
                if(myTemplate.icon__c != null){
                    this_our_icon = myTemplate.icon__c;
                }
                
                if(myTemplate.column1_label__c != null){
                    this_our_column1_label = myTemplate.column1_label__c;
                }
                
                if(myTemplate.column2_label__c != null){
                    this_our_column2_label = myTemplate.column2_label__c;
                }
                
                if(myTemplate.column3_label__c != null){
                    this_our_column3_label = myTemplate.column3_label__c;
                }
                
                if(myTemplate.column4_label__c != null){
                    this_our_column4_label = myTemplate.column4_label__c;
                }
                
                if(myTemplate.column5_label__c != null){
                    this_our_column5_label = myTemplate.column5_label__c;
                }
                
                if(myTemplate.column1_type__c != null){
                    this_our_column1_type = myTemplate.column1_type__c;
                }
                
                if(myTemplate.column2_type__c != null){
                    this_our_column2_type = myTemplate.column2_type__c;
                }
                
                if(myTemplate.column3_type__c != null){
                    this_our_column3_type = myTemplate.column3_type__c;
                }
                
                if(myTemplate.column4_type__c != null){
                    this_our_column4_type = myTemplate.column4_type__c;
                }
                
                if(myTemplate.column5_type__c != null){
                    this_our_column5_type = myTemplate.column5_type__c;
                }
                
                if(myTemplate.column1_prior__c != null){
                    this_our_column1_prior = myTemplate.column1_prior__c;
                }
                
                if(myTemplate.column2_prior__c != null){
                    this_our_column2_prior = myTemplate.column2_prior__c;
                }
                
                if(myTemplate.column3_prior__c != null){
                    this_our_column3_prior = myTemplate.column3_prior__c;
                }
                
                if(myTemplate.column4_prior__c != null){
                    this_our_column4_prior = myTemplate.column4_prior__c;
                }
                
                if(myTemplate.column5_prior__c != null){
                    this_our_column5_prior = myTemplate.column5_prior__c;
                }

                if(myTemplate.column1_after__c != null){
                    this_our_column1_after = myTemplate.column1_after__c;
                }
                
                if(myTemplate.column2_after__c != null){
                    this_our_column2_after = myTemplate.column2_after__c;
                }
                
                if(myTemplate.column3_after__c != null){
                    this_our_column3_after = myTemplate.column3_after__c;
                }
                
                if(myTemplate.column4_after__c != null){
                    this_our_column4_after = myTemplate.column4_after__c;
                }
                
                if(myTemplate.column5_after__c != null){
                    this_our_column5_after = myTemplate.column5_after__c;
                }
                
                this_our_column1_prior_space = myTemplate.column1_prior_space__c;                
                this_our_column2_prior_space = myTemplate.column2_prior_space__c;                
                this_our_column3_prior_space = myTemplate.column3_prior_space__c;
                this_our_column4_prior_space = myTemplate.column4_prior_space__c;
                this_our_column5_prior_space = myTemplate.column5_prior_space__c;
                this_our_column1_after_space = myTemplate.column1_after_space__c;
                this_our_column2_after_space = myTemplate.column2_after_space__c;
                this_our_column3_after_space = myTemplate.column3_after_space__c;
                this_our_column4_after_space = myTemplate.column4_after_space__c;
                this_our_column5_after_space = myTemplate.column5_after_space__c;
                
            }
        }                
        
        myLabels = new LabelWrapper(this_our_title, this_our_icon, this_our_column1_label, this_our_column2_label, this_our_column3_label, this_our_column4_label, this_our_column5_label, this_our_column1_type, this_our_column2_type, this_our_column3_type, this_our_column4_type, this_our_column5_type, this_our_column1_prior, this_our_column2_prior, this_our_column3_prior, this_our_column4_prior, this_our_column5_prior, this_our_column1_after, this_our_column2_after, this_our_column3_after, this_our_column4_after, this_our_column5_after, this_our_column1_prior_space, this_our_column2_prior_space, this_our_column3_prior_space, this_our_column4_prior_space, this_our_column5_prior_space, this_our_column1_after_space, this_our_column2_after_space, this_our_column3_after_space, this_our_column4_after_space, this_our_column5_after_space);
        
        //One of these days I'll refactor this to purely return a clean SObject and nothing else, just to make it cleaner
        //Just kidding, it's a joke. I'll never get to it. It's refactoring. No one has time for that.
        
        return JSON.serialize(myLabels);
    }    
    
    public class LabelWrapper {
        String our_title;
        String our_icon;
        String our_column1_label;
        String our_column2_label;
        String our_column3_label;
        String our_column4_label;
        String our_column5_label;
        String our_column1_type;
        String our_column2_type;
        String our_column3_type;
        String our_column4_type;
        String our_column5_type;
        String our_column1_prior;
        String our_column2_prior;
        String our_column3_prior;
        String our_column4_prior;
        String our_column5_prior;
        String our_column1_after;
        String our_column2_after;
        String our_column3_after;
        String our_column4_after;
        String our_column5_after;
        Boolean our_column1_prior_space;
        Boolean our_column2_prior_space;
        Boolean our_column3_prior_space;
        Boolean our_column4_prior_space;
        Boolean our_column5_prior_space;
        Boolean our_column1_after_space;
        Boolean our_column2_after_space;
        Boolean our_column3_after_space;
        Boolean our_column4_after_space;
        Boolean our_column5_after_space;
        
        public LabelWrapper(String given_title, String given_icon, String given_column1_label, String given_column2_label, String given_column3_label, String given_column4_label, String given_column5_label, String given_column1_type, String given_column2_type, String given_column3_type, String given_column4_type, String given_column5_type, String given_column1_prior, String given_column2_prior, String given_column3_prior, String given_column4_prior, String given_column5_prior, String given_column1_after, String given_column2_after, String given_column3_after, String given_column4_after, String given_column5_after, Boolean given_column1_prior_space, Boolean given_column2_prior_space, Boolean given_column3_prior_space, Boolean given_column4_prior_space, Boolean given_column5_prior_space, Boolean given_column1_after_space, Boolean given_column2_after_space, Boolean given_column3_after_space, Boolean given_column4_after_space, Boolean given_column5_after_space){
            
            our_title = given_title;
            our_icon = given_icon;
            our_column1_label = given_column1_label;
            our_column2_label = given_column2_label;
            our_column3_label = given_column3_label;
            our_column4_label = given_column4_label;
            our_column5_label = given_column5_label;
            our_column1_type = given_column1_type;
            our_column2_type = given_column2_type;
            our_column3_type = given_column3_type;
            our_column4_type = given_column4_type;
            our_column5_type = given_column5_type;
            our_column1_prior = given_column1_prior;
            our_column2_prior = given_column2_prior;
            our_column3_prior = given_column3_prior;
            our_column4_prior = given_column4_prior;
            our_column5_prior = given_column5_prior;
            our_column1_after = given_column1_after;
            our_column2_after = given_column2_after;
            our_column3_after = given_column3_after;
            our_column4_after = given_column4_after;
            our_column5_after = given_column5_after;
            our_column1_prior_space = given_column1_prior_space;
            our_column2_prior_space = given_column2_prior_space;
            our_column3_prior_space = given_column3_prior_space;
            our_column4_prior_space = given_column4_prior_space;
            our_column5_prior_space = given_column5_prior_space;
            our_column1_after_space = given_column1_after_space;
            our_column2_after_space = given_column2_after_space;
            our_column3_after_space = given_column3_after_space;
            our_column4_after_space = given_column4_after_space;
            our_column5_after_space = given_column5_after_space;
            
        }
    }
    
    //Don't ask about the following - just an extension for more stuff    
    @AuraEnabled
    public static Object getExternalLabelsCont(String custom_template){
        LabelWrapperCont myLabelsCont;
        Boolean this_our_column1_link;
        
        // Does a template exist - if so, override all labels here
        if((custom_template != '') && (custom_template != null) ){
            API_Template__mdt myTemplateCont = AbstractorEngine.templateGetter(custom_template);

            if(myTemplateCont != null){
                this_our_column1_link = myTemplateCont.our_column1_link__c;
            }
        }
        
        myLabelsCont = new LabelWrapperCont(this_our_column1_link);
        
        return JSON.serialize(myLabelsCont);
    }
    
    //LabelWrapper, Continued. Don't ask.
    public class LabelWrapperCont {
        Boolean our_column1_link;
        
        public LabelWrapperCont(Boolean given_column1_link){
            our_column1_link = given_column1_link;
        }
        
    }
         
    public static API_Template__mdt templateGetter(String custom_template){
        API_Template__mdt myTemplate;
        
        if((custom_template != '') && (custom_template != null) ){
            List<API_Template__mdt> myTemplateList = [SELECT column1_ID__c, column2_ID__c, column3_ID__c, column4_ID__c, column5_ID__c,                                                      
                                                      column1_after_space__c,column1_after__c,column1_label__c,
                                                      column1_prior_space__c,column1_prior__c,column1_type__c,
                                                      column2_after_space__c,column2_after__c,column2_label__c,
                                                      column2_prior_space__c,column2_prior__c,column2_type__c,
                                                      column3_after_space__c,column3_after__c,column3_label__c,
                                                      column3_prior_space__c,column3_prior__c,column3_type__c,
                                                      column4_after_space__c,column4_after__c,column4_label__c,
                                                      column4_prior_space__c,column4_prior__c,column4_type__c,
                                                      column5_after_space__c,column5_after__c,column5_label__c,
                                                      column5_prior_space__c,column5_prior__c,column5_type__c,
                                                      DeveloperName,endpointURL__c,icon__c,our_column1_link__c, title__c
                                                      FROM API_Template__mdt 
                                                      WHERE DeveloperName = :custom_template LIMIT 1];
            
            if((myTemplateList.size() > 0)){
                myTemplate = myTemplateList.get(0);    
            }
        }        
        
        return myTemplate;
        
    }
    
}