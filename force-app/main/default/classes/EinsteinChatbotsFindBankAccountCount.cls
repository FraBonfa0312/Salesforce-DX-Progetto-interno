global class EinsteinChatbotsFindBankAccountCount 
{
    @InvocableMethod(label='Einstein Chatbots - Find Bank Account Count For Contact' description='Returns a Count of Bank Accounts for the specified Contact')
    global static List<getCAScActionResult> getCASc(List<Contact> requests)
 
    {
        List<getCAScActionResult> results = new List<getCAScActionResult>();
        for (Contact request : requests) 
        {
            if (request.Id != null)
            {
                 getCAScActionResult result = new getCAScActionResult();
                 try{
					System.debug('Account Id: ' + request.AccountId);
                     result.CASc = [SELECT COUNT() FROM FinServ__FinancialAccount__c 
                                    WHERE FinServ__PrimaryOwner__c =: request.AccountId]; 
                 } catch(DmlException e) {
                     System.debug('The following exception has occurred: ' + e.getMessage());
                     result.CASc = -1;
                 }
                 results.add(result);
                 return results;
             }
             break;
         }
         return new List<getCAScActionResult>();
    }

    global class getCAScActionResult
    {
        @InvocableVariable(required=true)
        global Integer CASc;  
    }
}