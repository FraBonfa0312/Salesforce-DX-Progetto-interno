public class INS_AgentNoteEventCtrl {
    @AuraEnabled
    public static Note submitNewNote(String note, String acctId){
        Note newNote = new Note(Title = 'New', Body = note, ParentId = acctId);
        insert newNote;
        updateAccountPersonLifeEvent(note, acctId);
        return newNote;
    }
    
    @AuraEnabled
    public static void updateAccountPersonLifeEvent(String note, string recordId) {
        
        date eventDate;
        eventDate= Date.today();
        
        note = note.toLowerCase();
        Account a = [ SELECT Id, PersonContactId, BillingState, ShippingState FROM Account WHERE Id = :recordId ];
        
        if (note.contains('baby')){
            a.Trigger_Field__c = true;
            a.Recent_Life_Event__c  = 'Baby';
            a.Likelihood_to_Multi_Line__c = 78.97;
            a.Discovery_Outcome__c = 73.4;
            a.Number_of_Life_Events__c = 2;            
            a.Discovery_Explanation__c = '<p>+6.2 Because Recent Claim = True</p><p>-1.31 Because Policy Cycle is Annual</p><p>-1.05 Because Poklicy premium is 710.5 to 981</p><p>+4.3 Because Marital Status is Married</p>';               
            a.Multiline_Explanation__c = '<p>+24.1 Because Recent Life Events =2 and Current LOB = 3</p><p>+6.2 Because Recent Claim = True</p><p>-7.3 Because Insured Terms is 3-5</p>';              
            a.Multiline_Prescription__c = '<p>+10.2 Offer Auto Policy and Discount Review</p><p>+4.4 Include in Multi-Line Marketing Campaign</p><p><br></p>';
            update a;
            
            
            date babyDueDate;
            babyDueDate = Date.today();
            babyDueDate = babyDueDate.addmonths(6);
            
            PersonLifeEvent event = new PersonLifeEvent(Name = system.Label.IDO_NewBaby, PrimaryPersonId = a.PersonContactId, EventType = 'Baby ', EventDate = babyDueDate, IsTentative = true);
            insert event;
            
            
        } 
        
        else if(note.contains('car')) {
            a.Trigger_Field__c = true;
            a.Recent_Life_Event__c  = 'New vehicle';
            a.Likelihood_to_Multi_Line__c = 88.97;
            a.Discovery_Outcome__c = 88.4;
            a.Number_of_Life_Events__c = 2;            
            a.Discovery_Explanation__c = '<p>+6.2 Because Recent Claim = True</p><p>-1.31 Because Policy Cycle is Annual</p><p>-1.05 Because Poklicy premium is 710.5 to 981</p><p>+4.3 Because Marital Status is Married</p>';               
            a.Multiline_Explanation__c = '<p>+24.1 Because Recent Life Events =2 and Current LOB = 3</p><p>+6.2 Because Recent Claim = True</p><p>-7.3 Because Insured Terms is 3-5</p>';              
            a.Multiline_Prescription__c = '<p>+10.2 Offer Auto Policy and Discount Review</p><p>+4.4 Include in Multi-Line Marketing Campaign</p><p><br></p>';
            update a;
            
            PersonLifeEvent event = new PersonLifeEvent(Name = system.Label.IDO_NewCar, PrimaryPersonId = a.PersonContactId, EventType = 'Car ', EventDate = eventDate);
            insert event;
            
        }
        
        
        else if(note.contains('reset')) {
            a.Trigger_Field__c = false;
            a.Likelihood_to_Multi_Line__c = 59.45;
            a.Recent_Life_Event__c  = 'New Job';
            a.Discovery_Outcome__c = 60.4;
            a.Number_of_Life_Events__c = 1;
            a.Discovery_Explanation__c = '<p>+14.3 Because Recent Life Events &gt;1 and Current LOB = 3</p><p>+5.8 Because Recent Claim = True</p><p>-6.8 Because Insured Terms is 3-5</p>';               
            a.Multiline_Explanation__c = '<p>+10.1 Because Recent Life Events =1 and Current LOB = 3</p><p>+6.2 Because Recent Claim = True</p><p>-7.3 Because Insured Terms is 3-5</p>';              
            a.Discovery_Prescription__c = '<p>+4.2 if Billing Cycle is changed to pay-in-full</p><p>+3.85 if offered Auto Policy</p>';
            a.Multiline_Prescription__c = '<p>+4.2 if Billing Cycle is changed to pay-in-full</p><p>+3.85 if offered Auto Policy</p>';
            update a;
            
            /*Remove Baby Life Event from the Account*/
            List<PersonLifeEvent> events = [SELECT Id FROM PersonLifeEvent 
                                            WHERE PrimaryPersonId = :a.PersonContactId
                                            AND EventType in ('Baby', 'Bereavement')];
            
            if (events != null){
                delete events;
            }
            /*Remove any Life Event created today*/
            List<PersonLifeEvent> todaysevents = [SELECT Id FROM PersonLifeEvent 
                                                  WHERE PrimaryPersonId = :a.PersonContactId
                                                  AND CreatedDate = TODAY];
            
            if (todaysevents != null){
                delete todaysevents;
            }
            
            /*Update Alerts to Active*/
            List<FinServ__Alert__c> alerts = [SELECT Id FROM FinServ__Alert__c 
                                              WHERE FinServ__Account__c = :a.Id
                                              AND FinServ__Active__c = FALSE];
            
            if (alerts.size() > 0){
                for(FinServ__Alert__c alert : alerts) {
                    alert.FinServ__Active__c = true;
                    update alert;
                }
            }
            
            
            
            /* Delete any Policies created today. */
            
            List<InsurancePolicy> policies = [SELECT Id FROM InsurancePolicy 
                                              WHERE NameInsuredId = :a.Id
                                              AND CreatedDate = TODAY];
            if (policies != null){
                
               
                List<InsurancePolicyCoverage > coverages = [SELECT Id FROM InsurancePolicyCoverage  
                                              WHERE InsurancePolicyId  IN :policies
                                              AND CreatedDate = TODAY];
                
           		delete coverages;
                delete policies;
            }
            
            /* Delete any Customer Properties created today */
            
            List<CustomerProperty> properties = [SELECT Id FROM CustomerProperty 
                                                 WHERE PrimaryOwnerId = :a.Id
                                                 AND CreatedDate = TODAY];
            if (properties != null){
                delete properties;
            }
            
            /*Delete any Opportunities created today. */
            
            List<Opportunity> opps = [SELECT Id FROM Opportunity 
                                      WHERE AccountId  = :a.Id
                                      AND CreatedDate = TODAY];
            if (opps != null){
                delete opps;
            }
            
            
            
            /*Remove all Newly created Alerts from the Account*/
            List<FinServ__Alert__c> deathAlerts = [SELECT Id FROM FinServ__Alert__c 
                                                   WHERE FinServ__Message__c  = 'Recent Bereavement:'
                                                  ];
            
            
            if (deathAlerts != null){
                delete deathAlerts;
            }  
            
        }
        
        
    }
}