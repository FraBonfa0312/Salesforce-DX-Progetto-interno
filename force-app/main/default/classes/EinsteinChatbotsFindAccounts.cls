global class EinsteinChatbotsFindAccounts 
{
    @InvocableMethod(label='Einstein Chatbots - Find Accounts For Contact' description='Returns a list of Accounts for the specified Contact')
    global static List<List<FinServ__FinancialAccount__c>> getAccounts(List<Contact> contacts) 
    {
        List<FinServ__FinancialAccount__c> listAccounts = new List<FinServ__FinancialAccount__c>();
        
        For (Contact currentContact : contacts)
        {
            if (currentContact != null && String.IsNotBlank(currentContact.id))
            {
                List<FinServ__FinancialAccount__c> Accounts = [SELECT Id,FinServ__Balance__c,FinServ__FinancialAccountType__c,FinServ__OpenDate__c,Name FROM FinServ__FinancialAccount__c 
                                    WHERE FinServ__PrimaryOwner__c =: currentContact.AccountId]; 
                if (Accounts != null && Accounts.size() > 0)
                {
                    return new List<List<FinServ__FinancialAccount__c>>{Accounts};
                }
                break;
            }
        }
        
        return new List<List<FinServ__FinancialAccount__c>>{new List<FinServ__FinancialAccount__c>{new FinServ__FinancialAccount__c()}};
    }
}