({
    handleGWMasterInit: function (component, event, helper) {
        helper.initGetOpptyAccountInfoByOpptyId(component, event, helper);

    },

    handlePrevious: function (component, event, helper) {
        helper.showPrevious(component, event, helper);

    },
    handleNext: function (component, event, helper) {
        helper.showNext(component, event, helper);
    },

    handleDeleteCreatedPolicy: function (component, event, helper) {
        helper.doDeleteSelectedPolicy(component, event, helper);
    },

    handleOnSelectQuoteBuyNowEvt: function (component, event, helper) {

        let name = event.getParam('selectedQuoteProgramName');
        let montlyPrice = event.getParam('selectedQuoteProgramMonthlyPrice');
        let totalPrice = event.getParam('selectedQuoteProgramTotalPrice');
        let selectedProductsData = event.getParam('selectedProductsData');
        component.set("v.selectedQuoteProgramNameOnCard", name);
        component.set("v.selectedQuoteProgramMonthlyPriceOnCard", montlyPrice);
        component.set("v.QuoteProgramPrice", totalPrice);
        component.set("v.selectedAutoPolicyComparisonProductsData", selectedProductsData[0]);

        //console.log('master handleOnSelectQuoteBuyNowEvt...');
        helper.updatePaymentPlans(component, event, helper);
        helper.showNext(component, event, helper);
    },

    handleOnFromBuildingLocationScreenToMasterEvt: function (component, event, helper) {
        let returnedCP = event.getParam('selectedCPCommercialPropertyList'),
            selectedCPcommercialPropertyList = [];
        selectedCPcommercialPropertyList.push(returnedCP[0]);
        let selectedCommercialCustomerProperty = selectedCPcommercialPropertyList[0],
            floorCount = selectedCommercialCustomerProperty.FloorCount;
        component.set('v.selectedCPcommercialPropertyList', selectedCPcommercialPropertyList[0]);
        // console.log('master - return list - handleOnFromBuildingLocationScreenToMasterEvt');
        // console.log(selectedCommercialCustomerProperty);
        if (floorCount != null) {
            component.set('v.showSpinner', true);
            if (parseInt(floorCount) < 10) {
                component.set('v.commercialInsurancePolicyUnderwritingIssue', false);
                helper.handleCreateCommercialPolicy(component, event, helper);
            } else {
                console.log('#floors >= 10');
                component.set('v.commercialInsurancePolicyUnderwritingIssue', true);
                helper.handleCreateCommercialPolicy(component, event, helper);
                // helper.showNext(component, event, helper);     
            }
        }
    },

    handleOnSelectDriverCompletionEvt: function (component, event, helper) {

        let driversList = event.getParam('driversList');
        let action = event.getParam('action');
        if (action == 'NEXT') {
            helper.showNext(component, event, helper);
        } else if (action == 'PREVIOUS') {
            helper.showPrevious(component, event, helper);
        }
        component.set('v.returnedDriversList', driversList);

    },

    handleOnFromUnderwritingIssueScreenEvt: function (component, event, helper) {
        component.set('v.showSpinner', true);
        // console.log('handleOnFromUnderwritingIssueScreenEvt');
        let action = event.getParam('action');
        let opptyId = component.get("v.oppty.Id");
        let alertMessage = 'UW Issues: Building taller than 10 stories and Predictive recommendations regarding profitability and retention';
        let taskMessage = 'Please review new submission from Levin Agency';
        let taskOwner = component.get('v.oppty.Account.OwnerId');
        // console.log('taskowner:' + taskOwner);
        if (action == 'finish') {
            helper.doHandleChangeOpptyStage(component, event, helper, 'Review');
            helper.doPostTextChatter(component, event, helper);
            helper.doCreateTask(component, event, helper, 'Review New Submission', taskMessage, taskOwner);
            helper.doCreateFinServAlert(component, event, helper, alertMessage);
            //component.set('v.showSpinner', false);
        }
        // debugger
        // console.log('>>>> handle GW event handleOnFromUnderwritingIssueScreenEvt');
        // console.log('>>>> action:' + action);
    },

    handleOnSelectVehicleCompletionEvt: function (component, event, helper) {
        let propertyList = event.getParam('propertyList');
        let propertyType = event.getParam('propertyType');
        let action = event.getParam('action');
        component.set('v.returnedVehiclesList', propertyList);

        let propertyListVehicle = [{
            propertyRecordTypeName: propertyType,
            propertyRecordList: propertyList
        }];

        component.set('v.propertyListVehicle', propertyListVehicle);

        if (action == 'NEXT') {
            helper.showNext(component, event, helper);
        } else if (action == 'PREVIOUS') {
            helper.showPrevious(component, event, helper);
        }
    },

    handleBuyNowOnLastScreen: function (component, event, helper) {
        let isPersonal = component.get('v.isPersonal');
        if (isPersonal) {
            helper.handleCreatePolicy(component, event, helper);
        } else {
            helper.handleChangeOpptyStageCloseWonByOpptyId(component, event, helper);
        }

    },

    handleClickViewPolicy: function (component, event, helper) {
        let recordId = component.get('v.policyId');
        helper.navigateToSObject(component, event, helper, recordId);
    },

    handleINSToolKitEvent: function (component, event, helper) {
        // console.log('handleINSToolKitEvent');
        let componentName = event.getParam('component');
        let message = event.getParam('message');

        if (componentName == 'Guidewire') {
            component.set('v.showSpinner', true);
            component.set('v.commercialInsurancePolicyUnderwritingIssue', false);
            helper.doHandleChangeInsurancePolicyAmount(component, event, helper, '10729');
            helper.handleUpsertOpportunityLineItem(component, event, helper, '10729');
            helper.handleUpdateOpptyDetailsAfterINSToolkitEvent(component, event, helper);

        }
    },

    handleRefreshViewEvent: function (component, event, helper) {
        //NOT IMPLEMENTED
    },

})