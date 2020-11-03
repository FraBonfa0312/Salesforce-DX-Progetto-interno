/*
* Created by Jesse Chase
* jchase@salesforce.com
* 09/20/2018.
*/

global class DemoConfigurator{
    /** Get All Demo Settings from Demo Settings Object **/
    @AuraEnabled
    global static List<DemoSettings__c> GetSettings() {
        return [SELECT Id, Name,Description__c,Enablement_Type__c,DeveloperName__c ,Enablement_Description__c,Enabled__c,AllowEnable__c FROM DemoSettings__c WHERE AllowEnable__c = true Order By Order__c ASC];
    }

    /** Update Demo Settings to Enabled **/
    @AuraEnabled
    global static List<DemoSettings__c> UpdateDemoSetting(String WhichSetting) {
        
        DemoSettings__c[] demosetting = [SELECT Id FROM DemoSettings__c WHERE DeveloperName__c = :WhichSetting];
        for(DemoSettings__c ds: demosetting) {
            ds.Enabled__c = true;
        }
        /** Attempt to update the demo setting fields and throw error in debug log if it fails **/
        try{
            update demosetting;
            return [SELECT Id, Name,Description__c,DeveloperName__c ,Enablement_Description__c,Enabled__c,AllowEnable__c FROM DemoSettings__c WHERE AllowEnable__c = true Order By Order__c ASC];
        }catch(exception e){
            System.debug('Update Demo Setting Error: ' + e);
            return null;
        }
    }
    /** Get Org Base URL **/
    @AuraEnabled
    public static String getBaseURL(){
        return URL.getSalesforceBaseUrl().toExternalForm(); 
    } 

    
    @RemoteAction
    global static Map<String,Object> DataConnectors() {
        string sessionId = UserInfo.getSessionId();
        string base = URL.getSalesforceBaseUrl().toExternalForm();
        String url = base + '/services/data/v47.0/wave/dataConnectors';  
        
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        
        String authorizationHeader = 'OAuth ' + sessionId;
        req.setHeader('Authorization', authorizationHeader);
        req.setHeader('Content-Type', 'application/json');
        
        // Send the request, and return a response
        HttpResponse res = h.send(req);
        
        Map<String,Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        
        return responseMap;
        
    }
    /** Run all Analytics Dataflows with this handy snippet **/
    @RemoteAction
    global static void RunDataConnector(String ConnectorId) {
        string sessionId = UserInfo.getSessionId();
        string base = URL.getSalesforceBaseUrl().toExternalForm();
        string ingest = '/services/data/v47.0/wave/dataConnectors/' + ConnectorId + '/ingest';
        String url = base + ingest;  
        
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('POST');
        
        String authorizationHeader = 'OAuth ' + sessionId;
        req.setHeader('Authorization', authorizationHeader);
        req.setHeader('Content-Type', 'application/json');
        
        // Send the request, and return a response
        HttpResponse res = h.send(req);
        
    }
}