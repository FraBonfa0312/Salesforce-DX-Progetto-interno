public without sharing class BdayRMDsCtrl {
    
    @AuraEnabled
    public static List<Contact> doRMDs(String userId, Integer theLimit, Decimal theTreshold, String theRecType) {
        List<Contact> contacts = new List<Contact>();
        try {
            if(theTreshold != 0){
                contacts = [SELECT Birthdate,FinServ__Age__c,Id,Name,OwnerId,Account.FinServ__AUM__c 
                            FROM Contact 
                            WHERE Birthdate != null AND OwnerId =: userId AND RecordType.Name =: theRecType AND Account.FinServ__AUM__c < :theTreshold AND Account.FinServ__AUM__c != 0
                            LIMIT :theLimit];
            }
            else {
                contacts = [SELECT Birthdate,FinServ__Age__c,Id,Name,OwnerId,Account.FinServ__AUM__c 
                            FROM Contact 
                            WHERE Birthdate != null AND OwnerId =: userId AND RecordType.Name =: theRecType AND Account.FinServ__AUM__c != 0
                            LIMIT :theLimit];
            }
            
            System.debug('contacts before: ' + contacts);
            Integer offset = 0;
            for (Contact con : contacts) {
                Date newDate = Date.newInstance( Date.today().year() - 70, Date.today().month(), Date.today().day() );
                System.debug('newDate: ' + newDate);
                con.Birthdate = newDate.addDays( Integer.valueOf( Math.floor(Math.random() * 8 + 1) - 90) );
                System.debug('con.Birthdate: ' + con.Birthdate);

            }
            System.debug('contacts after: ' + contacts);
            update contacts;

        }
        catch(Exception e) {
            System.Debug('ERROR:getUsers,' + e.getMessage());
        }
        return contacts;
    }
    
    
    @AuraEnabled
    public static List<Contact> doBirthdays(String userId, Integer theLimit, String theRecType) {
        
        List<Contact> contacts = new List<Contact>();
        try {
        	contacts = [SELECT Birthdate,FinServ__Age__c,Id,Name,OwnerId 
                        FROM Contact 
                        WHERE Birthdate != null AND OwnerId =: userId AND RecordType.Name =: theRecType
                       	LIMIT :theLimit];
            Integer offset = 0;
            System.debug('contacts before: ' + contacts);
            for (Contact con : contacts) {
                
                Date newDate;
                
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
            System.debug('contacts after: ' + contacts);
            update contacts; 
        }
        catch(Exception e) {
            System.Debug('ERROR:getUsers,' + e.getMessage());
        }
        return contacts;
    }
    
    @AuraEnabled
    public static List<User> getUsers() {
        
        List<User> users = new List<User>();
        
        try {
            users = [SELECT Alias,Id,IsActive,Name,UserType 
                     FROM User 
                     WHERE IsActive = True AND UserType = 'Standard'
                     ORDER BY Name];
            // SELECT Alias,Id,IsActive,Key_User__c,Name,UserType 
            // WHERE Key_User__c = True AND IsActive = True AND UserType = 'Standard'
        }
        catch(Exception e) {
            System.Debug('ERROR:getUsers,' + e.getMessage());
        }
        
        return users;
    }
}