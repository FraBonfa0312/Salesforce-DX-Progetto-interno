({
    doInit : function(component, event, helper) {    
        
		const json = JSON.stringify({
            "AdditionalInformation":component.get("v.Additional"),
            "Comments":component.get("v.Comments"),
            "AppointmentType": [
    component.get("v.AppointmentType")
  ],
            "ParentRecordId":component.get("v.ParentRecordId"),
            "ServiceTerritoryId":component.get("v.ServiceTerritoryId"),
            "ServiceResourceId":component.get("v.ServiceResourceId"),
            "WorkTypeGroupId":component.get("v.WorkTypeGroupId"),
            "Street":component.get("v.Street"),   
            "City":component.get("v.City"),   
            "State":component.get("v.State"),
            "PostalCode":component.get("v.PostalCode"),
            "Country":component.get("v.Country"),
            "SchedStartTime":component.get("v.SchedStartTime"),
            "SchedEndTime":component.get("v.SchedEndTime"),
            "Description":component.get("v.Description"),
            "Subject":component.get("v.Subject"),
            "Phone":component.get("v.Phone"),
            "Email":component.get("v.Email"),
            "ContactId":component.get("v.ContactId"),
            "isSlotChanged": false});
        
        component.set("v.AppointmentFields", json);
        

console.log(component.get("v.AppointmentFields"));     
        
    }
})