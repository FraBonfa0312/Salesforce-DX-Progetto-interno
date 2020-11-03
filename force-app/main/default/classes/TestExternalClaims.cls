@isTest
public class TestExternalClaims {
    
    @isTest static void testThis(){
        ExternalClaims myExternal = new ExternalClaims();
        List<DataSource.AuthenticationCapability> myAuth = myExternal.getAuthenticationCapabilities();
        System.assertEquals(myAuth.size(), 1);
        
        List<DataSource.Capability> myCapabilities = myExternal.getCapabilities();        
        
        DataSource.ConnectionParams myParams = new DataSource.ConnectionParams();
        DataSource.Connection myConnection = myExternal.getConnection(myParams);                       
        
        if (Test.isRunningTest()) { 
            Test.setMock(HttpCalloutMock.class, new ExternalClaimsMock());
        }
        
        Test.startTest();
        HttpResponse response = CalloutResponder.makeCallClaims('https://anypoint.mulesoft.com/mocking/api/v1/links/aa026b36-ed8c-4352-ab54-1b590aaff814/claims');
        
        
        GetClaimsExt myGetExternal = new GetClaimsExt(myParams);
        List<DataSource.Table> myTables = myGetExternal.sync();
        
        
        DataSource.ColumnSelection myColumn1 = new DataSource.ColumnSelection();
        myColumn1.columnName = 'Flag__c';
        myColumn1.tableName = 'Claims_ext__x';       
        
        List<DataSource.ColumnSelection> myColumns = new List<DataSource.ColumnSelection>();
        myColumns.add(myColumn1);
        
        DataSource.TableSelection myTableSelection = new DataSource.TableSelection();
        myTableSelection.tableSelected = 'Claims_ext__x';
        myTableSelection.columnsSelected = myColumns;
        
        DataSource.QueryContext myQueryContext = new DataSource.QueryContext();
        myQueryContext.tableSelection = myTableSelection;
        
        DataSource.TableResult myTableResults = myGetExternal.query(myQueryContext);
        
        DataSource.ColumnSelection myColumn2 = new DataSource.ColumnSelection();
        myColumn2.columnName = 'Status__c';
        myColumn2.tableName = 'Claims_ext__x';
        myColumns.add(myColumn2);
        
        DataSource.TableSelection myTableSelection2 = new DataSource.TableSelection();
        myTableSelection2.tableSelected = 'Claims_ext__x';
        myTableSelection2.columnsSelected = myColumns;
        
        DataSource.QueryContext myQueryContext2 = new DataSource.QueryContext();
        myQueryContext2.tableSelection = myTableSelection2;
        
        DataSource.TableResult myTableResults2 = myGetExternal.query(myQueryContext2);
        Test.stopTest();
        
        
    }
    
}