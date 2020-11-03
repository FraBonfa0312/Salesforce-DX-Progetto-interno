@isTest
global class ParseEinsteinMock implements HttpCalloutMock {    
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setBody('{"A":"B"}');
        response.setStatusCode(200);
        return response;     
    }
}