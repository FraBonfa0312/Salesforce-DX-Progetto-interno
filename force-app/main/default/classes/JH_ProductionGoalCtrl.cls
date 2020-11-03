public class JH_ProductionGoalCtrl {
    @AuraEnabled
    public static List<Account_Goal__c> getGoals(String parentId){
        return [Select Id, Name, Target_Value__c, Actual_Value__c, Target_Date__c, Progress__c, Description__c, status__c, Type__c
                from Account_Goal__c where Account__c = :parentId ORDER BY Target_Date__c ASC];
    }

}