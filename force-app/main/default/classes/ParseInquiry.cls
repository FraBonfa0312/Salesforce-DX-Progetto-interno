global class ParseInquiry implements Messaging.InboundEmailHandler {
    
    global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, Messaging.InboundEnvelope envelope) {
        
        Messaging.InboundEmailResult result = new Messaging.InboundEmailresult();        
        
        //For Trialforcing sake, see if an account called 'Default Inquiries' exists - that's where all emails get routed to
        List<Account> myUWinquiries = [SELECT Id, Name FROM Account WHERE Name = 'Default Inquiries' LIMIT 1];
        
        //Find Insurance Commercial record type for the Opp object, for further processing
        Id myRecordTypeID = Schema.SObjectType.Opportunity.getRecordTypeInfosByDeveloperName().get('Insurance_Commercial').getRecordTypeId();
        
        //Below checks if embedding AI is going to be used
        List<Einstein_Gauge__mdt> myGaugesList = [SELECT Id, DeveloperName, Model_ID__c, AI_Certainty__c FROM Einstein_Gauge__mdt WHERE DeveloperName = 'Einstein_Info' LIMIT 1];
        
        Opportunity myOpportunity = new Opportunity();
        myOpportunity.Name = email.subject; // Name
        myOpportunity.RecordTypeId = myRecordTypeID; // For Insurance Commercial record type
        myOpportunity.StageName = 'Qualification'; // Qualification stage
        myOpportunity.CloseDate = System.today().addDays(60); // 60 days out
        myOpportunity.Description = email.plainTextBody; // Email body - could be in HTML but using default Opp plain text field
        
        //Check if one is using this for pure email handling or if they want to also embed AI
        if(myGaugesList.size() > 0){
            
            //Utilize this custom metadata type that applies to this AI use-case
            Einstein_Gauge__mdt myGauge = myGaugesList.get(0);
            Decimal myGaugeDecimalCertainty = myGauge.AI_Certainty__c / 100;
            
            // Let AI determine next steps - give a decimal for strength of certainty & model ID
            if(!Test.isRunningTest()){
                myOpportunity.NextStep = EinsteinAIcatch.run(email.plainTextBody, myGaugeDecimalCertainty, myGauge.Model_ID__c);             
            }
            
        }        

        
        //Logic is here to add the opportunity from the email body
        if(myUWinquiries.size() > 0){
            //If account called 'Default Inquiries' does exist = make the opportunity under it
            myOpportunity.AccountId = myUWinquiries.get(0).Id; //maps to Default Inquiries account 
            insert myOpportunity;               
            
            //Add attachment if it exists
            if (email.binaryAttachments != null && email.binaryAttachments.size() > 0) {
                for (integer i = 0 ; i < email.binaryAttachments.size() ; i++) {
                    Attachment attachment = new Attachment();
                    attachment.ParentId = myOpportunity.Id;
                    attachment.Name = email.binaryAttachments[i].filename;
                    attachment.Body = email.binaryAttachments[i].body;                    
                    insert attachment;
                }
            }
            
        } else {
            //If account called 'Default Inquiries' doesn't exist = make it and then make the opp for it
            Id defaultAccountRecordTypeID = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Commercial_Account').getRecordTypeId();            
            Account defaultInquiriesAccount = new Account(name = 'Default Inquiries');
            defaultInquiriesAccount.RecordTypeId = defaultAccountRecordTypeID;
            insert defaultInquiriesAccount;
            myOpportunity.AccountId = defaultInquiriesAccount.Id;
            insert myOpportunity;             
            
            //Add attachment if it exists
            if (email.binaryAttachments != null && email.binaryAttachments.size() > 0) {
                for (integer i = 0 ; i < email.binaryAttachments.size() ; i++) {
                    Attachment attachment = new Attachment();
                    attachment.ParentId = myOpportunity.Id;
                    attachment.Name = email.binaryAttachments[i].filename;
                    attachment.Body = email.binaryAttachments[i].body;
                    insert attachment;
                }
            }
        }            
        
        result.success = true;
        return result;
    }
    
}