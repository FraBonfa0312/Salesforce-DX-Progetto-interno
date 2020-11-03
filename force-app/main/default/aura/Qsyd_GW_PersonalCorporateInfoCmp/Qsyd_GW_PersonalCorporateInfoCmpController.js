({
    handlePersonalCorporateInfoInit: function (component, event, helper) {
        // console.log('-------Personal / Corporate Information-------');
        let date = new Date(component.get('v.PolicyCoverageStartDate')),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        if (month < 10) {
            month = '0' + month;
        }
        if (date < 10) {
            date = '0' + date;
        }
        var startdate = year + "-" + month + "-" + day;
        component.set('v.effectiveDate', startdate);
        helper.handleRetrieveCommercialInsuranceProducts(component, event, helper);
        helper.handleRetrieveProducers(component, event, helper);
    },

    handleToggleBtnClick: function (component, event, helper) {
        let isPersonal = component.get('v.isPersonal');
        component.set('v.isPersonal', !isPersonal);
    },

    returnSelectedPolicyTypeFromPersonCorporateScreen: function (component) {

        return component.get('v.isPersonal');
    },

    returnSelectedProductFromPersonCorporateScreen: function (component) {
        let productList = component.get('v.commercialINSProductsList');
        let selectedProductIdx = document.getElementById('commercialProductsSelect').value;
        return productList[selectedProductIdx];
    },

    handleSelectProducerChange: function (component) {
        let producerId = document.getElementById('producerSelect').value;
        let producerList = component.get('v.producerList');
        for (let i = 0; i < producerList.length; i++) {
            if (producerList[i].Id == producerId) {
                component.set('v.selectedProducer', producerList[i]);
                break;
            }
        }
    }
})