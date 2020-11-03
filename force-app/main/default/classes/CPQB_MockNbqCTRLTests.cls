@isTest
public class CPQB_MockNbqCTRLTests {
    @TestSetup static void setup(){
        Account testAccount = new Account(
                Name='Universal Testing',
                AccountNumber='0118999'
        );

        Database.insert(testAccount);

        Product2 p = new Product2(
                Name = 'Test Product 01',
                IsActive = true,
                ProductCode = 'TP-01'
        );

        Database.insert(p);

        PricebookEntry pbe = new PricebookEntry(
                Product2Id=p.Id,
                IsActive = true,
                Pricebook2Id = Test.getStandardPricebookId(),
                UnitPrice = 100
        );

        Database.insert(pbe);
    }

    @IsTest
    private static void getProductDetailsTest(){
        Id prodId = [SELECT Id FROM Product2 LIMIT 1].Id;
        Product2 theProduct = CPQB_MockNbqCTRL.getProductDetails(prodId);
        System.assert(theProduct != null, 'Got a Product');
    }

    @IsTest
    private static void generateQuoteAccountTest(){
        Id prodId = [SELECT Id FROM Product2 LIMIT 1].Id;
        Id accId = [SELECT Id FROM Account LIMIT 1].Id;
        Id qId = CPQB_MockNbqCTRL.generateQuote(accId, prodId, 'USD');
        System.assert(qId != null, 'Got a Quote');
    }


    @IsTest
    private static void generateQuoteLeadTest(){
        Id prodId = [SELECT Id FROM Product2 LIMIT 1].Id;
        Lead newLead = new Lead(LastName='Test', Company='Test Co');
        Database.insert(newLead);
        Id qId = CPQB_MockNbqCTRL.generateQuote(newLead.Id, prodId, 'USD');
        System.assert(qId != null, 'Got a Quote');
    }
}