public class INS_InsuranceQuoteController {
    
    @AuraEnabled
    public static CustomerProperty getCustomerProperty(String recordId) {
        return [ SELECT Id,Name,Main_Image__c,Street,City,State,PostalCode,BedroomCount,GarageSpaceCount,BathroomCount,CeilingType,DwellingType,FloorType,FoundationType,RoofType,YearBuilt,GarageType,BuiltUpArea 
                FROM CustomerProperty
                WHERE Id = :recordId ];
    }
    
    @AuraEnabled
    public static String getPlacePhoto(String formattedAddress) {
        return INS_GoogleAPIController.getPlacePhoto(formattedAddress);
    }
    
    @AuraEnabled
    public static void updateCustomerProperties(String itemsJSON) {
        Map<String, Decimal> priceMap = new Map<String, Decimal>();
        List<Object> propertyList = (List<Object>)JSON.deserializeUntyped(itemsJSON);
        for (Object property : propertyList) {
            Map<String, Object> propertyObj = (Map<String, Object>)property;
            priceMap.put((String)propertyObj.get('Id'), Decimal.valueOf(String.valueOf(propertyObj.get('PurchasePrice'))));
        }
        List<CustomerProperty> properties = [ SELECT Id, PurchasePrice FROM CustomerProperty WHERE Id IN :priceMap.keySet() ];
        RecordType recordType = [ SELECT Id FROM RecordType WHERE sObjectType = 'CustomerProperty' AND DeveloperName = 'PersonalItem'];
        for (CustomerProperty p : properties) {
            p.PurchasePrice = priceMap.get(p.Id);
            p.RecordTypeId = recordType.Id;
        }
        update properties;
    }
    
    @AuraEnabled
    public static void updateCustomerPropertyPrice(String propertyId, Decimal price) {
        CustomerProperty property = [ SELECT Id, PurchasePrice FROM CustomerProperty WHERE Id = :propertyId ];
        property.PurchasePrice = price;
        update property;
    }
    
    @AuraEnabled
    public static List<CustomerProperty> createCustomerProperties(String accountId, List<String> itemNames) {
        List<CustomerProperty> properties = new List<CustomerProperty>();
        
        List<RecordType> recordTypes = [ SELECT Id, Name FROM RecordType
                                        WHERE Name IN :itemNames ];
        Map<String, String> recordTypeMap = new Map<String, String>();
        for (RecordType recordType : recordTypes) {
            recordTypeMap.put(recordType.Name, recordType.Id);
        }
        
        for (String itemName : itemNames) {
            CustomerProperty property = new CustomerProperty();
            property.Description      = itemName;
            property.PrimaryOwnerId   = accountId;
            property.PrimaryUse       = 'Personal';
            property.PurchasePrice    = 1000;
            
            // FOR FINSBASECAMP
            /*if (itemName == 'Bicycle') {
property.ModelName = 'S5 ULTEGRA DI2 8070 DISC ROAD BIKE 2019';
property.Make = 'Cervello';
property.PurchasePrice = 1000;
} else if (itemName == 'Jewellery / Watch') {
property.ModelName = 'Elsa Peretti';
property.Make = 'Tiffany & Co.';
property.PurchasePrice    = 2500;
}*/
            
            if (recordTypeMap.containsKey(itemName) == true) {
                String recordId = recordTypeMap.get(itemName);
                property.RecordTypeId = recordId;
            }
            properties.add(property);
        }
        insert properties;
        
        return [ SELECT Id, Name, Description, PurchasePrice, RecordType.Name, ModelName, Make
                FROM CustomerProperty 
                WHERE Id IN :properties ];
    }
    
    @AuraEnabled
    public static ComparisonTableData getProducts(String productFamily) {
        List<Product2> products = [ SELECT Id, Name, Premium__c, Order__c,
                                   ( SELECT Id, Product__c, Product_Coverage__r.Name, Covered__c FROM Insurance_Coverages__r 
                                    WHERE Product_Coverage__r.Coverage_Type__c IN ('Comparison Feature', 'Policy Coverage') )
                                   FROM Product2 
                                   WHERE Family = :productFamily AND IsActive = true
                                   ORDER BY Order__c ];
        
        ComparisonTableData tableData = new ComparisonTableData();
        tableData.products = products;
        
        List<Product_Insurance_Coverage__c> coverages = [ SELECT Id, Name, Product_Coverage__r.Name, Product_Coverage__r.Coverage_Type__c, Product_Coverage__r.Comparison_Text__c, Covered__c, Product__c
                                                         FROM Product_Insurance_Coverage__c  
                                                         WHERE Product_Coverage__r.Product_Family__c = :productFamily 
                                                         AND Product__c IN :products 
                                                         AND Product_Coverage__r.Coverage_Type__c IN ('Comparison Feature', 'Policy Coverage')
                                                         ORDER BY Product_Coverage__r.Coverage_Type__c ];
        
        Map<String, Map<String, Product_Insurance_Coverage__c>> coverageMap = new Map<String, Map<String, Product_Insurance_Coverage__c>>();
        for (Product_Insurance_Coverage__c cov : coverages) {
            String coverageName = cov.Product_Coverage__r.Name;
            if (coverageMap.containsKey(coverageName) == false) {
                coverageMap.put(coverageName, new Map<String, Product_Insurance_Coverage__c>());
            }
            coverageMap.get(coverageName).put(cov.Product__c, cov);
        }
        
        Set<String> coverageList = coverageMap.keySet();
        for (String coverageName : coverageList) {
            List<Product_Insurance_Coverage__c> productCoverageList = new List<Product_Insurance_Coverage__c>();
            for (Product2 prod : products) {
                Product_Insurance_Coverage__c cov = coverageMap.get(coverageName).get(prod.Id);
                if (cov == NULL) {
                    cov = new Product_Insurance_Coverage__c();
                }
                productCoverageList.add(cov);
            }
            tableData.features.add(new ComparisonFeature(coverageName, productCoverageList));
        }
        System.Debug(tableData);
        return tableData;
    }
    
    public class ComparisonTableData {
        @AuraEnabled
        public List<Product2> products;
        
        @AuraEnabled
        public List<ComparisonFeature> features;
        
        public ComparisonTableData() {
            features = new List<ComparisonFeature>();
        }
    }
    
    public class ComparisonFeature {
        @AuraEnabled
        public String coverageName;
        
        @AuraEnabled
        public List<Product_Insurance_Coverage__c> coverages;
        
        public ComparisonFeature() {
            coverages = new List<Product_Insurance_Coverage__c>();
        }
        
        public ComparisonFeature(String cName, List<Product_Insurance_Coverage__c> cList) {
            coverageName = cName;
            coverages    = cList;
        }
    }
}