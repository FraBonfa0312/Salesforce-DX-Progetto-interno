public class INS_ImageDownloadController {
    
    public class ImageInput {
        @InvocableVariable
        public String imageUrl;
        
        @InvocableVariable
        public String imageTitle;
        
        @InvocableVariable
        public String recordId;
    }
    
    @InvocableMethod(label='Download image from url and attach to record')
    public static void downloadAndAttachImage(List<ImageInput> inputs) {
        try {
            if (inputs.size() > 0) {
                ImageInput input = inputs[0];
                System.Debug(input);
                downloadImage(input.imageUrl, input.imageTitle, input.recordId, Network.getNetworkId());
            }
        } catch (Exception e) {
            System.Debug(e.getMessage());
            SyStem.Debug(e.getStackTraceString());
            // TODO: Log error
        }
    }
    
    @future(callout=true)
    public static void downloadImage(String imageUrl, String imageTitle, String recordId, String networkId) {
        if (String.isNotEmpty(imageUrl)) {
            Blob imageBlob = getImageBlob(imageUrl);
            ContentVersion contentVersion = createContentVersion(imageBlob, imageTitle, networkId);
            String contentDocumentId = [ SELECT ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion.Id ].ContentDocumentId;
            linkContentToRecord(contentDocumentId, recordId);
        }
    }
    
    private static Blob getImageBlob(String url) {
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint(url);
        
        HttpResponse res = h.send(req);
 
        Blob imageBlob = res.getBodyAsBlob();
        return imageBlob;
    }
    
    private static ContentVersion createContentVersion(Blob imageBlob, String title, String networkId) {
        ContentVersion contentVersion  = new ContentVersion();
        contentVersion.ContentLocation = 'S';
        contentVersion.PathOnClient    = title + '.jpg';
        contentVersion.VersionData     = imageBlob;
        contentVersion.Title           = title;
        if (networkId != NULL) {
            contentVersion.NetworkId = networkId;
        }      
        insert contentVersion;
        return contentVersion;
    }
    
    public static void linkContentToRecord(String contentDocumentId, String recordId) {
        ContentDocumentLink documentLink = new ContentDocumentLink();
        documentLink.ContentDocumentId   = contentDocumentId;
        documentLink.LinkedEntityId      = recordId; 
		documentLink.ShareType           = 'I';
        documentLink.Visibility          = 'AllUsers';
        
        insert documentLink;
    }

}