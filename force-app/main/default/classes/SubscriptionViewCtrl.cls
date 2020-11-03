/**
 * Created by scheck on 8/6/18.
 */

public class SubscriptionViewCtrl {
    @AuraEnabled
    public static List<SBQQ__Subscription__c> getSubs() {
        Id contactId = [SELECT ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        Id accID  = [SELECT AccountId FROM Contact WHERE Id =: contactId].AccountId;
        return [SELECT
                Id,
                SBQQ__Contract__c,
                SBQQ__Account__c,
                SBQQ__ContractNumber__c,
                Name,
                SBQQ__StartDate__c,
                SBQQ__EndDate__c,
                SBQQ__ProductName__c,
                SBQQ__NetPrice__c,
                SBQQ__Quantity__c
        FROM SBQQ__Subscription__c
        WHERE
                SBQQ__Account__c =: accID
        ORDER BY SBQQ__ContractNumber__c ASC
        LIMIT 10];
    }

    @AuraEnabled
    public static Boolean isRendered(){
        Boolean isRendered = true;
        if (UserInfo.getUserType() == 'Guest') {
            isRendered = false;
        }
        return isRendered;
    }
}