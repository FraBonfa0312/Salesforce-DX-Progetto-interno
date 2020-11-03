({
    handlePaymentDetailsInit: function (component, event, helper) {
        //    console.log('-------Payment Detials-------');
        //INIT Option Full Payment Plan
        document.getElementById('PAYMENTPLAN2').checked = 'true';
    },


    handleToggleBtnClick: function (component, event, helper) {
        var targetAuraId = event.getSource().getLocalId();
        var x = component.find(targetAuraId);
        for (var i = 0; i < x.length; i++) {
            $A.util.removeClass(x[i], 'selectedToggleButtonType');
        }
        $A.util.addClass(event.getSource(), 'selectedToggleButtonType');
    },

    handleSelectDifferentPaymentPlan: function (component, event, helper) {
        //    console.log('-..handleSelectDifferentPaymentPlan..-');
        var selectedPlanIdx = event.srcElement.value;
        //    console.log('Selected payment plan idx:' + selectedPlanIdx);
        var paymentPlansList = component.get("v.paymentPlansList");
        var selectedPaymentPlan = paymentPlansList[selectedPlanIdx];
        //   console.log('>>' + JSON.stringify(selectedPaymentPlan));
        var averageMonthlyProgramPrice = selectedPaymentPlan.total / selectedPaymentPlan.policyTermMonths;
        var totalProgramPrice = selectedPaymentPlan.total;
        //    console.log('calculate..');
        //    console.log('averageMonthlyProgramPrice (Selected total/PolicyTermMonths):' + averageMonthlyProgramPrice);
        //    console.log('totalProgramPrice (Selected total):' + totalProgramPrice);
        component.set("v.averageMonthlyPrice", averageMonthlyProgramPrice);
        component.set("v.totalPriceForThisPaymentPlan", totalProgramPrice);
    }
})