public class INS_ActionTemplateList {
@AuraEnabled
    
    public static List<ActionPlanTemplateVersion> getTemplates(String recordId, String actionPlanType) {
       
        String q = 'SELECT ActionPlanTemplateVersionId, ActionPlanType FROM ActionPlan WHERE TargetId = :recordId';
        if(String.isNotBlank(actionPlanType)){
            q += ' AND ActionPlanType = :actionPlanType';
        }
        
        List<ActionPlan> activeTemplates = Database.query(q);
        
        Set<String> tempalateIds = new Set<String>();
        
        for (ActionPlan ap:activeTemplates) {
            tempalateIds.add(String.valueOf(ap.ActionPlanTemplateVersionId));
        }
        
        List<ActionPlanTemplateVersion> templates = new List<ActionPlanTemplateVersion>();
        
        templates = [ SELECT Id, Name, ActionPlanTemplate.Description, Status, Version, (SELECT Name, IsRequired FROM ActionPlanTemplateItems Order by IsRequired desc) 
                      FROM ActionPlanTemplateVersion WHERE Id NOT IN :tempalateIds AND Status = 'Final'];
        system.debug(templates);
        return templates;
    
    }

    

    
    private static Boolean isNullOrEmpty(String str) {
        return str == NULL || str == '';
    }

    @AuraEnabled
    public static ActionPlan createActionPlan(String planName, Date startDate, String targetId, String templateId, String ownerId){

        try{
            ActionPlan ap = new ActionPlan();
            ap.Name = planName;
            ap.StartDate = startDate;    
            ap.ActionPlanType = 'Industries';   
            ap.ActionPlanState = 'Not Started'; 
            ap.ActionPlanTemplateVersionId = templateId;
            ap.TargetId = targetId;
            ap.OwnerId = ownerId;
            insert ap;
            return ap; 
        } catch(Exception e){
            return null;  
        }    
    }
}