({
    upload: function(component, fileName, base64Data) {
        let self = this;
        var imgContainer = component.find("imgContainer").getElement();
        while (imgContainer.firstChild) {
            imgContainer.removeChild(imgContainer.firstChild);
        }
        var action = component.get("c.detectShelfObjects");
        //var modelId = component.get("v.modelId");
        // new model 
        var modelId = 'MUGUGTEO7PJ5ZCT552EAZPSJM4' ;
        // old model 
        // var modelId = '5TO7QGRDSLC7MZZVFSJ3PQJQME';
        action.setParams({
            modelId: modelId,
            base64: base64Data
        });
        action.setCallback(this, function(a) {
            component.set("v.spinnerWaiting", false);
            var state = a.getState();
            if (state === "ERROR") {
                alert("An error has occurred");
                return;
            }
            var result = a.getReturnValue();
            var rawPredictions = JSON.stringify(result, null, 4);
            component.set("v.predictions", result);
            component.set("v.rawPredictions", rawPredictions);

            
            let img = component.find("imgItself").getElement();
            img.addEventListener('resize', function(){
                console.log('resized');
                this.generateSvg(component)
            });
            //ro.observe(img);
            this.calculateShelfData(component);
            this.generateSvg(component);
            component.set("v.showDatatable", true);
        });
        component.set("v.predictions", null);
        component.set("v.rawPredictions", null);
        component.set("v.spinnerWaiting", true);
        $A.enqueueAction(action);
    },
    generateSvg: function(component) {
        var imgContainer = component.find("imgContainer").getElement();
        var img = component.find("imgItself").getElement();
        var children = imgContainer.children;
        
        
        //Clear previous bounding boxes
        imgContainer.innerHTML = '';
        
        var proportion = img.clientHeight / img.naturalHeight;
        //if (proportion > 1) {
        //    proportion = 1;
        //}
        
        //var proportion = 2.5;
        
        var probabilities = component.get("v.predictions").probabilities;
        
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        
        probabilities.forEach(function(probability) {
            var color = this.getObjectHighlightColor(probability.label);
            // create polygon for box
            var polygon = document.createElementNS(svgNS, "polygon");
            polygon.setAttribute(
                "style",
                "stroke:" + color + ";stroke-width:2;fill-opacity:0;"
            );
            var points = [];
            points.push(
                probability.boundingBox.minX * proportion +
                "," +
                probability.boundingBox.minY * proportion
            );
            points.push(
                probability.boundingBox.maxX * proportion +
                "," +
                probability.boundingBox.minY * proportion
            );
            points.push(
                probability.boundingBox.maxX * proportion +
                "," +
                probability.boundingBox.maxY * proportion
            );
            points.push(
                probability.boundingBox.minX * proportion +
                "," +
                probability.boundingBox.maxY * proportion
            );
            polygon.setAttribute("points", points.join(" "));
            svg.appendChild(polygon);
            
            // create text box
            var div = document.createElement("div");
            div.setAttribute(
                "style",
                "position:absolute;top:" +
                (probability.boundingBox.maxY * proportion + 2) +
                "px;left:" +
                (probability.boundingBox.minX * proportion - 1)+
                "px;width:" +
                (probability.boundingBox.maxX - probability.boundingBox.minX + 1) *
                proportion +
                "px;text-align:center;color:" +
                color + ";background-color:black;opacity:0.5;margin:10px;"+
                ";"
            );
            div.innerHTML = probability.label;
            imgContainer.appendChild(div);
        }, this);
        imgContainer.appendChild(svg);
    },
    getObjectHighlightColor: function(label) {
        if (label === "MyLabel") {
            return "red";
        }
        return "yellow";
    },
    
    getCostdata : function(component,event,helper) {
        
        var action = component.get("c.getCostImage");
        var damage = "Wheel - Severe Damage" ; 
        
        action.setParams({ damageName: damage});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert("From server: " + response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                alert("From server incomplete ");
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        }); $A.enqueueAction(action);
        
        
    },
    
    calculateShelfData: function(component,event,helper) {
        
        var probabilities = component.get("v.predictions").probabilities;
        console.log("--- probabilities --- ", probabilities);
        var calcObjects = {};
        var shelfData = [];
        var allObjects = 0;
        
        probabilities.forEach(function(probability) {
            allObjects += 1;
            if (typeof calcObjects[probability.label] === "undefined") {
                var calcObject = {};
                calcObject.count = 1;
                calcObject.label = probability.label;
                calcObject.accuracy = probability.probability;
                //getCostdata(component,event,helper);
                //var returnArray = []; 
                
                calcObjects[probability.label] = calcObject;
            } else {
                calcObjects[probability.label].count += 1;
            }
        });
        
        Object.keys(calcObjects).forEach(function(label) {

            if (label == "Door - Slight Damage"        || label == "Bumper - Slight Damage" || 
                label == "Windshield - Slight Damage"  || label == "Head Light - Slight Damage" || 
                label == "Grill - Slight Damage"       || label == "Fog Light - Slight Damage" || 
                label == "Door Handle - Slight Damage" || label == "Tail Light - Slight Damage" || 
                label == "Wheel - Slight Damage"       || label == "Hood - Slight Damage") {
                
                calcObjects[label].cost = 2300; 
                calcObjects[label].trendIcon = 'standard:opportunity_splits';
                
            } else if (label == "Door - Moderate Damage"        || label == "Bumper - Moderate Damage" || 
                       label == "Windshield - Moderate Damage"  || label == "Head Light - Moderate Damage" ||
                       label ==  "Grill - Moderate Damage"      || label == "Fog Light - Moderate Damage" || 
                       label == "Door Handle - Moderate Damage" || label == "Tail Light - Moderate Damage" || 
                       label == "Wheel - Moderate Damage"       || label == "Hood - Moderate Damage") {
                
                calcObjects[label].cost = 1500; 
                calcObjects[label].trendIcon = 'standard:service_crew';
                
            } else if (label == "Door - Severe Damage" || label == "Bumper - Severe Damage" || label == "Windshield - Severe Damage" || label == "Head Light - Severe Damage" || label == "Grill - Severe Damage" || label == "Fog Light - Severe Damage" || label == "Door Handle - Severe Damage" || label == "Tail Light - Severe Damage" || label == "Wheel - Severe Damage" || label == "Hood - Severe Damage") {
                calcObjects[label].cost = 5400; 
                calcObjects[label].trendIcon = 'standard:dashboard';
            } else {
                calcObjects[label].cost = 0;
                calcObjects[label].trendIcon = 'standard:task2'; 
            }
            // calcObjects[label].cost = 200; 
            shelfData.push(calcObjects[label]);
        });
        component.set("v.shelfData", shelfData);
        console.log("---self data --- ",shelfData);
    }
    
});