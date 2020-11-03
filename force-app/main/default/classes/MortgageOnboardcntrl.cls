public with sharing class MortgageOnboardcntrl {
    
    @auraEnabled
    public static String getUserName(){
        System.debug(userinfo.getName());
        return UserInfo.getName();
        
    }

}