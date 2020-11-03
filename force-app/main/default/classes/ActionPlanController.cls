public with sharing class ActionPlanController{

    @AuraEnabled
    public static List<Action_Plan_Template__c> getActionPlanTemplates(){
        return [Select Id, Name, First_Two_Letters__c, Color__c from Action_Plan_Template__c];
    }
    
    @AuraEnabled
    public static id createActionPlan(string accountId, string templateId, string templateName){
		List<Action_Plan_Task__c> planTaskList = [Select Id, Name, Assigned_To__c, Compliance_Required__c, Days_to_Complete__c, Notes__c, OwnerId from Action_Plan_Task__c where Action_Plan_Template__c =: templateId];  
        Action_Plan__c ap = new Action_Plan__c();
        ap.Name = templateName;
        ap.Client__c = accountId;
        ap.Action_Plan_Template__c = templateId;
        insert ap;
        
        List<Task> taskLst = new List<Task>();
        for(Action_Plan_Task__c apt : planTaskList){
            Task tsk = new task();
            tsk.WhatId = ap.Id;
            tsk.Subject = apt.Name;
            tsk.Assigned_To__c = apt.Assigned_To__c;
            tsk.Compliance_Required__c = apt.Compliance_Required__c;
            tsk.Description = apt.Notes__c;
            tsk.ActivityDate = Date.today().addDays(Integer.valueOf(apt.Days_to_Complete__c));
           	taskLst.add(tsk);
        }
        insert taskLst;
        return ap.Id;
    }
    
    @AuraEnabled
    public static List<Task> getActionPlanTasks(string actionPlanId){
        return [Select Id, Subject, Assigned_To__c, Type, Priority, Compliance_Required__c, Status, Description, ActivityDate from Task where WhatId =: actionPlanId];
    }
    
    @AuraEnabled
    public static boolean updateTask(Id taskId, string taskStatus){
        Task t = new task();
        t.Id = taskId;
        t.Status = taskStatus;
        update t;
        return true;
    }
    
}