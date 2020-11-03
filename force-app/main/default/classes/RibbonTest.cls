@isTest
private class RibbonTest {
	
	@isTest static void getTipoTest() {
		Map<String,String> res = Ribbon.getTipos('Opportunity', 'StageName', 'Amou2nt', 'CloseDate', 'FiscalYear', 'StageName', 'StageName', 'StageName');
	
			System.assertEquals(8,res.size());

		
	}
	@isTest static void getTipoTest2() {

        Map<String,String> res2 = Ribbon.getTipos('Opportunity', 'StageName', 'Amount', 'CloseDate', 'FiscalYear', 'StageName', 'StageName', 'StageName');

	
			System.assertEquals(8,res2.size());
		
	}
	@isTest static void getQTest() {
		Account a = new Account (Name ='XXX');
        insert a;
		Map<String,Object> res = Ribbon.getValores(a.id,Ribbon.getTipos('Account', 'IsPartner', 'LastActivityDate', 'Type', 'Phone', 'Fax', 'Rating', 'Site'),'Account', 'IsPartner', 'LastActivityDate', 'Type', 'Phone', 'Fax', 'Rating', 'Site');

	
			System.assertEquals(7,res.size());
		
	}
	
    @isTest static void getQTest2() {
		Account a = new Account (Name ='XXX');
        insert a;
		Map<String,Object> res = Ribbon.getValores(a.id,Ribbon.getTipos('Account', 'IsPartner', 'LastActivityDate', 'Type', 'Phone', 'Fax', 'Rating', 'Site'),'Accou2nt', 'IsPartner', 'LastActivityDate', 'Type', 'Phone', 'Fax', 'Rating', 'Site');

	
			System.assertEquals(null,res);
		
	}
}