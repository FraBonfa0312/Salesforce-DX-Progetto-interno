({
    dohandleCloseCommentArea: function (component, event, helper) {
        console.log('handleCloseCommentArea');
        component.set('v.showSpinner', true);
        window.setTimeout(
            $A.getCallback(function () {
                component.set('v.showCommentSection', false);
                component.set('v.showSpinner', false);
            }), 200
        );
    },


    fireEvent: function (component, event, helper, action) {
        var onConfirmFromUnderwritingIssue = component.getEvent(
            "onConfirmFromUnderwritingIssue"
        );
        onConfirmFromUnderwritingIssue.setParams({
            action: action
        });
        onConfirmFromUnderwritingIssue.fire();
    },
})