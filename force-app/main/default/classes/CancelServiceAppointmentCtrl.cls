public without sharing class CancelServiceAppointmentCtrl {
    public CancelServiceAppointmentCtrl(){}

    
    public static ServiceAppointment getServiceAppointment(Id ServiceAppointmentId){
        ServiceAppointment s1=[SELECT Id,Status,CancellationReason FROM ServiceAppointment WHERE Id=:ServiceAppointmentId];
        return s1;
    }
    @AuraEnabled
    public static Boolean isStatusCanceled(Id ServiceAppointmentId){
        ServiceAppointment s1=getServiceAppointment(ServiceAppointmentId);
        if(s1.Status=='Canceled'){
        return true;
    }
    else {
        return false;
    }
}
    @AuraEnabled
    public static void changeStatus(Id ServiceAppointmentId,String CancellationReason){
        ServiceAppointment s1=getServiceAppointment(ServiceAppointmentId);
        s1.Status='Canceled';
        s1.CancellationReason=CancellationReason;
        update s1;
    }
}