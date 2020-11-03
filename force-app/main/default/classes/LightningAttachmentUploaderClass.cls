public with sharing class LightningAttachmentUploaderClass {

    /*
    @AuraEnabled
    public static Id saveAttachment(Id parentId, String fileName, String base64Data, String contentType) { 
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        
        Attachment a = new Attachment();
        a.parentId = parentId;

        a.Body = EncodingUtil.base64Decode(base64Data);
        a.Name = fileName;
        a.ContentType = contentType;
        
        insert a;
        return a.Id;
    }
*/
    
    @AuraEnabled
    public static Id saveContent(String parentId, String fileName, String base64Data, String contentType) { 
    	base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode(base64Data);
        cv.Title = fileName;
        cv.PathOnClient = fileName;
        cv.IsMajorVersion = true;
        
        insert cv;
        
        if( parentId != '' ) {
            saveParentId( parentId,  cv.Id);
        }
        
        return cv.Id;
    }
    
    private static void saveParentId(String parentId, Id contentVersionId) {
        ContentVersion cv = [SELECT ContentDocumentId FROM ContentVersion WHERE Id=:contentVersionId LIMIT 1];
		ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = cv.ContentDocumentId;
        cdl.LinkedEntityId = parentId;
        cdl.ShareType = 'V';
        
        upsert cdl;
    }
    
    @AuraEnabled
    public static String greet(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet1(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet2(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet3(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet4(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet5(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet6(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet7(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet8(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet9(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet10(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet11(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet12(){
        return 'Hello World';
    }
        @AuraEnabled
    public static String greet13(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet14(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet15(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet16(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet17(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet18(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet19(){
        return 'Hello World';
    }
        @AuraEnabled
    public static String greet20(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet21(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet22(){
        return 'Hello World';
    }
        @AuraEnabled
    public static String greet23(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet24(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet25(){
        return 'Hello World';
    }
    @AuraEnabled
    public static String greet26(){
        return 'Hello World';
    }
}