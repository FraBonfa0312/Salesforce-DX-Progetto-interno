public class GetIntegratedTransactions {
    
    @AuraEnabled
    public static List<Transaction__b> getBigTransactions(Id myId){
        
        List<Transaction__b> myList = [SELECT Related_ID__c, Transaction_Date__c, Transaction_ID__c, Amount__c, Type__c, Inherent_Info__c,
                                       Value_1__c, Value_2__c, Value_3__c, Value_4__c, Value_5__c, Value_6__c, Value_7__c, Value_8__c
                                       FROM Transaction__b 
                                       WHERE (Related_ID__c = :myId)
                                       LIMIT 5];
        
        return myList;
    }
    
    @AuraEnabled
    public static DateTime getLatestTimeStamp(Id myId){
        List<Transaction__b> myList = [SELECT Related_ID__c, Transaction_Date__c, Transaction_ID__c
                                       FROM Transaction__b 
                                       WHERE (Related_ID__c = :myId)
                                       LIMIT 5];
        
        DateTime theMostRecent;
        if(!myList.isEmpty()){
            theMostRecent = myList.get(myList.size() - 1).Transaction_Date__c;            
        }
        
        return theMostRecent;
    }
    
    
    
    @AuraEnabled
    public static List<Transaction__b> getBigNext(Id myId, DateTime myDateProvided){
        
        List<Transaction__b> myList = [SELECT Related_ID__c, Transaction_Date__c, Transaction_ID__c, Amount__c, Type__c, Inherent_Info__c,
                                       Value_1__c, Value_2__c, Value_3__c, Value_4__c, Value_5__c, Value_6__c, Value_7__c, Value_8__c
                                       FROM Transaction__b 
                                       WHERE (Related_ID__c = :myId) AND (Transaction_Date__c < :myDateProvided) 
                                       LIMIT 5];
        
        return myList;
    }
    
    @AuraEnabled
    public static DateTime getNextLatestTimeStamp(Id myId, DateTime myDateProvided){
        
        List<Transaction__b> myList = [SELECT Related_ID__c, Transaction_Date__c, Transaction_ID__c
                                       FROM Transaction__b 
                                       WHERE  (Related_ID__c = :myId) AND (Transaction_Date__c < :myDateProvided)
                                       LIMIT 5];
        
        DateTime theLatest;
        if(!myList.isEmpty()){
            theLatest = myList.get(myList.size() - 1).Transaction_Date__c;            
        }
        
        return theLatest;
    }
    
    @AuraEnabled
    public static List<DateTime> addToDateTimeList(DateTime myDateProvided, List<DateTime> myDateTimes){
        
        myDateTimes.add(myDateProvided);
        
        return myDateTimes;
    }
    
    @AuraEnabled
    public static List<Transaction__b> getBigPrior(Id myId, DateTime myPriorDateTime){        
        
        List<Transaction__b> myList = [SELECT Related_ID__c, Transaction_Date__c, Transaction_ID__c, Amount__c, Type__c, Inherent_Info__c,
                                       Value_1__c, Value_2__c, Value_3__c, Value_4__c, Value_5__c, Value_6__c, Value_7__c, Value_8__c
                                       FROM Transaction__b 
                                       WHERE (Related_ID__c = :myId) AND (Transaction_Date__c < :myPriorDateTime) 
                                       LIMIT 5];
        
        return myList;
        
    }
    
    @AuraEnabled
    public static void deleteCurrent(Id myId){
        List<Transaction__b> myFinBig = [SELECT Related_ID__c, Transaction_Date__c, Transaction_ID__c
                                         FROM Transaction__b
                                         WHERE Related_ID__c = :myId];
        Database.deleteImmediate(myFinBig);                   
        
    }
    
    @AuraEnabled
    public static void populate(Id myId){        
        
        DateTime myDateTime = System.now();
        
        //Map Account Actions
        List<Account_Actions__x> myAccountActions = [SELECT Id, ExternalId FROM Account_Actions__x];
        
        Map<String,String> myAccountActionInfo = new Map<String, String>();
        
        for(Integer i = 0; i < myAccountActions.size(); i++){
            myAccountActionInfo.put(myAccountActions[i].ExternalId, myAccountActions[i].Id);
        }
        
        //Map Transactions
        List<Transactions__x> myTransactions = [SELECT Id, ExternalId FROM Transactions__x];
        
        Map<String,String> myTransactionsInfo = new Map<String, String>();
        
        for(Integer i = 0; i < myTransactions.size(); i++){
            myTransactionsInfo.put(myTransactions[i].ExternalId, myTransactions[i].Id);
        }
        
        //Map Claims (just 1 claim)
        //String claimID = [SELECT Id FROM public_claimsdataext__x LIMIT 1].get(0).Id;
        List<Claims_ext__x> myClaims = [SELECT Id, ExternalId FROM Claims_ext__x];
        
        Map<String,String> myClaimsInfo = new Map<String, String>();
        
        for(Integer i = 0; i < myClaims.size(); i++){
            myClaimsInfo.put(myClaims[i].ExternalId, myClaims[i].Id);
        }
        
        
        Transaction__b t1 = new Transaction__b(Amount__c = 5000,
                                               Value_3__c = '529 Plan Opening',
                                               Related_ID__c = myId,
                                               Transaction_Date__c = myDateTime.addDays(-7).addMinutes(-4),
                                               Transaction_ID__c = 'ACT-' + String.valueOf(12),
                                               Value_1__c = 'Complete',
                                               Value_2__c = 'Resolved',
                                               Value_4__c = myAccountActionInfo.get('ACT-12'),
                                               Type__c = 'Account Action'
                                              );        
        if(!Test.isRunningTest()){
            Database.insertImmediate(t1);            
        }

        
        
        Transaction__b t2 = new Transaction__b(Amount__c = -232.14,
                                               Value_3__c = 'Credit Payment - $232.14',
                                               Related_ID__c = myId,
                                               Transaction_Date__c = myDateTime.addDays(-6).addMinutes(1),
                                               Transaction_ID__c = 'TRA-' + String.valueOf(32),
                                               Value_1__c = 'Complete',
                                               Value_2__c = 'Resolved',
                                               Value_4__c = myTransactionsInfo.get('TRA-32'),
                                               Type__c = 'Transaction'
                                              );        
        
        if(!Test.isRunningTest()){
            Database.insertImmediate(t2);            
        }
        
        Transaction__b t3 = new Transaction__b(Amount__c = 35000,
                                               Value_3__c = 'Boat Loan - $35k (needs proof)',
                                               Related_ID__c = myId,
                                               Transaction_Date__c = myDateTime.addDays(-5).addMinutes(2),
                                               Transaction_ID__c = 'TRA-' + String.valueOf(33),
                                               Value_1__c = 'Denied',
                                               Value_2__c = 'Issue',
                                               Value_4__c = myTransactionsInfo.get('TRA-33'),
                                               Type__c = 'Transaction'
                                              );
        
        if(!Test.isRunningTest()){
            Database.insertImmediate(t3);            
        }       
        
        Transaction__b t4 = new Transaction__b(Amount__c = 0,
                                               Value_3__c = 'Card Replacement (needs proof)',
                                               Related_ID__c = myId,
                                               Transaction_Date__c = myDateTime.addDays(-4).addMinutes(3),
                                               Transaction_ID__c = 'ACT-' + String.valueOf(13),
                                               Value_1__c = 'Denied',
                                               Value_2__c = 'Issue',
                                               Value_4__c = myAccountActionInfo.get('ACT-13'),
                                               Type__c = 'Account Action'
                                              ); 
        
        if(!Test.isRunningTest()){
            Database.insertImmediate(t4);            
        }
        
        
        Transaction__b t5 = new Transaction__b(Amount__c = 5400.32,
                                               Value_3__c = 'Auto - Routed to Billing',
                                               Related_ID__c = myId,
                                               Transaction_Date__c = myDateTime.addDays(-3).addMinutes(4),
                                               Transaction_ID__c = 'CLA-' + String.valueOf(58),
                                               Value_1__c = 'Complete',
                                               Value_2__c = 'Resolved',
                                               Value_4__c = myClaimsInfo.get('CLA-58'),
                                               Type__c = 'Claim'
                                              );   
        
        if(!Test.isRunningTest()){
            Database.insertImmediate(t5);            
        }
        
        
        Transaction__b t6 = new Transaction__b(Amount__c = 525000,
                                               Value_3__c = 'Joint Account Open (> 3 days)',
                                               Related_ID__c = myId,
                                               Transaction_Date__c = myDateTime.addDays(-2).addMinutes(5),
                                               Transaction_ID__c = 'ACT-' + String.valueOf(14),
                                               Value_1__c = 'Pending',
                                               Value_2__c = 'Warning',
                                               Value_4__c = myAccountActionInfo.get('ACT-14'),
                                               Type__c = 'Account Action'
                                              ); 
        if(!Test.isRunningTest()){
            Database.insertImmediate(t6);            
        }
        
        
        Transaction__b t7 = new Transaction__b(Amount__c = 534.21,
                                               Value_3__c = 'Fund Transfer - $534.21',
                                               Related_ID__c = myId,
                                               Transaction_Date__c = myDateTime.addDays(-1).addMinutes(6),
                                               Transaction_ID__c = 'TRA-' + String.valueOf(34),
                                               Value_1__c = 'Complete',
                                               Value_2__c = 'Resolved',
                                               Value_4__c = myTransactionsInfo.get('TRA-34'),
                                               Type__c = 'Transaction'
                                              );
        if(!Test.isRunningTest()){
            Database.insertImmediate(t7);            
        }
        
        
        Transaction__b t8 = new Transaction__b(Amount__c = 483000,
                                               Value_3__c = '401k Rollover',
                                               Related_ID__c = myId,
                                               Transaction_Date__c = myDateTime.addMinutes(-132),
                                               Transaction_ID__c = 'ACT-' + String.valueOf(15),
                                               Value_1__c = 'Complete',
                                               Value_2__c = 'Resolved',
                                               Value_4__c = myAccountActionInfo.get('ACT-15'),
                                               Type__c = 'Account Action'
                                              ); 
        if(!Test.isRunningTest()){
            Database.insertImmediate(t8);            
        }
    } 
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActions(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOther(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    //Placeholders
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOtherInfo(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOtherInfo1(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOtherInfo2(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOtherInfo3(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOtherInfo4(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOtherInfo5(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOtherInfo6(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOtherInfo7(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    @AuraEnabled
    public static List<Account_Actions__x> myExtAccountActionsOtherInfo8(){
        List<Account_Actions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Inflow__c FROM Account_Actions__x LIMIT 4];
        return myList;
    }
    
    
    @AuraEnabled
    public static List<Transactions__x> myExtTransactions(){
        List<Transactions__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Amount__c FROM Transactions__x LIMIT 3];
        return myList;
    }
    
    @AuraEnabled
    public static List<Claims_ext__x> myExtClaims(){
        List<Claims_ext__x> myList = [SELECT Id, ExternalId, Status__c, Description__c, Fee__c FROM Claims_ext__x LIMIT 3];
        return myList;
    }
    
    @AuraEnabled
    public static Boolean isOutOfBand(String status){
        
        Boolean outOfBandTracker = false; // by default = false, for am too lazy to deal with nulls
        
        Integer modelPrediction; // for dealing with AI prediction result from Einstein Discovery
        
        String clientId = '3MVG9vtcvGoeH2bjoPcM9fct5S53mA2CA7cgRUMu414H3CAgUnYdnWFFg8wOFzlqXXhysvEQXYw5wdSYhDPjE';
        String clientSecret = '35EEE749AA87328DF5443B35BA2D62215AC15FBAC947406013026064D2450FAC';
        String username = 'russ@bigobj.claims';
        String token = 'MGOZltKPQ7sYKTQn1Fmg3pDu';
        String password = 'salesforce1'+token;
        
        
        String reqBody = 'grant_type=password&client_id='+clientId+'&client_secret='+clientSecret+'&username='+username+'&password='+password;
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setBody(reqBody);
        request.setMethod('POST');
        
        //your endpoint to external system to get token
        request.setEndpoint('https://login.salesforce.com/services/oauth2/token'); 
        
        HttpResponse response = http.send(request);   
        
        OAuth2 objAuthenticationInfo = (OAuth2)JSON.deserialize(response.getbody(), OAuth2.class);
        //System.debug('resp: ' + response.getBody());
        //System.debug('objAuth: ' + objAuthenticationInfo);
        
        if(objAuthenticationInfo.access_token != null){
            
            Http http1 = new Http();
            HttpRequest request1 = new HttpRequest();
            
            request1.setHeader('Authorization','Bearer '+objAuthenticationInfo.access_token);
            request1.setHeader('Content-Type', 'application/json;charset=UTF-8');        
            request1.setEndpoint('https://bigobjclaims.my.salesforce.com/services/data/v47.0/smartdatadiscovery/predict');
            request1.setMethod('POST');
            request1.setBody('{"predictionDefinition": "Out_Of_Band_Out_Of_Band","type": "RawData","columnNames": ["Status", "Other Stuff 1", "Other Stuff 2", "Other Stuff 3"],"rows": [["' + status + '", 50, 50, 50]]}');
            HttpResponse response1 = http1.send(request1);
            //System.debug(response1);
            
            //Parsing stuff
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response1.getBody());          
            List<Object> resultsDetails = (List<Object>)results.get('predictions');            
            Map<String, Object> resultsNew = (Map<String, Object>)resultsDetails.get(0);
            //System.debug(resultsNew);
            Map<String, Object> resultsTotal = (Map<String, Object>)resultsNew.get('prediction');
            modelPrediction = Integer.valueOf(resultsTotal.get('total'));
            
            System.debug('my Einstein Discovery result: ' + modelPrediction);
            
        }
        
        //if no result or AI result back isn't strong = then return false. Else, it's true - you got a great AI result, use it!
        if((modelPrediction == null) || (modelPrediction < 70)){
            outOfBandTracker = false;
        } else {
            outOfBandTracker = true;
        }
        
        return outOfBandTracker;
        
    }
    
    
    //Wrapper class esp useful for access_token, that you use afterwards
    public class OAuth2{
        public String id{get;set;}
        public String issued_at{get;set;}
        public String instance_url{get;set;}
        public String signature{get;set;}
        public String access_token{get;set;}    
    }    
    
}