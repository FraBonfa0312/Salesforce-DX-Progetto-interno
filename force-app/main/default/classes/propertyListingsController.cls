public class propertyListingsController {
   List<property__c> properties;

   public List<property__c> getProperties(){
       String userID = UserInfo.getUserId();
       if(properties == null){
           properties = [SELECT ID, Name, Owner.ID, Address__c, City__c, State__c, Price__c, Zip__c
                            FROM property__c
                                ORDER BY CreatedDate ASC];
        }
       return properties;
   }
}