public without sharing class IDO_BdayRMDcard_Ctrl {
    
    @AuraEnabled
    public static List<Contact> doRMDs(Integer theLimit) {
        System.debug('theLimit: ' + theLimit);
        Integer intLimit = Integer.valueof(theLimit);
        List<Contact> contacts = new List<Contact>();
        try {
            
            contacts = [SELECT Birthdate,FinServ__Age__c,Id,Name,OwnerId,Account.FinServ__AUM__c,Account.FinServ__ClientCategory__c 
                        FROM Contact 
                        WHERE Account.RecordType.Name = 'FSC Person Accounts' AND LastName != 'Adams'
                        LIMIT :intLimit OFFSET 20];

            System.debug('contacts before: ' + contacts);
            Integer offset = 0;
            for (Contact con : contacts) {
                Date newDate = Date.newInstance( Date.today().year() - 70, Date.today().month(), Date.today().day() );
                System.debug('newDate: ' + newDate);
                con.Birthdate = newDate.addDays( Integer.valueOf( Math.floor(Math.random() * 8 + 1) - 90) );
                System.debug('con.Birthdate: ' + con.Birthdate);

            }
            System.debug('contacts after: ' + contacts);
            // update contacts;

        }
        catch(Exception e) {
            System.Debug('ERROR:doRMDs,' + e.getMessage());
        }
        return contacts;
    }
    
    
    @AuraEnabled
    public static List<Contact> doBirthdays(Integer theLimit) {
        Integer intLimit = Integer.valueof(theLimit);
        List<Contact> contacts = new List<Contact>();
        try {
        	contacts = [SELECT Birthdate,FinServ__Age__c,Id,Name,OwnerId, Account.FinServ__ClientCategory__c  
                        FROM Contact 
                        WHERE Account.RecordType.Name = 'FSC Person Accounts' AND LastName != 'Adams'
                       	LIMIT :intLimit];
            Integer offset = 0;
            System.debug('contacts before: ' + contacts);
            for (Contact con : contacts) {
                
                Date newDate;
                
                if(con.Birthdate != null){
                    if(con.Birthdate.year() < 1920) {
                        //newDate = newDate.addYears(Integer.valueOf( Math.floor(Math.random() * 10 + 2) ) - 20); 
                        newDate = Date.newInstance( con.Birthdate.year() + Integer.valueOf( Math.floor(Math.random() * 30 + 15) ), Date.today().month(), Date.today().day() );
                    }
                    else {
                        newDate = Date.newInstance( con.Birthdate.year() - Integer.valueOf( Math.floor(Math.random() * 15 + 2) ), Date.today().month(), Date.today().day() );
                    }
    
                    System.debug('newDate Year: ' + newDate.year() );
                    
                    con.Birthdate = newDate.addDays( Integer.valueOf( Math.floor(Math.random() * 8 + 1) ) ); 
                }
                else {
                    con.Birthdate = Date.newInstance( 1930 + Integer.valueOf( Math.floor(Math.random() * 30 + 15) ), Date.today().month(), Date.today().day() );
                    // newDate = Date.newInstance( con.Birthdate.year() + Integer.valueOf( Math.floor(Math.random() * 30 + 15) ), Date.today().month(), Date.today().day() );
                }
 
            }
            System.debug('contacts after: ' + contacts);
            // update contacts; 
        }
        catch(Exception e) {
            System.Debug('ERROR:doBirthdays,' + e.getMessage());
        }
        return contacts;
    }
    
}