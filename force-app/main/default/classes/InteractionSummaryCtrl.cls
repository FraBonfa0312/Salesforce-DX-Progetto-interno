public class InteractionSummaryCtrl {
    
    @AuraEnabled
    public static List<InteractionReportEvent> retrieveInteractionReports(String summaryId){
        system.debug('****summaryId' +summaryId);
        
        List<InteractionReportEvent> irWrappers = new List<InteractionReportEvent>();
        List<Interaction_Report__c> irList = new List<Interaction_Report__c>([SELECT Quip_Document__c ,NAME, Name__c,LASTMODIFIEDDATE, CREATEDBY.NAME, CREATEDBY.ID, ID, REPORT_STATUS__C,
                                        (SELECT id, EventWhoIds, Location , StartDateTime , Subject, EndDatetime from events)
                                        FROM INTERACTION_REPORT__C WHERE Interaction_Summary__c =:summaryId]);
        irWrappers = prepareWrapperReports(irList);
        return irWrappers;
    }
    public static List<InteractionReportEvent> prepareWrapperReports(List<Interaction_Report__c>  irList){
         List<InteractionReportEvent> irWrappers = new List<InteractionReportEvent>();
         Set<id> conIds = new Set<id>();
        map<Interaction_Report__c, List<id>> reportConMap = new Map<Interaction_Report__c,list<id>>();
        for(Interaction_Report__c ir : irList){
            for(Event e : ir.events){
                conIds.addall(e.eventwhoids);
            }                                 
        }
        Map<id,contact> conMap = new Map<id,contact>();
        for(Contact c : [select id, name from contact where id in: conIds]){
            conMap.put(c.id, c);
        }
        
        for(Interaction_Report__c ir : irList){
            List<Contact> invitees = new List<Contact>();
            event[] evts = ir.events;
            Interaction_Report__c ireport = ir;
            for(Event e : ir.events){
                for(Id recid : e.eventWhoIds){
                    if(conMap.containsKey(recid)){
                        invitees.add(conMap.get(recid));
                    }
                }
            }

            irWrappers.add(new InteractionReportEvent(ireport, ir.events, invitees));

        }
        system.debug('*****iWrappers' +json.serialize(irwrappers));
        return irWrappers;
    }
    
    @AuraEnabled
    public static List<InteractionReportEvent> searchReports(String summaryId, String searchText){
        system.debug('summaryId*****' +summaryId);
        system.debug('searchText****' +searchText);
        List<InteractionReportEvent> irWrappers = new List<InteractionReportEvent>();
        List<Interaction_Report__c> irList = new List<Interaction_Report__c>();
        if(searchText == ''){
            irList = [SELECT NAME, Name__c,LASTMODIFIEDDATE, CREATEDBY.NAME, CREATEDBY.ID, ID, REPORT_STATUS__C,
                                        (SELECT id, EventWhoIds, Location , StartDateTime , Subject, EndDatetime from events)
                                        FROM INTERACTION_REPORT__C WHERE Interaction_Summary__c =:summaryId
                                        ];
        }else{
        searchText = '%'  + searchText + '%';
        irList = [SELECT NAME, Name__c,LASTMODIFIEDDATE, CREATEDBY.NAME, CREATEDBY.ID, ID, REPORT_STATUS__C,
                                        (SELECT id, EventWhoIds, Location , StartDateTime , Subject, EndDatetime from events)
                                        FROM INTERACTION_REPORT__C WHERE Interaction_Summary__c =:summaryId
                                        and Name__c like :searchText];
        
        }
        irWrappers = prepareWrapperReports(irList);
        return irWrappers;
    }
    @AuraEnabled
    public static Interaction_Summary__c getSummary(String accountId){
        return [SELECT Last_Interaction__c, Next_Interaction__c, Recommended_Activity__c, What_Supports_This_Insight__c
                FROM INTERACTION_SUMMARY__C 
                WHERE ACCOUNT__C = :ACCOUNTID][0];
    }
    
    public Class InteractionReportEvent{

        @AuraEnabled public Interaction_Report__c report{get;set;}
        @AuraEnabled public List<Event> evts{get;set;}
        
        @AuraEnabled public List<Contact> cons{get;set;}
        public InteractionReportEvent(Interaction_Report__c report,  Event[] evts, contact[] cons){
            this.report = report;
            this.evts = evts;
            this.cons = cons;
        }
    }

}