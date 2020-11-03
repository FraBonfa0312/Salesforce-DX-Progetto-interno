({
	init: function (cmp, event, helper) {
        
        console.log("doInit START");
        
        let title = cmp.get("v.title");
        if ((title) && (title.includes('$Label.'))) {
            console.log('doInit: fetching title value for',title);
            title = $A.getReference(title) || title;
            console.log('doInit: title value fetched',title);
            cmp.set("v.title",title);
        }
  
        helper.fetchMapMarkers(cmp);
        helper.fetchOtherLocations(cmp);
        console.log("doInit END");
    },
    handleClick: function (cmp, event, helper) {
        console.log('handleclick', JSON.stringify(event.getParams()));   
    },
    refreshMap: function (cmp, event, helper) {
        console.log('refreshMap START');
        
        cmp.set("v.mapMarkers",[]);
        helper.fetchMapMarkers(cmp);
        helper.fetchOtherLocations(cmp);
        
        console.log('refreshMap END');
    }
})