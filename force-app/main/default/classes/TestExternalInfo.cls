@isTest
public class TestExternalInfo {
    
    @isTest static void testThis(){
        ExternalAccountActions myExternal = new ExternalAccountActions();
        List<DataSource.AuthenticationCapability> myAuth = myExternal.getAuthenticationCapabilities();
        System.assertEquals(myAuth.size(), 1);
        
        List<DataSource.Capability> myCapabilities = myExternal.getCapabilities();        
        
        DataSource.ConnectionParams myParams = new DataSource.ConnectionParams();
        DataSource.Connection myConnection = myExternal.getConnection(myParams);                       
        
        if (Test.isRunningTest()) { 
            Test.setMock(HttpCalloutMock.class, new ExternalInfoMock());
        }
        
        Test.startTest();
        HttpResponse response = CalloutResponder.makeCall('https://anypoint.mulesoft.com/mocking/api/v1/links/0d10c329-762d-470a-ba3c-6bd7ab516e79/accountactions');
        
        
        GetAccountActions myGetExternal = new GetAccountActions(myParams);
        List<DataSource.Table> myTables = myGetExternal.sync();
        
        
        DataSource.ColumnSelection myColumn1 = new DataSource.ColumnSelection();
        myColumn1.columnName = 'Flag__c';
        myColumn1.tableName = 'Account_Actions__x';       
        
        List<DataSource.ColumnSelection> myColumns = new List<DataSource.ColumnSelection>();
        myColumns.add(myColumn1);
        
        DataSource.TableSelection myTableSelection = new DataSource.TableSelection();
        myTableSelection.tableSelected = 'Account_Actions__x';
        myTableSelection.columnsSelected = myColumns;
        
        DataSource.QueryContext myQueryContext = new DataSource.QueryContext();
        myQueryContext.tableSelection = myTableSelection;
        
        DataSource.TableResult myTableResults = myGetExternal.query(myQueryContext);
        
        DataSource.ColumnSelection myColumn2 = new DataSource.ColumnSelection();
        myColumn2.columnName = 'Status__c';
        myColumn2.tableName = 'Account_Actions__x';
        myColumns.add(myColumn2);
        
        DataSource.TableSelection myTableSelection2 = new DataSource.TableSelection();
        myTableSelection2.tableSelected = 'Account_Actions__x';
        myTableSelection2.columnsSelected = myColumns;
        
        DataSource.QueryContext myQueryContext2 = new DataSource.QueryContext();
        myQueryContext2.tableSelection = myTableSelection2;
        
        DataSource.TableResult myTableResults2 = myGetExternal.query(myQueryContext2);
        Test.stopTest();
        
        
    }
    
}