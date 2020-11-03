({
    submitTheNote : function(component, event, helper) {
        console.log('controller.submitTheNote');
        helper.callServer(
            component,
            "c.submitNewNote",
            function (response) {
                helper.showToast('Success', 'Note was created successfully!', 'success');
                component.set('v.note', '');
                               
                // Refresh NextBestOffer component
                var appEvent = $A.get("e.c:INS_RefreshEvent");
                appEvent.fire();
                
              // helper.reloadPage(component);     
                $A.get('e.force:refreshView').fire();
            },
            { 
                'note'   : component.get('v.note'),
                'acctId' : component.get('v.recordId') 
            }
        );
                   
    },
    
})