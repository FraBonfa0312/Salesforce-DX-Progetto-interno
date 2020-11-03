@isTest
global class ExternalClaimsMock implements HttpCalloutMock {
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setBody('{"info":[{"XID":"CLA-58","EXTID":"EXTSYS-123","Status":"Complete","Description":"Auto - Routed to Billing","Flag":"Resolved","ClaimType":"Auto","Fee":"$5,400.32","PolicyType":"Premium","BackendID":"ww6234qv","ExternalId":"CLA-58","DisplayUrl":"https://anypoint.mulesoft.com/58"}]}');
        response.setStatusCode(200);
        return response; 
    }
}