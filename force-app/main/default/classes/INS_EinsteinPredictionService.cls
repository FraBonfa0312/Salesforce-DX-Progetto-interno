public class INS_EinsteinPredictionService {
    
    // Base URL for the PredictionService
    private static String BASE_URL = 'https://api.einstein.ai/v2';
    
    private String API_USAGE = BASE_URL + '/apiusage';
    private static String OAUTH2 = BASE_URL + '/oauth2/token';
    
    private boolean isExecuting = false;
    private String bearerToken = '';
    public Integer httpStatusCode = 0;
    public String httpErrorMessage = '';
    private Types typeEnum;
    private String typeString;
    public String baseUrl;
    
    public enum Types {
        IMAGE,
            IMAGE_MULTI_LABEL,
            IMAGE_DETECTION,
            SENTIMENT,
            INTENT
            }
    
    /**
* <p>Create a new object of type Einstein_PredictionService.</p>
*
* <p>The Einstein_PredictionService is the foundation for communicating with the Salesforce Einstein Platform API.
*
* @param typeEnum
* An Enum of type Einstein_PredictionService.Types which defines the type of prediction (image, image-multi-model, sentiment or intent).
*/
    public INS_EinsteinPredictionService(INS_EinsteinPredictionService.Types typeEnum) {
        this.bearerToken = getAccessToken();
        this.typeEnum = typeEnum;
        this.baseUrl = resolveBaseUrl();
        this.typeString = resolveType();
    }
    
    
    /**
* <p>Create a new object of type Einstein_PredictionService.</p>
*
* <p>The Einstein_PredictionService is the foundation for communicating with the Salesforce Einstein Platform API.
*
* @param bearerToken
* A valid Bearer token
* @param typeEnum
* An Enum of type Einstein_PredictionService.Types which defines the type of prediction (image, image-multi-model, sentiment or intent).
*/
    public INS_EinsteinPredictionService(String bearerToken, INS_EinsteinPredictionService.Types typeEnum) {
        this.bearerToken = bearerToken;
        this.typeEnum = typeEnum;
        this.baseUrl = resolveBaseUrl();
        this.typeString = resolveType();
    }
    
   
    /**
* Detects objects in the given image in Base64 format based a trained model.
* @param model
* The Einstein_Model that should be used for the prediction.
* @param base64
* The image that should be used for detecting objects in it.
* @param numResults
* The number of results that should be max. returned.
* @param sampleId
* Optional. A string that gets returned as an association with the image.
* @return
* An object of type Einstein_PredictionResult.
*/
    public Einstein_PredictionResult detectImageBase64(String modelId, String base64, Integer numResults, String sampleId) {
        System.debug('Starting detect call with model ' + modelId + ' for base64');
        Einstein_HttpBodyPartPrediction parts = new Einstein_HttpBodyPartPrediction(modelId, base64, numResults, sampleId, Einstein_HttpBodyPartPrediction.Types.BASE64);
        INS_Einstein_HttpClient client = new INS_Einstein_HttpClient(this, '/detect', parts.build());
        System.debug('Target URL is ' + client.getUrl());
        client.execute();
        while(isExecuting()) {
            System.debug('Status is: ' + isExecuting());
        }
        System.debug('Call detect has been executed.');
        if (!client.isError()) {
            Einstein_PredictionResult predictions = (Einstein_PredictionResult)client.getParser().readValueAs(Einstein_PredictionResult.class);
            System.debug('Image has been detected.');
            return predictions;
        }
        handleError(client.getStatusCode(), client.getResponseError());
        return null;
    }
    
    /**
* Detects objects in the given image in Base64 format based a trained model.
* @param model
* The Einstein_Model that should be used for the prediction.
* @param fileBlob
* The image that should be used for detecting objects in it.
* @param numResults
* The number of results that should be max. returned.
* @param sampleId
* Optional. A string that gets returned as an association with the image.
* @return
* An object of type Einstein_PredictionResult.
*/
    public Einstein_PredictionResult detectImageBlob(String modelId, Blob fileBlob, Integer numResults, String sampleId) {
        System.debug('Starting detect call with model ' + modelId + ' for blob');
        Einstein_HttpBodyPartPrediction parts = new Einstein_HttpBodyPartPrediction(modelId, EncodingUtil.base64Encode(fileBlob), numResults, sampleId, Einstein_HttpBodyPartPrediction.Types.BASE64);
        INS_Einstein_HttpClient client = new INS_Einstein_HttpClient(this, '/detect', parts.build());
        System.debug('Target URL is ' + client.getUrl());
        client.execute();
        while(isExecuting()) {
            System.debug('Status is: ' + isExecuting());
        }
        System.debug('Call predict has been executed.');
        if (!client.isError()) {
            Einstein_PredictionResult predictions = (Einstein_PredictionResult)client.getParser().readValueAs(Einstein_PredictionResult.class);
            System.debug('Image has been detected.');
            return predictions;
        }
        handleError(client.getStatusCode(), client.getResponseError());
        return null;
    }
    
    /**
* Detects objects in the given image in Base64 format based a trained model.
* @param model
* The Einstein_Model that should be used for the prediction.
* @param url
* The image url that should be used for detecting objects in it.
* @param numResults
* The number of results that should be max. returned.
* @param sampleId
* Optional. A string that gets returned as an association with the image.
* @return
* An object of type Einstein_PredictionResult.
*/
    public Einstein_PredictionResult detectImageUrl(String modelId, String url, Integer numResults, String sampleId) {
        System.debug('Starting detect call with model ' + modelId + ' for url');
        Einstein_HttpBodyPartPrediction parts = new Einstein_HttpBodyPartPrediction(modelId, url, numResults, sampleId, Einstein_HttpBodyPartPrediction.Types.URL);
        INS_Einstein_HttpClient client = new INS_Einstein_HttpClient(this, '/detect', parts.build());
        System.debug('Target URL is ' + client.getUrl());
        client.execute();
        while(isExecuting()) {
            System.debug('Status is: ' + isExecuting());
        }
        System.debug('Call predict has been executed.');
        if (!client.isError()) {
            Einstein_PredictionResult predictions = (Einstein_PredictionResult)client.getParser().readValueAs(Einstein_PredictionResult.class);
            System.debug('Image has been detected.');
            return predictions;
        }
        handleError(client.getStatusCode(), client.getResponseError());
        return null;
    }
    
    /**
* Predicts the association of the given image in Base64 format to a trained model.
* @param model
* The Einstein_Model that should be used for the prediction.
* @param base64
* The image that should be predicted.
* @param numResults
* The number of results that should be max. returned.
* @param sampleId
* Optional. A string that gets returned as an association with the predicted image.
* @return
* An object of type Einstein_PredictionResult.
*/
    public Einstein_PredictionResult predictImageBase64(String modelId, String base64, Integer numResults, String sampleId) {
        System.debug('Starting predict call with model ' + modelId + ' for base64');
        Einstein_HttpBodyPartPrediction parts = new Einstein_HttpBodyPartPrediction(modelId, base64, numResults, sampleId, Einstein_HttpBodyPartPrediction.Types.BASE64);
        INS_Einstein_HttpClient client = new INS_Einstein_HttpClient(this, '/predict', parts.build());
        System.debug('Target URL is ' + client.getUrl());
        client.execute();
        while(isExecuting()) {
            System.debug('Status is: ' + isExecuting());
        }
        System.debug('Call predict has been executed.');
        if (!client.isError()) {
            Einstein_PredictionResult predictions = (Einstein_PredictionResult)client.getParser().readValueAs(Einstein_PredictionResult.class);
            System.debug('Image has been predicted.');
            return predictions;
        }
        handleError(client.getStatusCode(), client.getResponseError());
        return null;
    }
    
    /**
* Predicts the association of the given image as Blob to a trained model.
* @param modelId
* The Einstein_Model that should be used for the prediction.
* @param fileBob
* The image that should be predicted.
* @param numResults
* The number of results that should be max. returned.
* @param sampleId
* Optional. A string that gets returned as an association with the predicted image.
* @return
* An object of type Einstein_PredictionResult.
*/
    public Einstein_PredictionResult predictImageBlob(String modelId, Blob fileBlob, Integer numResults, String sampleId) {
        System.debug('Starting predict call with model ' + modelId + ' for blob');
        Einstein_HttpBodyPartPrediction parts = new Einstein_HttpBodyPartPrediction(modelId, EncodingUtil.base64Encode(fileBlob), numResults, sampleId, Einstein_HttpBodyPartPrediction.Types.BASE64);
        INS_Einstein_HttpClient client = new INS_Einstein_HttpClient(this, '/predict', parts.build());
        System.debug('Target URL is ' + client.getUrl());
        client.execute();
        while(isExecuting()) {
            System.debug('Status is: ' + isExecuting());
        }
        System.debug('Call predict has been executed.');
        if (!client.isError()) {
            Einstein_PredictionResult predictions = (Einstein_PredictionResult)client.getParser().readValueAs(Einstein_PredictionResult.class);
            System.debug('Image has been predicted.');
            return predictions;
        }
        handleError(client.getStatusCode(), client.getResponseError());
        return null;
    }
    
    /**
* Predicts the association of the given image on a remote url to a trained model.
* @param modelId
* The Einstein_Model that should be used for the prediction.
* @param url
* The image url that should be predicted.
* @param numResults
* The number of results that should be max. returned.
* @param sampleId
* Optional. A string that gets returned as an association with the predicted image.
* @return
* An object of type Einstein_PredictionResult.
*/
    public Einstein_PredictionResult predictImageUrl(String modelId, String url, Integer numResults, String sampleId) {
        System.debug('Starting predict call with model ' + modelId + ' for url');
        Einstein_HttpBodyPartPrediction parts = new Einstein_HttpBodyPartPrediction(modelId, url, numResults, sampleId, Einstein_HttpBodyPartPrediction.Types.URL);
        INS_Einstein_HttpClient client = new INS_Einstein_HttpClient(this, '/predict', parts.build());
        System.debug('Target URL is ' + client.getUrl());
        client.execute();
        while(isExecuting()) {
            System.debug('Status is: ' + isExecuting());
        }
        System.debug('Call predict has been executed.');
        if (!client.isError()) {
            Einstein_PredictionResult predictions = (Einstein_PredictionResult)client.getParser().readValueAs(Einstein_PredictionResult.class);
            System.debug('Image has been predicted.');
            return predictions;
        }
        handleError(client.getStatusCode(), client.getResponseError());
        return null;
    }
    
    /**
* Fetches data about the API usage of the authenticated PredictionService.
* @return
* An array of all Einstein_ApiUsage elements.
*/
    public Einstein_ApiUsage[] getApiUsage() {
        System.debug('Starting getApiUsage call');
        INS_Einstein_HttpClient client = new INS_Einstein_HttpClient(this, API_USAGE);
        System.debug('Target URL is ' + client.getUrl());
        client.execute();
        while (isExecuting()) {
            System.debug('Status is: ' + isExecuting() );
        }
        System.debug('Call getApiUsage has been executed.');
        if (!client.isError()) {
            Einstein_ApiUsage[] apiUsage = (Einstein_ApiUsage[])client.getParser().readValueAs(Einstein_ApiUsage[].class);
            System.debug('API usage has been fetched.');
            return apiUsage;
        }
        handleError(client.getStatusCode(), client.getResponseError());
        return null;
    }
    
    /**
*
* @return
*/
    public boolean isExecuting() {
        return isExecuting;
    }
    
    /**
*
* @param isExecuting
*/
    public void isExecuting(boolean isExecuting) {
        this.isExecuting = isExecuting;
    }
    
    /**
*
* @param message
*/
    private void handleError(Integer statusCode, String message) {
        httpStatusCode = statusCode;
        httpErrorMessage = message;
        System.debug(LoggingLevel.Error, 'Response finished with Error: ' + message + ' (status code: ' + statusCode + ')');
    }
    
    /**
* Sets the Type of the Einstein_PredictionService
* @param typeEnum
* Value of type Einstein_PredictionService.Types
*/
    public void setType(Types typeEnum) {
        this.typeEnum = typeEnum;
        this.baseUrl = resolveBaseUrl();
        this.typeString = resolveType();
    }
    
    private String resolveType() {
        if (this.typeEnum == INS_EinsteinPredictionService.Types.IMAGE) {
            return 'image';
        } else if (this.typeEnum == INS_EinsteinPredictionService.Types.IMAGE_MULTI_LABEL) {
            return 'image-multi-label';
        } else if (this.typeEnum == INS_EinsteinPredictionService.Types.IMAGE_DETECTION) {
            return 'image-detection';
        } else if (this.typeEnum == INS_EinsteinPredictionService.Types.SENTIMENT) {
            return 'text-sentiment';
        } else if (this.typeEnum == INS_EinsteinPredictionService.Types.INTENT) {
            return 'text-intent';
        }
        return '';
    }
    
    private String resolveBaseUrl() {
        if (this.typeEnum == INS_EinsteinPredictionService.Types.IMAGE) {
            return BASE_URL + '/vision';
        } else if (this.typeEnum == INS_EinsteinPredictionService.Types.IMAGE_MULTI_LABEL) {
            return BASE_URL + '/vision';
        } else if (this.typeEnum == INS_EinsteinPredictionService.Types.IMAGE_DETECTION) {
            return BASE_URL + '/vision';
        } else if (this.typeEnum == INS_EinsteinPredictionService.Types.SENTIMENT) {
            return BASE_URL + '/language';
        } else if (this.typeEnum == INS_EinsteinPredictionService.Types.INTENT) {
            return BASE_URL + '/language';
        }
        return '';
    }
    
    private String resolveEinsteinDatasetType(Einstein_Dataset.Types typeEnum) {
        if (typeEnum == Einstein_Dataset.Types.ALL) {
            return '&type=all';
        } else if (typeEnum == Einstein_Dataset.Types.FEEDBACK) {
            return '&type=feedback';
        } else if (typeEnum == Einstein_Dataset.Types.UPLOAD) {
            return '&type=upload';
        }
        return '';
    }
    
    private String resolveEinsteinExampleType(Einstein_Example.Types typeEnum) {
        if (typeEnum == Einstein_Example.Types.ALL) {
            return '&type=all';
        } else if (typeEnum == Einstein_Example.Types.FEEDBACK) {
            return '&type=feedback';
        } else if (typeEnum == Einstein_Example.Types.UPLOAD) {
            return '&type=upload';
        }
        return '';
    }
    
    
    /**
*
* @return
*/
    public String getBearerToken() {
        return bearerToken;
    }
    
    public static String getAccessToken_Original() {
        Einstein_Settings__c settings = Einstein_Settings__c.getOrgDefaults();
        Einstein_JWT jwt = new Einstein_JWT('RS256');
        String accessToken = '';
        
        Boolean cacheEnabled = false;
        
        
        if (!Test.isRunningTest()) {
            
            if (settings.Einstein_EMail__c == null) {
                throw new Einstein_ConfigurationException('Missing Einstein email setting. Check your Custom Settings.');
            }
            
            
            accessToken = getTokenFromCache(  settings );
            if(accessToken != null) {
                return  accessToken;  
            }
            System.debug('Einstein Access Token Cache Miss');
            
            String tokenFileName = 'einstein_platform';
            
            if (settings.CertName__c == null) {
                ContentVersion base64Content;
                // Try to retrieve certificate
                
                try {
                    base64Content = [SELECT Title, VersionData FROM ContentVersion where Title=: tokenFileName AND IsLatest=true order by CreatedDate DESC LIMIT 1];
                } catch (QueryException e) {
                    throw new Einstein_ConfigurationException('Could not retrieve the Einstein Platform certificate file: einstein_platform', e);
                }
                
                String keyContents = base64Content.VersionData.tostring();
                keyContents = keyContents.replace('-----BEGIN RSA PRIVATE KEY-----', '');
                keyContents = keyContents.replace('-----END RSA PRIVATE KEY-----', '');
                keyContents = keyContents.replace('\n', '');
                jwt.pkcs8 = keyContents;
            } else {
                tokenFileName =  settings.CertName__c;
                jwt.cert = settings.CertName__c;
            }
            // Get a new token
            jwt.iss = 'developer.force.com';
            jwt.sub = settings.Einstein_EMail__c;
            jwt.aud = OAUTH2;
            jwt.exp = '3600';
            
            try {
                accessToken = Einstein_JWTBearerFlow.getAccessToken(OAUTH2, jwt);
            } catch(Exception e) {
                checkTokenFileCount( tokenFileName );
                throw e;
            }
            
            if( accessToken == null ) {
                
                throw new Einstein_ConfigurationException('Could not retreive token from Einstein Platform. Please check your configuration.');
            }
            
            if( settings.CacheName__c != null) {  
                System.debug('-- Storing Einstein Platform token in cache --');
                DateTime tokenTime = DateTime.now();
                String cachPartition = null;
                
                cachPartition = 'local.' + settings.CacheName__c;
                
                Cache.OrgPartition orgPart = Cache.Org.getPartition(cachPartition);
                orgPart.put('accessToken', accessToken);
                orgPart.put('tokenTime', tokenTime);
                System.debug('Storing Email ' +  settings.Einstein_EMail__c);
                orgPart.put('email', settings.Einstein_EMail__c);
                
            }
            
            System.debug(accessToken);
            
            
        }
        
        return accessToken;
    }
    
    public static String getAccessToken() {
        Einstein_Settings__c settings = Einstein_Settings__c.getOrgDefaults();
        String einsteinEmail;

            einsteinEmail =  'msalem.etdemos2@gmail.com';

        ContentVersion base64Content;
        String keyContents;
        // Try to retrieve certificate
        try {
        	 keyContents = [Select Body From StaticResource Where Name = 'pemFile'].Body.toString();
        }
        catch (QueryException e) {
            throw new Einstein_ConfigurationException('Could not retrieve the Einstein Platform certificate file: einstein_platform', e);
        }
        //String keyContents = base64Content.VersionData.tostring();
        keyContents = keyContents.replace('-----BEGIN RSA PRIVATE KEY-----', '');
        keyContents = keyContents.replace('-----END RSA PRIVATE KEY-----', '');
        keyContents = keyContents.replace('\n', '');
        
        // Get a new token
        Einstein_JWT jwt = new Einstein_JWT('RS256');
        jwt.pkcs8 = keyContents; // Comment this if you are using jwt.cert
        jwt.iss = 'developer.force.com';
        jwt.sub = einsteinEmail;
        jwt.aud = OAUTH2;
        jwt.exp = '3600';
        String accessToken = '';
        
        if (!Test.isRunningTest()) {
            accessToken = Einstein_JWTBearerFlow.getAccessToken(OAUTH2, jwt);
        }
        
        return accessToken;  
    }
    
    private static boolean  checkTokenFileCount( String tokenFileName ) {
        integer count = [SELECT count() FROM ContentVersion where Title=: tokenFileName AND IsLatest=true ];
        
        
        //integer count= database.countQuery('SELECT count() FROM ContentVersion where Title="einstein_platform"  AND IsLatest=true');
        System.debug('Found ' + count + ' token files');
        if(count != 1) {
            throw new Einstein_ConfigurationException('Could not retrieve the Einstein Platform certificate, found ' + count + ' files. Please ensure there is exactly 1 called ' + tokenFileName +  '.');
        } else {
            return true;
        }
        
    }
    
    private static String getTokenFromCache( Einstein_Settings__c settings ) {
        String cachPartition = null;
        Integer tokenTimeoutHrs = 2;    
        String accessToken = null;
        if( settings.CacheName__c == null) {
            System.debug('Einstein Platform Cache not setup');
            return null;    
        }  		
        
        cachPartition = 'local.' + settings.CacheName__c;
        
        
        String email = (String)  Cache.Org.get(cachPartition + '.' + 'email');
        if(email != settings.Einstein_EMail__c) {
            System.debug('Einstein Platform email changed - ' + email + ' - ' +  settings.Einstein_EMail__c);
            return null;
        } 
        
        
        
        accessToken = (String)  Cache.Org.get(cachPartition + '.' + 'accessToken');
        if(accessToken != null) {
            System.debug('Einstein Access Token Cache Hit');
            DateTime tokenTime = (DateTime) Cache.Org.get('tokenTime');
            DateTime tokenTimeout = tokenTime.addHours(tokenTimeoutHrs);
            if(tokenTimeout > DateTime.Now()) {   
                System.debug(accessToken);      
                return accessToken;
            } else {
                System.debug('Einstein Access Token Not Valid.. going to refresh');
                
            }
        }
        return null;
    }
    
}