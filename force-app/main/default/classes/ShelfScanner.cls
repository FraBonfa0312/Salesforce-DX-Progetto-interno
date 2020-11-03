global class ShelfScanner {
    
    @AuraEnabled
    public static Einstein_PredictionResult detectShelfObjects(String modelId, String base64){
        INS_EinsteinPredictionService service = new INS_EinsteinPredictionService(INS_EinsteinPredictionService.Types.IMAGE_DETECTION);
        Einstein_PredictionResult result = service.detectImageBase64(modelId, base64, 0, '');
        return result;
    }

    
    
}