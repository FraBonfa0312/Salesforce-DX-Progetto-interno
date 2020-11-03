public class IDS_PausedFlowsCtrl {

    @AuraEnabled 
    public static List<FlowInterview> getPausedFlows () {
        List<FlowInterview> theFlows = new List<FlowInterview>();
        
        try {
            theFlows = [SELECT CurrentElement,Guid,Id,InterviewLabel,Name,OwnerId,PauseLabel, Owner.Name 
                                        FROM FlowInterview];
        }
        catch(Exception e) {
            System.debug('ERROR:getPausedFlows: '+ e.getMessage() );
        }
        
        return theFlows;
    }
}