public class GrabBigFinTransactions {
    
    @AuraEnabled
    public static List<Financial_Account_Transaction__b> getBigTransactions(Id myId){
        
        List<Financial_Account_Transaction__b> myList = [SELECT Financial_Account__c, Transaction_Date__c, Transaction_Id__c, Amount__c, Description__c, Inherent_Name__c, 
                                                         Transaction_Status__c, Transaction_Sub_Type__c, Transaction_Type__c
                                                         FROM Financial_Account_Transaction__b 
                                                         WHERE (Financial_Account__c = :myId)
                                                         LIMIT 5];
        
        return myList;
    }
    
    @AuraEnabled
    public static DateTime getLatestTimeStamp(Id myId){
        List<Financial_Account_Transaction__b> myList = [SELECT Financial_Account__c, Transaction_Date__c, Transaction_Id__c 
                                                         FROM Financial_Account_Transaction__b 
                                                         WHERE (Financial_Account__c = :myId)
                                                         LIMIT 5];
        
        DateTime theMostRecent;
        if(!myList.isEmpty()){
            theMostRecent = myList.get(myList.size() - 1).Transaction_Date__c;            
        }
        
        return theMostRecent;
    }
    
    
    
    @AuraEnabled
    public static List<Financial_Account_Transaction__b> getBigNext(Id myId, DateTime myDateProvided){
        
        List<Financial_Account_Transaction__b> myList = [SELECT Financial_Account__c, Transaction_Date__c, Transaction_Id__c, Amount__c, Description__c, Inherent_Name__c, 
                                                         Transaction_Status__c, Transaction_Sub_Type__c, Transaction_Type__c
                                                         FROM Financial_Account_Transaction__b 
                                                         WHERE (Financial_Account__c = :myId) AND (Transaction_Date__c < :myDateProvided) 
                                                         LIMIT 5];
        
        return myList;
    }
    
    @AuraEnabled
    public static DateTime getNextLatestTimeStamp(Id myId, DateTime myDateProvided){
        
        List<Financial_Account_Transaction__b> myList = [SELECT Financial_Account__c, Transaction_Date__c, Transaction_Id__c 
                                                         FROM Financial_Account_Transaction__b 
                                                         WHERE  (Financial_Account__c = :myId) AND (Transaction_Date__c < :myDateProvided)
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
    public static List<Financial_Account_Transaction__b> getBigPrior(Id myId, DateTime myPriorDateTime){        
        
        List<Financial_Account_Transaction__b> myList = [SELECT Financial_Account__c, Transaction_Date__c, Transaction_Id__c, Amount__c, Description__c, Inherent_Name__c, 
                                                         Transaction_Status__c, Transaction_Sub_Type__c, Transaction_Type__c
                                                         FROM Financial_Account_Transaction__b 
                                                         WHERE (Financial_Account__c = :myId) AND (Transaction_Date__c < :myPriorDateTime) 
                                                         LIMIT 5];
        
        return myList;
        
    }    
    
}