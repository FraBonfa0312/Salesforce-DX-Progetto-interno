({
    doInit : function(component, event, helper) {
        const insuranceTypesStr = component.get('v.insuranceTypesStr');
        if (insuranceTypesStr) {
            const insuranceTypes = JSON.parse(insuranceTypesStr);
            component.set('v.insuranceTypes', insuranceTypes);
        }
    },
	handleClick : function(component, event, helper) {
		const selectedProductType = event.currentTarget.id;
        const selectedPolicyType  = event.currentTarget.getAttribute('data-policy-type');
        component.set('v.selectedType', selectedProductType);
        component.set('v.selectedPolicyType', selectedPolicyType);
        console.log(selectedProductType);
        console.log(selectedPolicyType);
        //const navigate = component.get('v.navigateFlow');
        //navigate('NEXT');
	}
})