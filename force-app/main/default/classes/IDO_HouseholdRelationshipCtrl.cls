public class IDO_HouseholdRelationshipCtrl {
    
    
    @AuraEnabled
    public static Account getThisAccount(String recordId){
        Account thisAccount = new Account();
        if(recordId == null){
            thisAccount = [SELECT Id, Name from Account where Name = 'Rachel Adams'];
            
        }
        else{
            thisAccount = [SELECT Id, Name from Account where Id = : recordId];
        }
        
        return thisAccount;
    }
    
    
    
    
    @AuraEnabled
    public static Map<String, List<SObject>> getGroups(String recordId){
        Map<String, List<SObject>> groupMap = new Map<String, List<SObject>>();
        
        groupMap.putAll((Map<String,List<SObject>>)getHouseholdGroups(recordId));
        groupMap.putAll((Map<String,List<SObject>>)getNonHouseholdAcctGroups(recordId));
        groupMap.putAll((Map<String,List<SObject>>)getNonHouseholdContactGroups(recordId));
        
        return groupMap;
    }
    
    
    @AuraEnabled
    public static Map<String, List<AccountContactRelation>> getHouseholdGroups(String recordId){
        System.debug('getHouseholdGroups recordId: ' + recordId);
        
        Map<String, List<AccountContactRelation>> householdGroupMap = new Map<String, List<AccountContactRelation>>();
        AccountContactRelation thisACR = new AccountContactRelation();
        List<AccountContactRelation> theGroupACRs = new List<AccountContactRelation>();
        
        
        Id householdRecordType = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Household').getRecordTypeId();
        
        // thisACR = [SELECT Id, AccountId, ContactId, FinServ__PrimaryGroup__c, FinServ__Primary__c from AccountContactRelation Where AccountId = : recordId];
        Contact thisContact = [SELECT Id, AccountId FROM Contact WHERE AccountId = : recordId LIMIT 1];
        
        // theGroupACRs = [SELECT Id, AccountId, Account.Name, Roles, Account.RecordTypeId, ContactId, FinServ__PrimaryGroup__c, FinServ__Primary__c 
                        // from AccountContactRelation Where (Account.RecordTypeId = : householdRecordType AND ContactId = : thisACR.ContactId) ORDER BY FinServ__PrimaryGroup__c DESC];
        theGroupACRs = [SELECT Id, AccountId, Account.Name, Roles, Account.RecordTypeId, ContactId, FinServ__PrimaryGroup__c, FinServ__Primary__c 
                        from AccountContactRelation Where (Account.RecordTypeId = : householdRecordType AND ContactId = : thisContact.Id) ORDER BY FinServ__PrimaryGroup__c DESC];
        
        for(AccountContactRelation groupACR : theGroupACRs){
            List<Contact> theGroupContacts = new List<Contact>();
            List<AccountContactRelation> theGroupContactsACRList = new List<AccountContactRelation>();
            theGroupContactsACRList = [SELECT Id, AccountId, ContactId, Account.Name,  Contact.Name, Contact.AccountId, Roles, FinServ__PrimaryGroup__c, FinServ__Primary__c 
                                       from AccountContactRelation Where (AccountId = : groupACR.AccountId) ORDER BY FinServ__Primary__c DESC];
            
            householdGroupMap.put(groupACR.Account.Name+' '+groupACR.FinServ__PrimaryGroup__c, theGroupContactsACRList);
            
        }
        
        
        
        
        return householdGroupMap;
    }
    
    
    @AuraEnabled
    public static Map<String, List<AccountContactRelation>> getNonHouseholdAcctGroups(String recordId){
        Map<String, List<AccountContactRelation>> otherGroupMap = new Map<String, List<AccountContactRelation>>();
        AccountContactRelation thisACR = new AccountContactRelation();
        List<Account> theGroupAccounts = new List<Account>();
        Account thisAccount = [SELECT Id, Name from Account where Id = : recordId];
        List<AccountContactRelation> theGroupACRs = new List<AccountContactRelation>();
        List<AccountContactRelation> theGroupContactsACRList = new List<AccountContactRelation>();
        
        Id householdRecordType = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Household').getRecordTypeId();
        
        // thisACR = [SELECT Id, AccountId, ContactId, FinServ__PrimaryGroup__c, FinServ__Primary__c from AccountContactRelation Where AccountId = : recordId];
        Contact thisContact = [SELECT Id, AccountId FROM Contact WHERE AccountId = : recordId LIMIT 1];
        
        // theGroupACRs = [SELECT Id, AccountId, Account.Name, Account.RecordTypeId, Roles, ContactId, FinServ__PrimaryGroup__c, FinServ__Primary__c 
                        // from AccountContactRelation Where (Account.RecordTypeId != : householdRecordType AND ContactId = : thisACR.ContactId AND Account.Name != : thisAccount.Name) ORDER BY FinServ__PrimaryGroup__c DESC];
        theGroupACRs = [SELECT Id, AccountId, Account.Name, Account.RecordTypeId, Roles, ContactId, FinServ__PrimaryGroup__c, FinServ__Primary__c 
                        from AccountContactRelation Where (Account.RecordTypeId != : householdRecordType AND ContactId = : thisContact.Id AND Account.Name != : thisAccount.Name) ORDER BY FinServ__PrimaryGroup__c DESC];

        for(AccountContactRelation groupACR : theGroupACRs){
            
            Account relatedAccount = new Account();
            relatedAccount = [SELECT Id, Name from Account Where Id = : groupACR.AccountId];
            theGroupAccounts.add(relatedAccount);
            
        }
        
        otherGroupMap.put('Related Accounts', theGroupACRs);
        
        
        return otherGroupMap;
    }
    
    @AuraEnabled
    public static Map<String, List<FinServ__ContactContactRelation__c>> getNonHouseholdContactGroups(String recordId){
        Map<String, List<FinServ__ContactContactRelation__c>> otherGroupMap = new Map<String, List<FinServ__ContactContactRelation__c>>();
        AccountContactRelation thisACR = new AccountContactRelation();
        List<Contact> theGroupContacts = new List<Contact>();
        
        Account thisAccount = [SELECT Id, Name from Account where Id = : recordId];
        
        List<FinServ__ContactContactRelation__c> theGroupCCRs = new List<FinServ__ContactContactRelation__c>();
        
        
        Id householdRecordType = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Household').getRecordTypeId();
        
        // thisACR = [SELECT Id, AccountId, ContactId, FinServ__PrimaryGroup__c, FinServ__Primary__c from AccountContactRelation Where AccountId = : recordId];
        Contact thisContact = [SELECT Id, AccountId FROM Contact WHERE AccountId = : recordId LIMIT 1];
        
        // theGroupCCRs = [SELECT Id, FinServ__Contact__r.Name, FinServ__RelatedContact__r.Id, FinServ__RelatedContact__r.Name, FinServ__Role__r.Name from FinServ__ContactContactRelation__c  Where FinServ__Contact__c = : thisACR.ContactId];
        theGroupCCRs = [SELECT Id, FinServ__Contact__r.Name, FinServ__RelatedContact__r.Id, FinServ__RelatedContact__r.Name, FinServ__Role__r.Name from FinServ__ContactContactRelation__c  Where FinServ__Contact__c = : thisContact.Id];
        
        
        otherGroupMap.put('Related Contacts', theGroupCCRs);
        
        
        return otherGroupMap;
    }
    
    
}