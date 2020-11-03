({
    handleShowCommentArea: function (component, event, helper) {
        console.log('handleShowCommentArea');
        component.set('v.showCommentSection', true);
    },
    handleConfirm: function (component, event, helper) {
        console.log('handleConfirm');
        helper.fireEvent(component, event, helper, 'finish');
        component.set('v.showReviewMessage', true);
        component.set('v.showCommentSection', false);
    },

    handleClickWithdrawQuote: function (component, event, helper) {
        console.log('Underwriting screen - handleClickWithdrawQuote');
        component.set('v.showCommentSection', true);
        component.set('v.showReviewMessage', false);
    },

})