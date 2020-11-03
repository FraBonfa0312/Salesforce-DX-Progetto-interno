public class JH_GoalCardCtrl {
    @AuraEnabled
    public static void deleteGoal (String goalId){
        Account_Goal__c[] AG = [Select Id
                               from Account_Goal__c where Id = :goalId];
        try {
            delete AG;
        } catch (DmlException e) {
            // Process exception here
        }
        
        return;
    }
    
}