public class PopulateMe {
    
    @AuraEnabled    
    public static void getSetup(String givenId, Decimal givenVal, List<String> myTypes){        
        
        // Re-instantiate everything taken from front-end because you never trust end-users
        List<String> myNewList = new List<String>();
        for(Integer i = 0; i < myTypes.size(); i++){
            if((myTypes.get(i) != '') || (myTypes.get(i) != null)){
                myNewList.add(myTypes.get(i));
            }            
        }                
        
        DateTime myDateTime = System.now();        
        List<Financial_Account_Transaction__b> myFinBig = new List<Financial_Account_Transaction__b>();
        Integer AmountLoaded = 19;
        
        final String chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        String randStr = '';
        while (randStr.length() < 1) {
            Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
            randStr += chars.substring(idx, idx+1);
        }
        
        final String chars1 = '0123456789';
        String randStr1 = '';
        while (randStr1.length() < 2) {
            Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars1.length());
            randStr1 += chars1.substring(idx, idx+1);
        }
        
        final String chars2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        String randStr2 = '';
        while (randStr2.length() < 2) {
            Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars2.length());
            randStr2 += chars2.substring(idx, idx+1);
        }
        
        final String chars3 = '0123456789';
        String randStr3 = '';
        while (randStr3.length() < 1) {
            Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars3.length());
            randStr3 += chars3.substring(idx, idx+1);
        }
        
        final String chars4 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        String randStr4 = '';
        while (randStr4.length() < 1) {
            Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars4.length());
            randStr4 += chars4.substring(idx, idx+1);
        }
        
        // Seriously, don't trust the end-users
        if(((givenId != '') || (givenId != null)) &&
           ((givenVal != null)) &&
           ((!myNewList.isEmpty()) || (myNewList != null))){
                
               for(Integer i = 1; i < AmountLoaded; i++){                   
                   
                   Financial_Account_Transaction__b t1 = new Financial_Account_Transaction__b(Amount__c = givenVal + i,
                                                                                              Description__c = 'From The Source',
                                                                                              Financial_Account__c = givenId,
                                                                                              Transaction_Date__c = myDateTime.addMinutes(1 - i),
                                                                                              Transaction_Id__c = 'TR-' + randStr + randStr1 + randStr2 + randStr3 + randStr4 + '-' + String.valueOf(i),
                                                                                              Transaction_Status__c = 'Complete',
                                                                                              Transaction_Sub_Type__c = 'Posted',
                                                                                              Transaction_Type__c = myNewList.get((Math.mod((i - 1), myNewList.size())))
                                                                                             );
                   myFinBig.add(t1);
                   
               }
               
               if(Test.isRunningTest()){
                   
               } else {
                   Database.insertImmediate(myFinBig);                   
               }

               
           }
        
    }
    
}