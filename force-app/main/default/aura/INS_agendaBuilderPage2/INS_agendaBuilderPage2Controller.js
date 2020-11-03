({
    doInit: function (component, event, helper) {
        var topics = component.get("v.agendaTopics");
        var form = component.find('secondHalf');
        topics.push(
            //{ Title: 'Cyber II Enablement' }
            // { Title: 'Book of Business Review' }
        );
        // component.set("v.agendaTopics", topics);
    },

    createNew: function (component, event, helper) {
        var topics = component.get("v.agendaTopics");
        var myObj = component.get("v.tempTopic");
        if (!myObj.Title) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Negative, Ghost Rider",
                "type": "error",
                "message": "We need some info before creating an agenda item."
            });
            toastEvent.fire();
            return;
        } else {
            topics.push(myObj);
            component.set("v.agendaTopics", topics);
            component.set("v.tempTopic", "");
        }
        // console.log(myObj);
    },

    unhideform : function(component, event, helper) {
        // var form = component.find('secondHalf');
        // $A.util.removeClass(form, 'slds-hidden');
        var target = component.find('addTopicButton');
        var form = component.get("v.isShowing");
        // thinking about some conditions here, not super urgent
        component.set("v.isShowing", true);
        $A.util.addClass(target, 'slds-hide');
    },

    // unhideform : function(component, event, helper) {
    //     // var form = component.find('secondHalf');
    //     // $A.util.removeClass(form, 'slds-hidden');
    //     var form = component.get("v.isShowing");
    //     if(form == true){
    //         component
    //     }
    //     component.set("v.isShowing", true);
    // },

    // addTopicButton

    // toggleSection: function (component, event, helper) {
    //     console.log('toggle');
    //     var iconName = component.get("v.filterIconName");
    //     if (iconName == 'utility:chevronright') {
    //         component.set("v.toggleClass", "slds-is-open")
    //         component.set("v.filterIconName", "utility:switch");
    //     }
    //     else {
    //         component.set("v.toggleClass", "slds-is-close")
    //     }
    // },

    handleFilesChange: function (component, event, helper) {
        alert("file attached");
    }

    // { 
    //     Title: 'Lang Associates', 
    //     healthScore: '94', 
    //     badgeText: 'Product Enablement', 
    //     badgeClass: 'good', 
    //     image: '', 
    //     trend: 'up', 
    //     Id: '0012X000023dCSmAAA' 
    // }



})