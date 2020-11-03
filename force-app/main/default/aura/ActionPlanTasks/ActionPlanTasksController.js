({
	doInit : function(component, event, helper) {
        var action = component.get('c.getActionPlanTasks');
        action.setParams({
            'actionPlanId': component.get('v.recordId')
        });
        action.setCallback(this, function(res){
            var state = res.getState();
            if(state === 'SUCCESS'){
                var rVal = res.getReturnValue();
                //console.log(rVal);
                for(var i=0; i<rVal.length; i++){
                    var cTask = rVal[i];
                    var todayDate = new Date();
                    todayDate = $A.localizationService.formatDate(todayDate,"M/DD/YYYY");
                    var taskActivityDate = cTask.ActivityDate;
                    var dateText;
                    var cTaskStatus = cTask.Status
                    if($A.localizationService.isBefore(taskActivityDate, todayDate)){
                        if(cTaskStatus != 'Completed'){
                            dateText = '<div class="todatOrOverdue">'+$A.localizationService.formatDate(taskActivityDate,"M/DD/YYYY")+'</div>';
                        }else{
                            dateText = '<div>'+$A.localizationService.formatDate(taskActivityDate,"M/DD/YYYY")+'</div>';
                        }
                    }else if($A.localizationService.isAfter(taskActivityDate, todayDate)){
                        dateText = '<div>'+$A.localizationService.formatDate(taskActivityDate,"M/DD/YYYY")+'</div>';
                    }else if($A.localizationService.isSame(taskActivityDate, todayDate)){
                        if(cTaskStatus != 'Completed'){
                            dateText = '<div class="todatOrOverdue">Today</div>';
                        }else{
                            dateText = '<div>'+$A.localizationService.formatDate(taskActivityDate,"M/DD/YYYY")+'</div>';
                        }
                    }
                    rVal[i].CustomFormattedActivityDate = dateText;
                    rVal[i].Custom_FormattedActivityDate = $A.localizationService.formatDate(taskActivityDate,"M/DD/YYYY");
                }
                component.set('v.tasks', rVal);
            }else if(state === 'ERROR'){
                console.log(res.getError()[0]);
            }else{
                console.log(state);
            }
        });
        $A.enqueueAction(action);
    },
    rowSelected : function(component, event, helper){
        var curretIdx = parseInt(event.currentTarget.dataset.indexvar);
        component.set('v.currentSelectedRow', curretIdx);
        component.set('v.currentTask', component.get('v.tasks')[curretIdx]);
    },
    changeTaskStatus : function(component, event, helper){
        var evtSrc = event.getSource();
        var taskIdx = evtSrc.get('v.name');
        var tasks = component.get('v.tasks');        
        var cTask = tasks[taskIdx];    
        var isChecked = evtSrc.get('v.checked');
        var action = component.get('c.updateTask');
        
        var cStatus = cTask.Status;
        var cpStatus = cTask.PreviousStatus;
        
        if(cTask.Status == 'Completed' && $A.util.isUndefinedOrNull(cTask.PreviousStatus)){
			helper.modalHelper(component, 'srModal', 'modalBkdrp', true);
        }else{
            if(!isChecked){
                if(!cTask.PreviousStatus){
                    cTask.PreviousStatus = cTask.Status;    
                }
                cTask.Status = 'Completed';  
                action.setParams({
                    'taskId': cTask.Id,
                    'taskStatus' : 'Completed'
                });
                console.log('sending >>> Completed');
            }else{
                cTask.Status = cTask.PreviousStatus;
                action.setParams({
                    'taskId': cTask.Id,
                    'taskStatus' : cTask.PreviousStatus
                });
                console.log('sending >>> '+ cTask.PreviousStatus);
            }
            tasks[taskIdx] = cTask;
            component.set('v.currentSelectedRow', taskIdx);
            component.set('v.currentTask', tasks[taskIdx]);
            component.set('v.tasks', tasks);
            action.setCallback(this, function(res){
                var state = res.getState();
                if(state === 'SUCCESS'){
                    var rVal = res.getReturnValue();
                    console.log(cTask.Id);
                }else if(state === 'ERROR'){
                    cTask.Status = cTask.PreviousStatus;
                    tasks[taskIdx] = cTask;
                    component.set('v.currentTask', tasks[taskIdx]);
                    component.set('v.tasks', tasks);
                }else{
                    console.log(state);
                }
            });
            $A.enqueueAction(action);
        }
        
    },
	closeModal : function(component, event, helper) {
        helper.modalHelper(component, 'srModal', 'modalBkdrp', false);
        helper.uncheckRadios(component,'statusRadio');
    },
    statusChosen : function(component, event, helper) {
        component.set('v.chosenValue', event.getSource().get('v.value'));
    },
    saveStatusToTask : function(component, event, helper) {
        helper.modalHelper(component, 'srModal', 'modalBkdrp', false);
        
        var tasks = component.get('v.tasks');
        var taskIdx = component.get('v.currentSelectedRow');
        var cTask = tasks[taskIdx];
        
        cTask.Status = component.get('v.chosenValue');
        tasks[taskIdx] = cTask;
        component.set('v.currentSelectedRow', taskIdx);
        component.set('v.tasks', tasks);
        
        var action = component.get('c.updateTask');
        action.setParams({
            'taskId': cTask.Id,
            'taskStatus' : cTask.Status
        });
        action.setCallback(this, function(res){
            var state = res.getState();
            if(state === 'SUCCESS'){
                var rVal = res.getReturnValue();
                console.log(cTask.Id);
            }else if(state === 'ERROR'){
                cTask.Status = 'Completed';
                tasks[taskIdx] = cTask;
                component.set('v.currentTask', tasks[taskIdx]);
                component.set('v.tasks', tasks);
            }else{
                console.log(state);
            }
        });
        $A.enqueueAction(action);
        helper.uncheckRadios(component,'statusRadio');
    }
})