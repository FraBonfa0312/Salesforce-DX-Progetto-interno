({
    loadResizeListener: function(component, event, helper) {
    },
    init: function(component, event, helper) {
        
        component.set("v.shelfDataColumns", [
            { label: "Damage", fieldName: "label", type: "text" },
            { label: "Accuracy", fieldName: "accuracy", type: "percent" },
            { label: "Cost", fieldName: "cost", type: "number"}
           
        ]);
    },
    readFile: function(component, event, helper) {
        var files = component.get("v.files");
        if (files && files.length > 0) {
            var file = files[0][0];
            if (file.size > 5000000) {
                return alert("The file exceeds the limit of 5MB.");
            }
            var reader = new FileReader();
            reader.onloadend = function() {
                var dataURL = reader.result;
                component.set("v.pictureSrc", dataURL);
                component.set("v.fileName", file.name);
                helper.upload(component, file.name, dataURL.match(/,(.*)$/)[1]);
            };
            reader.readAsDataURL(file);
        }
    },
    
    getSelectedName: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        // Display that fieldName of the selected rows
        var totalCost = 0; 
        for (var i = 0; i < selectedRows.length; i++){
            var tempCost = parseInt(selectedRows[i].cost); 
            totalCost = totalCost+tempCost ; 
            console.log("---You selected:---" + selectedRows[i].cost);
            cmp.set("v.totalCost",totalCost); 
            
        }
        cmp.set("v.totalCost",totalCost); 
        console.log("-- totalCost ---" + totalCost); 
    },
    getFilename : function(component,event, helper) {
        var files = component.get("v.files");
        if (files && files.length > 0) {
            var file = files[0][0];
            if (file.size > 5000000) {
                return alert("The file exceeds the limit of 5MB.");
            }
            var reader = new FileReader();
            reader.onloadend = function() {
                var dataURL = reader.result;
                console.log('dataURL --- ' + dataURL);
                component.set("v.pictureSrc", dataURL);
                component.set("v.fileName", file.name);   
                console.log('filename---',component.get("v.fileName"));
                //document.getElementById('fname').style.display = "block"; 
            }; 
            reader.readAsDataURL(file);
        }
    },
    readFile2: function(component, event, helper) {
        var dataURL = component.get('v.pictureSrc'); 
        var filename = component.get('v.fileName'); 
        console.log('dataURL --- ' + dataURL);
        helper.upload(component, filename, dataURL.match(/,(.*)$/)[1]);
    }
});