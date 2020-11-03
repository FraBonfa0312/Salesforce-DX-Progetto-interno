public class FileController {
    
    @AuraEnabled
    public static Id saveTheFile(Id parentId, String fileName, String base64Data, String contentType) { 
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        System.debug(base64Data);
        
        Attachment a = new Attachment();
        a.parentId = parentId;
        
        a.Body = EncodingUtil.base64Decode(base64Data);
        a.Name = fileName;
        a.ContentType = contentType;
        
        insert a;
        
        return a.Id;
    }
    
    @AuraEnabled
    public static Id saveTheChunk(Id parentId, String fileName, String base64Data, String contentType, String fileId) { 
        if (fileId == '') {
            //fileId = saveTheFile(parentId, fileName, base64Data, contentType);
            attachFile(parentId , base64Data, fileName);
        } else {
            //appendToFile(fileId, base64Data, fileName);
            // attachFile(parentId, fileId, base64Data, fileName);
        }
        
        //return Id.valueOf(fileId);
        return parentId;
    }
    
    public static void appendToFile(Id fileId, String base64Data, String fileName) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        
        Attachment a = [
            SELECT Id, Body
            FROM Attachment
            WHERE Id = :fileId
        ];
        
        String existingBody = EncodingUtil.base64Encode(a.Body);
        a.Body = EncodingUtil.base64Decode(existingBody + base64Data); 
        
        update a;
    }
    
    public static void attachFile(Id opp, String base64Data, String filename) {
        
        ContentVersion cv = new ContentVersion();
        System.debug(opp);
        
        ContentDocumentlink cdl = new ContentDocumentLink();
        Blob content = Blob.valueof(base64Data);
        System.debug(base64Data);
        
        cv.VersionData = content;
        cv.Title = filename;
        cv.PathOnClient = filename;
        
        insert cv;
        
        cdl.ContentDocumentId = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id =: cv.Id].ContentDocumentId;
        cdl.LinkedEntityId = opp;
        System.debug('cdl '+ cdl);
        
        cdl.ShareType = 'V';
        System.debug('cdl '+ cdl);
        
        upsert cdl;         
        
    }
    
    
}