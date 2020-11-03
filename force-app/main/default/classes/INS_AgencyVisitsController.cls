global with sharing class INS_AgencyVisitsController {
    global class initAgencyVisitsData {
        @AuraEnabled
        global List<ServiceAppointment> allVisits;
        @AuraEnabled
        global List<ServiceAppointment> visitsToday;
        @AuraEnabled
        global List<ServiceAppointment> visitsTomorrow;
        @AuraEnabled
        global Integer totalVisits;
        @AuraEnabled
        global Integer completedVisits;
        @AuraEnabled
        global Integer remaningVisits;
    }

    @AuraEnabled
    global static String getAgencyVisits(Integer daysAgo) {
        initAgencyVisitsData initData = new initAgencyVisitsData();
        List<ServiceAppointment> saList = new List<ServiceAppointment>();
        Id userId = UserInfo.getUserId();

        TimeZone tz = UserInfo.getTimeZone();
        DateTime dt = Datetime.now();
        DateTime now = dt.addSeconds((tz.getOffset(dt)/1000));
        Date today = date.newinstance(now.year(), now.month(), now.day());

        Date xDaysAgo = daysAgo == null ? today.addDays(-90) : today.addDays(0 - daysAgo);

        saList = [SELECT Id, DueDate, Status, Subject, SchedStartTime, SchedEndTime,
                         AccountId, Account.Name, Account.Discovery_Score__c, ContactId, 
                         WorkTypeId, WorkType.Name, ParentRecordId, AppointmentNumber, OwnerId 
                  FROM ServiceAppointment
                  // WHERE OwnerId = :userId
                  WHERE SchedStartTime >= :xDaysAgo
                  ORDER BY SchedStartTime DESC];  

        initData.allVisits = saList;
        initData.visitsToday = getVisitsForDay(saList, today);
        initData.visitsTomorrow = getVisitsForDay(saList, today.addDays(1));
        initData.totalVisits = saList.size();
        initData.completedVisits = getCompletedVisits(saList);
        initData.remaningVisits = initData.totalVisits - initData.completedVisits;
        
        return JSON.serialize(initData);
    }

    private static List<ServiceAppointment> getVisitsForDay(List<ServiceAppointment> saList, Date day) {
        List<ServiceAppointment> visitsForDay = new List<ServiceAppointment>();

        for(ServiceAppointment sa : saList) {
            Date scheduledDate = date.newinstance(sa.SchedStartTime .year(), sa.SchedStartTime .month(), sa.SchedStartTime .day());
            System.debug('Day: ' + day);
            System.debug('Sched Date: ' + sa.SchedStartTime);
            if(scheduledDate == day) {
                visitsForDay.add(sa);
            }
        }

        return visitsForDay;
    }

    private static Integer getCompletedVisits(List<ServiceAppointment> saList) {
        Integer completed = 0;

        for(ServiceAppointment sa : saList) {
            if(sa.Status == 'Completed') {
                completed++;
            }
        }

        return completed;
    }
}