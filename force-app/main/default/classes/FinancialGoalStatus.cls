public class FinancialGoalStatus {

    @auraEnabled
    public static FinServ__FinancialGoal__c getGoal(String theId) {
        FinServ__FinancialGoal__c theGoal = new FinServ__FinancialGoal__c();
        try{
            theGoal = [SELECT CreatedDate,Days_to_Target__c,FinServ__Status__c,FinServ__TargetDate__c,FinServ__ActualValue__c,FinServ__TargetValue__c,FinServ__Type__c,Timespan__c 
                                             FROM FinServ__FinancialGoal__c
                                             WHERE Id =: theId];
            System.debug('theGoal: ' + theGoal);
            return theGoal;
        }
        catch(Exception e){
            System.debug('getGoal Error: ' + e.getMessage());
            return null;
        }
    }

}