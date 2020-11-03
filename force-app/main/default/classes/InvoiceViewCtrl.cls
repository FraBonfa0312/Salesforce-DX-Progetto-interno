/**
 * Created by scheck on 8/6/18.
 */

public class InvoiceViewCtrl {
    @AuraEnabled
    public static List<blng__Invoice__c> getInvoices() {
        Id contactId = [SELECT ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        Id accID  = [SELECT AccountId FROM Contact WHERE Id =: contactId].AccountId;
        return [SELECT
                Id,
                Name,
                blng__Account__c,
                blng__Order__c,
                blng__InvoiceStatus__c,
                blng__PaymentStatus__c,
                blng__TotalAmount__c,
                blng__Balance__c,
                blng__InvoiceDate__c,
                blng__DueDate__c,
                blng__StatusFlag__c
        FROM blng__Invoice__c
        WHERE
                blng__Account__c =: accID
        ORDER BY
                blng__DueDate__c ASC];
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