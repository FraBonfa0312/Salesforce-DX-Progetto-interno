global class INS_RegoCheckController {
    @AuraEnabled
    global static String getRegoDetails(String checkCountry, String regoNumber, String state, String username) {
        
        DOM.Document regoResults = new DOM.Document();
        regoResults = generateDummyXML();	        
        
        // try Experian API first to get VIN Number
        if(checkCountry == 'ExperianUSA') {
            String vinResult = getVINDetails(state, regoNumber);
            String carResults = getCarDetails(vinResult);
            return carResults;
         
        }
        
        // Form the API URL
        String url = 'http://www.regcheck.org.uk/api/reg.asmx/' + checkCountry + '?RegistrationNumber=' + regoNumber + '&username=' + username;
        
        
        if(checkCountry == 'CheckAustralia' || checkCountry == 'CheckUSA') {
            url += '&State=' + state;
        }
        
        if(checkCountry != 'Demo') { regoResults = getResponse(url); }
        
        // Call the API and return the XML response
        
        System.debug('XML Response ' + regoResults.toXmlString());
        
        Dom.XMLNode vehicle = regoResults.getRootElement();
        
        List<Dom.XMLNode> vehicleChildren = vehicle.getChildren();
        
        for(Dom.XMLNode child : vehicleChildren) {
            if(child.getName() == 'vehicleJson') {
                System.debug(child.getText());
                return child.getText();
            }
        }
        
        return null;
    }
    
    global static DOM.Document getResponse(string strURL){
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('GET');
        req.setEndpoint(strURL);
        req.setTimeout(120000);
        res = h.send(req); 
        
        // System.HttpResponse[Status=OK, StatusCode=200]
        // System.HttpResponse[Status=Internal Server Error, StatusCode=500]
        Dom.Document doc = res.getBodyDocument();
        
        //String responseBody = res.getBody(); 
        return doc;
    }
    
    // Dummy data to test with, without needing to call the API
    private static DOM.Document generateDummyXML() {
        DOM.Document doc = new DOM.Document();
        
        dom.XmlNode products = doc.createRootElement('Vehicle xmlns="http://regcheck.org.uk" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"', null, null);
        dom.XmlNode body1= products.addChildElement('vehicleJson', null, null);
        
        body1.addTextNode('{ "Description": "TOYOTA Corolla 5D Hatchback ASCENT", "RegistrationYear": "2012", "CarMake": { "CurrentTextValue": "TOYOTA" }, "MakeDescription": { "CurrentTextValue": "TOYOTA" }, "ModelDescription": { "CurrentTextValue": "Corolla 5D Hatchback" }, "BodyStyle": { "CurrentTextValue": "Ascent Cvt Auto 7-Speed Sequential" }, "Colour": "", "VechileIdentificationNumber": "TOYCOLASZC18OH82012J", "Engine": "1.8 litre, 4 cyl, ZRE182R", "extended": { "nvic": "OH812J", "driveType": "5D HATCHBACK", "family": "COROLLA", "variant": "ASCENT", "model": "Corolla 5D Hatchback", "colour": "", "code": "TOYCOLASZC18OH82012J", "make": "TOYOTA", "fuelType": "", "capacityValue": "1.8", "series": "ZRE182R", "engineDescription": "1.8 litre, 4 cyl, ZRE182R", "bodyDescription": "", "bodyType": "Ascent Cvt Auto 7-Speed Sequential", "cylinders": "4", "year": "2012", "capacityUnit": "L", "transmissionType": "CVT Auto 7-Speed Sequential" }, "ImageUrl": "http://www.carregistrationapi.com/image.aspx/@VE9ZT1RBIENvcm9sbGEgNUQgSGF0Y2hiYWNr", "Expiry": "", "State": "NSW" }');
        
        dom.XmlNode body2 = products.addChildElement('vehicleData', null, null);
        body2.addChildElement('Description', null, null).addTextNode('TOYOTA Corolla 5D Hatchback ASCENT');
        body2.addChildElement('RegistrationYear', null, null).addTextNode('2012');
        
        dom.XmlNode body2child1= body2.addChildElement('CarMake', null, null);
        body2child1.addChildElement('CurrentTextValue', null, null).addTextNode('TOYOTA');
        
        return doc;
    }
    global static string getVINDetails(String state, String regoNumber) {
        string url = 'https://api.kbb.com/ico/v1/plate2vin/lookup?api_key=kehj9w5vxkt4t8yugn5zkpey&stateCode=' + state + '&plateNumber=' + regoNumber;
        System.debug('>>' + url);
        String response = getVINResponse(url);
        System.debug(response);
        
		JSONParser parser = JSON.createParser(response);        
        while (parser.nextToken() != null) {
            if (parser.getCurrentName() == 'vin')
                {
                    parser.nextToken(); 
                // Get the value.=
                return parser.getText();
                }
                parser.nextToken();   
            }
        
        return null;
    }
    
    global static string getCARDetails(String input) {
        String url = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/' + input + '?format=json';
        System.debug('>>' + url);        
        String response = getVINResponse(url);
        return response;
    }
    
    global static string getVINResponse(string strURL){
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('GET');
        req.setEndpoint(strURL); 
        req.setTimeout(120000);
        res = h.send(req); 
        String responseBody = res.getBody(); 
        return responseBody;
    }
    

    
    
    
    
}