({
	doInit : function(component, event, helper) {
		helper.callServer(
            component,
            "c.getProducts",
            function (response) {
                console.log(response);
                component.set('v.products', response.products);
                component.set('v.features', response.features);
                if (response.products) {
                    const numProducts = response.products.length;
                    if (numProducts > 1) {
                        component.set('v.colSpan', numProducts - 1);
                        component.set('v.colSpanHeading', 2);
                    }
                }
                
            },
            {
                productFamily : component.get('v.productFamily')
            }
        );
	},
    handleSelect : function(component, event, helper) {
        const selected = event.getSource().get('v.name');
        component.set('v.selectedProduct', selected);
    },
    handleSelectMobile : function(component, event, helper) {
        const selected = event.currentTarget.getAttribute('data-index');
        component.set('v.selectedIndex', parseInt(selected));
    }
})