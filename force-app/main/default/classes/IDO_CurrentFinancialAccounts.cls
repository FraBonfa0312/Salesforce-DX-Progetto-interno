public class IDO_CurrentFinancialAccounts {

    public List<FinServ__FinancialAccount__c> myle{get;set;}
    public List<FinServ__FinancialAccount__c> leList{get;set;}
    
    public class IDO_RecordTypeTracker implements Comparable {
        @auraEnabled
        public String imageUrl;   
        @auraEnabled
        public Datetime expireDate;        
        @auraEnabled
        public String recordName;
        @auraEnabled
        public String status;
        
        public Integer compareTo(Object obj) {
            IDO_RecordTypeTracker trackerObj =  (IDO_RecordTypeTracker)obj;
            
            Integer ret = trackerObj.status.compareTo(this.status);
            if (ret != 0) {
                return -ret;
            } else {
                if (trackerObj.expireDate < this.expireDate) {
                    return 1;
                } else if (trackerObj.expireDate > this.expireDate) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }
    
    @auraEnabled
    public static List<IDO_RecordTypeTracker> getRecordTypes(String recordId, integer numberToShow) {
        List<IDO_RecordTypeTracker> trackers = new List<IDO_RecordTypeTracker>();
        List<FinServ__FinancialAccount__c> allRecordTypes 
            = [SELECT Id,RecordType.Name,Name,FinServ__RenewalDate__c 
               FROM FinServ__FinancialAccount__c               
               WHERE FinServ__PrimaryOwner__c = :recordId
               AND FinServ__Status__c = 'Open'
              ];
        
        Map<String, List<FinServ__FinancialAccount__c>> eventMap = new Map<String, List<FinServ__FinancialAccount__c>>();
        for (FinServ__FinancialAccount__c le : allRecordTypes) {
            if (eventMap.containsKey(le.RecordType.Name) == false) {
                List<FinServ__FinancialAccount__c> accountList = new List<FinServ__FinancialAccount__c>();
                eventMap.put(le.RecordType.Name, accountList);
            }
            eventMap.get(le.RecordType.Name).add(le);
        }       
        
        List<RecordType> accountTypes = getAccountTypes(numberToShow);
        
        for (RecordType accountType : accountTypes) {
            
            IDO_RecordTypeTracker tracker = new IDO_RecordTypeTracker();
            tracker.recordName = accountType.Name;
            
            tracker.imageUrl  = '/resource/accountTypes/' + accountType.Name.replace(' ', '_') + '.png'; 
            tracker.status = 'inactive';           
            
            if (eventMap.containsKey(accountType.Name)) {
                FinServ__FinancialAccount__c le = eventMap.get(accountType.Name)[0];
               
                tracker.expireDate  = le.FinServ__RenewalDate__c;               
                tracker.status = (tracker.expireDate == NULL) ? 'inactive' : 'active';                
            }
            
            
            trackers.add(tracker);
        }
        trackers.sort();
        
        return trackers;
    }
    
    private static List<RecordType> getAccountTypes(integer numberToShow) {
        List<RecordType> recordTypeList = [SELECT Name 
                                           FROM RecordType 
                                           WHERE SobjectType = 'FinServ__FinancialAccount__c'
                           
                                           ORDER BY Name ASC NULLS FIRST 
                                           LIMIT : numberToShow ];
        
        return recordTypeList;
    }    
    
}