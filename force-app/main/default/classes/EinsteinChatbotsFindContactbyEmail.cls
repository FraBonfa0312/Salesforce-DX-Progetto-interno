global class EinsteinChatbotsFindContactbyEmail
{
    @InvocableMethod(label='Einstein Chatbots - Find Contact By Email' description='Returns a Contact for the specified Email')
    global static List<Contact> findContactFromEmail(List<string> requests) 
    {
        List<Contact> results = new List<Contact>();
        for (string request : requests) 
        {
            if (String.IsNotBlank(request))
            {
                Contact newContact = findContactFromEmail(request);
                if (newContact != null && string.isNotBlank(newContact.Id))
                {
                    results.add(findContactFromEmail(request));   
                }
            }      
        }
        if (results.size() == 0) 
        {
            return new List<Contact>{new Contact()};
        }
        return results;
    }
    
    public static Contact findContactFromEmail(string request) 
    {
        LIST<Contact> newContact = [SELECT Id, FirstName, LastName, Email, Phone, Title, MailingAddress, AccountId FROM Contact WHERE Email =: request LIMIT 1];      
        
        if (newContact != null && newContact.size() > 0) {
            return newContact[0];
        } else {
            return new Contact();
        }
    }
}