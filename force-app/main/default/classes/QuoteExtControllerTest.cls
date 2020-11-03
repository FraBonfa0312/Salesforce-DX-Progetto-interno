@isTest
public class QuoteExtControllerTest {
    @isTest
    private static void ControllerTest (){
        SBQQ__Quote__c quote = new SBQQ__Quote__c(SBQQ__Status__c ='Draft',
		SBQQ__Type__c = 'Quote',
		SBQQ__StartDate__c =System.today(),
		SBQQ__ExpirationDate__c=System.today().addMonths(1)
		);
	insert quote;
// put id in std object
        ApexPages.currentPage().getParameters().put('id',quote.Id);
// pass in std object
        ApexPages.StandardController stdCtrl = new ApexPages.StandardController(quote);

// pass std ctl to new instance of QuoteExtController
     QuoteExtController objQuoteExtController = new QuoteExtController(stdCtrl);
	 System.assertequals(objQuoteExtController.quoteUrl.size(),2);
// run methods, use sys asserts
        objQuoteExtController.onSubmit();
        SBQQ__Quote__c testQuote = [SELECT Id, ApprovalStatus__c FROM SBQQ__Quote__c Limit 1]; 
        System.assertequals(testQuote.ApprovalStatus__c, 'Approved'); 
        objQuoteExtController.onRecall();  
        SBQQ__Quote__c testQuote2 = [SELECT Id, ApprovalStatus__c FROM SBQQ__Quote__c Limit 1]; 
        System.assertequals(testQuote2.ApprovalStatus__c, 'Recalled');
        objQuoteExtController.onPreview();
        
    }
}