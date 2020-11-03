public class CalloutResponder {
   
    //Yea I know these are redundant, but I'm too lazy and will thus keep these minor tid bits of code
    public static HttpResponse makeCall(String givenURL) {
        HttpRequest req = new HttpRequest();
        req.setEndPoint(givenURL);
        req.setMethod('GET');
        HttpResponse res = new Http().send(req);
        return res;
    }
    
    public static HttpResponse makeCallActions(String givenURL) {
        HttpRequest req = new HttpRequest();
        req.setEndPoint(givenURL);
        req.setMethod('GET');
        HttpResponse res = new Http().send(req);
        return res;
    }
    
    public static HttpResponse makeCallTransactions(String givenURL) {
        HttpRequest req = new HttpRequest();
        req.setEndPoint(givenURL);
        req.setMethod('GET');
        HttpResponse res = new Http().send(req);
        return res;
    }
    
    public static HttpResponse makeCallClaims(String givenURL) {
        HttpRequest req = new HttpRequest();
        req.setEndPoint(givenURL);
        req.setMethod('GET');
        HttpResponse res = new Http().send(req);
        return res;
    }
    
}