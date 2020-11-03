/**
 * Created by scheck on 8/6/18.
 */

public class ContractViewCtrl {
    @AuraEnabled
    public static List<Contract> getContracts() {

        Id contactId = [SELECT ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        System.debug('Contact Id: ');
        System.debug(contactId);
        Id accId  = [SELECT AccountId FROM Contact WHERE Id =: contactId].AccountId;
        System.debug('Account Id: ');
        System.debug(accId);
        return [SELECT
                Id,
                AccountId,
                ContractNumber,
                Status,
                StartDate,
                EndDate,
                ContractTerm
        FROM Contract
        WHERE AccountId =: accId
        ORDER BY ContractNumber ASC];
    }


    @AuraEnabled
    public static Id fireAmend(String contractId) {
        System.debug('inside fireAmend');
        System.debug('Amending: ' + contractId);

        String quoteModelJSON = SBQQ.ServiceRouter.load('SBQQ.ContractManipulationAPI.ContractAmender', contractId, null);
        cQuoteModel qModel = (cQuoteModel)JSON.deserialize(quoteModelJSON, cQuoteModel.class);
        System.debug(qModel);

        return qModel.record.Id;
    }


    @AuraEnabled
    public static Id fireCancel(String contractId) {
        System.debug('inside fireCancel');
        System.debug('Cancelling: ' + contractId);

        String quoteModelJSON = SBQQ.ServiceRouter.load('SBQQ.ContractManipulationAPI.ContractAmender', contractId, null);
        cQuoteModel qModel = (cQuoteModel)JSON.deserialize(quoteModelJSON, cQuoteModel.class);
        System.debug(qModel);

        List<SBQQ__QuoteLine__c> qLines = [SELECT
                Id,
                SBQQ__Quote__c,
                SBQQ__Quantity__c,
                SBQQ__Product__c,
                SBQQ__Product__r.SBQQ__AssetAmendmentBehavior__c,
                SBQQ__Product__r.SBQQ__SubscriptionPricing__c,
                SBQQ__Product__r.Name
        FROM SBQQ__QuoteLine__c
        WHERE SBQQ__Quote__c =: qModel.record.Id];

        List<SBQQ__QuoteLine__c> updates = new List<SBQQ__QuoteLine__c>();
        for (SBQQ__QuoteLine__c qLine : qLines){
            qLine.SBQQ__Quantity__c = 0;
            updates.add(qLine);
        }
        System.debug('Lines to Insert: ');
        System.debug(JSON.serializePretty(updates));

        try {
            Database.update(updates);
            System.debug('Zeroed out QuoteLines and updated');
        } catch (DmlException e) {
            System.debug('Error zeroing out QuoteLines: ' + e);

        }


        return qModel.record.Id;
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