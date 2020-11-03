public class xTabHelperController {

    public Tableau__mdt metadata {get;set;}
    
    public xTabHelperController(ApexPages.StandardController controller){
        metadata = [Select Server_Name__c, Site_Root__c From Tableau__mdt Where DeveloperName = 'Base' Limit 1];
    }
}