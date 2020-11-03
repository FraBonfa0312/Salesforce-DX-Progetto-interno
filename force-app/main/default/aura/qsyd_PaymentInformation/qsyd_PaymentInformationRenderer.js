({
    afterRender: function(component, helper) {
        this.superAfterRender();
        let svg = component.find("card_front");
        let value = svg.getElement().innerText;
        value = value.replace("<![CDATA[", "").replace("]]>", "");
        svg.getElement().innerHTML = value; 
        
        svg = component.find("card_back");
        value = svg.getElement().innerText;
        value = value.replace("<![CDATA[", "").replace("]]>", "");
        svg.getElement().innerHTML = value; 
        
        const cardHolder = component.get('v.cardHolder');
        if (cardHolder) {
            helper.handleNameChange(component);
        }
    }
})