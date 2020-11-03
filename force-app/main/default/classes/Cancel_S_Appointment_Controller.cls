public class Cancel_S_Appointment_Controller {    
    public ServiceAppointment currentRecord{get; set;}
    
   
    public void cancelMethod()
    {
        currentRecord = [SELECT Id, status FROM ServiceAppointment WHERE Id = :ApexPages.currentPage().getParameters().get('id')];
        currentRecord.status = 'Canceled';
        update currentRecord;
    }
}