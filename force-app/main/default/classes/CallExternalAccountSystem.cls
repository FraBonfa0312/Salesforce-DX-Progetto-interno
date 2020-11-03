global class CallExternalAccountSystem {
    @InvocableMethod(label='Einstein Bot - Call External Account System' description='Returns a list of Accounts for the specified RoutingNumber')
    public static List<List<FinServ__FinancialAccount__c>> makeGetCallout() {
    Http httpProtocol = new Http();
        HttpRequest request = new HttpRequest();
        String endpoint = 'https://my-json-server.typicode.com/sfdcidobot/demo/routing';
        request.setEndPoint(endpoint);
        request.setMethod('GET');
        HttpResponse response = httpProtocol.send(request);
        System.debug(response.getBody());
        JSONParser parser = JSON.createParser(response.getBody());
        String acctidTemp;
        String accttypeTemp;
        String acctroutNumTemp;
        acctidTemp = null;
        accttypeTemp = null;
        acctroutNumTemp = null;
        List<FinServ__FinancialAccount__c> finacctList = new List<FinServ__FinancialAccount__c>();
        while (parser.nextToken() != null) {
             if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                (parser.getText() == 'Accountid')) {
                parser.nextToken();
                acctidTemp = parser.getText();    
                system.debug('Accountid =' + acctidTemp);
                }
            if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                (parser.getText() == 'Accounttype')) {
                parser.nextToken();
                accttypeTemp =  parser.getText();   
                system.debug('Accounttype  =' + accttypeTemp);
                }
            if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                (parser.getText() == 'RoutingNumber')) {
                parser.nextToken();
                acctroutNumTemp =  parser.getText();   
                system.debug('RoutingNumber  =' + acctroutNumTemp);
                }

            if (acctidTemp != null && accttypeTemp !=null && acctroutNumTemp !=null ) {
                FinServ__FinancialAccount__c newFinAcct = 
                 new FinServ__FinancialAccount__c(FinServ__FinancialAccountNumber__c=acctidTemp,FinServ__FinancialAccountType__c=accttypeTemp,FinServ__RoutingNumber__c=acctroutNumTemp);
                finacctList.add(newFinAcct);
                acctidTemp = null;
                accttypeTemp = null;
                acctroutNumTemp = null;
              system.debug('accountnumber'+newFinAcct.FinServ__FinancialAccountNumber__c);
                }
        }

        return new List<List<FinServ__FinancialAccount__c>>{finacctList};
    }
}