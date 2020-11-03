@isTest
public class LSM_GooglePlaces_TestMock implements HttpCalloutMock {
                
    public HTTPResponse respond(HTTPRequest req) {

       HttpResponse res = new HttpResponse();
       res.setHeader('Content-Type', 'application/json');
       res.setStatusCode(200);
       
       res.setBody('{"test":"ok"}');
         
       return res;

    }
    
}