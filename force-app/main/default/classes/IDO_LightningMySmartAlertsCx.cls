public class IDO_LightningMySmartAlertsCx {


    @AuraEnabled
    public static List<FinServ__Alert__c> getSmartAlerts(){
        List<FinServ__Alert__c> smartAlertList  = [SELECT Id, Name, Score__c, FinServ__Account__c,FinServ__Account__r.Id, FinServ__Active__c, FinServ__FinancialAccount__c, FinServ__Message__c, FinServ__MessageDescription__c, FinServ__Priority__c, FinServ__Severity__c, FinServ__Account__r.Name, FinServ__Account__r.IsPersonAccount,
        FinServ__Account__r.photoUrl, FinServ__Account__r.AccountLogo__c, FinServ__Account__r.PersonContact.Cust360_Contact_Picture_URL__c, FinServ__Account__r.PersonContactId, FinServ__Account__r.parentId FROM FinServ__Alert__c WHERE FinServ__Active__c = true ORDER BY Score__c DESC NULLS last];
        
        system.debug(smartAlertList);

        return smartAlertList;
    }

    @AuraEnabled
    public static String getSmartAlertsWrapper(){
        List<FinServ__Alert__c> smartAlertList  = [SELECT Id, Name, Score__c, FinServ__Account__c,FinServ__Account__r.Id, FinServ__Active__c, FinServ__FinancialAccount__c, FinServ__Message__c, FinServ__MessageDescription__c, FinServ__Priority__c, FinServ__Severity__c, FinServ__Account__r.Name, FinServ__Account__r.IsPersonAccount,
        FinServ__Account__r.photoUrl, FinServ__Account__r.AccountLogo__c, FinServ__Account__r.PersonContact.Cust360_Contact_Picture_URL__c, FinServ__Account__r.PersonContactId, FinServ__Account__r.parentId FROM FinServ__Alert__c WHERE FinServ__Active__c = true ORDER BY Score__c DESC NULLS last LIMIT 5 ];
        
        List<smartAlertWrapper> smartAlertWrapperList = new List<smartAlertWrapper>();
        For(FinServ__Alert__c fa : smartAlertList) {
            smartAlertWrapper w = new smartAlertWrapper();
            
            
               
            w.avatarImageSrc = (fa.FinServ__Account__r.PersonContact.Cust360_Contact_Picture_URL__c == NULL) ? fa.FinServ__Account__r.AccountLogo__c : fa.FinServ__Account__r.PersonContact.Cust360_Contact_Picture_URL__c; 
            
            w.alert = fa;
            if(fa.FinServ__Account__r.parentId != null){
                w.parentAccount = [SELECT Id, Name FROM Account WHERE Id = :fa.FinServ__Account__r.parentId LIMIT 1];
            } else {
                w.parentAccount = fa.FinServ__Account__r;
            }
            smartAlertWrapperList.add(w);
        }
        system.debug('smartAlertWrapperList:');
        system.debug(smartAlertWrapperList);
        return JSON.serialize(smartAlertWrapperList);
    }

    public class smartAlertWrapper{
        public String avatarImageSrc {get;set;}
        public Account parentAccount {get;set;}
        public FinServ__Alert__c alert {get;set;}

        public smartAlertWrapper() {
        }
  
        public smartAlertWrapper(FinServ__Alert__c alert, String avatarImageSrc, Account parentAccount) {
            this.alert = alert;
            this.avatarImageSrc = avatarImageSrc;
            this.parentAccount = parentAccount;
        }
  }



}