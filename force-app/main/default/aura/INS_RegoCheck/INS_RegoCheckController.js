({
	doInit : function(cmp, evt, helper) {
        //helper.loadCountryOptions(cmp);
        let country = cmp.get("v.checkCountry");
        if(country == 'CheckAustralia' || country == 'CheckUSA') {
            cmp.set("v.showState", true);
        }
        else {
            cmp.set("v.showState", false);
        }
    },
    handleKeyUp: function (cmp, evt, helper) {
        let isEnterKey = evt.keyCode === 13;

        if (isEnterKey) {
            cmp.set('v.isSearching', true);

            setTimeout(function() {
                let username = cmp.get("v.username");
                let checkCountry = cmp.get("v.checkCountry");
                let regoNumber = cmp.get('v.regoNumber');
                let state = null;
                
                if(cmp.find("State") != null) {
                    state = cmp.find("State").get("v.value");
                }

                helper.callServer(
                    cmp,
                    "c.getRegoDetails",
                    function (response) {
                        //console.log(response);
                        let regoDetails = JSON.parse(response);
        
                        console.log(regoDetails);
                        cmp.set("v.regoDetails", regoDetails);
        
                        helper.assignAttributeValues(cmp, regoDetails);
                    },
                    { 
                        username : username,
                        checkCountry : checkCountry,
                        regoNumber : regoNumber,
                        state : state
                    }
                );
                
                cmp.set('v.isSearching', false);
            }, 1000);
        }
    }
})