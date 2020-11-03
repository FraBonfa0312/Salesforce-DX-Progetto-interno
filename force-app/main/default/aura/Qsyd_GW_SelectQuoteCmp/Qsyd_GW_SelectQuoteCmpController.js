({
    handleSelectQuoteInit: function (component, event, helper) {
        //   console.log('-------Select Quotes------');
        helper.getProductsCoverages(component, event, helper);
    },

    handleToggleBtnClick: function (component, event, helper) {
        var targetAuraId = event.getSource().getLocalId();
        var x = component.find(targetAuraId);
        for (var i = 0; i < x.length; i++) {
            $A.util.removeClass(x[i], "selectedToggleButtonType");
        }
        $A.util.addClass(event.getSource(), "selectedToggleButtonType");

        if (event.getSource().get("v.name") == "payInFull") {
            helper.updateProgramList(component, event, helper, 12);
        }
        if (event.getSource().get("v.name") == "monthly") {
            helper.updateProgramList(component, event, helper, 1);
        }
    },

    handleCheckboxClick: function (component, event, helper) {
        // $A.util.toggleClass(event.srcElement, "active");
    },

    handleBuyNow: function (component, event, helper) {
        //  console.log("handleBuyNow..");
        let programList = component.get("v.programList");
        let comparisonProductsDataFromServer = component.get('v.comparisonProductsDataFromServer');
        let selectedProgramIdx = event.getSource().get("v.name");
        component.set("v.selectedProgramIdx", selectedProgramIdx);
        let selectQuoteName = programList[selectedProgramIdx].name;
        let selectQuoteMonthlyPrice = programList[selectedProgramIdx].monthlyprice;
        let selectQuoteProgramTotalPrice = programList[selectedProgramIdx].annualprice;
        let selectedProductsDataFromServer = [];
        selectedProductsDataFromServer.push(comparisonProductsDataFromServer[selectedProgramIdx]);
        console.log(selectedProductsDataFromServer);
        var onSelectQuoteBuyNowEvt = component.getEvent("onSelectQuoteBuyNowEvt");
        onSelectQuoteBuyNowEvt.setParams({
            selectedQuoteProgramName: selectQuoteName,
            selectedQuoteProgramMonthlyPrice: selectQuoteMonthlyPrice,
            selectedQuoteProgramTotalPrice: selectQuoteProgramTotalPrice,
            selectedProductsData: selectedProductsDataFromServer
        });
        onSelectQuoteBuyNowEvt.fire();
    }
});