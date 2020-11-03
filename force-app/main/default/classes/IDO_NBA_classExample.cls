global class IDO_NBA_classExample {
    
    global class NBAResponse {
        @InvocableVariable
        global Integer numCases;
        @InvocableVariable
        global Integer getWonOppties;
        @InvocableVariable
        global Integer openCases;
        @InvocableVariable
        global Integer meetings;
        @InvocableVariable
        global boolean noAgendas;
        @InvocableVariable
        global string meetingId;
         @InvocableVariable
        global string daysToMeeting;
    }
    
    global class NBAInput {
        @InvocableVariable
        global String recordId;
    }
    
    @InvocableMethod(label='NBA Connection' description='Return variables for NBA check')
    global static List<NBAResponse> getNBAResults(List<NBAInput> inputs) {
        List<NBAResponse> responses = new List<NBAResponse>();
        
        for(NBAInput input : inputs) {
            NBAResponse response = new NBAResponse();
            
            response.numCases = getNumberOfCases(input.recordId); // Call method to get number of cases
            response.getWonOppties = getWonOppties(input.recordId); // Call method to get number of policies
            response.openCases = getNewCases(input.recordId); // Call method to get cases created today
            response.meetings = getMeetings(input.recordId); // Call method to get cases created today
            response.meetingId = getMeetingId(input.recordId).meetingId; // Call method to get cases created today
            response.daysToMeeting = getMeetingId(input.recordId).daysToMeeting; // Call method to get cases created today
            response.noAgendas = getMeetingId(input.recordId).hasAgenda; // Call method to get cases created today
            responses.add(response);
        }
        
        return responses;
    }
    
    private static Integer getNumberOfCases(String accountId) {
        date casePeriod;
        casePeriod = Date.today();
        casePeriod = casePeriod.adddays(-5);
        List<Case> cases = [SELECT Id FROM Case WHERE AccountId = :accountId 
                            AND IsEscalated = True 
                            AND CreatedDate <= :casePeriod]
            ;
        return cases.size();        
    }
    
    private static Integer getNewCases(String accountId) {
        date casePeriod;
        casePeriod = Date.today();
        casePeriod = casePeriod.adddays(1);   
        List<Case> cases = [SELECT Id FROM Case WHERE AccountId = :accountId
                            AND Status = 'FNOL'
                            
                            AND CreatedDate <= :casePeriod]
            ;
        return cases.size();       
        
    }
    
        public static Integer getWonOppties(String accountId) {
        date oppPeriod;
        oppPeriod = Date.today();
        oppPeriod = oppPeriod.addmonths(-6);
        List<AggregateResult> groupedResults =
            [select sum(Amount)sumAmount FROM Opportunity WHERE AccountId = :accountId AND IsWon = TRUE AND CreatedDate >= :oppPeriod];
        return Integer.valueOf(groupedResults[0].get('sumAmount'));
    }
    
    
  // Get the number of meetings that you have scheduled at this account in the next 28 days
    
    public static Integer getMeetings(String accountId) {
        date meetingPeriod;
        meetingPeriod = Date.today();
        meetingPeriod = meetingPeriod.adddays(28);   
        List<ServiceAppointment> ServiceAppointments = [SELECT Id FROM ServiceAppointment WHERE AccountId = :accountId 
                                                        AND SchedStartTime <= :meetingPeriod
                                                        AND SchedStartTime >= TODAY ]
            ;
        return ServiceAppointments.size();    
    }
    
    // Get the number of meetings with no Agendas that you have scheduled at this account in the next 28 days
    
    public static Integer getnoAgendas(String accountId) {
        date meetingPeriod;
        meetingPeriod = Date.today();
        meetingPeriod = meetingPeriod.adddays(28);   
        List<ServiceAppointment> ServiceAppointments = [SELECT Id FROM ServiceAppointment WHERE AccountId = :accountId 
                                                        AND Has_Agenda__c = False
                                                        AND SchedStartTime <= :meetingPeriod
                                                        AND SchedEndTime >= TODAY ]
            ;
        return ServiceAppointments.size();    
    }
    
// Get the next meeting of meetings that you have scheduled at this account in the next 28 days
    public class meetingDetails{
        public String meetingId;
        public String daysToMeeting;
        public Boolean	hasAgenda;
    }
    
    
    public static meetingDetails getMeetingId(String accountId) {
        
        meetingDetails  md = new meetingDetails();
        md.hasAgenda = false;
        
        List<ServiceAppointment> serviceAppointments = [ SELECT Id, SchedStartTime, Has_Agenda__c FROM ServiceAppointment WHERE AccountId = :accountId 
                                               //  AND SchedStartTime <= :meetingPeriod
                                                 AND SchedEndTime >= TODAY
                                                 ORDER BY SchedStartTime ASC];
        
        string meetingDate;
        string appointmentId;
        Integer timeToMeeting;
        
        System.Debug(serviceAppointments.size());
        if (serviceAppointments.size() > 0) {                         
            meetingDate = (serviceAppointments[0].SchedStartTime.year()+'-'+serviceAppointments[0].SchedStartTime.month()+'-'+serviceAppointments[0].SchedStartTime.day());
            timeToMeeting = (system.today()).daysBetween(Date.valueOf(meetingDate));
            appointmentId = serviceAppointments[0].Id;
            md.hasAgenda = serviceAppointments[0].Has_Agenda__c;
            
            if ( timeToMeeting <= 1 ){
                md.daysToMeeting = ' Today';
            }
            else { 
                md.daysToMeeting = (' in ' + String.valueOf(timeToMeeting) + ' days');
            }
            
        } else {
            md.daysToMeeting = ', You have no meeting scheduled';
            appointmentId = null;
        }

        md.meetingId = appointmentId;
        
        return md;
        
            
    }
    
    
}