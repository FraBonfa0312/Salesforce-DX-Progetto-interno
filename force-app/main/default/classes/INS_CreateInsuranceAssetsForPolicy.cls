public class INS_CreateInsuranceAssetsForPolicy {
    public class AssetInput {
        @InvocableVariable
        public String policyId;
        
        @InvocableVariable
        public String propertyId;
        
        @InvocableVariable
        public String additionalPropertyIds;
    }
    @InvocableMethod(label='Create Insurance Assets for Policy')
    public static void createInsuranceAssets(List<AssetInput> inputs) {
        List<InsurancePolicyAsset> assets = new List<InsurancePolicyAsset>();
        if (inputs.size() > 0) {
            List<String> propertyIds = new List<String>();
            if (String.isNotEmpty(inputs[0].additionalPropertyIds)) {
                List<String> additionalPropertyIds = inputs[0].additionalPropertyIds.split(',');
                if (additionalPropertyIds != NULL) {
                    propertyIds.addAll(additionalPropertyIds);
                }
            }
            
            if (String.isNotEmpty(inputs[0].propertyId)) {
                propertyIds.add(inputs[0].propertyId);
            }
            
            for (String propertyId : propertyIds) {
                InsurancePolicyAsset asset = new InsurancePolicyAsset();
                asset.InsurancePolicyId    = inputs[0].policyId;
                asset.CustomerPropertyId   = propertyId;
                assets.add(asset);
            }
            insert assets;
        }
    }
}