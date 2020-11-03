({
	handleCMQuoteInit : function(component, event, helper) {

        let base = parseFloat(component.get('v.QuoteProgramPriceCM'));
        let tax = parseFloat(component.get('v.QuoteProgramTaxCM'));
        let total = base + tax;
        let totalString = total.toFixed(2);

        component.set('v.QuoteProgramTotalCost', totalString);

        let startdateString = component.get('v.coverageStartDate');

        let startdate = new Date(startdateString);
        let enddate = new Date(startdate.setFullYear(startdate.getFullYear() + 1));
        let duration = startdateString + ' - ' + enddate.toDateString();
        component.set('v.coverageDuration', duration);

	}
})