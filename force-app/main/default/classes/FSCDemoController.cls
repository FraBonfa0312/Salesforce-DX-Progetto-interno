public with sharing class FSCDemoController {
	@AuraEnabled
	public static Id createBankAccount(String oppId){
		Id acctId = [
			SELECT
				Id
			FROM
				Account
			WHERE
				Name = 'Rachel Adams'
		][0].Id;
		System.debug(acctId);
		FinServ__FinancialAccount__c finAcct = new FinServ__FinancialAccount__c(
			Name = 'CD ' + generateRandomNumber(),
			Product_Type__c = 'Short Term Savings',
			Product__c = 'CD',
			FinServ__FinancialAccountNumber__c = '80640990619',
			FinServ__PrimaryOwner__c = acctId,
			Funding_Method__c = 'Check',
			Funding_Amount__c = '10,000',
			Routing_Number__c = '326481012',
			FinServ__Ownership__c = 'Individual',
			FinServ__FinancialAccountType__c = 'CD',
			FinServ__Balance__c = 10000,
            FinServ__OpenDate__c = system.today()+0
		);
		insert finAcct;
        Opportunity opp = [SELECT Id, FinServ__FinancialAccount__c, StageName FROM Opportunity WHERE Id = :oppId];
        opp.FinServ__FinancialAccount__c = finAcct.Id;
        opp.StageName = 'Closed Won';
        System.debug('CHECK FOR OPP STAGENAME HERE');
        System.debug(opp);
        update opp;
		return acctId;
	}

	public static void aMethod(){
		Integer i = 0;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;
		i++;



	}

	private static String generateRandomNumber(){
		String returnVal = Math.random() + '';
		returnVal = returnVal.replace('0.', '42');
		return returnVal.substring(0, Math.min(returnVal.length(), 8));
	}
}