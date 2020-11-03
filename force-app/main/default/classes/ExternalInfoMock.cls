@isTest
global class ExternalInfoMock implements HttpCalloutMock {
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setBody('{"info":[{"XID":"ACT-15","EXTID":"EXTSYS-123","Status":"Complete","Description":"401k Rollover","Flag":"Resolved","Details":"Category: IRA","Inflow":"$483,000.00","PotentialFraud":"No","BackendID":"ee1234qq","ExternalId":"ACT-15","DisplayUrl":"https://anypoint.mulesoft.com/15"},{"XID":"ACT-14","EXTID":"EXTSYS-123","Status":"Pending","Description":"Joint Account Open (> 3 days)","Flag":"Warning","Details":"Needs Deposit","Inflow":"$525,000.00","PotentialFraud":"No","BackendID":"ee4567at","ExternalId":"ACT-14","DisplayUrl":"https://anypoint.mulesoft.com/14"},{"XID":"ACT-13","EXTID":"EXTSYS-123","Status":"Denied","Description":"Card Replacement (needs proof)","Flag":"Issue","Details":"Invalid Drivers License","Inflow":"$0.00","PotentialFraud":"Yes","BackendID":"ee9021wt","ExternalId":"ACT-13","DisplayUrl":"https://anypoint.mulesoft.com/13"},{"XID":"ACT-12","EXTID":"EXTSYS-123","Status":"Complete","Description":"529 Plan Opening","Flag":"Resolved","Details":"Standard Option","Inflow":"$5,000.00","PotentialFraud":"No","BackendID":"ee6534qb","ExternalId":"ACT-12","DisplayUrl":"https://anypoint.mulesoft.com/12"}]}');
        response.setStatusCode(200);
        return response; 
    }
}