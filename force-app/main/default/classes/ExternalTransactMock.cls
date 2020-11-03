@isTest
global class ExternalTransactMock implements HttpCalloutMock {
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setBody('{"info":[{"XID":"TRA-34","EXTID":"EXTSYS-123","Status":"Complete","Description":"Fund Transfer - $534.21","Flag":"Resolved","SubStatus":"Cleared","Amount":"$534.21","AccountNumber":"x6123","BackendID":"mm7529vq","ExternalId":"TRA-34","DisplayUrl":"https://anypoint.mulesoft.com/34"},{"XID":"TRA-33","EXTID":"EXTSYS-123","Status":"Denied","Description":"Boat Loan - $35k (needs proof)","Flag":"Issue","SubStatus":"N/A (Denied)","Amount":"$35,000.00","AccountNumber":"x4219","BackendID":"mm2843kr","ExternalId":"TRA-33","DisplayUrl":"https://anypoint.mulesoft.com/33"},{"XID":"TRA-32","EXTID":"EXTSYS-123","Status":"Complete","Description":"Credit Payment - $232.14","Flag":"Resolved","SubStatus":"Cleared","Amount":"-$232.14","AccountNumber":"x3422","BackendID":"mm3023bw","ExternalId":"TRA-32","DisplayUrl":"https://anypoint.mulesoft.com/32"}]}');
        response.setStatusCode(200);
        return response; 
    }
}