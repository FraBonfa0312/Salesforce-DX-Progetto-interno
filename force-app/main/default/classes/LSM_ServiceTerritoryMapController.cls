public with sharing class LSM_ServiceTerritoryMapController {

    public String mapsKey { get; set; }
    
    public LSM_ServiceTerritoryMapController() {
        LSMConfig config = getLSMConfig();
        if(config != null) mapsKey = config.maps;
    }
    
    @AuraEnabled
    public static LSMConfig getLSMConfig() {

        List<LSM_Settings__c> settings = [SELECT Id, Maps_API_Key__c, Places_API_Key__c FROM LSM_Settings__c];
        
        if(settings.size() > 0) {
            
            String prefix = '';
            String networkid = Network.getNetworkId();
            if(networkid != null) {
                Network n = [SELECT Id, UrlPathPrefix FROM Network WHERE Id = :networkid];
                prefix = '/' + n.UrlPathPrefix;
            }
            
            LSMConfig config = new LSMConfig();
            config.maps = settings[0].Maps_API_Key__c;
            config.places = settings[0].Places_API_Key__c;
            config.prefix = prefix;
            return config;
        }
        
        return null;
    }
    
    @AuraEnabled
	public static string getSuggestions(String input, String placesKey, String options) {
        System.debug('Options: '+options);
        if(options != null && options != '') options = options.replace('+','&');
        else options = '';
	    String url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?'
            	+ 'input=' + EncodingUtil.urlEncode(input, 'UTF-8')
            	+ '&key=' + placesKey
            	+ options;
	    String response = getResponse(url);
        System.debug('Input: '+input);
        System.debug('Response: '+response);
	    return response;
	}
    
    @AuraEnabled
	public static string getPlaceDetails(String placeId, String placesKey) {
     	String url = 'https://maps.googleapis.com/maps/api/place/details/json?'
	            + 'placeid=' + EncodingUtil.urlEncode(placeId, 'UTF-8')
            	+ '&key=' + placesKey;
	    String response = getResponse(url);
        System.debug('Place Details Response: '+response);
	    return response;
	}
 
	public static string getResponse(string strURL){
		Http h = new Http();
		HttpRequest req = new HttpRequest();
		HttpResponse res = new HttpResponse();
		req.setMethod('GET');
		req.setEndpoint(strURL);
		req.setTimeout(120000);
		res = h.send(req); 
		String responseBody = res.getBody(); 
		return responseBody;
	}
    
    @AuraEnabled
    public static List<ServiceTerritory> getAllTerritories(String WorkTypeGroupId, String WorkTypeId, Decimal CurrentLat, Decimal CurrentLng) {
        
        System.debug('Base Url: '+URL.getSalesforceBaseUrl().toExternalForm());

        List<Id> wtids = new List<Id>();
        
        if(WorkTypeId != null && WorkTypeId != '') {
            wtids.add(WorkTypeId);
        } else {
        	List<WorkTypeGroupMember> wtgms = [SELECT Id, WorkTypeId FROM WorkTypeGroupMember WHERE WorkTypeGroupId = :WorkTypeGroupId];
        	for(WorkTypeGroupMember wtgm : wtgms) {
            	wtids.add(wtgm.WorkTypeId);
        	}            
        }
        Set<Id> stids = new Set<Id>();
        List<ServiceTerritoryWorkType> stwts = [SELECT Id, ServiceTerritoryId FROM ServiceTerritoryWorkType WHERE WorkTypeId IN :wtids];
        for(ServiceTerritoryWorkType stwt : stwts) {
            stids.add(stwt.ServiceTerritoryId);
        }     
        
        String queryString = 'SELECT Id, Name, Latitude, Longitude, Street, City, State, PostalCode, Country '+
            				 'FROM ServiceTerritory '+
            				 'WHERE IsActive=TRUE '+
            				 'AND LSM_Contact_Center__c=FALSE '+
        					 'AND Id IN :stids';
        if(CurrentLat != null) queryString+=
            				 ' ORDER BY DISTANCE(Address, GEOLOCATION('+CurrentLat+', '+CurrentLng+'), \'km\')';
                
        List<ServiceTerritory> territories = Database.Query(queryString);
        return territories;
    }
    
    
    @AuraEnabled
    public static List<ServiceTerritory> getSortedTerritories(String WorkTypeGroupId, String WorkTypeId, Integer radius, String unit, Decimal lat, Decimal lng){
        
        List<Id> wtids = new List<Id>();
        
        if(WorkTypeId != null && WorkTypeId != '') {
            wtids.add(WorkTypeId);
        } else {
            List<WorkTypeGroupMember> wtgms = [SELECT Id, WorkTypeId FROM WorkTypeGroupMember WHERE WorkTypeGroupId = :WorkTypeGroupId];
        	for(WorkTypeGroupMember wtgm : wtgms) {
            	wtids.add(wtgm.WorkTypeId);
        	}
        }
        Set<Id> stids = new Set<Id>();
        List<ServiceTerritoryWorkType> stwts = [SELECT Id, ServiceTerritoryId FROM ServiceTerritoryWorkType WHERE WorkTypeId IN :wtids];
        for(ServiceTerritoryWorkType stwt : stwts) {
            stids.add(stwt.ServiceTerritoryId);
        }     
        
		String queryString = 'SELECT Id, Name, Latitude, Longitude, Street, City, State, PostalCode, Country '+
                                              'FROM ServiceTerritory '+
                                              'WHERE IsActive=TRUE '+
                                              'AND LSM_Contact_Center__c=FALSE '+
                                              'AND Id IN :stids '+
                                              'AND DISTANCE(Address, GEOLOCATION('+lat+', '+lng+'), \''+unit+'\') < '+radius+' '+ 
                                              'ORDER BY DISTANCE(Address, GEOLOCATION('+lat+', '+lng+'), \''+unit+'\')';
        
        List<ServiceTerritory> territories = Database.query(queryString);        
        
        return territories;
    }
    
    public class LSMConfig {
        
        @AuraEnabled public String maps { get; set; }
        @AuraEnabled public String places { get; set; }
        @AuraEnabled public String prefix { get; set; }
        
    }

}