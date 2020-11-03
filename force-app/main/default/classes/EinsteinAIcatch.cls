public class EinsteinAIcatch {

    public static String run(String data, Decimal preferredCertainty, String modelId){
        
        Integer numResults = 30;
        String sampleId = '';
		String ourResult = '';        
        
        Einstein_PredictionService myService = new Einstein_PredictionService(Einstein_PredictionService.Types.INTENT);
        Einstein_PredictionResult myResult = myService.predictIntent(modelId, data, numResults, sampleId);
        
        if(!Test.isRunningTest()){        
            
            String aiPrediction = myResult.probabilities.get(0).label;
            Decimal aiCertainty = myResult.probabilities.get(0).probability;
            
            //70% or higher is a good place - see next line below
            if(aiCertainty > preferredCertainty){
                if(aiPrediction == 'Safe'){
                    ourResult = 'Highly Qualified';
                } else {
                    ourResult = 'Turn this down';
                }
            } else {
                ourResult = 'TBD';
            }
            
        }
        
        return ourResult;
		
    }

}