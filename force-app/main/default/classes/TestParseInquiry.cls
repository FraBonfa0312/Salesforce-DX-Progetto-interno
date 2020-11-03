@isTest
public class TestParseInquiry {
    
    @isTest(SeeAllData=true)
    public static void testParseInquiry(){
        Messaging.InboundEmail email = new Messaging.InboundEmail();
        Messaging.InboundEnvelope envelope = new Messaging.InboundEnvelope();
        email.subject = 'ABC Business';
        email.plainTextBody = 'Stuff goes here';
        Messaging.InboundEmail.BinaryAttachment attachment = new Messaging.InboundEmail.BinaryAttachment();
        attachment.body = blob.valueOf('example');
        attachment.fileName = 'sample.txt';
        attachment.mimeTypeSubType = 'text/plain';
        email.binaryAttachments = new Messaging.inboundEmail.BinaryAttachment[] { attachment };
        envelope.fromAddress = 'aefendiyev@salesforce.com';
        ParseInquiry parseMe = new ParseInquiry();
        parseMe.handleInboundEmail(email, envelope);
        Account myAccount = new Account();        
        parseMe.handleInboundEmail(email, envelope);        
        if (Test.isRunningTest()) { 
            Test.setMock(HttpCalloutMock.class, new ParseEinsteinMock());
        }
        Test.startTest();
        String s = EinsteinAIcatch.run('Hello', .75, 'a');
        System.assertEquals(s, '');
        Test.stopTest();
     
    }
    
}